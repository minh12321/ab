import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch,  withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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


@NgModule({ declarations: [
        AppComponent,
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
        RankComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgChartsModule,
        FormsModule,
        ReactiveFormsModule], providers: [provideHttpClient(withFetch()), provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
