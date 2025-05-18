import { Component } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toastService.toasts" [ngClass]="toast.type" class="toast">
        {{ toast.message }}

      </div>
    </div>
  `,
  styleUrl: './toast.component.css',
  standalone: false,
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
  
}
