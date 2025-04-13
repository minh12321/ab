import { Router } from '@angular/router';
import { Component, Inject,PLATFORM_ID } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { HoaDonService } from '../../api-sevice/hoa_don.service';
import { HoaDon } from '../../api-sevice/hoa_don.model';
import { AuthService } from '../auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ViewChild } from '@angular/core';
import { KhachHangService } from '../../api-sevice/khach_hang.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    standalone: false
})
export class AdminComponent {
  tab: string = 'account';

  
    navigateToaccount() {
      this.router.navigate(['/account']);
    }

    navigateToproduce() {
      this.router.navigate(['/t-s-p']);
    }

    ngOnInit(): void {
      this.hoaDonService.getAllHoaDon().subscribe((hoaDons: HoaDon[]) => {
        this.hoaDonList = hoaDons;
        this.tinhChiTieuTheoThang();
        this.lineChartData.datasets[0].data = [
          this.thang1, this.thang2, this.thang3, this.thang4,
          this.thang5, this.thang6, this.thang7, this.thang8,
          this.thang9, this.thang10, this.thang11, this.thang12
        ]; 
        this.chart?.update();
        this.tong = this.thang1+ this.thang2+ this.thang3+ this.thang4+this.thang5+ this.thang6+ this.thang7+ this.thang8+this.thang9+ this.thang10+ this.thang11+ this.thang12;
      });
    }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
    isBrowser: boolean;
    hoaDonList: HoaDon[] = [];    
    thang1 :number =0;
    thang2 :number =0;
    thang3 :number =0;
    thang4 :number =0;
    thang5 :number =0;
    thang6 :number =0;
    thang7 :number =0;
    thang8 :number =0;
    thang9 :number =0;
    thang10 :number =0;
    thang11 :number =0;
    thang12 :number =0;
    tong :number =0;
    constructor(private router: Router,private khachHangService: KhachHangService,private hoaDonService: HoaDonService,private authService: AuthService,@Inject(PLATFORM_ID) private platformId: Object) {this.isBrowser = isPlatformBrowser(this.platformId);}
  
    tinhChiTieuTheoThang() {
      this.thang1 = this.thang2 = this.thang3 = this.thang4 = this.thang5 = 
      this.thang6 = this.thang7 = this.thang8 = this.thang9 = this.thang10 = 
      this.thang11 = this.thang12 = 0;
    
      this.hoaDonList.forEach(hd => {
        const ngayMua = new Date(hd.ngayMua);
        const thang = ngayMua.getMonth() + 1;  
        const tongTien = hd.gia * hd.soLuong;
    
        switch (thang) {
          case 1:
            this.thang1 += tongTien;
            break;
          case 2:
            this.thang2 += tongTien;
            break;
          case 3:
            this.thang3 += tongTien;
            break;
          case 4:
            this.thang4 += tongTien;
            break;
          case 5:
            this.thang5 += tongTien;
            break;
          case 6:
            this.thang6 += tongTien;
            break;
          case 7:
            this.thang7 += tongTien;
            break;
          case 8:
            this.thang8 += tongTien;
            break;
          case 9:
            this.thang9 += tongTien;
            break;
          case 10:
            this.thang10 += tongTien;
            break;
          case 11:
            this.thang11 += tongTien;
            break;
          case 12:
            this.thang12 += tongTien;
            break;
        }
      });
    }  

    public lineChartData: ChartConfiguration<'line'>['data'] = {
      labels: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      datasets: [
        {
          data: [],
          label: 'Mức chi têu',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(219, 223, 81, 0.3)'
        }
      ]
    };
    public lineChartOptions: ChartOptions<'line'> = {
      responsive: true
    };
    public lineChartLegend = true;
  
}
