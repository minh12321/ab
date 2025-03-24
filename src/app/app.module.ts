import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch,  withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegComponent } from './reg/reg.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
// import { AccountComponent } from './account/account.component';
// import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({ declarations: [
        AppComponent,
        RegComponent,
        LoginComponent,
        HomeComponent,
        // AccountComponent,
        // AdminComponent,
        MenuComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule], providers: [provideHttpClient(withFetch()), provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
