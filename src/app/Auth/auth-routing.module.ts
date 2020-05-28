import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes:Routes=[
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',pathMatch:'full',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'changePassword',component:ChangePasswordComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule{}