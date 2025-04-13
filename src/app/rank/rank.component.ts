import { Component, Inject,PLATFORM_ID } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { HoaDonService } from '../../api-sevice/hoa_don.service';
import { HoaDon } from '../../api-sevice/hoa_don.model';
import { AuthService } from '../auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ViewChild } from '@angular/core';
import { KhachHangService } from '../../api-sevice/khach_hang.service';
import { KhachHang } from '../../api-sevice/khach_hang.model';

@Component({
  selector: 'app-rank',
  standalone: false,
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.css'
})
export class RankComponent {

  // @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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
  constructor(private khachHangService: KhachHangService,private hoaDonService: HoaDonService,private authService: AuthService,@Inject(PLATFORM_ID) private platformId: Object) {this.isBrowser = isPlatformBrowser(this.platformId);}

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
//---------------------------------------------------------------------------------------------------------------------
  rankLevels: string[] = ['Vô Hạng', 'Đồng', 'Bạc', 'Vàng', 'Kim Cương'];
  currentRank: string = 'Bạc';
  progressPercent: number = 63;
  isVip: boolean = true;
  canBoost: boolean = true;
  selectedRewardRank: string = '';
  showRewardModal: boolean = false;



  rewardsByRank: { [rank: string]: string } = {
    'Vô Hạng': 'Ưu đãi đặc biệt cho người mới.',
    'Đồng': '5% giảm giá cho đơn hàng.',
    'Bạc': '10% giảm giá + quà sinh nhật.',
    'Vàng': '15% giảm giá, miễn phí vận chuyển.',
    'Kim Cương': '20% giảm giá, đặc quyền VIP.'
  };

  missions = [
    { title: 'Mua hàng trên 1 triệu', description: 'Chi tiêu > 1.000.000đ', progress: 60 },
    { title: 'Đăng nhập mỗi ngày', description: '7 ngày liên tiếp', progress: 100 },
    { title: 'Chia sẻ app', description: 'Chia sẻ cho 3 người', progress: 30 }
  ];

  loadplayer():void{
    this.khachHangService.getById(this.authService.getid()).subscribe((d: KhachHang)=>
    {
      this.currentRank = d.hangKhachHang || '';
      this.progressPercent = Math.min((d.chiTieu / 10000000) * 100, 100);;
    })
  }

  // Bảng xếp hạng
  allRanks: {
    maKhachHang: string;
    tenKhachHang: string;
    chiTieu: number;
    hangKhachHang: string;
    position: number;
  }[] = [];

  leaderboard: typeof this.allRanks = [];

  loadLeaderboard(): void {
    this.khachHangService.getAll().subscribe((ds: KhachHang[]) => {
      const sorted = ds
        .map((kh) => ({
          maKhachHang: kh.maKhachHang,
          tenKhachHang: kh.tenKhachHang,
          chiTieu: kh.chiTieu,
          hangKhachHang: kh.hangKhachHang || '',
        }))
        .sort((a, b) => b.chiTieu - a.chiTieu)
        .map((kh, index) => ({
          ...kh,
          position: index + 1,
        }));

      this.allRanks = sorted;
      this.leaderboard = sorted.slice(0, 10);
      console.log(this.leaderboard)
    });
  }

  findMyRank(maKhachHang: string): number | undefined {
    return this.allRanks.find(kh => kh.maKhachHang === maKhachHang)?.position;
  }

  //________________________________________---------------------
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

  // -----------------------------------------------------------

  ngOnInit(): void {
    this.loadLeaderboard();
    this.hoaDonService.getHoaDonByMaKH(this.authService.getid()).subscribe((hoaDons: HoaDon[]) => {
      this.hoaDonList = hoaDons;
      this.tinhChiTieuTheoThang();
      this.lineChartData.datasets[0].data = [
        this.thang1, this.thang2, this.thang3, this.thang4,
        this.thang5, this.thang6, this.thang7, this.thang8,
        this.thang9, this.thang10, this.thang11, this.thang12
      ]; 
      // this.chart?.update();
    });
    if(this.authService.isLoggedIn()==true){
      this.loadplayer();
      
    }
    
  }

  openReward(rank: string): void {
    this.selectedRewardRank = rank;
    this.showRewardModal = true;
  }

  closeModal(): void {
    this.showRewardModal = false;
  }

  boost(): void {
    if (this.canBoost) {
      alert('🚀 Boost thành công! Bạn đang được tăng hạng.');
    }
  }

  isReached(index: number): boolean {
    return this.rankLevels.indexOf(this.currentRank) >= index;
  }

}
