import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tool',
  standalone: false,
  templateUrl: './tool.component.html',
  styleUrl: './tool.component.css'
})
export class ToolComponent {
    constructor(private router: Router,private authService :AuthService) {}
      username = 'admin';

      navigateTo(path: string) {
    this.router.navigate(['/admin', path]);
  }

  logout() {
      this.router.navigate(['/home']);
      setTimeout(() => {
      }, 100);
      this.authService.logout();
      window.location.reload();
  }
  navigateToadinadin() {
        if (sessionStorage.getItem('accountType') === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            alert('lol');
          }
          setTimeout(() => {
          }, 100);
  }
  navigateTohomehome() {
    this.router.navigate(['/home']);
  }

  navigatethongke() {
      this.router.navigate(['/admin/thongke']);
    }

    navigateToaccount() {
      this.router.navigate(['/admin/account']);
    }

    navigateToproduce() {
      this.router.navigate(['/admin/t-s-p']);
    }

    navigateTofixsp() {
      this.router.navigate(['/admin/suasanpham']);
    }

    navigateTodonhang() {
      this.router.navigate(['/admin/donhang']);
    }

    navigateToship() {
      this.router.navigate(['/admin/ship']);
    }
}
