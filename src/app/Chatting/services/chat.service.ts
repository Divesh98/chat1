import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable, observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket=io(environment.baseUrl)

  constructor(private cookie:CookieService,private http:HttpClient) {  }
  addChat(object){
    return this.http.post<any>(environment.baseUrl +'/addChat',object)
  }
  getAllChat(id){
    return this.http.get<any>(environment.baseUrl +'/getChat/'+id)
  }
  getAllUser(id){
    return this.http.get<any>(environment.baseUrl +'/getAllUser/'+id)
  }
  sendMessage(message){
    return this.http.post<any>(environment.baseUrl +'/addChat',message)
  }
  callSocket(message){
    console.log("message",message)
    this.socket.emit('new-message', message);
  }
getParticularChat(object){
  return this.http.post<any>(environment.baseUrl +'/getParticularChat',object)
}
joinRoom(data){
  console.log("data",data)
  this.socket.emit('join',data)

}
deleteChat(id){
  return this.http.post(environment.baseUrl +'/deleteChat',id)
}


// public chat
sendPublicChat(object){
  return this.http.post<any>(environment.baseUrl +'/addPublicChat',object)
}
getPublicChat(){
  return this.http.get(environment.baseUrl +'/getAllChat')
}
getAllUsers(){
  return this.http.get(environment.baseUrl +'/getAllUsers')
}
deletePublicChat(id){
  return this.http.delete(environment.baseUrl +'/deletePublicChat/'+id)
}
editUser(id,value){
  console.log("val",value)
  return this.http.patch(environment.baseUrl +'/editUser/'+id,value)
}
// add Group chat

addGroupChat(object){
  console.log("ob",object)
  return this.http.post(environment.baseUrl +'/addGroupChat',object)
}
getGroupChat(object){
  return this.http.post(environment.baseUrl+'/getGroupChat',object)
}
getGroupParticularChat(object){
  return this.http.post(environment.baseUrl +'/getParticularGroupChat',object)
}
addGroupMessage(object){
  return this.http.post(environment.baseUrl+'/addGroupMessages',object)
}
getGroupMessages(object){
  return this.http.post(environment.baseUrl +'/getGroupMessages',object)
}
deleteGroupChat(id){
  return this.http.delete(environment.baseUrl +'/deleteGroupMessages/'+id)
}
deleteGroup(object){
  return this.http.post(environment.baseUrl +'/deleteGroup',object)
}
getProfile(){
  return this.http.get(environment.baseUrl +'/profile')
}
}
