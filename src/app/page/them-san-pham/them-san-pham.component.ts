import { Component } from '@angular/core';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { Product } from '../../../api-sevice/san_pham.model';
import { environment } from '../../../environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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
        this.productService.deleteProduct(product.maSanPham).subscribe(() => {
          alert('Sản phẩm đã bị xóa!');
          this.getAllProducts(); 
        });
    }
  }

  submitProduct() {
    this.productService.addProduct(this.newProduct).subscribe(response => {
      console.log('Sản phẩm đã lưu:', response);
      alert('Sản phẩm đã lưu: ');
      this.getAllProducts(); 
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
  
    const originalName = this.selectedFile.name || 'download.jpg';
    const extension = originalName.substring(originalName.lastIndexOf('.'));
    const uniqueName = `product_${Date.now()}${extension}`; // VD: product_1715593423450.jpg
  
    const renamedFile = new File([this.selectedFile], uniqueName, { type: this.selectedFile.type });
  
    formData.append('file', renamedFile);
  
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
  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredsp);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'DanhSachSanPham': worksheet },
      SheetNames: ['DanhSachSanPham']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'DanhSachSanPham');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, `${fileName}.xlsx`);
  }
}
