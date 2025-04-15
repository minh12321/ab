import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../api-sevice/san_pham.service';
import { Product } from '../../../api-sevice/san_pham.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-thongtinsanpham',
  standalone: false,
  templateUrl: './thongtinsanpham.component.html',
  styleUrl: './thongtinsanpham.component.css'
})
export class ThongtinsanphamComponent {
  product: Product | undefined;
  public apiUrl = environment.url;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(data => {
        this.product = data;
      });
    }
  }
}
