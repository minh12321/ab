import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { CartService } from '../../../api-sevice/cart.service';
import { CartItem } from '../../../api-sevice/cart-item.model';
import { HoaDonService } from '../../../api-sevice/hoa_don.service';


@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.css'],
  standalone: false, 
})
export class GioHangComponent implements OnInit {
  totalAmount: number = 0; 
  product: CartItem[] = [];

  confirmOrder() {
    const username = this.authService.getid().toString();
    const currentDate = new Date().toISOString().slice(0, 10); // yyyy-MM-dd
  
    if (!username) {
      alert('Vui lòng đăng nhập trước khi đặt hàng.');
      return;
    }
    this.product.forEach(item => {
      const hoaDon = {
        maHoaDon: 0,
        maKhachHang: username,
        tenhang: item.productName,
        gia: item.totalPrice,
        soLuong: item.quantity,
        ngayMua: currentDate,
        trangthai: 'Chờ xác nhận'
      };
  
      this.hoaDonService.createHoaDon(hoaDon).subscribe({
        next: () => {
          console.log('Hóa đơn đã được tạo:', hoaDon);
        },
        error: (err) => {
          console.error('Lỗi khi tạo hóa đơn:', err);
        }
      });
    });
  
    alert('Đơn hàng đã được chốt!');
  }
  constructor(
    private hoaDonService: HoaDonService,
      private route: ActivatedRoute,
      private cartService: CartService,
      private productService: ProductService,
      private authService: AuthService
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

    
  
  
}
