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

    
    constructor(private productService: ProductService) {}
  
    ngOnInit(): void {
      this.getAllProducts(); 
    }
  
    getAllProducts() {
      this.productService.getAllProducts().subscribe(data => {
        this.products = data;
        this.filterProducts();
      });
    }
    filterProducts() {
      this.filteredProducts = this.products.filter(p => {
        const min = this.minPrice ?? 0; 
        const max = this.maxPrice ?? Infinity; 
        return p.gia >= min && p.gia <= max;
      });
    }

}
