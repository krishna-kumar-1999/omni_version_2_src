import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-customwallboard11',
  templateUrl: './customwallboard11.component.html',
  styleUrls: ['./customwallboard11.component.css']
})
export class Customwallboard11Component implements OnInit {
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
  auxagents=0;
  totagents=0;
  avlagent_queue=0;
  quesData;
  admin_id;
  has_hard_id;
  hardware_id;
  show_act_wall = false;
  has_admin =false;
  has_user =false;
  logged_queues = 0;
  cleartable=true;
  Qcalldatas;
  recordNotFound;
  extension;
  queue_value;
  admin_permision;
  user_admin= false;
  doc_link;
  colors_code;
  typeData;
  select_color1;
  select_color2;
  select_color3;
  typeData2;
  typeData3;
  socket_url;
  constructor(private serverService: ServerService, private router:Router) {  }

  ngOnInit(): void {
    this.socket_url = localStorage.getItem('socket_url');
    this.user_type = localStorage.getItem('user_type');
    this.loginUser = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');
  
    this.user_type = localStorage.getItem('user_type');
    this.admin_permision = localStorage.getItem('admin_permision');
    this.extension = localStorage.getItem('ext_num');
  
    if(this.user_type == 'Admin' || this.admin_permision == '1'){
      this.has_admin = true;
    } else {
      this.has_admin = false;
      this.has_user = true;
    }
  // if(this.admin_permision ==1)
  //     this.user_admin= true;
  // else 
  //   this.user_admin= false;
  
  this.waiting_calls();
    this.has_hard_id = localStorage.getItem('hardware_id');
    if(this.has_hard_id == ""){
        $("#addLicence").modal({"backdrop": "static"});
        this.show_act_wall = true;
    } else {
      this.initSocket();
      this.get_color();
      // this.getagentsdata();
    }

this.sel_colors();
  }


  initSocket(){
  
    this.has_hard_id = localStorage.getItem('hardware_id');
   var self=this.admin_id;
   
      // this.websocket = new WebSocket("wss://"+atob(this.socket_url)+":4010"); 
      this.websocket = new WebSocket("wss://"+window.location.hostname+":4010"); 
      // this.websocket = new WebSocket("wss://solvtech.3cx.sc:4010"); 
   
    
    this.websocket.onopen = function(event) { 
      $('#sendonload_wallborad10').click();
      console.log('custom walboard 1 connected');
    }

    this.websocket.onmessage = function(event) {
      console.log(event.data);
      var result_message = JSON.parse(event.data);
      // console.log(result_message);
      this.has_hard_id = localStorage.getItem('hardware_id');
      if(result_message[0].cust_id == this.has_hard_id){
        // console.log('matched');
      } else {
        // console.log('not matched');
        return false;
      }

//  console.log(result_message)
//  console.log(result_message[0].data[0].ano)
//  console.log(result_message[0].data[0].qno)
      if(result_message[0].data[0].type=='lngwtgcol'){
        if(result_message[0].data[0].color1!='0'){
          this.typeData = result_message[0].data[0].color1;
        }else{
          this.typeData = '';
        }
        if(result_message[0].data[0].color2!='0'){
          this.typeData2 = result_message[0].data[0].color2;
        }else{
          this.typeData2 = '';
        }
        if(result_message[0].data[0].color3!='0'){
          this.typeData3 = result_message[0].data[0].color3;
        }else{
          this.typeData3 = '';
        }
        $("#type_1").val(this.typeData);
        $("#type_2").val(this.typeData2);
        $("#type_3").val(this.typeData3);
      }
      if(result_message[0].data[0].type!=undefined){
        $('#mrVoipType_ten').val(event.data); 
        $('#mrVoipType_ten').click();
      } else if(result_message[0].data[0].qno!=undefined){
        $('#mrVoipQData_ten').val(event.data); 
        $('#mrVoipQData_ten').click();
      } else if(result_message[0].data[0].ano!=undefined){
        $('#mrVoipAData_wall_ten').val(event.data); 
        $('#mrVoipAData_wall_ten').click();
      }  else if( result_message[0].data[0].logged_queues!=undefined){
        $('#logged_queues_ten').val(event.data); 
        $('#logged_queues_ten').click();
      } else if(result_message[0].data[0].queue_name!=undefined){
        $('#ques_list_ten').val(event.data); 
        $('#ques_list_ten').click();
      } else if( result_message[0].data[0].agent_name!=undefined){
        $('#agent_list_ten').val(event.data); 
        $('#agent_list_ten').click();
      } 
      // else if( result_message[0].data[0].Name!=undefined){
      //   $('#qlog_ten').val(event.data); 
      //   $('#qlog_ten').click();
      // } 
      else if( result_message[0].data[0].single_agent!=undefined){
        $('#single_agent_ten').val(event.data); 
        $('#single_agent_ten').click();
      } 
      else if(result_message[0].data[0].single_queue!=undefined){
        $('#single_queue_ten').val(event.data); 
        $('#single_queue_ten').click();
      } 
      
      if(result_message[0].data[0].q_name!=undefined){
        
    if(result_message[0].data[0].q_name != "" && result_message[0].data[0].q_name != null)
      {        
              $('#Qcalldatas_wall_ten').val(event.data); 
              $('#Qcalldatas_wall_ten').click();
              $('#recordNotFound').val('check');
              $('#recordNotFound').click();
      }
      else {
        $('#recordNotFound').val('');
        $('#recordNotFound').click();
        $('#Qcalldatas_wall_ten').val(); 
      // $('#Qcalldatas_wall_ten').load();
      }
} 

    }
    this.websocket.onerror = function(event){
      console.log('error');
    }
    this.websocket.onclose = function(event){     
      console.log('Socket Disconnected.Reconnection will be attempted');
      $('#reconnect_socketwal_ten').click();
      // this.initSocket();
    } 
    
  }

