import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegComponent } from './page/reg/reg.component';
import { AdminComponent } from './page/admin/admin.component';
import { AccountComponent } from './page/account/account.component';
import { ThemSanPhamComponent } from './page/them-san-pham/them-san-pham.component';
import { GioHangComponent } from './page/gio-hang/gio-hang.component';
import { SanphamComponent } from './page/sanpham/sanpham.component';
import { AuthGuard } from './auth/auth.guard';
import { LienheComponent } from './page/lienhe/lienhe.component';
import { ChinhsachComponent } from './page/chinhsach/chinhsach.component';
import { RankComponent } from './page/rank/rank.component';
import { ThongtinsanphamComponent } from './page/thongtinsanpham/thongtinsanpham.component';
import { QlQldonhangComponent } from './page/ql-qldonhang/ql-qldonhang.component';
import { ThongKeComponent } from './page/thong-ke/thong-ke.component';
import { CaNhanComponent } from './page/ca-nhan/ca-nhan.component';
import { QlShipComponent } from './page/ql-ship/ql-ship.component';
import { SuaSanPhamComponent } from './page/sua-san-pham/sua-san-pham.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reg', component: RegComponent },
  { path: 'log', component: LoginComponent },
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard],
    children: [
      { path: '',  redirectTo: 'thongke', pathMatch: 'full' },
      { path: 'thongke', component: ThongKeComponent , },
      { path: 't-s-p', component: ThemSanPhamComponent , },
      { path: 'suasanpham', component: SuaSanPhamComponent },
      { path: 'account', component: AccountComponent },
      { path: 'donhang', component: QlQldonhangComponent },
      { path: 'ship', component: QlShipComponent },
    ]
   },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: GioHangComponent,canActivate: [AuthGuard], },
  { path: 'san-pham', component: SanphamComponent },
  { path: 't-s-p', component: ThemSanPhamComponent ,canActivate: [AuthGuard],} ,
  { path: 'chinhsach', component: ChinhsachComponent } ,
  { path: 'lienhe', component: LienheComponent } ,
  { path: 'rank', component: RankComponent ,canActivate: [AuthGuard]} ,
  { path: 'product', component: ThongtinsanphamComponent } ,
  { path: 'donhang', component: QlQldonhangComponent ,canActivate: [AuthGuard],},
  { path: 'canhan', component: CaNhanComponent ,canActivate: [AuthGuard],},
  
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
