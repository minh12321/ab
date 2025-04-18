import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    standalone: false
})
export class MenuComponent {
  
  constructor(private router: Router,private authService :AuthService) { }
    menuOpen = false;
  
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  
    closeMenu() {
      this.menuOpen = false;
    }
    navigateToadinadin() {
        if (sessionStorage.getItem('accountType') === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            alert('lol');
          }
    }
    navigateTohomehome() {
      this.router.navigate(['/home']);
    }
    navigateTocart() {
      this.router.navigate(['/cart']);
    }
    navigateTopo() {
      this.router.navigate(['/prodexe']);
    }
    goToGuide() {
      this.menuOpen = false; // đóng menu sau khi click
      this.router.navigate(['/huong-dan']); // điều hướng đến trang hướng dẫn mua hàng
    }
    logout(){
      this.router.navigate(['/home']);
      this.authService.logout();
      window.location.reload();
    }
  
}
