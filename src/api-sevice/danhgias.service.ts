import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductReview } from './product-review.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DanhGiasService {

  private apiUrl = environment.url; // Thay bằng domain của bạn

  constructor(private http: HttpClient) {}

  getReviews(productId: string): Observable<ProductReview[]> {
    return this.http.get<ProductReview[]>(`${this.apiUrl}/api/products/${productId}/reviews`);
  }

  getAverageRating(productId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/api/products/${productId}/reviews/average`);
  }

  createOrUpdateReview(productId: string, review: ProductReview, userId: number): Observable<ProductReview> {
    const headers = new HttpHeaders().set('userId', userId.toString());
    return this.http.post<ProductReview>(`${this.apiUrl}/api/products/${productId}/reviews`, review, { headers });
  }

  deleteReview(reviewId: number, userId: number): Observable<void> {
    const headers = new HttpHeaders().set('userId', userId.toString());
    return this.http.delete<void>(`${this.apiUrl}/api/products/0/reviews/${reviewId}`, { headers }); // productId is not needed here
  }
}
