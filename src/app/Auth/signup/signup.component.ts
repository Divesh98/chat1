import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup

  constructor(private fb:FormBuilder,private as:AuthService,private toast:ToastrService) { }

  ngOnInit() {
    this.initForm()
    
  }
  initForm(){
    this.signupForm=this.fb.group({
      email:["",Validators.required],
      password:["",Validators.required],
      username:["",Validators.required]
    })
  }
  onRegister(value){
    this.as.addUser(value).subscribe((data:any)=>{
      if(data.IsSuccess){
        this.toast.success("Registered Successfully")
      }
      else if(data.code==422){
        this.toast.warning("Email Alredy Registered")
      }
      else{
        this.toast.error("Something Went Wrong")

      }
    })

  }

}
