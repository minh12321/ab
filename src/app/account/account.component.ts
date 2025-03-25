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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUser();
  }
  public getUser(){
    this.userService.getList().subscribe(data=>{
      this.user=data;
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
}
