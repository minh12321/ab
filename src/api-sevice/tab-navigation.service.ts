import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  breadcrumbs: { label: string, url: string }[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateBreadcrumbs(event.urlAfterRedirects);
      }
    });
  }

  private updateBreadcrumbs(url: string) {
    const segments = url.split('/').filter(s => s);
    this.breadcrumbs = [];
    let currentUrl = '';

    segments.forEach(segment => {
      currentUrl += `/${segment}`;
      this.breadcrumbs.push({
        label: this.formatLabel(segment),
        url: currentUrl
      });
    });
  }

  private formatLabel(segment: string): string {
    if (segment.startsWith('product')) {
      return `Sản phẩm ${segment.split('/')[1]}`;
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }
}
