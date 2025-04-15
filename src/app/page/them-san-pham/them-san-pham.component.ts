import { Component } from '@angular/core';
import { ProductService } from '../../../api-sevice/san_pham.service';
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
  previewImage: string | ArrayBuffer | null = null;

  public apiUrl = environment.url;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts(); 
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.product = data;
      this.filteredsp = data;
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

  submitProduct() {
    this.productService.addProduct(this.newProduct).subscribe(response => {
      console.log('Sản phẩm đã lưu:', response);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.previewFile(this.selectedFile);
      this.uploadImage();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const dropArea = event.currentTarget as HTMLElement;
    dropArea.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    const dropArea = event.currentTarget as HTMLElement;
    dropArea.classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const dropArea = event.currentTarget as HTMLElement;
    dropArea.classList.remove('dragover');

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.selectedFile = file;
      this.previewFile(file);
      this.uploadImage();
      event.dataTransfer.clearData();
    }
  }

  previewFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  uploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.productService.uploadImage(formData).subscribe((url: string) => {
      this.newProduct.hinhAnh = url;
    });
  }
  //-------------------------------------
  filteredsp:Product[]=[];
  search :string='';
  searchsp() {
    const keyword = this.search.toLowerCase().trim();
    this.filteredsp = this.product.filter(u =>
      u.maSanPham.toLowerCase().includes(keyword) ||
      u.tenSanPham.toLowerCase().includes(keyword)
    );
  }
}
