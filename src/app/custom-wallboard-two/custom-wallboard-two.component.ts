import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'

@Component({
selector: 'app-custom-wallboard-two',
templateUrl: './custom-wallboard-two.component.html',
styleUrls: ['./custom-wallboard-two.component.css']
})
export class CustomWallboardTwoComponent implements OnInit {

    websocket;
    socketData;
    user_type;
    loginUser;
    queueData;
    agentsData;
    answered_Call = 0;
    abandoned_call = 0;
    waiting_call = 0;
    total_call = 0;
    total_wp = 0;
    total_sms = 0;
    total_chat = 0;
    total_ticket = 0;
    perabandoned = 0;
    peranswered = 0;
    talktime = 0;
    waitingtime = 0;
    handlingtime = 0;
    agentbusy =0;
    agentsQueData;
    avlagent = 0;
    quesData;
    has_hard_id;
    hardware_id;
    show_act_wall = false;
    admin_id;
    has_admin =false;
    has_user =false;
    doc_link;
  constructor(private serverService: ServerService, private router:Router) {  }
ngOnInit() {
  this.user_type = localStorage.getItem('user_type');
  this.loginUser = localStorage.getItem('userId');
  this.admin_id = localStorage.getItem('admin_id');

  this.user_type = localStorage.getItem('user_type');
  if(this.user_type == 'Admin'){
    this.has_admin = true;
  } else {
    this.has_user = true;
  }

  this.has_hard_id = localStorage.getItem('hardware_id');
  if(this.has_hard_id == ""){
      $("#addLicence").modal({"backdrop": "static"});
      this.show_act_wall = true;
  } else {
    this.initSocket();
  }

  }
  initSocket(){
 
    
    this.websocket = new WebSocket("wss://"+window.location.hostname+":4010"); 
    
    this.websocket.onopen = function(event) { 
      $('#sendonload').click();
      console.log('custom walboard 2 connected');
    }

    this.websocket.onmessage = function(event) {
      
      var result_message = JSON.parse(event.data);
      this.has_hard_id = localStorage.getItem('hardware_id');
      if(result_message[0].cust_id == this.has_hard_id){
        console.log('matched');
      }else {
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
      else if(result_message[0].data[0].single_queue!=undefined){
        console.log('entered the single queue')
        $('#single_queue2').val(event.data); 
        $('#single_queue2').click();
      } 
      
      else if(result_message[0].data[0].queue_name!=undefined){

        $('#ques_list').val(event.data); 
        $('#ques_list').click();
      }   

    }
    this.websocket.onerror = function(event){
      console.log('error');
    }
    this.websocket.onclose = function(event){
      console.log('close');
    } 
  }

  filterItemsOfTdype(type){
    return this.queueData.filter(x => x.select == type);
}

filterItemsOfType(type: any[]) : any[] {
  if (!this.queueData) return [];
  return this.queueData.filter(x => x.select == type);
}




  addQueue(){
    $('#addQueue').modal('show');
  }
  addUsers(){
    $('#addUsers').modal('show');
  }
  

  sendOnload(){
    this.has_hard_id = localStorage.getItem('hardware_id');
    var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"onload","Type":"advance_wallboard_1"}]}]' ;
    this.websocket.send(socket_message);
   }
  
  
  reloadQueue(){
    this.has_hard_id = localStorage.getItem('hardware_id');
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
  
  getQueues(){
    var mainQueues = $('.queues_check:checked').map(function(){
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


single_queue2(){
  let socketData = $('#single_queue2').val(); 
  let mData = JSON.parse(socketData);
  var single_queue2 = mData[0].data;

  // [{"cust_id":"5NXM1A9WNPRNFH8E21ARZYQ7XPAF6824AD7452A2F7NNTWGR824G","data":[{"single_queue":"1","single_queue_name":"Main","queue_no":"800","callwaiting":"1","avgwaiting":"00:00:08","answerd":"3","p_anscall":"30","missed":"7","avg_talking":"00:00:06","avalagnt":"1","busyagnt":"0","lngwaiting":"00:00:14","sla_count":"0","sla_per":"0","p_abandond":"70","total_call":"10" }]}]

  console.table(socketData);

  var aname = single_queue2[0].queue_no+'2_queue_name';
  var qanswerd = single_queue2[0].queue_no+'2_answered';
  var qmissed = single_queue2[0].queue_no+'2_abandoned';
  var acallwaiting = single_queue2[0].queue_no+'2_waiting';
  var lngwaitingtime = single_queue2[0].queue_no+'2_lngwaitingtime';


  var p_anscall= single_queue2[0].queue_no+'2_p_anscall';
  var aavg_talking = single_queue2[0].queue_no+'2_avg_talking';
  var aavgwaiting = single_queue2[0].queue_no+'2_avgwaiting';
  var aavalagnt = single_queue2[0].queue_no+'2_avalagnt';
  var abusyagent = single_queue2[0].queue_no+'2_busyagent';
  

  $('#'+aname).html(single_queue2[0].queue_name); 
  $('#'+qanswerd).html(single_queue2[0].answerd);
  $('#'+qmissed).html(single_queue2[0].missed);
  $('#'+acallwaiting).html(single_queue2[0].callwaiting);
  $('#'+lngwaitingtime).html(single_queue2[0].lngwaiting);
  

  $('#'+p_anscall).html(single_queue2[0].p_anscall);
  $('#'+aavg_talking).html(single_queue2[0].avg_talking);
  $('#'+aavgwaiting).html(single_queue2[0].avgwaiting);
  $('#'+aavalagnt).html(single_queue2[0].avalagnt);
  $('#'+abusyagent).html(single_queue2[0].busyagnt);
}


slectAllQue(){
  if($("#selectAllQ").prop("checked")) {
    $(".queues_check").prop("checked", true);
} else {
    $(".queues_check").prop("checked", false);
} 
}


changeWallType(){


    let socketData = $('#mrVoipType').val(); 
    let mData = JSON.parse(socketData);
    this.socketData = mData[0].data[0];


     var type = this.socketData.type;
    var val = this.socketData.value;


   $("#"+type).text(val);
  
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