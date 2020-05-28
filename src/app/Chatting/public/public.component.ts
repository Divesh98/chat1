import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from "ngx-spinner";
declare var swal: any;

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  message:String
  messages=[]
  id:any
  object:any
  ChatArray=[]
  arrayPush:any
  arrayPush1=[]
  lengthCheck:any
  deleteId:any
  constructor(private cs:ChatService,private cookie:CookieService,private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.id=this.cookie.get('id')
    this.getChatData()
    this.getPublicChat()
  }
  sendMessage(){
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.object={
      sender_id:this.id,
      reciever_id:this.arrayPush1,
      message:this.message
    }
    this.cs.sendPublicChat(this.object).subscribe((data:any)=>{
      if(data.IsSuccess){
        console.log("added data")
        this.getPublicChat()
        this.spinner.hide()
      }
    })

  }
  getChatData(){
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.cs.getAllUsers().subscribe((data:any)=>{
      if(data.IsSuccess){
        this.ChatArray=data.Data
        this.arrayPush=this.ChatArray.filter(i=>i._id!=this.id)
        this.arrayPush.forEach(element => {
          this.arrayPush1.push(element._id)
          this.spinner.hide()
        });
      }
    })
  }
  getPublicChat(){
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.cs.getPublicChat().subscribe((data:any)=>{
      if(data.IsSuccess){
        this.messages=data.Data
        this.lengthCheck=this.messages.length
        this.spinner.hide()
      }
    })
  }
  deleteChat(id){
    swal({
      title: "DELETE Chat",
      text: "Are you Sure you Want to Delete?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Delete!"
     }).then(result=>{
       if(result){
        this.spinner.show()
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        this.cs.deletePublicChat(id).subscribe((data:any)=>{
          if(data.IsSuccess){
            this.getPublicChat()
            this.spinner.hide()
          }else{
            console.log("not deleted")
          }
        })
       }
     })
  }

}
