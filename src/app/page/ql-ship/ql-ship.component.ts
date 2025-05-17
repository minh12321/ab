import { Component } from '@angular/core';
import { Order } from '../../../api-sevice/order.model';
import { OrderService } from '../../../api-sevice/order.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-ql-ship',
  standalone:false,
  templateUrl: './ql-ship.component.html',
  styleUrl: './ql-ship.component.css'
})
export class QlShipComponent {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
    });
  }

  updateStatus(order: Order): void {
    if (order.id != null) {
      this.orderService.updateOrder(order.id, order).subscribe(() => {
        alert('Cập nhật trạng thái thành công!');
      });
    }
  }

  deleteOrder(id?: number): void {
    if (id != null && confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        alert('Đã xóa đơn hàng!');
        this.loadOrders();
      });
    }
  }

  exportToWord(order: Order): void {
    const content = `
      HÓA ĐƠN GIAO HÀNG

      Mã hóa đơn: ${order.maHoaDon}
      Người đặt: ${order.tenNguoiDat}
      Số điện thoại: ${order.soDienThoai}
      Địa chỉ giao hàng: ${order.diaChiGiaoHang}
      Trạng thái: ${order.trangThaiGiaoHang}
    `;

    const blob = new Blob([content], { type: 'application/msword' });
    FileSaver.saveAs(blob, `HoaDon_${order.maHoaDon}.doc`);
  }

  exportToExcel(): void {
    const data = this.orders.map(order => ({
      'Mã Hóa Đơn': order.maHoaDon,
      'Người Đặt': order.tenNguoiDat,
      'SĐT': order.soDienThoai,
      'Địa Chỉ': order.diaChiGiaoHang,
      'Trạng Thái': order.trangThaiGiaoHang
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'Hóa Đơn': worksheet }, SheetNames: ['Hóa Đơn'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    FileSaver.saveAs(blob, 'DanhSachHoaDon.xlsx');
  }
}
