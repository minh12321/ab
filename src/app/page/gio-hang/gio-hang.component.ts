import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { CartService } from '../../../api-sevice/cart.service';
import { CartItem } from '../../../api-sevice/cart-item.model';


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
    alert('Đơn hàng đã được chốt!');

  }
  constructor(
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
