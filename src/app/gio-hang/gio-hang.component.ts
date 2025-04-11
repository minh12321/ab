import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.css'],
  standalone: true, // ✅ Chỉnh true nếu bạn đang dùng standalone
  imports: [CommonModule, FormsModule, RouterModule] // ✅ Import CommonModule để dùng currency pipe
})
export class GioHangComponent {
  totalAmount: number = 0; // Thay đổi giá trị này theo logic của bạn

  confirmOrder() {
    alert('Đơn hàng đã được chốt!');
    // Logic chốt đơn hàng sẽ được thêm vào đây
  }
}
