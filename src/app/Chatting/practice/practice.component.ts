import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  room:String;
  username:String

  constructor(private cs:ChatService) { }

  ngOnInit() {
  }
  join(){
    this.cs.joinRoom({username:this.username,room:this.room})
  }
  sendMessage(){}
  sendMessage1(){}
  leave(){}
}
