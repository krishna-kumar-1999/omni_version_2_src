import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {

  constructor() { }
  websocket;
  websocket1;
  ngOnInit(): void {
    this.initSocket();
    this.initSocket1();
  }
  initSocket(){
   this.websocket = new WebSocket("wss://"+window.location.hostname+":4010"); 
    this.websocket.onopen = function(event) { 
      console.log('Dialpad socket connected');
    }

    this.websocket.onmessage = function(event) {      
   console.log(event.data);  
var self=this;
    var result_message = JSON.parse(event.data);
    console.log('vrcle',result_message);
    }

    this.websocket.onerror = function(event){
      console.log('error');
    }
    this.websocket.onclose = function(event){
      console.log('close');
}
}
  initSocket1(){
   this.websocket1 = new WebSocket("wss://"+window.location.hostname+":4010"); 
    this.websocket1.onopen = function(event) { 
      console.log('Dialpad socket connected');
    }

    this.websocket1.onmessage = function(event) {      
   console.log(event.data);  
var self=this;
    var result_message = JSON.parse(event.data);
    console.log('127',result_message);
    }

    this.websocket1.onerror = function(event){
      console.log('error');
    }
    this.websocket1.onclose = function(event){
      console.log('close');
}
}
}
