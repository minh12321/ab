import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { Product } from '../../../api-sevice/san_pham.model';
import { environment } from '../../../environments/environment';
import { CartService } from '../../../api-sevice/cart.service';
import { CartItem } from '../../../api-sevice/cart-item.model';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-thongtinsanpham',
  standalone: false,
  templateUrl: './thongtinsanpham.component.html',
  styleUrl: './thongtinsanpham.component.css'
})
export class ThongtinsanphamComponent {
  product: Product | undefined;
  public apiUrl = environment.url;
  quantity: number = 1;
  selectedSizeValue: number | undefined;
  availableSizes=[
    30,31,32,33,34,35,36,37,38,39,40,41
  ];
  availableColor=['Xanh','Đỏ'];
  selectedColor: string ='Xanh';
  loginstatus: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  
  
  ngOnInit(): void {
    const productId = this.authService.getProductId();
    if (productId) {
      this.productService.getProductById(productId).subscribe(data => {
        this.product = data;
      });
    }
    this.ngu();
  }
  selectSize(size: number): void {
    this.selectedSizeValue = size;
  }
  selectColor(color: string): void {
    this.selectedColor = color;
  }

  increaseQuantity(): void {
    if (this.quantity < 99) {  
      this.quantity++;
    }
  }
  decreaseQuantity(): void {
    if (this.quantity > 1) {  
      this.quantity--;
    }
  }
  them(){
    if (this.loginstatus==false) {
      alert('yêu cầu đăng nhập để sử dụng dịch vụ này');
    } else {
      this.themvaogiohang();
    }
  }

  themvaogiohang(): void {
    if (!this.selectedSizeValue) {
      alert('Vui lòng chọn kích thước sản phẩm!');
      return;
    }

    if (!this.product) {
      alert('Sản phẩm không hợp lệ!');
      return;
    }

    const cartItem = new CartItem(
      this.product.maSanPham,
      this.product.tenSanPham,
      this.quantity,
      this.product.gia * this.quantity,
      this.selectedColor.toString(),
      this.selectedSizeValue.toString(),
      this.authService.getUsername()||'',
    );

    this.cartService.addProductToCart(cartItem).subscribe((response) => {
      alert('Sản phẩm đã được thêm vào giỏ hàng');
    });

    
  }
  ngu(): boolean {
    if (this.authService.isLoggedIn()) {
      return this.loginstatus=true;
    } else {return this.loginstatus=false;}
  }
}
