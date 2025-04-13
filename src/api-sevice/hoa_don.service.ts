import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HoaDon } from './hoa_don.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoaDonService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  // Tạo hóa đơn mới
  createHoaDon(hoaDon: HoaDon): Observable<HoaDon> {
    return this.http.post<HoaDon>(`${this.apiUrl}/api/hoadon`, hoaDon);//v
  }

  // Lấy hóa đơn theo mã khách hàng
  getHoaDonByMaKH(maKH: string): Observable<HoaDon[]> {
    return this.http.get<HoaDon[]>(`${this.apiUrl}/api/hoadon/makh/${maKH}`);//v
  }

  // Lấy tất cả hóa đơn
  getAllHoaDon(): Observable<HoaDon[]> {
    return this.http.get<HoaDon[]>(`${this.apiUrl}/api/hoadon`);//v
  }

  // Xóa hóa đơn theo ngày mua và mã khách hàng
  deleteHoaDon(maKH: string, ngayMua: string): Observable<string> {
    const params = new HttpParams()
      .set('maKH', maKH)
      .set('ngayMua', ngayMua); // format: 'YYYY-MM-DD'

    return this.http.delete(`${this.apiUrl}/api/hoadon/xoa`, { params, responseType: 'text' });//v
  }
}
