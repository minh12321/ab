import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService, private router: Router) {}

  login(username: string): void {
    this.storageService.setItem('isLoggedIn', 'true');
    this.storageService.setItem('username', username);
  }

  login1(accountId: number, fullName: string, email: string, accountType: string, status: string): void {
    this.storageService.setItem('fullName', fullName);
    this.storageService.setItem('email', email);
    this.storageService.setItem('accountType', accountType);
    this.storageService.setItem('status', status);
  }

  logout(): void {
    this.storageService.clear();
    this.router.navigate(['/log']);
  }

  isLoggedIn(): boolean {
    return this.storageService.getItem('isLoggedIn') === 'true';
  }

  getUsername(): string | null {
    return this.storageService.getItem('username');
  }

  isAdmin(): boolean {
    return this.storageService.getItem('accountType') === 'ADMIN';
  }
}
