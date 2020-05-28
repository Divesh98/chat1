import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chatRoutingModule } from './chatting.routing.module';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './services/chat.service';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { myInterceptor } from '../Auth/services/interceptor-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PracticeComponent } from './practice/practice.component';
import { PublicComponent } from './public/public.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { GroupComponent } from './group/group.component';
import { SearchPipe } from './filter';
import {GroupPipe} from './groupFilter';
@NgModule({
  declarations: [ChatComponent,PublicComponent,PracticeComponent, GroupComponent,SearchPipe,GroupPipe],
  imports: [
    CommonModule,
    chatRoutingModule,
    FormsModule,
    NgxSpinnerModule,ReactiveFormsModule
  ],
 providers:[ {provide: HTTP_INTERCEPTORS, useClass: myInterceptor, multi: true},ChatService,CookieService]
})
export class ChattingModule { }
