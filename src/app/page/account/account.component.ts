import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../api-sevice/user.service';
import { User } from '../../../api-sevice/user.model';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    standalone: false
})
export class AccountComponent {
  
  user:User[]=[];
  filteredUsers: User[] = [];

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.getUser();
  }
  public getUser() {
    this.userService.getList().subscribe((data: User[]) => {
      this.user = data;
      this.filteredUsers = data;
    }, error => {
      console.error('Error fetching users:', error);
    });
  }
  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(data=>{
      console.log(data);
      this.getUser();
    });
  }
  back(){
    this.router.navigate(['/']);
  }

  id :number=0;
  status :string='';
  username: string = '';
  password: string = '';
  diachi: string = '';
  fullName: string = '';
  email :string='';
  loaitk :string='';

  search :string='';
  ;

  selectedAccount = { id: 0,fullName: '', username: '', email: '', role: 'user' };
  customus(id: number) {
    const params = new HttpParams()
      .set('fullName', this.fullName)
      .set('status', this.status)
      .set('username', this.username)
      .set('accountType', this.loaitk)
      .set('email', this.email)
      .set('diachi', this.diachi)
      .set('matkhau', this.password); // chú ý: trùng với tên @RequestParam
  
    this.userService.updateUser(this.id, params).subscribe({
      next: () => {
        alert('Cập nhật thành công!');
        this.getUser();
      },
      error: (err) => {
        alert('Cập nhật thất bại: ' + err.message);
      }
    });
  }

  fillForm(u: User) {
    this.id = u.accountId;
    this.fullName = u.fullName;
    this.username = u.username;
    this.email = u.email;
    this.diachi = u.diachi;
    this.status = u.status;
    this.loaitk = u.accountType;
  }
  searchUser() {
    const keyword = this.search.toLowerCase().trim();
    this.filteredUsers = this.user.filter(u =>
      u.fullName.toLowerCase().includes(keyword) ||
      u.username.toLowerCase().includes(keyword)
    );
  }

}
