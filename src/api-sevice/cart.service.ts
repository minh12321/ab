import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './cart-item.model'; 
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
    
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}


  addProductToCart(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/api/cart/add`, cartItem);
  }


  removeProductFromCart(productCode: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/cart/remove/${productCode}`);
  }

  seeProductFromCart(name: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/api/cart/gio/${name}`);
  }
}
