import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { myInterceptor } from './services/interceptor-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ChangePasswordComponent],
  imports: [
    CommonModule,AuthRoutingModule,ReactiveFormsModule,FormsModule
  ],
  providers:[ {provide: HTTP_INTERCEPTORS, useClass: myInterceptor, multi: true},AuthService,CookieService]
})
export class AuthModule { }
