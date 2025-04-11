import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NgClass,NgFor,NgIf } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:false
})
export class AppComponent {
  title = 'ab';
  username: string = '';
  loginstatus: boolean = false;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void { 
    this.ngu();
    this.username = this.authService.getUsername()|| ''
  }

  ngu(): boolean {
    if (this.authService.isLoggedIn()) {
      return this.loginstatus=true;
    } else {return this.loginstatus=false;}
  }
  goToreg() {
    this.router.navigate(['/reg']);
  }
  goTolog() {
    this.router.navigate(['/log']);
  }
  menus = [
    { title: 'Trang Chủ', icon: 'fa-solid fa-house', route: '/home' },
    { 
      title: 'Sản Phẩm', icon: 'fa-solid fa-shoe-prints', active: false, 
      submenus: [
        { title: 'Overview', route: '/giay-hieu/overview' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
        { title: 'Stats', route: '/giay-hieu/stats' },
      ] 
    },
    { title: 'Chính sách', icon: 'fa-solid fa-shoe-prints',},
    { title: 'Liên Hệ', icon: 'fa-solid fa-hand', route: '/gang-tay' },
    { title: '  Hạng  ', icon: 'fa-solid fa-toolbox', route: '/phu-kien' },
    { title: 'Voucher', icon: 'fa-solid fa-list', route: '/danh-muc' }
  ];      

  toggleSubmenu(event: Event) {
    const parentLi = (event.currentTarget as HTMLElement);
    const submenu = parentLi.querySelector('.submenu');
    if (submenu) {
      submenu.classList.toggle('hidden');
    }
  }

  navigateTocart() {
    this.router.navigate(['/cart']);
  }
}
