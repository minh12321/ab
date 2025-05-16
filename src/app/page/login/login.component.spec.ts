import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { UserService } from '../../../api-sevice/user.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['loginUser']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'login1', 'setToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [AppModule],
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

  it('should login successfully and store user info', () => {
    component.username = 'test@example.com';
    component.password = 'password123';

    const mockResponse = {
      jwt: 'mock-jwt-token',
      user: {
        accountId: 1,
        username: 'test@example.com',
        password: 'hidden',
        fullName: 'Test User',
        status: 'active',
        accountType: 'user',
        email: 'test@example.com',
        timelog: 100,
        diachi: 'Hanoi'
      }
    };

    userServiceSpy.loginUser.and.returnValue(of(mockResponse));
    spyOn(window, 'alert');

    component.login();

    expect(userServiceSpy.loginUser).toHaveBeenCalledWith(jasmine.anything());
    expect(authServiceSpy.setToken).toHaveBeenCalledWith('mock-jwt-token');
    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com');
    expect(authServiceSpy.login1).toHaveBeenCalledWith(
      1, 'Test User', 'test@example.com', 'user', 'active'
    );
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

    expect(userServiceSpy.loginUser).toHaveBeenCalledWith(jasmine.anything());
    expect(window.alert).toHaveBeenCalledWith('Login failed: Sai tài khoản hoặc mật khẩu');
  });

  it('should call login and reload page on submit', fakeAsync(() => {
    spyOn(component, 'login');
    spyOn(window.location, 'reload');

    component.onSubmit();
    expect(component.login).toHaveBeenCalled();

    tick(1000);
    expect(window.location.reload).toHaveBeenCalled();
  }));
});
