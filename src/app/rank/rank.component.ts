import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-rank',
  standalone: false,
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.css'
})
export class RankComponent {

  rankLevels: string[] = ['Vô Hạng', 'Đồng', 'Bạc', 'Vàng', 'Kim Cương'];
  currentRank: string = 'Bạc';
  progressPercent: number = 63;
  isVip: boolean = true;
  canBoost: boolean = true;
  selectedRewardRank: string = '';
  showRewardModal: boolean = false;

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

  // Bảng xếp hạng
  leaderboard = [
    { name: 'Nguyễn Văn A', total: 2100000, rank: 'Kim Cương' },
    { name: 'Trần Thị B', total: 1450000, rank: 'Vàng' },
    { name: 'Lê Văn C', total: 970000, rank: 'Bạc' },
    { name: 'Phạm D', total: 550000, rank: 'Đồng' }
  ];

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
        data: [  this.thang1, this.thang2, this.thang3, this.thang4, this.thang5, this.thang6,this.thang7,this.thang8,this.thang9,this.thang10,this.thang11,this.thang12 ],
        label: 'Mức chi têu',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(219, 223, 81, 0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  // -----------------------------------------------------------

  ngOnInit(): void {
    
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
