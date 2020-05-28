import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private cookie:CookieService) { }
  getallCookies(){
    return this.cookie.get('id')&&this.cookie.get('email')? true:false
  }
  addUser(object){
    return this.http.post<any>(environment.baseUrl +'/addUser',object)
  }
  AuthenticateUser(object){
    return this.http.post<any>(environment.baseUrl +'/matchUser',object)
  }
  changePassword(object){
    return this.http.post<any>(environment.baseUrl +'/changePassword',object)
  }
}
