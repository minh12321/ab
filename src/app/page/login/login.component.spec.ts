import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { UserService } from '../../../api-sevice/user.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../api-sevice/user.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['loginUser', 'getUserByUsername']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'login1']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and get user', () => {
    component.username = 'test@example.com';
    component.password = 'password123';

    userServiceSpy.loginUser.and.returnValue(of({} as User));
    userServiceSpy.getUserByUsername.and.returnValue(of({
      accountId: 1,
      username: 'test@example.com',
      password: 'hidden',
      fullName: 'Test User',
      status: 'active',
      accountType: 'user',
      email: 'test@example.com',
      timelog: 100,
      diachi: 'Hanoi'
    }));

    spyOn(window, 'alert');
    component.login();

    expect(userServiceSpy.loginUser).toHaveBeenCalled();
    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com');
    expect(userServiceSpy.getUserByUsername).toHaveBeenCalledWith('test@example.com');
    expect(authServiceSpy.login1).toHaveBeenCalledWith(1, 'Test User', 'test@example.com', 'user', 'active');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    expect(window.alert).toHaveBeenCalledWith('Login successful!');
  });

  it('should handle login error', () => {
    component.username = 'wrong@example.com';
    component.password = 'wrongpass';

    const errorResponse = { error: { message: 'Sai tài khoản hoặc mật khẩu' } };
    userServiceSpy.loginUser.and.returnValue(throwError(errorResponse));

    spyOn(window, 'alert');
    component.login();

    expect(userServiceSpy.loginUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Login failed: Sai tài khoản hoặc mật khẩu');
  });

  it('should handle getUserByUsername error', () => {
    component.username = 'test@example.com';
    component.password = 'password123';

    userServiceSpy.loginUser.and.returnValue(of({} as User));
    userServiceSpy.getUserByUsername.and.returnValue(throwError({ message: 'Not Found' }));

    spyOn(console, 'error');
    component.login();

    expect(console.error).toHaveBeenCalledWith('Không tìm thấy người dùng:', jasmine.anything());
  });
});
