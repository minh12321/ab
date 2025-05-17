import { Component, OnInit } from '@angular/core'; // Thêm OnInit
import { Product } from '../../../api-sevice/san_pham.model';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css'],
  standalone: false
})
export class SanphamComponent implements OnInit {
  product: Product[] = [];
  filteredProducts: Product[] = [];
  public apiUrl = environment.url;

  filter = {
    sizes: new Set<string>(),       
    brands: new Set<string>(),      
    types: new Set<string>(),       
    colors: new Set<string>(),     
    conHang: false,               
    minPrice: null,               
    maxPrice: null                 
  };

  selectedSort: string = 'name'; 
  currentPage: number = 1;
  itemsPerPage: number = 12; 
  totalPages: number = 1;


  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.product = data;
      this.applyFilters();
    });
  }

  toggleFilter(type: string, value: string): void {
    const filterSet = this.filter[type as keyof typeof this.filter];
    if (filterSet instanceof Set) {
      if (filterSet.has(value)) {
        filterSet.delete(value);
      } else {
        filterSet.add(value);
      }
    } else if (type === 'conHang') {
      this.filter.conHang = !this.filter.conHang;
    }
    this.applyFilters();
  }

  allFilteredProducts: Product[] = [];

  applyFilters(): void {
    this.filteredProducts = this.product.filter(p => {
      const matchSize = this.filter.sizes.size === 0 || this.filter.sizes.has(p.size || '');
      const matchColor = this.filter.colors.size === 0 || this.filter.colors.has(p.mauSac || '');
      const matchBrand = this.filter.brands.size === 0 || Array.from(this.filter.brands).some(brand =>
        p.moTa.toLowerCase().includes(brand.toLowerCase()));
      const matchConHang = !this.filter.conHang || (p.soLuong && p.soLuong > 0);
      const matchType = this.filter.types.size === 0 || Array.from(this.filter.types).some(type =>
        p.moTa.toLowerCase().includes(type.toLowerCase()));
      const matchMinPrice = this.filter.minPrice == null || p.gia >= this.filter.minPrice;
      const matchMaxPrice = this.filter.maxPrice == null || p.gia <= this.filter.maxPrice;

      return matchSize && matchBrand && matchType && matchColor && matchConHang && matchMinPrice && matchMaxPrice;
    });

    this.sortProducts();
     this.allFilteredProducts = [...this.filteredProducts];

    this.totalPages = Math.ceil(this.allFilteredProducts.length / this.itemsPerPage);

  // Lấy sản phẩm theo trang hiện tại
    this.updateCurrentPageItems();
  }

  
  resetFilter(): void {
    this.filter = {
      sizes: new Set<string>(),
      brands: new Set<string>(),
      types: new Set<string>(),
      colors: new Set<string>(),
      conHang: false,
      minPrice: null,
      maxPrice: null
    };
    this.selectedSort = 'name';
    this.currentPage = 1;
    this.applyFilters();
  }

  sortProducts(): void {
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
  updateCurrentPageItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredProducts = this.allFilteredProducts.slice(startIndex, endIndex);
}

get pageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

  goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updateCurrentPageItems();
  }
}

  selectProduct(productId: string): void {
    this.authService.setProductId(productId);
  }
}