import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KhachHang } from './khach_hang.model';

@Injectable({
  providedIn: 'root'
})
export class KhachHangService {
  private apiUrl = 'http://localhost:8080/shopbongda/api/khachhang';

  constructor(private http: HttpClient) {}

  getAll(): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(this.apiUrl);
  }

  getById(id: number): Observable<KhachHang> {
    return this.http.get<KhachHang>(`${this.apiUrl}/${id}`);
  }

  create(kh: KhachHang): Observable<KhachHang> {
    return this.http.post<KhachHang>(this.apiUrl, kh);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  capNhatChiTieu(maKH: string, chiTieuMoi: number): Observable<KhachHang> {
    const params = new HttpParams()
      .set('maKH', maKH)
      .set('chiTieuMoi', chiTieuMoi.toString());

    return this.http.post<KhachHang>(`${this.apiUrl}/capnhat`, null, { params });
  }
}
