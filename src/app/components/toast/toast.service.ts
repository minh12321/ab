import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: { message: string, type: string }[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toasts.push({ message, type });
    console.log('Toast mới được thêm:', message);

    setTimeout(() => {
      this.toasts.shift();
    }, 3000); // 3s tự biến mất
  }

//   clear() {
//     this.toasts = [];
//   }


}