   closeSo() {
    this.websocket.close();
  }
connectTEST(){
  alert('in');
  this.initSocket();
}
  checkMe(){
    this.recordNotFound = $('#recordNotFound').val();

    if(this.recordNotFound != 'check'){     
           this.Qcalldatas =[];
    }

  }

  Qcalldatasfunc(){
    let socketData = $('#Qcalldatas_wall_ten').val(); 
    let mData = JSON.parse(socketData);
      this.Qcalldatas = mData[0].data;
  }

  
manageCallQueue(){
  $('#manageCallQueue').modal('show');
}


addQueue(){
  $('#addQueue').modal('show');
}
addUsers(){
  $('#addUsers').modal('show');
}



sendOnload(){
  var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"onload","Type":"advance_wallboard_1"}]}]' ;
  this.websocket.send(socket_message);
 }


reloadQueue(){
  Swal.fire({
    title: 'Are you sure?',
    text: "This will reset the Wallboard. You won't be able to revert this!",
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
  let socketData = $('#ques_list_ten').val(); 
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



changeAgents(){
  let socketData = $('#agent_list_ten').val(); 
  let mData = JSON.parse(socketData);
  this.agentsData = mData[0].data;
}

getQueUsers(){
  var mainAgents = $('.agents_check:checked').map(function(){
    return this.value;
}).get();


if(mainAgents == ''){

  iziToast.warning({
    message: "Please Select Atleast One",
    position: 'topRight'
});
  return false;
}
this.has_hard_id = localStorage.getItem('hardware_id');

mainAgents = '[{"cust_id":"'+this.has_hard_id+'","data":['+mainAgents.join()+']}]';
 this.websocket.send(mainAgents);
 $('#addUsers').modal('hide');
}


changeWallType(){

  let socketData = $('#mrVoipType_ten').val(); 
  let mData = JSON.parse(socketData);
  this.socketData = mData[0].data[0];



if(this.socketData.type == "answered"){
    this.answered_Call = this.socketData.value;
} 

if(this.socketData.type == "abandoned"){
  this.abandoned_call = this.socketData.value;
} 

if(this.socketData.type == "waiting"){
  this.waiting_call = this.socketData.value;
}  
 if(this.socketData.type == "total"){
  this.total_call = this.socketData.value;
}
if(this.socketData.type == "perabandoned"){
  this.perabandoned = this.socketData.value;
}
if(this.socketData.type == "peranswered"){
  this.peranswered = this.socketData.value;
}
if(this.socketData.type == "talktime"){
  this.talktime = this.socketData.value;
}
if(this.socketData.type == "waitingtime"){
  this.waitingtime = this.socketData.value;
}
if(this.socketData.type == "handlingtime"){
  this.handlingtime = this.socketData.value;
}
if(this.socketData.type == "agentbusy"){
  this.agentbusy = this.socketData.value;
}
if(this.socketData.type == "avlagent"){
  this.avlagent = this.socketData.value;
}
if(this.socketData.type == "qavailable"){
  this.avlagent_queue = this.socketData.value;
}
if(this.socketData.type == "auxagent"){
  this.auxagents = this.socketData.value;
}if(this.socketData.type == "totagent"){
  this.totagents = this.socketData.value;
}
if(this.socketData.type == "shedulereset"){
  // alert(this.socketData.value)
  this.queue_value = this.socketData.value;
}
}


get_color(){
  var k = JSON.parse(localStorage.getItem('color'));
  for(var i=0;i<=k.length;i++){
this.quesData.forEach(element=>{
  if(element.lngwatingcolor=='color1'){
    this.select_color1 = k[0].color1;
  }else{
    this.select_color1 = 'black'
  }
  if(element.lngwatingcolor=='color2'){
    this.select_color2 = k[0].color2;
  }else{
    this.select_color2 = 'black'
  }
  if(element.lngwatingcolor=='color3'){
    this.select_color3 = k[0].color3;
  }else{
    this.select_color3 = 'black'
  }
})
  }
// for(var i=0;i<=k.length;i++){
//   console.log(k[i].color_name)
//   if(item==k[i].color_name){
//     console.log(k[i].color1)
//     return '#'+k[i].color1;
//   }else{
//     return 'black';
//   }
// }
}

waiting_calls(){
  let api_req:any = '{"operation":"queue", "moduleType":"queue", "api_type": "web", "access_token":"'+localStorage.getItem('access_token')+'", "element_data":{"action":"get_witing_colors"}}'; 
  this.serverService.sendServer(api_req).subscribe((response:any)=>{
    if(response.result.status==true){
      this.colors_code = response.result.data; 
      for(var i=0; i<=this.colors_code.length;i++){
          this.colors_code.forEach(element => {
            if(element.id==1){
             this.select_color1= "#"+element.color_code;
            }else if(element.id==2){
              this.select_color2= "#"+element.color_code;
            }else if(element.id==3){
              this.select_color3= "#"+element.color_code;
            }
          });
      }
    }
  })
}
changeAgentsdata(){
  //console.log('caled')
  let socketData = $('#mrVoipAData_wall_ten').val(); 
  let mData = JSON.parse(socketData);

  this.agentsQueData = mData[0].data;
  console.log(this.agentsQueData)
  console.log(this.agentsQueData.sort((a, b) => a.agent.localeCompare(b.agent)));
 
  
}

loggedQueues(){
  let socketData = $('#logged_queues_ten').val(); 
  let mData = JSON.parse(socketData);
  this.logged_queues = mData[0].data;
}


changeQuesData(){
  let socketData = $('#mrVoipQData_ten').val(); 
  let mData = JSON.parse(socketData);
  this.quesData = mData[0].data;
  console.log(this.quesData)
}

sel_colors(){
  let api_req:any = '{"operation":"queue", "moduleType":"queue", "api_type": "web", "access_token":"", "element_data":{"action":"getSelected_times","admin_id":"'+localStorage.getItem('admin_id')+'"}}';
  this.serverService.sendServer(api_req).subscribe((response:any)=>{
    if(response.result.data!=''){
      var k = response.result.data;
    //  for(var i = 0;i<=k.length;i++){
    //   if(k[i]==1){
    //     this.colors_code.forEach(element => {
    //       if(element.id==k[i]){
    //         this.typeData = k[i];
    //       //  this.select_color1= "#"+element.color_code;
    //       }
    //     });
    //   }else if(k[i]==2){
    //     this.colors_code.forEach(element => {
    //       if(element.id==k[i]){
    //         this.typeData2 = k[i];
    //       //  this.select_color2= "#"+element.color_code;
    //       }
    //     });
    //   }else if(k[i]==3){
    //     this.colors_code.forEach(element => {
    //       if(element.id==k[i]){
    //         this.typeData3 = k[i];
    //       //  this.select_color3= "#"+element.color_code;
    //       }
    //     });
    //   }
    //  }
    }
  })
}
settings_call_waiting(){
  var soc_data = '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"getlngwtgcoldet"}]}]';
  this.websocket.send(soc_data)
$("#set_call_waiting_time").modal("show");
}
update_color_sett(){
  if(this.has_hard_id!=''){
    var sok_data = '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"lngwtgcolor","color1":"'+this.typeData+'","color2":"'+this.typeData2+'","color3":"'+this.typeData3+'"}]}]';
    this.websocket.send(sok_data);
    for(var i=0;i<=this.colors_code.length;i++){
      var colors_data = '[{"color1":"'+this.colors_code[0].color_code+'","color_id":"'+this.typeData+'","color_name":"color1"},{"color2":"'+this.colors_code[1].color_code+'","color_id":"'+this.typeData2+'","color_name":"color2"},{"color3":"'+this.colors_code[2].color_code+'","color_id":"'+this.typeData3+'","color_name":"color3"}]'
    localStorage.setItem('color',colors_data)
    }
  }
  if(this.typeData!=this.typeData2&&this.typeData2!=this.typeData3&&this.typeData3!=this.typeData){
    var k = this.typeData+","+this.typeData2+","+this.typeData3;
    let api_req:any='{"operation":"queue", "moduleType":"queue", "api_type": "web", "access_token":"'+localStorage.getItem('access_token')+'", "element_data":{"action":"insert_sel_colors","color_id":"'+k+'","admin_id":"'+localStorage.getItem('admin_id')+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any)=>{
      if(response.result.data==1){
        $("#set_call_waiting_time").modal("hide");
        iziToast.success({
          message: "Time Settings Updated",
          position: 'topRight'
          });
      }else{
        iziToast.error({
          message: "Some error occurred, Try again later",
          position: 'topRight'
          });
      }
    })
  }else{
    iziToast.error({
      message: "Please Select Different Times",
      position: 'topRight'
      });
  }
}
// gettime(){
// console.log(this.typeData)
// var k = []
// this.colors_code.forEach(element => {
//   if(element.id==this.typeData){
//    k= element.color_code;
//   }
// });
// for(var i=0;i<=k.length;i++){
//   this.select_color1 = '#'+k;
// }
// console.log(this.select_color1)
// this.colors_code.forEach(element => {
//   if(element.id==this.typeData2){
//    k= element.color_code;
//   }
// });
// for(var i=0;i<=k.length;i++){
//   this.select_color2 = '#'+k;
// }
// console.log(this.select_color2)
// this.colors_code.forEach(element => {
//   if(element.id==this.typeData3){
//    k= element.color_code;
//   }
// });
// for(var i=0;i<=k.length;i++){
//   this.select_color3 = '#'+k;
// }
// console.log(this.select_color3)
// }
qlog(){
  let socketData = $('#qlog_ten').val(); 
  let mData = JSON.parse(socketData);
  mData= mData[0].data;
  var data = mData;
  var extension = data[0].extension+'_reason';
  var state = data[0].extension+'_state';
  var status = data[0].status;
  var reason = data[0].reason;
  if(status == '0'){
    $('#'+extension).text(reason);
    $('#'+state).html('<span class="presence out_of_office"></span>AUX');
  } else {
    $('#'+extension).text('');
    $('#'+state).html('<span class="presence available"></span>Available');
  }

}


single_agent(){
  let socketData = $('#single_agent_ten').val(); 
  let mData = JSON.parse(socketData);
  var single_agent = mData[0].data;

  var anum = single_agent[0].agent_no+'_no';
  var aname = single_agent[0].agent_no+'_agent';
  var aanswerd= single_agent[0].agent_no+'_answerd';
  var staus= single_agent[0].agent_no+'_staus';
  var aavg_talking = single_agent[0].agent_no+'_avg_talking';
  var aincall = single_agent[0].agent_no+'_incall';
  var amissed = single_agent[0].agent_no+'_missed';
  var astate = single_agent[0].agent_no+'_state';
  var areason = single_agent[0].agent_no+'_reason';
  var astime = single_agent[0].agent_no+'_stime';
  var call_in_q = single_agent[0].agent_no+'_call_in_q';

  $('#'+anum).html(single_agent[0].agent_no);
  $('#'+aname).html(single_agent[0].single_agent);
  $('#'+aanswerd).html(single_agent[0].answerd);
  $('#'+staus).html(single_agent[0].state);
  $('#'+aavg_talking).html(single_agent[0].avg_talking);
  $('#'+aincall).html(single_agent[0].incall);
  $('#'+amissed).html(single_agent[0].missed);
  $('#'+astate).html(single_agent[0].state);
  $('#'+astime).html(single_agent[0].stime);
  $('#'+call_in_q).html(single_agent[0].callinqueue);

  if(single_agent[0].reg == '1'){
    $('#'+anum).html('<span class="presence available"></span>'+single_agent[0].agent_no);
  }else{
    $('#'+anum).html('<span class="presence out_of_office"></span>'+single_agent[0].agent_no);
  }
  if(single_agent[0].state == 'Available'){
    $('#'+astate).html('<span class="presence available"></span>Available');
  } else if(single_agent[0].state == 'Away'){
    $('#'+astate).html('<span class="presence away"></span>Away');
  } else if(single_agent[0].state == 'Out of office'){
    $('#'+astate).html('<span class="presence out_of_office"></span>Out of office');
  } else if(single_agent[0].state == 'Do Not Disturb'){
    $('#'+astate).html('<span class="presence wash-room"></span>Do Not Disturb');
  } else if(single_agent[0].state == 'Lunch'){
    $('#'+astate).html('<span class="presence meeting"></span>Lunch');
  } 
  else if(single_agent[0].state == 'Busy'){
    $('#'+astate).html('<span class="presence busy"></span>Busy');
  } else if(single_agent[0].state == 'Business Trip'){
    $('#'+astate).html('<span class="presence out_of_office"></span>Business Trip');
  }  else{
    $('#'+astate).html('<span class="presence out_of_office"></span>AUX');
  }
  $('#'+areason).html(single_agent[0].reason);

}









single_queue(){
  let socketData = $('#single_queue_ten').val(); 
  let mData = JSON.parse(socketData);
  var single_queue = mData[0].data;
  var colo_local = JSON.parse(localStorage.getItem('color'));
  for(var i=0;i<=colo_local.length;i++){
    if(single_queue[0].lngwatingcolor==colo_local[i].color_name){
      console.log(colo_local[i])
      const v = document.getElementById(single_queue[0].queue_no+'_qlwaiting');
      if(colo_local[i].color_name=="color1"){
        v.style.color= '#'+colo_local[i].color1;
        console.log(this.select_color1)
      }else{
        this.select_color1
      }
      if(colo_local[i].color_name=="color2"){
        v.style.color = '#'+colo_local[i].color2;
        console.log(this.select_color2)
      }else{
        this.select_color1
      }
      if(colo_local[i].color_name=="color3"){
        v.style.color = '#'+colo_local[i].color3;
        console.log(this.select_color3)
      }else{
        this.select_color1
      }
    }
  }

  var aname = single_queue[0].queue_no+'_queue_name';
  var p_anscall= single_queue[0].queue_no+'_p_anscall';
  var qanswerd = single_queue[0].queue_no+'_qanswerd';
  var aavg_talking = single_queue[0].queue_no+'_avg_talking';
  var qmissed = single_queue[0].queue_no+'_qmissed';
  var qlwaiting = single_queue[0].queue_no+'_qlwaiting';
  var acallwaiting = single_queue[0].queue_no+'_callwaiting';
  var aavgwaiting = single_queue[0].queue_no+'_avgwaiting';
  var aavalagnt = single_queue[0].queue_no+'_avalagnt';
  var abusyagent = single_queue[0].queue_no+'_busyagent';
  var answerd = single_queue[0].queue_no+'_answerd';
  

  $('#'+aname).html(single_queue[0].single_queue_name); 
  $('#'+p_anscall).html(single_queue[0].p_anscall);
  $('#'+qanswerd).html(single_queue[0].answerd);
  $('#'+aavg_talking).html(single_queue[0].avg_talking);
  $('#'+qmissed).html(single_queue[0].missed);
  $('#'+qlwaiting).html(single_queue[0].lngwaiting);
  $('#'+acallwaiting).html(single_queue[0].callwaiting);
  $('#'+aavgwaiting).html(single_queue[0].avgwaiting);
  $('#'+aavalagnt).html(single_queue[0].avalagnt);
  $('#'+abusyagent).html(single_queue[0].busyagnt);
  $('#'+answerd).html(single_queue[0].answerd);
}


slectAllQue(){
  if($("#selectAllQ").prop("checked")) {
    $(".queues_check").prop("checked", true);
} else {
    $(".queues_check").prop("checked", false);
} 
}
slectuniqueque(){
  $("#selectAllQ").prop("checked", false);
}


slectAllagent(){
  if($("#slectAllagent").prop("checked")) {
    $(".agents_check").prop("checked", true);
} else {
    $(".agents_check").prop("checked", false);
} 
}
slectuniqueagent(){
  $("#slectAllagent").prop("checked", false);
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
          message: "Your Licence Key May expired!.. Please enter your key or contact admin",
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


  getagentsdata(){
    let access_token: any=localStorage.getItem('access_token');
    
    let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_agent_data","user_id":"'+this.loginUser+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any) => {
     
     this.extension=response.result.data.sip_login;
    
  },
  (error)=>{
    console.log(error);
});
}

