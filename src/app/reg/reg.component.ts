import { Component } from '@angular/core';
import { UserService } from '../../api-sevice/user.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css',
  standalone:false
})
export class RegComponent {
  username: string = '';
  password: string = '';
  fullName: string = '';
  email :string='';

  constructor(private userService: UserService, private router: Router) { }

  register() {
    const params = new HttpParams()
          .set('username', this.username)
          .set('password', this.password)
          .set('fullName',this.fullName)
          .set('email',this.email);
    this.userService.registerUser(params).subscribe({
      next: () => {
        alert('register complete');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('register failed: ' + err.message);
      }
    })      

  }
  
}
