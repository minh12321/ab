import { Component } from '@angular/core';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../api-sevice/san_pham.model';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-them-san-pham',
    templateUrl: './them-san-pham.component.html',
    styleUrl: './them-san-pham.component.css',
    standalone: false
})
export class ThemSanPhamComponent {
  product: Product[] = [];
  newProduct: Product = new Product();
  selectedFile: File | null = null;

  public apiUrl = environment.url;

  constructor(private productService: ProductService) {}


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.uploadImage();
    }
  }

  uploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.productService.uploadImage(formData).subscribe((url: string) => {
      this.newProduct.hinhAnh = url; 
    });
  }

  submitProduct() {
    this.productService.addProduct(this.newProduct).subscribe(response => {
      console.log('Sản phẩm đã lưu:', response);
    });

    
  }

  ngOnInit(): void {
    this.getAllProducts(); 
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.product = data;
    });
  }
  deleteProduct(product: Product) {
    if (confirm(`Bạn có chắc muốn xóa sản phẩm "${product.tenSanPham}" không?`)) {
      this.productService.deleteImage(product.hinhAnh).subscribe(() => {
        this.productService.deleteProduct(product.maSanPham).subscribe(() => {
          alert('Sản phẩm đã bị xóa!');
          this.getAllProducts(); 
        });
      });
    }
  }

}