tranferbutton(id,hard_id){    
  var options = {};
  $.map(this.agentsData,
      function(o) {options[o.agent_number] = o.agent_number +' '+o.agent_name;});
// console.log(options);
// console.log(this.agentsData);
const trans =   Swal.fire({
title: 'Select Extenstion',
input: 'select',
inputOptions:options,
inputPlaceholder: 'Select Extension',

confirmButtonText: 'Transfer',
showCancelButton: true,
}).then(function (inputValue) {
if (inputValue.value != "" && inputValue.value != null) {
        var transfer = '[{"cust_id":"'+hard_id+'","data":[{"Name":"calltransfer","callid":"'+id+'","extension":"'+inputValue.value+'"}]}]';
        $('#transfercall_ten').val(transfer);
        $('#transfercall_ten').click(); 
               }
   });
}

transfercall(){
var transfer =$('#transfercall_ten').val();
this.websocket.send(transfer);
}

callbargein(id,hard_id,ext){ 
var baregecall = '[{"cust_id":"'+hard_id+'","data":[{"Name":"bargein","Managerno":"'+ext+'","extension":"'+id+'"}]}]';
this.websocket.send(baregecall);
}

callwhisper(id,hard_id,ext){
            var data = '[{"cust_id":"'+hard_id+'","data":[{"Name":"whisper","Managerno":"'+ext+'","extension":"'+id+'"}]}]';
            this.websocket.send(data);
}

