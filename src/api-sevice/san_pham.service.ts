import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './san_pham.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/products`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/api/products/${id}`);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/products/admin/${id}`);
  }

  // updateProduct(id: string, product: Product, file: File | null): Observable<Product> {
  //   const formData = new FormData();
  //   formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
  //   if (file) {
  //     formData.append('file', file);
  //   }
  //   return this.http.put<Product>(`${this.apiUrl}/api/products/admin/${id}`, formData);
  // }

  updateProduct(id: string, product: Product, file?: File | null): Observable<Product> {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      return new Observable<Product>((observer) => {
        this.uploadImage(formData).subscribe({
          next: (filename) => {
            product.hinhAnh = filename;
            this.http.put<Product>(`${this.apiUrl}/api/products/admin/${id}`, product).subscribe({
              next: (result) => observer.next(result),
              error: (err) => observer.error(err),
              complete: () => observer.complete(),
            });
          },
          error: (err) => observer.error(err),
        });
      });
    } else {
      return this.http.put<Product>(`${this.apiUrl}/api/products/admin/${id}`, product);
    }
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/products/admin`, product);
  }

  uploadImage(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/api/upload`, formData, { responseType: 'text' });
  }
  deleteImage(filename: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/upload/admin/${filename}`);
  }

  
  capNhatSoLuongMat(productId: string, soLuongMat: number) {
    return this.http.put<number>(`${this.apiUrl}/api/products/admin/${productId}/mat`, {soLuongMat});
  }

  suaPhanTramGiamGia(productId: string, giamGia: number) {
    return this.http.put(`${this.apiUrl}/api/products/admin/${productId}/giam-gia`, { giamGia });
  }
  


  


}
