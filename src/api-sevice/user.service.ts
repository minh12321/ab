import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import {environment} from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.url;

  

  constructor(private http: HttpClient) { }
  
  

  registerUser(params: HttpParams): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, {},{params});
  }

  loginUser(params: HttpParams): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, {},{params});
  }

  updateUser(accountId: number, fullName: string, status: string, accountType: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/admin/update/${accountId}`, { fullName, status, accountType });
  }

  deleteUser(accountId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/delete/${accountId}`);
  }

  getUserById(accountId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/admin/update/${accountId}`);
  }
  getList():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/list`);
  }
  
}
