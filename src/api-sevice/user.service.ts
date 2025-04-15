import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import {environment} from '../environments/environment'
import { EventEmitterAsyncResource } from 'node:stream';


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

  // updateUser(accountId : number,params: HttpParams): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/admin/update/${accountId}`, { params });
  // }

  updateUser(accountId: number, params: HttpParams): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/admin/update/${accountId}`,
      params.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
  }

  deleteUser(accountId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/delete/${accountId}`);
  }

  getUserById(accountId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/admin/update/${accountId}`);
  }

  getUserByUsername(accountname: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/admin/user/${accountname}`);
  }


  getList():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/list`);
  }
  
}
