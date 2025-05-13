import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent {
  

  constructor(private router: Router) { }

  navigateToRegister() {
    this.router.navigate(['/reg']);
  }

  navigateToLogin() {
    this.router.navigate(['/log']);
  }


  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  
  navigateToAccount() {
    this.router.navigate(['/account']);
  }
 
  imageList = [
    'assets/anh/download.jpg',
    'assets/anh/slide-20-extra.jpg',
    'assets/anh/slide-24-extra(1)(1).png',
    
  ];
  
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false
  };
  infoList = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/5956/5956476.png',
      title: 'KHÔNG SỢ HẾT SIZE',
      description: 'Do chẳng cần đợi nhân viên chốt đơn'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/1548/1548682.png',
      title: 'GIAO HÀNG TOÀN QUỐC',
      description: 'Gửi hàng đi luôn trong ngày'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/4290/4290854.png',
      title: 'THANH TOÁN LINH HOẠT',
      description: 'Tiền mặt/CK/ví điện tử/thẻ'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/4221/4221442.png',
      title: 'ĐỔI SIZE THOẢI MÁI',
      description: 'Đến khi anh em hài lòng'
    }
  ];
  }

