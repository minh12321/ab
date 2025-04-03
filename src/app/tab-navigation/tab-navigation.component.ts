import { Component } from '@angular/core';
import { BreadcrumbService } from '../../api-sevice/tab-navigation.service';

@Component({
  selector: 'app-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.css',
  standalone:false
})
export class TabNavigationComponent {
  constructor(public breadcrumbService: BreadcrumbService) {}

  

  

  
}
