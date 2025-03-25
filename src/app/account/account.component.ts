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
          // Nếu API trả về JSON hợp lệ, gán vào user
          this.user = data;
        } else {
          // Nếu API trả về HTML, chuyển đổi thành JSON
          this.user = this.convertHtmlToJson(data);
        }
      },
      error: (err) => {
        console.error('Lỗi API:', err);
      }
    });
  }
  
  // Hàm chuyển đổi HTML thành JSON (giả sử API trả về một trang lỗi)
  convertHtmlToJson(htmlString: string): any {
    try {
      // Tạo một DOM ảo để phân tích HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
  
      // Tìm phần thân của trang HTML và lấy nội dung chính
      const bodyText = doc.body.textContent?.trim() || "Không thể đọc dữ liệu";
      
      // Chuyển thành JSON tạm thời
      return { error: "API trả về HTML", content: bodyText };
    } catch (error) {
      console.error("Lỗi khi phân tích HTML:", error);
      return { error: "Không thể phân tích HTML" };
    }
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
