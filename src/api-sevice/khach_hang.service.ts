import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KhachHang } from './khach_hang.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KhachHangService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  getAll(): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(`${this.apiUrl}/api/khachhang`);
  }

  getById(id: number): Observable<KhachHang> {
    return this.http.get<KhachHang>(`${this.apiUrl}/api/khachhang/${id}`);
  }

  create(kh: KhachHang): Observable<KhachHang> {
    return this.http.post<KhachHang>(`${this.apiUrl}/api/khachhang`, kh);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/khachhang/${id}`);
  }

  capNhatChiTieu(maKH: string, chiTieuMoi: number): Observable<KhachHang> {
    const params = new HttpParams()
      .set('maKH', maKH)
      .set('chiTieuMoi', chiTieuMoi.toString());

    return this.http.post<KhachHang>(`${this.apiUrl}/api/khachhang/capnhat`, null, { params });
  }
}
