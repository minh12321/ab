// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: WebSocket | null = null;
  private static instanceCreated = false;

  constructor(private toastService: ToastrService ,) {
    if (SocketService.instanceCreated) return;
    SocketService.instanceCreated = true;
    console.log('🧩 SocketService created');
    this.connect();
  }

  private connect(): void {
    const wsUrl = 'wss://webbe.onrender.com/ws'; // 🔁 Đổi thành domain thật khi deploy
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('🟢 WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('📦 Đơn hàng mới:', data);
      this.toastService.success(`🛒 Khách hàng có mã${data.maKhachHang} đã mua ${data.tenHang}`, );
    //   alert(`🛒 Đơn hàng mới từ ${data.maKhachHang} - ${data.tenHang}`);
    };

    this.socket.onclose = () => {
      console.log('🔴 WebSocket disconnected. Reconnecting...');
      setTimeout(() => this.connect(), 3000); // Tự động reconnect sau 3s
    };

    this.socket.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };
  }
}
