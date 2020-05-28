import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path:'',loadChildren:()=>import('./Auth/auth.module').then(m=>m.AuthModule)},
  {path:'chat',loadChildren:()=>import(`./Chatting/chatting.module`).then(m=>m.ChattingModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
