import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
declare var swal: any;
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  id:any
  ChatArray=[]
  pushArray=[]
  group:any;
   object:any
   hide:boolean=false
   message:any
   newObject:any
   object1:any
   GroupData=[]
   group_members=[]
   group_members1=[]
   groupName:any
   members=[]
   lengthCheck:any
   sharedObject:any
   hide1:boolean=false
   clickMember:any
   clickName:any
   clickId:any
   deleteObject:any
   dpArray=[]
   dp:any
   

  constructor(private cs:ChatService,private cookie:CookieService,private router:Router,private toast:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
   this.spinner.show()
    this.id=this.cookie.get('id')
    this.pushArray.push(this.id)
    this.getChatData()
    this.getGroupChat()
    this.getProfile()
  }
  getChatData(){
    this.spinner.show()
    this.cs.getAllUser(this.id).subscribe((data:any)=>{
      if(data.IsSuccess){
        this.ChatArray=data.Data
        this.spinner.hide()
      }
    })
  }
  radioChange(event,value,index){
    if(event.target.checked===true){
    this.pushArray.push(value._id)
    this.object={
      group_name:this.group,
      group_members:this.pushArray,
      Admin:this.id
    }
    }
    else{
      this.pushArray.splice(index+1,1)
      this.object={
        group_name:this.group,
        group_members:this.pushArray,
        Admin:this.id
      }
    }

  }
  submitGroup(){
    this.spinner.show()
    if(this.group===undefined){
      this.toast.warning("Group Name is Required")
    }else{
     
    this.hide=true
    this.cs.addGroupChat(this.object).subscribe((data:any)=>{
      if(data.IsSuccess){
        this.toast.success("Group is Created")
        this.getGroupChat()
        
      }
      else{
        this.toast.error("Something Went Wrong")
      }
    })
  }
  }
  sendMessage(){
    if(this.message==""){
      this.toast.warning("Message should not be empty")
    }
    else{
    this.spinner.show()
    this.object={
      message:this.message,
      sender_id:this.id,
      group_id:this.clickId
    }
    this.cs.addGroupMessage(this.object).subscribe((data:any)=>{
      if(data.IsSuccess){
        this.sharedGroupDetails()
        this.spinner.hide()
        this.message=""
      }
      else{
        console.log("not added")
      }
    })
  }
  }
  getGroupChat(){
    this.spinner.show()
    this.object1={
      Admin:this.id,
      group_members:this.id
    }
    this.cs.getGroupChat(this.object1).subscribe((data:any)=>{
      if(data.IsSuccess){
        this.spinner.hide()
        this.GroupData=data.Data
        console.log("groupdata",this.GroupData)
      }
    })
    
  }
  onClick(value){
    this.members=[]
    this.clickId=value._id
    this.clickMember=value.group_members
    this.clickName=value.group_name
    value.group_members.forEach(element => {
      this.members.push(element.username)      
    });
    console.log("ds",this.members)
    this.spinner.show()
    this.hide1=true
    let groupObject={
      group_id:this.clickId
    }
    this.sharedObject=groupObject
    this.sharedGroupDetails()
  }
  sharedGroupDetails(){
    this.cs.getGroupMessages(this.sharedObject).subscribe((data:any)=>{
      if(data.IsSuccess){
        this.spinner.hide()
        this.group_members1=data.Data
        console.log("memb",this.group_members1)
        this.lengthCheck=this.group_members1.length
      }
      else{
        console.log("data not added")
      }
    })
  }
  ViewGroupChat(){
    this.spinner.show()
    setTimeout(()=>{
      this.spinner.hide()
    },1000)
    this.hide=true
  }
   async deleteChat(){
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
         console.log("res",result)
        this.cs.deleteGroupChat(this.clickId).subscribe((data:any)=>{
          if(data.IsSuccess){
            this.toast.success("Delted Successfully")
            this.sharedGroupDetails()
          }
          else{
            this.toast.error("Something Went Wrong")
          }
        })
       }
     })
  }
  deleteGroup(value){
    this.deleteObject={
      id:this.id,
      group_id:value._id
    }
      this.cs.deleteGroup(this.deleteObject).subscribe((data:any)=>{
      if(data.IsSuccess){
      this.toast.success("Group Deleted")
      this.getGroupChat()
      this.hide1=false
      this.hide=false
     }
      else{
      this.toast.warning("Group will only deleted by Admin")
      this.hide1=false
      this.hide=false
       }
     })
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