calllisten(id,hard_id,ext){
            var data = '[{"cust_id":"'+hard_id+'","data":[{"Name":"listen","Managerno":"'+ext+'","extension":"'+id+'"}]}]';
             this.websocket.send(data);
}


ScheduleReset(hard_id,val){
  // alert(val);
  // console.log(val);
  if(val == '' || val == undefined)
      val = "";
  var options = {"Daily":"Daily","Weekly":"Weekly","Monthly":"Monthly"}; 
// console.log(options);
const trans =   Swal.fire({
title: 'Schedule Queue Statistics Reset',
input: 'radio',
inputOptions:options,
inputPlaceholder: 'Select your Schedule',
confirmButtonText: 'confirm',
showCancelButton: true,
inputValue: val,
}).then(function (inputValue) {
if (inputValue.value != "" && inputValue.value != null) {
        var Schedule = '[{"cust_id":"'+hard_id+'","data":[{"Name":"wbschedulereset","option":"'+inputValue.value+'"}]}]';
        $('#Schedule_ten').val(Schedule);
        $('#Schedule_ten').click();       

               }else{
                iziToast.error({
                  message: "You have not selected any schedule",
                  position: 'topRight'
                  });
               }
   });
}

Schedulerst(){
  var transfer =$('#Schedule_ten').val();
  let mData = JSON.parse(transfer);

  this.queue_value = mData[0].data[0].option;
  // alert(this.queue_value);
  this.websocket.send(transfer);
  iziToast.success({
    message: "Queue reset was scheduled Successfully",
    position: 'topRight'
    });
  }
  
  showdoc(link){   
    this.doc_link=link;
   $("#document_model").modal('show');   
  }



}
