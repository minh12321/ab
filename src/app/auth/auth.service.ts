import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private productId: string | null = null;

  constructor(private storageService: StorageService, private router: Router) {}

  login(username: string): void {
    this.storageService.setItem('isLoggedIn', 'true');
    this.storageService.setItem('username', username);
    setTimeout(() => {
      window.location.reload();
    }, 100);
    
  }

  login1(accountId: number, fullName: string, email: string, accountType: string, status: string,diachi:string): void {
    this.storageService.setItem('id', accountId.toString());
    this.storageService.setItem('fullName', fullName);
    this.storageService.setItem('email', email);
    this.storageService.setItem('accountType', accountType);
    this.storageService.setItem('status', status);
    this.storageService.setItem('diachi', diachi);
  }

  luuhang( fullName: string, tenhang: string,): void {
    this.storageService.setItem('Name', fullName);
    this.storageService.setItem('tenhang', tenhang);
  }
  layhang1(): string | null {
    return this.storageService.getItem('Name');
  }
  layhang2(): string | null {
    return this.storageService.getItem('tenhang');
  }

  getfullname(): string | null {
    return this.storageService.getItem('fullName');
  }
  getemail(): string | null {
    return this.storageService.getItem('email');
  }
  getaccount(): string | null {
    return this.storageService.getItem('accountType');
  }
  getdiachi(): string | null {
    return this.storageService.getItem('diachi');
  }
  getstatus(): string | null {
    return this.storageService.getItem('status');
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

  getid(): number  {
    const id = this.storageService.getItem('id');

  const idNumber = Number(id);

  return isNaN(idNumber) ? 0 : idNumber;
  }

  isAdmin(): boolean {
    return this.storageService.getItem('accountType') === 'ADMIN';
  }
  //--------------------------------
  setProductId(id: string) {
    this.productId = id;
  }
  getProductId(): string | null {
    return this.productId;
  }
  resetProductId() {
    this.productId = null;
  }
  getToken(): string | null {
    return this.storageService.getItem('token');
  }
  setToken(token :string): void {
    this.storageService.setItem('token',token);
  }
}
