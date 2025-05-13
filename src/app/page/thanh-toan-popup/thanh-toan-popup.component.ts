import { Component, Output,EventEmitter } from '@angular/core';
import { CartItem } from '../../../api-sevice/cart-item.model';
import { HoaDon } from '../../../api-sevice/hoa_don.model';
import { HoaDonService } from '../../../api-sevice/hoa_don.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../api-sevice/cart.service';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { AuthService } from '../../auth/auth.service';
import { KhachHangService } from '../../../api-sevice/khach_hang.service';

@Component({
  selector: 'app-thanh-toan-popup',
  templateUrl: './thanh-toan-popup.component.html',
  styleUrl: './thanh-toan-popup.component.css',
  standalone:false
})
export class ThanhToanPopupComponent {
  @Output() closePopup = new EventEmitter<void>();

  diaChi = '';
  email = '';
  hoTen = '';
  soDienThoai = '';
  quanHuyen = '';
  phuongXa = '';
  ghiChu = '';
  selectedMethod = '';
  paymentMethods = [
    'Thanh toán qua VNPay-QR',
    'Thanh toán khi nhận hàng COD',
    'Chuyển khoản ngân hàng',
    'Ví MoMo (quét mã QR)'
  ];

  submitForm() {
    alert('Đơn hàng đã được xác nhận và đang được xử lý!');
    const username = this.authService.getid().toString();
    const currentDate = new Date().toISOString().slice(0, 10); 
  
    if (!username) {
      alert('Vui lòng đăng nhập trước khi đặt hàng.');
      return;
    }
    if (!this.product || this.product.length === 0) {
      alert('Giỏ hàng của bạn đang trống.');
      return;
    }
    this.product.forEach(item => {
      const hoaDon = {
        maHoaDon: 0,
        maKhachHang: username,
        tenHang: item.productName,
        gia: item.totalPrice,
        soLuong: item.quantity,
        ngayMua: currentDate,
        trangThai: 'Chờ xác nhận'
      };
      const khachhang ={
        
      }
  
      this.hoaDonService.createHoaDon(hoaDon).subscribe({
        next: () => {
          console.log('Hóa đơn đã được tạo:', hoaDon);
        },
        error: (err) => {
          console.error('Lỗi khi tạo hóa đơn:', err);
        }
      });
      this.khachHangService.capNhatChiTieu(username,this.totalAmount);
      this.delettespincart(item.productCode);
      window.location.reload();
    });
  }

  close() {
    this.closePopup.emit();
  }


//---------------------------------------------
  totalAmount: number = 0; 
  product: CartItem[] = [];
  hoadon: HoaDon[] = [];
  
  constructor(
    private hoaDonService: HoaDonService,
      private route: ActivatedRoute,
      private cartService: CartService,
      private productService: ProductService,
      private authService: AuthService,
      private khachHangService: KhachHangService
    ) {}

  ngOnInit(): void {
    this.cartService.seeProductFromCart(this.authService.getUsername() || '').subscribe((data) => {
      this.product = data;
      this.calculateTotalAmount();
    });
  }
  calculateTotalAmount(): void {
    this.totalAmount = this.product.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  }
  delettespincart(ma: string):void{
    this.cartService.removeProductFromCart(ma).subscribe(data=>{
      console.log(data);
    });
  }

}
