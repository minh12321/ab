import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    standalone: false
})
export class AdminComponent {
  tab: string = 'account';

  constructor(private router: Router) { }
  
    navigateToaccount() {
      this.router.navigate(['/account']);
    }

    navigateToproduce() {
      this.router.navigate(['/suasanpham']);
    }
}
