import { Component } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-toast-1',
  standalone: false,
  templateUrl: './toast-1.component.html',
  styleUrl: './toast-1.component.css'
})
export class Toast1Component {
  constructor(public toastService: ToastService) {}
  ngOnInit(): void {

  }
}
