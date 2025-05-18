import { Component, Output,EventEmitter } from '@angular/core';
import { CartItem } from '../../../api-sevice/cart-item.model';
import { HoaDon } from '../../../api-sevice/hoa_don.model';
import { HoaDonService } from '../../../api-sevice/hoa_don.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../api-sevice/cart.service';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { AuthService } from '../../auth/auth.service';
import { KhachHangService } from '../../../api-sevice/khach_hang.service';
import { OrderService } from '../../../api-sevice/order.service';
import { Order } from '../../../api-sevice/order.model';
import { firstValueFrom, forkJoin, map } from 'rxjs';
import { KhachHang } from '../../../api-sevice/khach_hang.model';

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
  isInvaliddiachi: boolean = false;
  isInvalidq: boolean = false;
  isInvalidp: boolean = false;
  isValidsdt: boolean = false;

  validateForm(): boolean {
    this.isInvaliddiachi = this.diaChi.trim() === '';
    this.isInvalidq = this.quanHuyen.trim() === '';
    this.isInvalidp = this.phuongXa.trim() === '';
    this.isValidsdt = this.soDienThoai.trim() === '';   

    return !(this.isInvalidp || this.isInvalidq || this.isValidsdt );
  }
  

  async submitForm() {
    const username = this.authService.getid().toString();
    const currentDate = new Date().toISOString().slice(0, 10); 
    const maDon = 'HD' + Date.now().toString() + username;

    if (!username) {
      alert('Vui lòng đăng nhập trước khi đặt hàng.');
      return;
    }
    if (!this.validateForm()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    if (!this.product || this.product.length === 0) {
      alert('Giỏ hàng của bạn đang trống.');
      return;
    }

    //check số lượng

    const stockResults = await Promise.all(
    this.product.map(async item => {
      const product = await firstValueFrom(this.productService.getProductById(item.productCode));
      return {
        item,
        product,
        isOutOfStock: item.quantity > product.soLuong
      };
    })
    );
    const outOfStockItems = stockResults.filter(r => r.isOutOfStock);
    if (outOfStockItems.length > 0) {
      outOfStockItems.forEach(r => {
        alert(`Sản phẩm "${r.product.tenSanPham}" không đủ hàng (chỉ còn ${r.product.soLuong}).`);
      });
      return;
    }
    //thực thi

    this.product.forEach(item => {
      const hoaDon = {
        maHoaDon: maDon,
        maKhachHang: username,
        tenHang: item.productName,
        gia: item.totalPrice,
        soLuong: item.quantity,
        ngayMua: currentDate,
        trangThai: 'Chờ xác nhận'
      };
      const khachhang ={
        
      }
      const order: Order = {
        maHoaDon: maDon,
        tenNguoiDat: this.authService.getfullname()?? 'người dùng' ,
        soDienThoai: this.soDienThoai,
        diaChiGiaoHang: this.diaChi+this.phuongXa + this.quanHuyen + 'Ghi chú :'+this.ghiChu,
        trangThaiGiaoHang: 'Chờ xác nhận'
      };

      this.orderService.createOrder(order).subscribe({
        next: (result) => {
          console.log('Đã tạo hóa đơn:', result);
          // alert('Tạo hóa đơn thành công!');
        },
        error: (err) => {
          console.error('Lỗi tạo hóa đơn:', err);
          alert('Lỗi tạo hóa đơn!');
        }
      });
  
      this.hoaDonService.createHoaDon(hoaDon).subscribe({
        next: () => {
          console.log('Hóa đơn đã được tạo:', hoaDon);
        },
        error: (err) => {
          console.error('Lỗi khi tạo hóa đơn:', err);
        }
      });
      this.khachHangService.capNhatChiTieu(username, this.totalAmount).subscribe({
        next: (res) => {
          console.log('Cập nhật chi tiêu thành công:', res);
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật chi tiêu:', err);
        }
      });
      this.productService.capNhatSoLuongMat(item.productCode,item.quantity).subscribe({
        next: (res) => {
          console.log('Cập nhật thành công:', res);
        },
        error: (err) => {
          console.error('Lỗi ', err);
        }
      })

      this.delettespincart(item.productCode);
      setTimeout(() => {window.location.reload();}, 10000);
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
      private khachHangService: KhachHangService,
      private orderService: OrderService,
    ) {}

  ngOnInit(): void {
    this.cartService.seeProductFromCart(this.authService.getUsername() || '').subscribe((data) => {
      this.product = data;
      this.calculateTotalAmount();
    });
  }

  calculateTotalAmount(): void {
    const id = this.authService.getid();

    this.khachHangService.getById(id).subscribe({
      next: (d: KhachHang) => {
        const rank = d.thuHang || 'Vô Hạng';
        const discountRates: { [key: string]: number } = {
          'Vô Hạng': 0,
          'Đồng': 0.05,
          'Bạc': 0.10,
          'Vàng': 0.15,
          'Kim cương': 0.20
        };
        const rankDiscountRate = discountRates[rank] ?? 0;

        const productDetailObservables = this.product.map(item =>
          this.productService.getProductById(item.productCode).pipe(
            map((fullProduct) => ({
              ...item,
              giamGia: fullProduct.giamGia || 0  
            }))
          )
        );

        forkJoin(productDetailObservables).subscribe({
          next: (itemsWithDiscount) => {
            let rawTotal = 0;

            for (let item of itemsWithDiscount) {
              const productDiscount = item.giamGia / 100;
              const discountedPrice = item.totalPrice * (1 - productDiscount);
              rawTotal += discountedPrice * item.quantity;
            }

            this.totalAmount = rawTotal * (1 - rankDiscountRate);

            console.log(`Tổng tiền sau tất cả giảm giá (${rank}):`, this.totalAmount);
          },
          error: (err) => {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', err);
            this.totalAmount = 0;
          }
        });
      },
      error: (err) => {
        console.error('Không lấy được thông tin khách hàng:', err);
        this.totalAmount = 0;
      }
    });
  }

  delettespincart(ma: string):void{
    this.cartService.removeProductFromCart(ma).subscribe(data=>{
      console.log(data);
    });
  }

  currentRank: string = '';
  loadplayer(): void {
    const id = this.authService.getid();
  
    this.khachHangService.getById(id).subscribe({
      next: (d: KhachHang) => {
        this.currentRank = d.thuHang || '';
      },
      
    });
  }

}
