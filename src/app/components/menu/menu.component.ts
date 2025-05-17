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
          setTimeout(() => {
            this.toggleMenu();
          }, 100);
    }
    navigateTocanhan(){
      this.router.navigate(['/canhan']);
      setTimeout(() => {
        this.toggleMenu();
      }, 10);
    }
    navigateTohomehome() {
      this.router.navigate(['/home']);
      setTimeout(() => {
        this.toggleMenu();
      }, 10);
      
    }
    navigateTocart() {
      this.router.navigate(['/cart']);
      setTimeout(() => {
        this.toggleMenu();
      }, 100);
      
    }
    navigateTopo() {
      this.router.navigate(['/san-pham']);
      setTimeout(() => {
        this.toggleMenu();
      }, 100);
      
    }
    goToGuide() {
      this.menuOpen = false; 
      this.router.navigate(['/huong-dan']);
      setTimeout(() => {
        this.toggleMenu();
      }, 100);
    }
    logout(){
      this.router.navigate(['/home']);
      setTimeout(() => {
        this.toggleMenu();
      }, 100);
      this.authService.logout();
      window.location.reload();
    }
  
}
