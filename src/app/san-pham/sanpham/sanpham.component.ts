import { Component } from '@angular/core';
import { Product } from '../../../api-sevice/san_pham.model';
import { ProductService } from '../../../api-sevice/san_pham.service';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrl: './sanpham.component.css',
  standalone: false
})
export class SanphamComponent {
    products: Product[] = [];
    newProduct: Product = new Product();
    filteredProducts: Product[] = [];
    minPrice: number = 0;
    maxPrice: number = 10000000;
    

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
    
    constructor(private productService: ProductService) {}
  
    ngOnInit(): void {
      this.getAllProducts(); 
    }
  
    getAllProducts() {
      this.productService.getAllProducts().subscribe(data => {
        this.products = data;
        this.applyFilters();
      });
    }
    
///testtest
    applyFilters() {
      this.filteredProducts = this.products.filter(p => {
        const matchMauSac = this.filter.mauSac ? p.mauSac === this.filter.mauSac : true;
        const matchConHang = this.filter.conHang ? p.soLuong > 0 : true;
        const matchSize = this.filter.size ? p.size === this.filter.size : true;
        const matchloaiHang = this.filter.loaihang ? p.moTa.toLowerCase().includes(this.filter.loaihang.toLowerCase()) : true;
        const matchHang = this.filter.hang ? p.moTa.toLowerCase().includes(this.filter.hang.toLowerCase()) : true;
        const matchKieuGiay = this.filter.kieuGiay ? p.moTa.toLowerCase().includes(this.filter.kieuGiay.toLowerCase()) : true;
        const matchMinPrice = this.filter.minPrice != null ? p.gia >= this.filter.minPrice : true;
        const matchMaxPrice = this.filter.maxPrice != null ? p.gia <= this.filter.maxPrice : true;


        return matchMauSac && matchConHang && matchSize && matchHang && matchKieuGiay && matchMinPrice && matchMaxPrice && matchloaiHang;
      });
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
    

}
