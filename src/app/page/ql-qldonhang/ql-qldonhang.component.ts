import { Component } from '@angular/core';
import { HoaDonService } from '../../../api-sevice/hoa_don.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { HoaDon } from '../../../api-sevice/hoa_don.model';

@Component({
  selector: 'app-ql-qldonhang',
  templateUrl: './ql-qldonhang.component.html',
  styleUrl: './ql-qldonhang.component.css',
  standalone:false
})
export class QlQldonhangComponent {
  hoaDons: any[] = [];
  filteredUsers: HoaDon[] = [];
  search :string='';
  
  searchUser() {
  const keyword = this.search?.toLowerCase().trim() || '';
  this.filteredUsers = this.hoaDons.filter(u =>
    (u.maHoaDon ?? '').toLowerCase().includes(keyword) ||
    (u.maKhachHang ?? '').toLowerCase().includes(keyword)
  );
}


  constructor(private hoaDonService: HoaDonService) {}

  ngOnInit(): void {
    this.loadHoaDons();
  }

  loadHoaDons(): void {
    this.hoaDonService.getAllHoaDon().subscribe(data => {
      this.hoaDons = data;
      this.filteredUsers = data;
    });
  }

  updateTrangThai(hoaDon: any): void {
    this.hoaDonService.updateTrangThai(hoaDon.id, hoaDon.trangThai).subscribe(() => {
      alert('Cập nhật trạng thái thành công!');
    });
    this.loadHoaDons();
  }
  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.hoaDons.map(hd => ({
      'Mã Hóa Đơn': hd.maHoaDon,
      'Tên Hàng': hd.tenHang,
      'Giá': hd.gia,
      'Số Lượng': hd.soLuong,
      'Ngày Mua': hd.ngayMua,
      'Trạng Thái': hd.trangThai
    })));

    const workbook: XLSX.WorkBook = {
      Sheets: { 'Đơn hàng': worksheet },
      SheetNames: ['Đơn hàng']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const data: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream'
    });

    FileSaver.saveAs(data, 'Danh_sach_hoa_don.xlsx');
  }
}
