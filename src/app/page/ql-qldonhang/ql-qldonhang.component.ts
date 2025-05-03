import { Component } from '@angular/core';
import { HoaDonService } from '../../../api-sevice/hoa_don.service';

@Component({
  selector: 'app-ql-qldonhang',
  templateUrl: './ql-qldonhang.component.html',
  styleUrl: './ql-qldonhang.component.css',
  standalone:false
})
export class QlQldonhangComponent {
  hoaDons: any[] = [];

  constructor(private hoaDonService: HoaDonService) {}

  ngOnInit(): void {
    this.loadHoaDons();
  }

  loadHoaDons(): void {
    this.hoaDonService.getAllHoaDon().subscribe(data => {
      this.hoaDons = data;
    });
  }

  updateTrangThai(hoaDon: any): void {
    this.hoaDonService.updateTrangThai(hoaDon.id, hoaDon.trangThai).subscribe(() => {
      alert('Cập nhật trạng thái thành công!');
    });
    this.loadHoaDons();
  }

}
