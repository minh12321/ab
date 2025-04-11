import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  const originalAlert = window.alert;
  window.alert = function(message: string): void {
  // Gọi alert gốc
  // originalAlert(message);

  // Gọi alert custom
  const alertBox = document.getElementById('custom-alert');
  if (alertBox) {
    alertBox.textContent = message;
    alertBox.style.display = 'block';

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      alertBox!.style.display = 'none';
    }, 3000);
  }
};