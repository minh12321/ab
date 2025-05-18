import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RouterModule } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// COMPONENT
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { RegComponent } from './page/reg/reg.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { AccountComponent } from './page/account/account.component';
import { AdminComponent } from './page/admin/admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { ThemSanPhamComponent } from './page/them-san-pham/them-san-pham.component';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { SanphamComponent } from './page/sanpham/sanpham.component';
import { LienheComponent } from './page/lienhe/lienhe.component';
import { ChinhsachComponent } from './page/chinhsach/chinhsach.component';
import { RankComponent } from './page/rank/rank.component';
import { ThongtinsanphamComponent } from './page/thongtinsanpham/thongtinsanpham.component';
import { GioHangComponent } from './page/gio-hang/gio-hang.component';
import { ThanhToanPopupComponent } from './page/thanh-toan-popup/thanh-toan-popup.component';
import { QlQldonhangComponent } from './page/ql-qldonhang/ql-qldonhang.component';
import { ThongKeComponent } from './page/thong-ke/thong-ke.component';
import { ToolComponent } from './components/tool/tool.component';
import { CaNhanComponent } from './page/ca-nhan/ca-nhan.component';
import { QlShipComponent } from './page/ql-ship/ql-ship.component';
import { SuaSanPhamComponent } from './page/sua-san-pham/sua-san-pham.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastComponent } from './components/toast/toast.component';

// MODULE CHO SLIDER
import { SlickCarouselModule } from 'ngx-slick-carousel';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ThanhToanPopupComponent,
    ThongKeComponent,
    RegComponent,
    LoginComponent,
    HomeComponent,
    AccountComponent,
    AdminComponent,
    MenuComponent,
    ThemSanPhamComponent,
    TabNavigationComponent,
    SanphamComponent,
    LienheComponent,
    ChinhsachComponent,
    RankComponent,
    ThongtinsanphamComponent,
    GioHangComponent,
    QlQldonhangComponent,
    ToolComponent,
    CaNhanComponent,
    QlShipComponent,
    SuaSanPhamComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot({   
      timeOut: 7000,
      positionClass: 'toast-custom-bottom-center',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // SocketService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule { }
