import { Component } from '@angular/core';

@Component({
  selector: 'app-chinhsach',
  standalone: false,
  templateUrl: './chinhsach.component.html',
  styleUrl: './chinhsach.component.css'
})
export class ChinhsachComponent {
  selectedPolicy: string = ''; //

  policyList = [
    { key: 'huongdan', label: 'Hướng dẫn mua hàng' },
    { key: 'thanhtoan', label: 'Hướng dẫn thanh toán' },
    { key: 'doitra', label: 'Chính sách đổi trả' },
    { key: 'baohanh', label: 'Bảo hành' },
    { key: 'giaonhan', label: 'Giao nhận và thanh toán' },
    { key: 'napas', label: 'VieQR Napas' },
    { key: 'bando', label: 'Bản đồ' }
  ];

  policyContents: { [key: string]: string } = {
    muaHang: `HƯỚNG DẪN MUA HÀNG\n...`,
    thanhToan: `Chi tiết hướng dẫn thanh toán...`,
    doiTra: `Chính sách đổi trả...`,
    baoHanh: `Chính sách bảo hành...`,
    giaoNhan: `Chính sách giao nhận...`,
    banDo: `Bản đồ địa chỉ cửa hàng...`
  };

  selectPolicy(policyKey: string) {
    this.selectedPolicy = policyKey;
  }

  getSelectedLabel(): string {
    const item = this.policyList.find(i => i.key === this.selectedPolicy);
    return item ? item.label : '';
  }
}

