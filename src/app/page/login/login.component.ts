import { Component } from '@angular/core';
import { User } from '../../../api-sevice/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../../../api-sevice/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone:false
})
export class LoginComponent {
  user:User = new User();
  username: string="";
  password: string="";
  token: string="";
// login.component.ts
showPassword: boolean = false;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}

  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private router: Router,
    private http: HttpClient,    
    // private socketService: SocketService,
    ) { }
  onSubmit(){
    this.login();
    setTimeout(() => {
      window.location.reload();
    }, 10000);
    console.log('Response:');
    
  }
  
  login() {
    const params = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);
    this.userService.loginUser(params).subscribe({
      next: (res) => {
        this.authService.setToken(res.jwt);
        this.authService.login(this.username);
        this.authService.login1(res.user.accountId,res.user.fullName,res.user.email,res.user.accountType,res.user.status,res.user.diachi);
        this.router.navigate(['/']);
        alert('Login successful!');
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
        alert('Login failed: ' + errorMessage);
      }
    });
    
  }
  // getuserby(name:string){
  //   this.userService.getUserByUsername(name).subscribe({
  //     next: (data) => {
  //       this.user = data;
  //       console.log('User:', this.user);
  //       this.authService.login1(data.accountId,data.fullName,data.email,data.accountType,data.status);
  //       this.router.navigate(['/']);
  //       alert('Login successful!');
  //     },
  //     error: (err) => {
  //       console.error('Không tìm thấy người dùng:', err);
  //     }
  //   });
  // }

}
