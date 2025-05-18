import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { KhachHangService } from '../../../api-sevice/khach_hang.service';
import { HoaDonService } from '../../../api-sevice/hoa_don.service';
import { AuthService } from '../../auth/auth.service';
import { KhachHang } from '../../../api-sevice/khach_hang.model';
import { User } from '../../../api-sevice/user.model';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../../../api-sevice/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ca-nhan',
  standalone: false,
  templateUrl: './ca-nhan.component.html',
  styleUrl: './ca-nhan.component.css'
})
export class CaNhanComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private khachHangService: KhachHangService,
    private hoaDonService: HoaDonService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  rankLevels: string[] = ['Vô Hạng', 'Đồng', 'Bạc', 'Vàng', 'Kim cương'];
  currentRank: string = '';
  progressPercent: number = 0;
  isVip: boolean = true;
  canBoost: boolean = true;
  selectedRewardRank: string = '';
  showRewardModal: boolean = false;
  user = {
      avatarUrl: 'https://loremflickr.com/100/100/animal',
      name: ' ',
      email: 'a@gmail.com',
      phone: '0909123456',
      address: '123 Lê Lợi, Q1, HCM',
      birthDate: '2004-00-00',
      rank: this.currentRank,
      spent: 0,
      requiredToNext: 2000000,
      nextRank: 'Kim Cương'
    };
  loadplayer(): void {
    const id = this.authService.getid();
  
    this.khachHangService.getById(id).subscribe({
      next: (d: KhachHang) => {
        this.currentRank = d.thuHang || '';
        this.progressPercent = Math.min((d.chiTieu / 10000000) * 100, 100);

        this.user.rank = this.currentRank;
        this.user.spent = d.chiTieu;
        this.user.requiredToNext = Math.max(10000000 - d.chiTieu, 0);
      },
      error: (err) => {
        if (err.status === 403) {
          const newKhachHang: KhachHang = {      
            maKhachHang: id.toString(),
            tenKhachHang: this.authService.getfullname()?? 'Người dùng',
            chiTieu: 0,
            thuHang: 'Vô Hạng', 
            lanCapNhat:'',
          };
  
          this.khachHangService.create(newKhachHang).subscribe({
            next: (created) => {
              this.currentRank = created.thuHang || '';
              this.progressPercent = 0;
            },
            error: (createErr) => {
              console.error('Tạo mới Khách Hàng thất bại:', createErr);
            }
          });
        } else {
          console.error('Lỗi khác khi tải Khách Hàng:', err);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadplayer();
    this.user.name = this.authService.getfullname() ?? 'Người dùng';
    this.user.email =this.authService.getemail()?? 'email';
    this.user.address =this.authService.getdiachi() ?? 'diachi';
    this.fillForm();
  }


  activeTab = 'orders';
  showTooltip = false;
  
  id :number=0;
  status :string='';
  username: string = '';
  password: string = '';
  diachi: string = '';
  fullName: string = '';
  email :string='';
  loaitk :string='';
  search :string='';
  
  selectedAccount = { id: 0,fullName: '', username: '', email: '', role: 'user' };
  customus(id: number) {
    const params = new HttpParams()
      .set('fullName', this.fullName)
      .set('status', this.status)
      .set('username', this.username)
      .set('accountType', this.loaitk)
      .set('email', this.email)
      .set('diachi', this.diachi)
      .set('matkhau', this.password); 

    this.userService.updateUser(this.id, params).subscribe({
      next: () => {
        alert('Cập nhật thành công!');
      },
      error: (err) => {
        alert('Cập nhật thất bại: ' + err.message);
      }
    });
  }

  fillForm() {
    this.id = this.authService.getid();
    this.fullName = this.authService.getfullname() ?? 'Người dùng';
    this.username = this.authService.getUsername() ?? 'username';
    this.email = this.authService.getemail()?? 'email';
    this.diachi = this.authService.getdiachi() ?? 'diachi';
    this.status = this.authService.getstatus()?? 'trạng thái';
    this.loaitk = this.authService.getaccount() ?? 'loaitk';
  }

  //đổi mật khẩu 
  isEditable: boolean = false;

  username1: string="";
  password1: string="";

  login() {
    const params = new HttpParams()
      .set('username', this.username1)
      .set('password', this.password1);
    this.userService.loginUser(params).subscribe({
      next: (res) => {
        this.isEditable = true;
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
        alert('Sai tài khoản hoặc mật khẩu <bản chỉ có 5 lần thử >: ' + errorMessage);
      }
    });
  }

}
