import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { User } from './user.model';
import { environment } from '../environments/environment';
import { AuthResponse } from '../api-sevice/auth-response.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const dummyUser: User = {
    accountId: 1,
    username: 'testuser',
    password: 'password123',
    fullName: 'Test User',
    status: 'active',
    accountType: 'admin',
    email: 'testuser@example.com',
    timelog: 123456,
    diachi: '123 Test Street',
  };
  const dummyAuthResponse : AuthResponse= {
    jwt: '',
    user:dummyUser,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user successfully', () => {
    const params = new HttpParams()
      .set('username', 'testuser')
      .set('password', 'password123')
      .set('fullName', 'Test User')
      .set('email', 'testuser@example.com');
    service.registerUser(params).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.url}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('should login a user successfully', () => {
    const params = new HttpParams()
      .set('username', 'minh')
      .set('password', '123456');
    service.loginUser(params).subscribe((user) => {
      expect(user).toEqual(dummyAuthResponse);
    });

    const req = httpMock.expectOne(`${environment.url}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('should update a user successfully', () => {
    const params = new HttpParams()
      .set('fullName', 'Updated User')
      .set('status', 'active')
      .set('username', 'testuser')
      .set('accountType', 'admin')
      .set('email', 'updatedemail@example.com')
      .set('diachi', '456 New Street')
      .set('matkhau', 'newpassword123');
    service.updateUser(1, params).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.url}/admin/update/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyUser);
  });

  it('should delete a user successfully', () => {
    service.deleteUser(1).subscribe((response) => {
      expect(response).toBe('User deleted successfully');
    });

    const req = httpMock.expectOne(`${environment.url}/admin/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush('User deleted successfully');
  });

  it('should get user by ID successfully', () => {
    service.getUserById(1).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.url}/admin/update/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should get user by username successfully', () => {
    service.getUserByUsername('testuser').subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.url}/admin/user/testuser`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should get a list of users successfully', () => {
    const users: User[] = [dummyUser, { ...dummyUser, username: 'anotheruser' }];
    service.getList().subscribe((userList) => {
      expect(userList.length).toBe(2);
      expect(userList).toEqual(users);
    });

    const req = httpMock.expectOne(`${environment.url}/list`);
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });
});
