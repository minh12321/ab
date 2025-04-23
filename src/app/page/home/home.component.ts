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
      'assets\anh\bong1.png',
      'assets\anh\bong2.png',
      'assets\anh\bong3.png',
    ];
  
    slideConfig = {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      arrows: false
    };
  }

