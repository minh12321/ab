import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NgClass,NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:false
})
export class AppComponent {
  title = 'ab';

  constructor(private router: Router) {}

  goToreg() {
    this.router.navigate(['/reg']);
  }

  goTolog() {
    this.router.navigate(['/log']);
  }

  menus = [
    { title: 'Trang Chủ', icon: 'fa-solid fa-house', route: '/home' },
    { 
      title: 'Giày hiệu', icon: 'fa-solid fa-shoe-prints', active: false, 
      submenus: [
        { title: 'Overview', route: '/giay-hieu/overview' },
        { title: 'Stats', route: '/giay-hieu/stats' }
      ] 
    },
    { 
      title: 'Giày đinh', icon: 'fa-solid fa-shoe-prints', active: false, 
      submenus: [
        { title: 'Overview', route: '/log' },
        { title: 'Stats', route: '/giay-dinh/stats' }
      ] 
    },
    { title: 'Găng tay', icon: 'fa-solid fa-hand', route: '/gang-tay' },
    { title: 'Phụ kiện', icon: 'fa-solid fa-toolbox', route: '/phu-kien' },
    { title: 'Danh mục', icon: 'fa-solid fa-list', route: '/danh-muc' }
  ];      

  toggleMenu(selectedMenu: any) {
    console.log("Menu clicked:", selectedMenu);
    this.menus.forEach(menu => {
      if (menu !== selectedMenu) {
        menu.active = false;
      }
    });
    selectedMenu.active = !selectedMenu.active;
  }
  navigateTocart() {
    this.router.navigate(['/cart']);
  }
}
