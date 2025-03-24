import { Component } from '@angular/core';
import { User } from '../../api-sevice/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../../api-sevice/user.service';
import { Router } from '@angular/router';


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

  constructor(private userService: UserService, private router: Router,private http: HttpClient) { }

  public loginstatus: boolean=false;

  onSubmit(){
    this.login();
  }
  
  login() {
    const params = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);
    this.userService.loginUser(params).subscribe({
      next: () => {
        alert('Login successful!');
        !this.loginstatus;
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Login failed: ' );
      }
    });
  }

}
