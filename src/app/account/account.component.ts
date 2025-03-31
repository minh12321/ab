import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../api-sevice/user.service';
import { User } from '../../api-sevice/user.model';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    standalone: false
})
export class AccountComponent {
  
  user:User[]=[];

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.getUser();
    this.getuserby(1);
  }
  public getUser() {
    this.userService.getList().subscribe((data: User[]) => {
      this.user = data;
    }, error => {
      console.error('Error fetching users:', error);
    });
  }
  updateUser() {
    
  }
  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(data=>{
      console.log(data);
      this.getUser;
    });
  }
  back(){
    this.router.navigate(['/']);
  }
  getuserby(id:number){
    this.userService.getUserById(id).subscribe((data:User)=>
    {
      this.getUser;
      console.log(data);
    }
    )
    ;

  }
}
