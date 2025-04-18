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
    return this.http.delete<void>(`${this.apiUrl}/api/products/${id}`);
  }

  updateProduct(id: string, product: Product, file: File | null): Observable<Product> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<Product>(`${this.apiUrl}/api/products/${id}`, formData);
  }
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/products`, product);
  }

  uploadImage(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/api/upload`, formData, { responseType: 'text' });
  }
  deleteImage(filename: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/upload/${filename}`);
  }

  
  capNhatSoLuongMat(productId: string, soLuongMat: number) {
    return this.http.put<number>(`${this.apiUrl}/api/products/${productId}/mat`, {soLuongMat});
  }

  suaPhanTramGiamGia(productId: string, giamGia: number) {
    return this.http.put(`${this.apiUrl}/api/products/${productId}/giam-gia`, { giamGia });
  }
  


  


}
