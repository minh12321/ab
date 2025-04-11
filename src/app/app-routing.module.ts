import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';
import { ThemSanPhamComponent } from './them-san-pham/them-san-pham.component';
import { GioHangComponent } from './gio-hang/gio-hang.component';
import { SanphamComponent } from './san-pham/sanpham/sanpham.component';
import { AuthGuard } from './auth/auth.guard';
import { LienheComponent } from './lienhe/lienhe.component';
import { ChinhsachComponent } from './chinhsach/chinhsach.component';
import { RankComponent } from './rank/rank.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reg', component: RegComponent },
  { path: 'log', component: LoginComponent },
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard], },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: GioHangComponent,canActivate: [AuthGuard], },
  { path: 'prodexe', component: SanphamComponent },
  { path: 't-s-p', component: ThemSanPhamComponent } ,
  { path: 'chinhsach', component: ChinhsachComponent } ,
  { path: 'lienhe', component: LienheComponent } ,
  { path: 'rank', component: RankComponent } ,
  
  // { path: 't-s-p', component: ThemSanPhamComponent
  // canActivateChild: [AuthGuard],
  // children: [
  //   { path: 'dashboard', component: DashboardComponent },
  //   { path: 'profile', component: ProfileComponent },// Updated path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
