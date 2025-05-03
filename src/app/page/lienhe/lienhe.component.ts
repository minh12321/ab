import { Component } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-lienhe',
  standalone: false,
  templateUrl: './lienhe.component.html',
  styleUrl: './lienhe.component.css'
})
export class LienheComponent {
  
  onSubmit(form: any) {
    emailjs.send('service_p0zj6t4', 'template_7kjamzh', {
      name: form.value.name,
      email: 'caominhh725@gmail.com',
      message: form.value.message
    }, 'abRzbKpuWCoLbCQv9')
    .then(() => {
      alert('Gửi thành công!');
      form.reset();
    })
    .catch((error) => {
      console.error('Lỗi gửi email:', error);
      alert('Gửi thất bại!');
    });
  }
}
