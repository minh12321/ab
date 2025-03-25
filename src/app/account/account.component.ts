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
  public getUser() {
    this.userService.getList().subscribe({
      next: (data) => {
        if (typeof data === 'object') {
          this.user = data; // JSON hợp lệ
        } else if (typeof data === 'string' && (data as string).startsWith("<!DOCTYPE html>")) {
          console.error("API trả về HTML thay vì JSON", data);
        } else {
          console.error("Dữ liệu không hợp lệ", data);
        }
      },
      error: (err) => console.error("Lỗi API:", err)
    });
  
  // Hàm chuyển đổi HTML thành JSON (giả sử API trả về một trang lỗi)
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
