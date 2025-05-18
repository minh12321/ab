import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { Product } from '../../../api-sevice/san_pham.model';
import { environment } from '../../../environments/environment';
import { CartService } from '../../../api-sevice/cart.service';
import { CartItem } from '../../../api-sevice/cart-item.model';
import { AuthService } from '../../auth/auth.service';
import { DanhGiasService } from '../../../api-sevice/danhgias.service';
import { ProductReview } from '../../../api-sevice/product-review.model';


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
  productId: string='';

  averageRating: number = 0;

  fullStars: number[] = [];
  hasHalfStar: boolean = false;
  emptyStars: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private danhGiasService: DanhGiasService
  ) {}

  
  
  ngOnInit(): void {
    const productId = this.authService.getProductId();
    const full = Math.floor(this.averageRating);
    const hasHalf = this.averageRating - full >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);
    if (productId) {
      this.productService.getProductById(productId).subscribe(data => {
        this.product = data;
        this.loadReviews();
        this.loadAverageRating();
        this.fullStars = Array(full).fill(0);
        this.hasHalfStar = hasHalf;
        this.emptyStars = Array(empty).fill(0);
      });
    }
    this.ngu();
    this.loadReviews();
    this.loadAverageRating();
    this.productId = productId ?? "is";
    this.userId = this.authService.getid() ?? "is";
    
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

  //---------------------------------------------------------------------------
  

  userId = 123; 
  reviews: ProductReview[] = [];

  newReview: ProductReview = {
    productId: '0',
    userId: 0,
    rating: 5,
    comment: ''
  };

  editingReviewId: number | null = null;

  loadReviews(): void {
    this.danhGiasService.getReviews(this.productId).subscribe(data => {
      this.reviews = data;
    });
  }

  loadAverageRating(): void {
    this.danhGiasService.getAverageRating(this.productId).subscribe(avg => {
      this.averageRating = avg;
      const full = Math.floor(this.averageRating);
      const hasHalf = this.averageRating - full >= 0.5;
      const empty = 5 - full - (hasHalf ? 1 : 0);

      this.fullStars = Array(full).fill(0);
      this.hasHalfStar = hasHalf;
      this.emptyStars = Array(empty).fill(0);
    });
  }

  startEdit(review: ProductReview): void {
    this.editingReviewId = review.id || null;
    this.newReview = { ...review };
  }

  cancelEdit(): void {
    this.editingReviewId = null;
    this.newReview = {
      productId: '0',
      userId: 0,
      rating: 5,
      comment: ''
    };
  }

  submitReview(): void {
    this.newReview.productId = this.productId;
    this.newReview.userId = this.userId;

    this.danhGiasService.createOrUpdateReview(this.productId, this.newReview, this.userId)
      .subscribe(() => {
        this.loadReviews();
        this.loadAverageRating();
        this.cancelEdit();
      }, err => {
        alert('Có lỗi xảy ra khi gửi đánh giá');
      });
  }

  deleteReview(reviewId: number): void {
    if (confirm('Bạn có chắc muốn xóa đánh giá này không?')) {
      this.danhGiasService.deleteReview(reviewId, this.userId).subscribe(() => {
        this.loadReviews();
        this.loadAverageRating();
      }, err => {
        alert('Xóa đánh giá thất bại');
      });
    }
  }
}
