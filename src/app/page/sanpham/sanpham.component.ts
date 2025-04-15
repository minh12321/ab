import { Component } from '@angular/core';
import { Product } from '../../../api-sevice/san_pham.model';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrl: './sanpham.component.css',
  standalone: false
})
export class SanphamComponent {
    product: Product[] = [];
    newProduct: Product = new Product();
    filteredProducts: Product[] = [];
    minPrice: number = 0;
    maxPrice: number = 10000000;

    public apiUrl = environment.url;

    filter = {
      mauSac: '',             // VD: "Đỏ"
      conHang: false,         // true nếu chỉ hiển thị còn hàng
      hang: '',               // Hãng trong mô tả
      loaihang:'',
      kieuGiay: '',           // Kiểu giày trong mô tả
      size: '',               // VD: "42"
      minPrice: null,         // Giá tối thiểu
      maxPrice: null          // Giá tối đa
    };
    
    constructor(private productService: ProductService,
      private authService: AuthService) {}
  
    ngOnInit(): void {
      this.getAllProducts(); 
    }
  
    getAllProducts() {
      this.productService.getAllProducts().subscribe(data => {
        this.product = data;
        this.applyFilters();
      });
    }
    
///testtest
    applyFilters() {
      this.filteredProducts = this.product.filter(p => {
        const matchMauSac = this.filter.mauSac ? p.mauSac === this.filter.mauSac : true;
        const matchConHang = this.filter.conHang ? p.soLuong > 0 : true;
        const matchSize = this.filter.size ? p.size === this.filter.size : true;
        const matchloaiHang = this.filter.loaihang ? p.moTa.toLowerCase().includes(this.filter.loaihang.toLowerCase()) : true;
        const matchHang = this.filter.hang ? p.moTa.toLowerCase().includes(this.filter.hang.toLowerCase()) : true;
        const matchKieuGiay = this.filter.kieuGiay ? p.moTa.toLowerCase().includes(this.filter.kieuGiay.toLowerCase()) : true;
        const matchMinPrice = this.filter.minPrice != null ? p.gia >= this.filter.minPrice : true;
        const matchMaxPrice = this.filter.maxPrice != null ? p.gia <= this.filter.maxPrice : true;

        
        return matchMauSac && matchConHang && matchSize && matchHang && matchKieuGiay && matchMinPrice && matchMaxPrice && matchloaiHang;
        
      });this.sortProducts();
    }
    resetFilter() {
      this.filter = {
        mauSac: '',
        conHang: false,
        hang: '',
        kieuGiay: '',
        loaihang:'',
        size: '',
        minPrice: null,
        maxPrice: null
      };
      this.applyFilters();
    }

    selectedSort = 'price_asc';
    
    setFilter(a:string){
      this.filter.size= a;
      this.applyFilters();
    }
    setFilter1(a:string){
      this.filter.mauSac= a;
      this.applyFilters();
    }
    setFilter2(a:string){
      this.filter.hang= a;
      this.applyFilters();
    }
    setFilter3(a:string){
      this.filter.loaihang= a;
      this.applyFilters();
    }
    
    sortProducts() {
      switch (this.selectedSort) {
        case 'price_asc':
          this.filteredProducts.sort((a, b) => a.gia - b.gia);
          break;
        case 'price_desc':
          this.filteredProducts.sort((a, b) => b.gia - a.gia);
          break;
        case 'name':
          this.filteredProducts.sort((a, b) => a.tenSanPham.localeCompare(b.tenSanPham));
          break;
      }
    }
    // Hàm này sẽ được gọi khi người dùng chọn sản phẩm
    selectProduct(productId: string) {
    this.authService.setProductId(productId); // Lưu id sản phẩm vào AuthService
  }

}
