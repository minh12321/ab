import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { UserService } from '../../../api-sevice/user.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../../../api-sevice/user.model';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockUsers = [
    {
      accountId: 1,
      fullName: 'Nguyen Van A',
      username: 'nva',
      email: 'nva@example.com',
      diachi: 'HN',
      status: 'active',
      accountType: 'USER',
      password: '',
      timelog: 0
    },  
    {
      accountId: 2,
      fullName: 'Tran Thi B',
      username: 'ttb',
      email: 'ttb@example.com',
      diachi: 'HCM',
      status: 'inactive',
      accountType: 'ADMIN',
      password: '',
      timelog: 0
    }
  ];

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UserService', ['getList', 'deleteUser', 'updateUser']);
    const routeSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: Router, useValue: routeSpy }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user list successfully', () => {
    userServiceSpy.getList.and.returnValue(of(mockUsers));

    component.getUser();

    expect(component.user.length).toBe(2);
    expect(component.filteredUsers.length).toBe(2);
  });

  it('should handle error when fetching users', () => {
    spyOn(console, 'error');
    userServiceSpy.getList.and.returnValue(throwError(() => new Error('API error')));

    component.getUser();

    expect(console.error).toHaveBeenCalledWith('Error fetching users:', jasmine.any(Error));
  });

  it('should delete user and refresh list', () => {
    userServiceSpy.deleteUser.and.returnValue(of({}));
    userServiceSpy.getList.and.returnValue(of(mockUsers));

    component.deleteUser(1);

    expect(userServiceSpy.deleteUser).toHaveBeenCalledWith(1);
    expect(userServiceSpy.getList).toHaveBeenCalled();
  });

  it('should update user successfully', () => {
    userServiceSpy.updateUser.and.returnValue(of({}as User));
    userServiceSpy.getList.and.returnValue(of(mockUsers));
    spyOn(window, 'alert');

    component.id = 1;
    component.fullName = 'New Name';
    component.username = 'newuser';
    component.email = 'new@example.com';
    component.diachi = 'Hanoi';
    component.status = 'active';
    component.loaitk = 'ADMIN';
    component.password = '123';

    component.customus(1);

    expect(userServiceSpy.updateUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Cập nhật thành công!');
  });

  it('should handle update user failure', () => {
    userServiceSpy.updateUser.and.returnValue(throwError(() => new Error('Update failed')));
    spyOn(window, 'alert');

    component.customus(1);

    expect(window.alert).toHaveBeenCalledWith('Cập nhật thất bại: Update failed');
  });

  it('should fill form with selected user data', () => {
    const user = mockUsers[0];
    component.fillForm(user);

    expect(component.id).toBe(user.accountId);
    expect(component.fullName).toBe(user.fullName);
    expect(component.username).toBe(user.username);
    expect(component.email).toBe(user.email);
    expect(component.diachi).toBe(user.diachi);
    expect(component.status).toBe(user.status);
    expect(component.loaitk).toBe(user.accountType);
  });

  it('should search users by name or username', () => {
    component.user = mockUsers;
    component.search = 'tran';

    component.searchUser();

    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].username).toBe('ttb');
  });

  it('should navigate back to home', () => {
    component.back();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
