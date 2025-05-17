import { Component } from '@angular/core';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../api-sevice/san_pham.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-sua-san-pham',
  standalone:false,
  templateUrl: './sua-san-pham.component.html',
  styleUrl: './sua-san-pham.component.css'
})
export class SuaSanPhamComponent {
  products: Product[] = [];
  selectedProduct: Product = {} as Product;
  file: File | null = null;

  public apiUrl = environment.url;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAllProducts();
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.getProduct(productId);
    }
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data
    });
  }

  getProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (data) => this.selectedProduct = { ...data }
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  updateProduct() {
    if (!this.selectedProduct.maSanPham) return;

    this.productService.updateProduct(this.selectedProduct.maSanPham, this.selectedProduct, this.file)
      .subscribe({
        next: (res) => {
          alert('Cập nhật thành công');
          this.loadAllProducts(); // làm mới danh sách
        },
        error: (err) => {
          console.error(err);
          alert('Cập nhật thất bại');
        }
      });
  }

  selectProductToEdit(product: Product) {
    this.selectedProduct = { ...product };
  }
}
