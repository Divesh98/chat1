import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
declare var swal: any;
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ChatArray=[]
  id:any
  username:any
  hide:boolean=false
  message:String
  messages=[]
  clickId: any;
  details:any
  object: { sender_id: any; reciever_id: any; message: String; };
  object1:any
  lengthCheck:any
  apikey: string;
  onSuccess:any;
  onError:any;
  uploadValue:any
  search:any
  uploadForm: FormGroup;  
  image:any
  dp:any
  dpArray=[]
  dp1:any


  constructor(private cs:ChatService,private cookie:CookieService,private router:Router,private spinner: NgxSpinnerService,private formBuilder: FormBuilder,private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.loadSocket()
    this.uploadForm=this.formBuilder.group({
      profilePicture:[""]
    })
    this.spinner.show()
    this.id=this.cookie.get('id')
    console.log(this.id)
    this.getChatData()
    this.getParticularChat()
    this.getProfile()
  }
  getChatData(){
    this.spinner.show()
    this.cs.getAllUser(this.id).subscribe((data:any)=>{
      if(data.IsSuccess){
        this.spinner.hide()
        this.ChatArray=data.Data
        console.log("chst",this.ChatArray)
      }
    })
  }
  onClick(id){
    this.hide=true
    this.clickId=id
    this.ChatArray.forEach(element => {
      if( element._id==id){
        this.username=element.username
        this.dp1=element.profilePicture
        this.getParticularChat()
      }
    });
  }
  sendMessage(){
    this.spinner.show()
     this.object={
      sender_id:this.id,
      reciever_id:this.clickId,
      message:this.message
    }
    this.cs.callSocket(this.message)
    this.cs.sendMessage(this.object).subscribe((data:any)=>{
      if(data.IsSuccess){
        this.messages.push(this.message)
        this.getParticularChat()
        this.spinner.hide()
      }
    })
    
    
  }
  // loadSocket(){
  //   this.cs.loadSocket()
  // }
  
  getParticularChat(){
    this.spinner.show()
    this.details={
      sender_id:this.id,
      reciever_id:this.clickId,
    }
    this.cs.getParticularChat(this.details).subscribe((data:any)=>{
      if(data.IsSuccess){
        this.lengthCheck=data.Data.length
        this.messages=data.Data
        this.spinner.hide()
      }
      else{
        console.log("not getting")
      }
    })
  }
  deleteChat(){
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
        this.object1={
          sender_id:this.id,
          reciever_id:this.clickId
        }
        this.cs.deleteChat(this.object1).subscribe((data:any)=>{
          if(data.IsSuccess){
            console.log("deleted successfully")
            this.getParticularChat()
            this.spinner.hide()
          }else{
            console.log("went wrong")
          }
        })
       }
     })
  }
  GlobalChat(){
    this.spinner.show()
    this.router.navigate(['/chat/public'])
  }
  onUpload(event){
    console.log("val",event.target.value)
    console.log("sdds",event.target.files)
    if(event.target.files.length>0){
    this.uploadValue=event.target.files[0]
    this.uploadForm.get('profilePicture').setValue(this.uploadValue)
    }

  }
  uploadPic(){
    this.spinner.show()
    const formData = new FormData();
    const files= this.uploadValue;
    console.log("files",files)
      formData.append('files', this.uploadForm.get('profilePicture').value)
    this.cs.editUser(this.id,formData).subscribe((data:any)=>{
      if(data.IsSuccess){
        console.log('file uploaded')
        this.getProfile()
        this.spinner.hide()
      }
    })
  }
  GroupChat(){
    this.router.navigate(["/chat/group"])
  }
  ViewGroupChat(){
    this.router.navigate(["/chat/group"])
  }
  getProfile(){
    this.cs.getProfile().subscribe((data:any)=>{
      if(data.IsSuccess){
        this.dpArray=data.Data
        console.log(this.dpArray)
        this.dpArray.forEach(element => {
          if(element._id===this.id){
            this.dp=element.profilePicture
          }
        });

      }
    })
  }

}
