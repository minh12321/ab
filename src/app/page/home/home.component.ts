import { Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
    'assets/anh/ronaldo7.jpg',
    'assets/anh/slide-24-extra.jpg',
    'assets/anh/anhbong.jpg',
    
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
  whyBookReasons = [
    { icon: 'assets/icon1.png', title: 'Giá tốt', description: 'Giá rẻ mỗi ngày.' },
    { icon: 'assets/icon2.png', title: 'Dễ dàng', description: 'Đặt đơn hàng đơn giản, nhanh chóng.' },
    { icon: 'assets/icon3.png', title: 'Hỗ trợ 24/7', description: 'Luôn sẵn sàng giúp bạn.' },
    { icon: 'assets/icon6.png', title: 'Khuyến mãi đặc biệt', description: 'Các chương trình ưu đãi luôn được cập nhật' }
  ];
  ngAfterViewInit() {
    this.startCounterAnimation();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.startCounterAnimation();
  }
@ViewChild('statsSection') statsSection!: ElementRef;


 startCounterAnimation() {
  const statsSection = document.querySelector('.stats-counter-section');
  if (!statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top >= 0 && rect.top <= window.innerHeight) {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach((number) => {
      const parent = number.parentElement;
      if (!parent) return;

      const targetAttr = parent.getAttribute('data-target');
      const valueAttr = number.getAttribute('data-value');

      if (targetAttr !== null && valueAttr !== null) {
        const target = +targetAttr;
        let start = +valueAttr;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));

        const counter = setInterval(() => {
          start += 1;
          number.textContent = Math.min(start, target).toLocaleString();
          number.setAttribute('data-value', start.toString());
          if (start >= target) clearInterval(counter);
        }, stepTime);
      }
    });

    // Remove scroll listener after animation starts to prevent multiple triggers
    this.onScroll = () => {};
  }
}
}

