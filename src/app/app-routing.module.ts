import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';
import { ThemSanPhamComponent } from './them-san-pham/them-san-pham.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reg', component: RegComponent },
  { path: 'log', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'account', component: AccountComponent },
  { path: 't-s-p', component: ThemSanPhamComponent }  // Updated path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
