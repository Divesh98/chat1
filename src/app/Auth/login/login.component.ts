import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName,FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm:FormGroup

  constructor(private fb:FormBuilder,private as:AuthService,private cookie:CookieService,private router:Router,private toast:ToastrService) { }

  ngOnInit() {
    this.initLoginForm()
  }
initLoginForm(){
  this.LoginForm=this.fb.group({
    email:["",Validators.required],
    password:["",Validators.required]
  })
}
signIn(value){
  this.as.AuthenticateUser(value).subscribe((data:any)=>{
    if(data.IsSuccess){
      this.cookie.set("id",data.user.id,24*3600,"/",null,null)
      this.cookie.set("email",data.user.email,24*3600,"/",null,null),
      this.cookie.set("username",data.user.username,24*3600,"/",null,null)
      this.cookie.set("token",data.user.token,24*3600,"/",null,null)
      this.router.navigate(['/chat/private'])
      this.toast.success("Login Successfully")
    }
    else if(data.code==422){
      this.toast.warning("Email not Exists")
    }
    else{
      this.toast.error(data.message)
    }
  })
}
myFunction(value){
  if(value.type==="password"){
    value.type="text"
   }else{
     value.type="password"
   }
}
}
