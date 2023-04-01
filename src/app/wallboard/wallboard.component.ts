import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-wallboard',
  templateUrl: './wallboard.component.html',
  styleUrls: ['./wallboard.component.css']
})
export class WallboardComponent implements OnInit {
  mc_event_list; 
  mc_queue_list; 
  chatPageView = false;
  smsPageView = false;
  mailPageView= false;
  websocket;
  socketData;
  user_type;
  loginUser;
  answered_Call = 0;
  abandoned_call = 0;
  waiting_call = 0;
  total_call = 0;
  total_wp = 0;
  total_sms = 0;
  total_chat = 0;
  total_ticket = 0;
  email_ticket_count = 0;
  admin_id;
  has_hard_id;
  hardware_id;
  show_act_wall = false;
  has_admin =false;
  has_user =false;
  doc_link;
  admin_permit;
  constructor(private serverService: ServerService, private router:Router) {  }

  ngOnInit() {
    this.user_type = localStorage.getItem('user_type');
    this.loginUser = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');
    this.admin_permit=localStorage.getItem('admin_permision');


    this.user_type = localStorage.getItem('user_type');
    if(this.user_type == 'Admin' || this.admin_permit == '1'){
      this.has_admin = true;
    } else {
      this.has_user = true;
    }


    this.has_hard_id = localStorage.getItem('hardware_id');

    if(this.has_hard_id == ""){
        // $('#addLicence').modal('show');
        $("#addLicence").modal({"backdrop": "static"});
        this.show_act_wall = true;
    } else {
      this.checkLicenseKey();
    }

    this.getChatCount();
  }

  
  ngAfterViewInit(){
   
  }


initSocket(){
  this.has_hard_id = localStorage.getItem('hardware_id'); 


 
  this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");  
  this.websocket.onopen = function(event) { 
    $('#sendonload').click();
    console.log('common wallboard socket connected');
  }

  this.websocket.onmessage = function(event) {
 
  $('#mc_event_list').val(event.data); 
  $('#mc_event_list').click();
  }
  this.websocket.onerror = function(event){
    console.log('error');
  }
  this.websocket.onclose = function(event){
    console.log('close');
  } 
}


  sendOnload(){
    var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"onload","Type":"Wallboard"}]}]' ;
    this.websocket.send(socket_message);
   }

changeData(){

  let socketData = $('#mc_event_list').val(); 

  let mData = JSON.parse(socketData);
  this.socketData = mData[0];
this.has_hard_id = localStorage.getItem('hardware_id');
if(this.socketData.cust_id === this.has_hard_id ){
  // console.log('matched');
  if(this.socketData.data[0].type == "answered"){
    this.answered_Call = this.socketData.data[0].value;
  } 
  if(this.socketData.data[0].type == "abandoned"){
    this.abandoned_call = this.socketData.data[0].value;
  } 

  if(this.socketData.data[0].type == "waiting"){
    this.waiting_call = this.socketData.data[0].value;
  }  
  if(this.socketData.data[0].type == "total"){
    this.total_call = this.socketData.data[0].value;
  }
} else{
  // console.log('not matched');
}
}

getChatCount(){
  let access_token: any=localStorage.getItem('access_token');
  let api_req:any = '{"operation":"user", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"wallboard_counts","user_id":"'+this.loginUser+'"}}';
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.status=="true"){
      this.total_wp = response.wp_count;
      this.total_sms = response.sms_count;
      this.total_chat = response.chat_count;
      this.total_ticket = 2;
    } else {
     
    }
  }, 
  (error)=>{
      console.log(error);
  });
}

  fullWindow(){
  var element = document.getElementById("wallboardFullPanel");
  element.classList.toggle("fullSize");
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


  showdoc(link){   
    this.doc_link=link;
   $("#document_model").modal('show');   
  }
  


}
