import { Routes } from '@angular/router';
import { RegComponent } from './reg/reg.component';
import { LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'reg', component: RegComponent },
    { path: 'log', component: LoginComponent },
];
