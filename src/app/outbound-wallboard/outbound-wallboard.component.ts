import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-outbound-wallboard',
  templateUrl: './outbound-wallboard.component.html',
  styleUrls: ['./outbound-wallboard.component.css']
})
export class OutboundWallboardComponent implements OnInit {
  websocket;
  socketData;
  user_type;
  loginUser;
  queueData;
  agentsData;
  agentsQueData;
  avlagent = 0;
  quesData;
  callques;
  obagentloggedin =0;
  waiting =0;
  obabandoned =0;
  obans=0;
  oboffer =0;
  idleagents;
  activeagents;
  wrapupagents;
  notreadyagents;
  admin_id;
  has_hard_id;
  hardware_id;
  show_act_wall = false;
  has_admin =false;
  has_user =false;
constructor(private serverService: ServerService, private router:Router) {  }
ngOnInit() {
  this.user_type = localStorage.getItem('user_type');
  this.loginUser = localStorage.getItem('userId');
  this.admin_id = localStorage.getItem('admin_id');


  this.user_type = localStorage.getItem('user_type');
  if(this.user_type == 'Admin'){
    console.log(this.user_type);
    this.has_admin = true;
  } else {
    this.has_user = true;
  }

  this.has_hard_id = localStorage.getItem('hardware_id');
  if(this.has_hard_id == ""){
      $("#addLicence").modal({"backdrop": "static"});
      this.show_act_wall = true;
  } else {
    this.checkLicenseKey();
  }

  }

initSocket(){
  this.user_type = localStorage.getItem('user_type');
  this.loginUser = localStorage.getItem('userId');
  this.admin_id = localStorage.getItem('admin_id');
  // if(this.loginUser == '64'){
  //   this.websocket = new WebSocket("wss://socket.mconnectapps.com:5013/"); 
  // } else if(this.loginUser == '164'){
  //   this.websocket = new WebSocket("wss://socket.mconnectapps.com:5014/"); 
  // } else if(this.loginUser == '201'){
  //   this.websocket = new WebSocket("wss://myscoket.mconnectapps.com:4003"); 
  //   // this.websocket = new WebSocket("wss://socket.mconnectapps.com:5014/"); 
  // } else {
  //   this.websocket = new WebSocket("wss://socket.mconnectapps.com:5012/"); 
  // }

  this.websocket = new WebSocket("wss://"+window.location.hostname+":4010"); 


  this.websocket.onopen = function(event) { 
    $('#sendonload').click();
    console.log('Outbound Wallboard connected');
  } 

  this.websocket.onmessage = function(event) {

    var result_message: any = JSON.parse(event.data);
    this.has_hard_id = localStorage.getItem('hardware_id');
    // console.log(result_message);
    if(result_message.cust_id == this.has_hard_id || result_message[0].cust_id == this.has_hard_id){
      console.log('matched');
    } else {
      console.log('not matched');
      return false;
    }

    if(result_message[0].data[0].type!=undefined){
      $('#mrVoipType').val(event.data); 
      $('#mrVoipType').click();
    }

    // else if(result_message[0].data[0].qno!=undefined){
    //   $('#mrVoipQData').val(event.data); 
    //   $('#mrVoipQData').click();
    // }
    
    // else if(result_message[0].data[0].queue_name!=undefined){
    //   $('#ques_list').val(event.data); 
    //   $('#ques_list').click();
    // }   

    else if( result_message[0].data[0].obagent_name!=undefined){
      $('#agent_list').val(event.data); 
      $('#agent_list').click();
    } 

  }
  this.websocket.onerror = function(event){
    console.log('error');
  }
  this.websocket.onclose = function(event){
    console.log('close');
  }  
}
filterItemsOfType(type){
  return this.queueData.filter(x => x.select == type);
}


slectAllQue(){
if($("#selectAllQ").prop("checked")) {
  $(".agents_check").prop("checked", true);
} else {
  $(".agents_check").prop("checked", false);
} 
}



addQueue(){ 
  $('#addQueue').modal('show');
}
addUsers(){
  $('#addUsers').modal('show');
}



sendOnload(){
  var socket_message  = '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"onload","Type":"outbound_wallboard"}]}]' ;
  this.websocket.send(socket_message);
  //alert("jksnjkbsdkcd");
 }


reloadQueue(){
  Swal.fire({
    title: 'Are you sure?',
    text: "This will reset the  Wallboard. You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Reset!'
  }).then((result) => {
    if (result.value) {
      var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"reset"}]}]';
  this.websocket.send(socket_message);
    }
  });
}

changeData(){
 let socketData = $('#ques_list').val(); 
let mData = JSON.parse(socketData);
this.queueData = mData[0].data;
}


getAgents(){
  var mainQueues = $('.agents_check:checked').map(function(){
    return this.value;
}).get();


if(mainQueues == ''){
  iziToast.warning({
    message: "Please Select Atleast One",
    position: 'topRight'
  });
  return false;
}

 this.has_hard_id = localStorage.getItem('hardware_id');
 mainQueues = '[{"cust_id":"'+this.has_hard_id+'","data":['+mainQueues.join()+']}]';
 this.websocket.send(mainQueues);
 $('#addQueue').modal('hide');
}



fullWindow(){
var element = document.getElementById("wallboardFullPanel");
element.classList.toggle("fullSize");
}



changeAgents(){
  let socketData = $('#agent_list').val(); 
  let mData = JSON.parse(socketData);
  this.agentsData = mData[0].data;
  // console.log(this.agentsData);
}



changeWallType(){
  let socketData = $('#mrVoipType').val(); 
  let mData = JSON.parse(socketData);
  this.socketData = mData[0].data[0];


   var type = this.socketData.type;
  var val = this.socketData.value; 

  if(type == 'queues'){
    this.callques = this.socketData.value.split(',');
  }
  else if(type == 'idleobagents'){
    this.idleagents = this.socketData.value.split(',');

  }
  else if(type == 'activeobagents'){
    this.activeagents = this.socketData.value.split(',');

  }
  else if(type == 'wrapupobagents'){
    this.wrapupagents = this.socketData.value.split(',');

  }
  else if(type == 'notreadyobagents'){
    this.notreadyagents = this.socketData.value.split(',');
  } else {
    $("#"+type).text(val);
  }
}

checkLicenseKey(){
  let access_token: any=localStorage.getItem('access_token');

  let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"check_hardware","user_id":"'+this.loginUser+'"}}';
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.data.value=='1'){
      this.initSocket();            
    } else {
      iziToast.error({
        message: "Your Licence Key is expired!.. please enter your key or contact admin",
        position: 'topRight'
        });
        $("#addLicence").modal({"backdrop": "static"});
        this.show_act_wall = true;
    }
  }, 
  (error)=>{
      console.log(error);
  });
}



activateLicenseKey(){
  let access_token: any=localStorage.getItem('access_token');
  let l_key: any=$('#licence_key').val();
  if(l_key == ""){
    iziToast.error({
      message: "Please enter the licence key",
      position: 'topRight'
      });
      return false;
  }
  let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"check_license","user_id":"'+this.loginUser+'","license_key":"'+l_key+'"}}';
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.data.value==1){
      localStorage.setItem('hardware_id', response.result.data.hardware_id);
      this.initSocket();
        iziToast.success({
          message: "Wallboard activated",
          position: 'topRight'
          });
          $("#addLicence").modal('hide');
          
    } else {
      iziToast.error({
        message: "Please enter a valid key",
        position: 'topRight'
        });
       
    }
  }, 
  (error)=>{
      console.log(error);
  });
}
}
