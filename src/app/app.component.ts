import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { NgClass,NgFor,NgIf } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { SocketService } from '../api-sevice/socket/socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:false
})
export class AppComponent {
  title = 'ab';
  username: string = '';
  loginstatus: boolean = false;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router,
    private socketService: SocketService,
    private toastr: ToastrService
    ) 
      {
      this.isBrowser = isPlatformBrowser(this.platformId);

      if (this.isBrowser) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        this.recognition.lang = 'vi-VN';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          this.ngZone.run(() => {
            this.text = transcript;
          });
        };

        this.recognition.onerror = (event: any) => {
          console.error('Lỗi nhận giọng nói:', event.error);
        };
        }

        this.router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.isLoading = true;  // Bật spinner khi bắt đầu điều hướng
          }

          if (event instanceof NavigationEnd || event instanceof NavigationError) {
            this.isLoading = false; // Tắt spinner khi điều hướng hoàn thành hoặc có lỗi
          }
        });
    //ẩn hiện
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            // Ẩn layout nếu URL chứa '/admin'
            this.showLayout = !event.urlAfterRedirects.includes('/admin');
          }
        });


      }

  ngOnInit(): void { 
    this.ngu();
    this.username = this.authService.getUsername()|| '';
    this.isDesktop = window.innerWidth >= 700;
    this.toolcheck();
  }

  ngu(): boolean {
    if (this.authService.isLoggedIn()) {
      return this.loginstatus=true;
    } else {return this.loginstatus=false;}
  }
  goToreg() {
    this.router.navigate(['/reg']);
  }
  goTolog() {
    this.router.navigate(['/log']);
  }
  menus = [
    { title: 'Trang Chủ', icon: 'fa-solid fa-house', route: '/home' },
    { 
      title: 'Sản Phẩm', icon: 'fa-solid fa-shoe-prints', active: false, route: '/san-pham', 
      submenus: [
        { title: 'Nike', route: '/san-pham?hang=Nike' },
        { title: 'Adidas', route: '/san-pham?hang=Adidas' },
        { title: 'Beck', route: '/san-pham?hang=Beck' },
        { title: 'Kamito', route: '/san-pham?hang=Kamito' },
        { title: 'Puma', route: '/san-pham?hang=Puma' },
        { title: 'Giầy đinh', route: '/san-pham?kieuGiay=Giầy đinh' },
        { title: 'Giầy lười', route: '/san-pham?kieuGiay=Giầy lười' },
        { title: 'Giầy cổ cao', route: '/san-pham?kieuGiay=Giầy cổ cao' },
        { title: 'Gang tay', route: '/san-pham?loaihang=Gang tay' },
        { title: 'Bóng', route: '/san-pham?loaihang=Bóng' },
        { title: 'Balo', route: '/san-pham?loaihang=Balo' },
        { title: 'Quần', route: '/san-pham?loaihang=Quần' },
        { title: 'Áo', route: '/san-pham?loaihang=Áo' },
        { title: 'Tất', route: '/san-pham?loaihang=Tất' },
        { title: 'Băng Keo', route: '/san-pham?loaihang=Băng Keo' },
        { title: 'Bình xịt', route: '/san-pham?loaihang=Bình xịt' },
        { title: 'Dây giày', route: '/san-pham?loaihang=Dây giày' },
        { title: 'khác', route: '/giay-hieu/stats' },
        { title: 'khác', route: '/giay-hieu/stats' },
        { title: 'khác', route: '/giay-hieu/stats' },
        { title: 'khác', route: '/giay-hieu/stats' },
      ] 
    },
    { title: 'Chính sách', icon: 'fa-solid fa-shoe-prints', route: '/chinhsach'},
    { title: 'Liên Hệ', icon: 'fa-solid fa-hand', route: '/lienhe' },
    { title: '  Hạng  ', icon: 'fa-solid fa-toolbox', route: '/rank' },
  ];      

  toggleSubmenu(event: Event) {
    const parentLi = (event.currentTarget as HTMLElement);
    const submenu = parentLi.querySelector('.submenu');
    if (submenu) {
      submenu.classList.toggle('hidden');
    }
  }

  navigateTocart() {
    this.router.navigate(['/cart']);
  }

  // ---------------------------------------------------------------------------------------
  text = '';
  recognition: any;
  isBrowser: boolean;

  startListening() {
    this.recognition.start();
  }
  //--------------------------------------------------
  isLoading = false;

  isDesktop = false;
  //ẩn hiện
  showLayout = true;
  showTool = false;

  toolcheck(){
    if (sessionStorage.getItem('accountType') === 'ADMIN') {
        this.showTool = true;
      } else {
        this.showTool = false;
      }
  }

  //
  testToast() {
    this.toastr.success('🔥 Đang hoạt động!', 'Thông báo');
  }
 
    
  
  
}
