import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KhachHangService } from './khach_hang.service';
import { KhachHang } from './khach_hang.model';

describe('KhachHangService', () => {
  let service: KhachHangService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/shopbongda/api/khachhang';

  const mockKH: KhachHang = {
    id: 1,
    maKhachHang: 'KH001',
    tenKhachHang: 'Nguyen Van A',
    chiTieu: 1000000,
    hangKhachHang: 'Vàng'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KhachHangService]
    });

    service = TestBed.inject(KhachHangService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all khach hang', () => {
    service.getAll().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].maKhachHang).toBe('KH001');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockKH]);
  });

  it('should get khach hang by id', () => {
    service.getById(1).subscribe(res => {
      expect(res.id).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockKH);
  });

  it('should create khach hang', () => {
    service.create(mockKH).subscribe(res => {
      expect(res.tenKhachHang).toBe('Nguyen Van A');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockKH);
  });

  it('should delete khach hang', () => {
    service.delete(1).subscribe(res => {
      expect(res).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should update chi tieu', () => {
    service.capNhatChiTieu('KH001', 2000000).subscribe(res => {
      expect(res.chiTieu).toBe(2000000);
    });

    const req = httpMock.expectOne(req =>
      req.method === 'POST' &&
      req.url === `${apiUrl}/capnhat`
    );

    expect(req.request.params.get('maKH')).toBe('KH001');
    expect(req.request.params.get('chiTieuMoi')).toBe('2000000');

    req.flush({ ...mockKH, chiTieu: 2000000 });
  });
});
