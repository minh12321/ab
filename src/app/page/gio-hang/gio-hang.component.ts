import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { CartService } from '../../../api-sevice/cart.service';
import { CartItem } from '../../../api-sevice/cart-item.model';
import { HoaDonService } from '../../../api-sevice/hoa_don.service';
import { HoaDon } from '../../../api-sevice/hoa_don.model';


@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.css'],
  standalone: false, 
})
export class GioHangComponent implements OnInit {
  totalAmount: number = 0; 
  product: CartItem[] = [];
  hoadon: HoaDon[] = [];

  confirmOrder() {
    const username = this.authService.getid().toString();
    const currentDate = new Date().toISOString().slice(0, 10); // yyyy-MM-dd
  
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
      this.delettespincart(item.productCode);
      window.location.reload();
    });
  
    alert('Đơn hàng đang chờ xác nhận!');
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

  delettesp(makh: string,day:string):void{
    this.hoaDonService.deleteHoaDon(makh,day).subscribe(data=>{
      console.log(data);
    });
  }
  delettespincart(ma: string):void{
    this.cartService.removeProductFromCart(ma).subscribe(data=>{
      console.log(data);
    });
  }
  selectProduct(productId: string) {
    this.authService.setProductId(productId); 
  }

  showList = false;
  toggleList() {
    const username = this.authService.getid();
    this.showList = !this.showList;
    this.hoaDonService.getHoaDonByMaKH(username).subscribe((data) => {
      this.hoadon = data;
      this.calculateTotalAmount();
    });
  }
    
  
  //----------------------------------------------------
}
