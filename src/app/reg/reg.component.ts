import { Component } from '@angular/core';
import { UserService } from '../../api-sevice/user.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css'],
  standalone: false
})
export class RegComponent {

  ho :string='';
  ten :string='';
  username: string = '';
  password: string = '';
  fullName: string = '';
  email :string='';

  constructor(private userService: UserService, private router: Router) { }
  
  isInvalidUsername: boolean = false;
  isInvalidFullName: boolean = false;
  isInvalidPassword: boolean = false;
  isInvalidEmail: boolean = false;

  validateForm(): boolean {
    this.isInvalidUsername = this.username.trim() === '';
    this.isInvalidFullName = this.fullName.trim() === '';
    this.isInvalidPassword = this.password.trim() === '';
    this.isInvalidEmail = this.email.trim() === '' ;

    return !(this.isInvalidUsername || this.isInvalidFullName ||this.isInvalidPassword ||this.isInvalidEmail );
  }

  // -----------------------------------------------

  taoUser(): string {
    const user = this.ho + ' ' + this.ten;
    return user;
  }


  register() {
    if (!this.validateForm()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    this.username = this.taoUser();
    const params = new HttpParams()
          .set('username', this.username)
          .set('password', this.password)
          .set('fullName',this.fullName)
          .set('email',this.email);
    this.userService.registerUser(params).subscribe({
      next: () => {
        alert('Đăng ký thành công ,ok để tiếp tục');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Đăng ký thất vọng: ' + err.message);
      }
    })      

  }
}

