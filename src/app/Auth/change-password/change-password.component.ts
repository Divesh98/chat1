import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:FormGroup
  id:any

  constructor(private fb:FormBuilder,private as:AuthService,private cookie:CookieService,private toast:ToastrService) { }

  ngOnInit() {
    this.id=this.cookie.get('id')
    console.log("id",this.id)
    this.initForm()
  }
  initForm(){
    this.changePasswordForm=this.fb.group({
      password:["",Validators.required],
      newpassword:["",Validators.required],
      repassword:["",Validators.required]
    })
  }
  object:any
  changePassword(){
     this.object={
      id:this.id,
      password:this.changePasswordForm.controls.password.value,
      newpassword:this.changePasswordForm.controls.repassword.value,
      repassword:this.changePasswordForm.controls.repassword.value
    }
    this.as.changePassword(this.object).subscribe((data:any)=>{
      if(data.IsSuccess){
        this.toast.success("Password Updated")
      }else{
        this.toast.error("Something Went Wrong")
      }
    })
  }

}
