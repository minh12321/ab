import { Component } from '@angular/core';

@Component({
  selector: 'app-lienhe',
  standalone: false,
  templateUrl: './lienhe.component.html',
  styleUrl: './lienhe.component.css'
})
export class LienheComponent {
  onSubmit() {
    alert("Cảm ơn bạn đã liên hệ!");
    // Tại đây bạn có thể xử lý gửi dữ liệu đến server nếu muốn
  }
}
