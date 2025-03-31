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
  username: string = '';
  fullName: string = '';
  city: string = '';
  address: string = '';
  phone: string = '';

  // Biến kiểm tra lỗi
  isInvalidUsername: boolean = false;
  isInvalidFullName: boolean = false;
  isInvalidCity: boolean = false;
  isInvalidAddress: boolean = false;
  isInvalidPhone: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  validateForm(): boolean {
    this.isInvalidUsername = this.username.trim() === '';
    this.isInvalidFullName = this.fullName.trim() === '';
    this.isInvalidCity = this.city.trim() === '';
    this.isInvalidAddress = this.address.trim() === '';
    this.isInvalidPhone = this.phone.trim() === '';

    return !(this.isInvalidUsername || this.isInvalidFullName || this.isInvalidCity || this.isInvalidAddress || this.isInvalidPhone);
  }

  register(): void {
    if (!this.validateForm()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const params: HttpParams = new HttpParams()
      .set('username', this.username)
      .set('fullName', this.fullName)
      .set('city', this.city)
      .set('address', this.address)
      .set('phone', this.phone);

    this.userService.registerUser(params).subscribe({
      next: () => {
        alert('Đăng ký thành công');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        alert('Đăng ký thất bại: ' + err.message);
      }
    });
  }
}
