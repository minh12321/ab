import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HoaDonService } from './hoa_don.service';
import { HoaDon } from './hoa_don.model';

describe('HoaDonService', () => {
  let service: HoaDonService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/shopbogda/api/hoadon';

  const mockHoaDon: HoaDon = {
    maHoaDon: 1,
    maKhachHang: 'KH001',
    ngayMua: '2025-04-13',
    gia:999999,
    soLuong:2,
    tenHang:'giày',
    trangThai:'đang giao',

  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HoaDonService]
    });

    service = TestBed.inject(HoaDonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Đảm bảo không có request nào còn treo
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new hoa don', () => {
    service.createHoaDon(mockHoaDon).subscribe(res => {
      expect(res).toEqual(mockHoaDon);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockHoaDon);
  });

  it('should get hoa don by maKH', () => {
    service.getHoaDonByMaKH(1).subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].maHoaDon).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}/makh/KH001`);
    expect(req.request.method).toBe('GET');
    req.flush([mockHoaDon]);
  });

  it('should get all hoa don', () => {
    service.getAllHoaDon().subscribe(res => {
      expect(res.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockHoaDon]);
  });

  it('should delete hoa don by maKH and ngayMua', () => {
    service.deleteHoaDon('KH001', '2025-04-13').subscribe(res => {
      expect(res).toBe('Đã xóa thành công');
    });

    const req = httpMock.expectOne(req => 
      req.method === 'DELETE' && req.url === `${apiUrl}/xoa`
    );

    expect(req.request.params.get('maKH')).toBe('KH001');
    expect(req.request.params.get('ngayMua')).toBe('2025-04-13');

    req.flush('Đã xóa thành công');
  });
});
