import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contact'; // API Spring Boot hoặc Node.js

  constructor(private http: HttpClient) {}

  sendMessage(formData: any) {
    return this.http.post(this.apiUrl, formData);
  }
}
