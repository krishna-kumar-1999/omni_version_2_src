import { Input, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';


declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cx-agent-list',
  templateUrl: './cx-agent-list.component.html',
  styleUrls: ['./cx-agent-list.component.css']
})
export class CxAgentListComponent implements OnInit {

  websocket;
  socketData;
  has_hard_id;
  admin_id;
  user_type;
  loginUser;
  admin_permision;
  extension;
  searchValue;
  filterDatas;
  agentsQueData;
  show_caller_id;
  showontype = false;
  groupList;
  view_name = 'All';
  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.user_type = localStorage.getItem('user_type');
    this.loginUser = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');
  
    this.user_type = localStorage.getItem('user_type');
    this.admin_permision = localStorage.getItem('admin_permision');
    this.extension = localStorage.getItem('ext_num');

    this.has_hard_id = localStorage.getItem('hardware_id');
    this.show_caller_id = localStorage.getItem('show_caller_id');
    if(this.has_hard_id == ""){
        // $("#addLicence").modal({"backdrop": "static"});
        // this.show_act_wall = true;
    } else {
      this.initSocket();
      // this.getagentsdata();
    }

    console.log(this.serverService.UserList3CX);
    setTimeout(() => {
    var test =this.serverService.UserList3CX.filter( (p) => p.reg == '1');  
   
    this.agentsQueData = test.sort((a, b) => a.agent_no.localeCompare(b.agent_no));
   this.filterDatas =this.serverService.UserList3CX;
    }, 1500);
   

   console.log(this.filterDatas);
   
   if(this.serverService.UserList3CX == 'undefined' || this.serverService.UserList3CX == null || this.serverService.UserList3CX == 'null'){
    $('#sendonload').click();
   }

   console.log(this.agentsQueData);

this.grouplist();

  }


  initSocket(){
  
    this.has_hard_id = localStorage.getItem('hardware_id');
   var self=this.admin_id;
    
      this.websocket = new WebSocket("wss://"+window.location.hostname+":4010"); 
   
    
    this.websocket.onopen = function(event) { 
      // $('#sendonload').click();
      console.log('agent connected');
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

       if( result_message[0].data[0].single_agent!=undefined){
        $('#single_agent').val(event.data); 
        $('#single_agent').click();
      } else if(result_message[0].data[0].ano!=undefined){
        $('#mrVoipAData').val(event.data); 
        $('#mrVoipAData').click();
      }


    }
    this.websocket.onerror = function(event){
      console.log('error');
    }
    this.websocket.onclose = function(event){     
      console.log('Socket Disconnected.Reconnection will be attempted');
      $('#reconnect_socketwal').click();
      // this.initSocket();
    } 
    
  }



changeAgentsdata(){
  //console.log('caled')
  let socketData = $('#mrVoipAData').val(); 
  let mData = JSON.parse(socketData);

  this.agentsQueData = mData[0].data;
  this.filterDatas = mData[0].data;
  console.log(this.agentsQueData)
  console.log(this.agentsQueData.sort((a, b) => a.agent_no.localeCompare(b.agent_no)));
 
  
}



sendOnload(){
  var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"user_list","Type":"agent_details"}]}]';
  this.websocket.send(socket_message);
 }


 searchfilter(){
  //  const result = this.filterDatas.filter(word => word.agent_no.includes( this.searchValue) );
  let result;

console.log(this.filterDatas);

  if(this.searchValue != null && this.searchValue != undefined && this.searchValue != ''){
    result= this.filterDatas.filter( (p) => p.agent_no.includes(this.searchValue) || p.agent.toLowerCase().includes( this.searchValue.toLowerCase()));
    this.showontype = true;
    // console.log(result);
  }else{
    var sort = this.filterDatas.filter( (p) => p.reg == '1');     
    result = sort.sort((a, b) => a.agent_no.localeCompare(b.agent_no));
    this.showontype = false;
  }

   this.agentsQueData = result;
 
 }


 clictToCall(to) {
  // if(to == 'phone'){  this.to_num = $('#phone').val(); } else {  this.to_num = $('#mobile').val(); }
  if (to == '') {
    iziToast.warning({
      message: "No Number To Call",
      position: 'topRight'
    });
  } else {
    let access_token: any = localStorage.getItem('access_token');
    var extention = localStorage.getItem('ext_int_status');
    // alert(extention);
    if (extention == '2') {
      // let api_reqs: any = '{"type": "makecall", "number": "' + to + '","show_caller_id":"' + this.show_caller_id + '"}';
      let api_reqs: any = '{"type": "makecallagent", "number": "' + to + '","show_caller_id":"' + this.show_caller_id + '"}';
      this.serverService.show.next(api_reqs);
    } else {
      let api_reqs: any = '{"type": "makecallauto", "number": "' + to + '"}';
      this.serverService.show.next(api_reqs);
    }

  }
}


single_agent(){
  let socketData = $('#single_agent').val(); 
  let mData = JSON.parse(socketData);
  var single_agent = mData[0].data;

  var anum = single_agent[0].agent_no+'_no';
  var aname = single_agent[0].agent_no+'_agent';
  // var aanswerd= single_agent[0].agent_no+'_answerd';
  // var aavg_talking = single_agent[0].agent_no+'_avg_talking';
  // var aincall = single_agent[0].agent_no+'_incall';
  // var amissed = single_agent[0].agent_no+'_missed';
  var astate = single_agent[0].agent_no+'_states';
  var anewstate = single_agent[0].agent_no+'_newstates';
  var amail = single_agent[0].agent_no+'_mailids';
  // var areason = single_agent[0].agent_no+'_reason';
  // var astime = single_agent[0].agent_no+'_stime';

  $('#'+anum).html(single_agent[0].agent_no);
  $('#'+aname).html(single_agent[0].single_agent);
  $('#'+amail).html(single_agent[0].agentemail);
  // $('#'+aanswerd).html(single_agent[0].answerd);
  // $('#'+aavg_talking).html(single_agent[0].avg_talking);
  // $('#'+aincall).html(single_agent[0].incall);
  // $('#'+amissed).html(single_agent[0].missed);
  $('#'+astate).html(single_agent[0].state);
  // $('#'+astime).html(single_agent[0].stime);

  // if(single_agent[0].reg == '1'){
  //   $('#'+anum).html('<span class="presence available"></span>'+single_agent[0].agent_no);
  // }else{
  //   $('#'+anum).html('<span class="presence out_of_office"></span>'+single_agent[0].agent_no);
  // }
  // alert(single_agent[0].state)
  // alert(single_agent[0].agent_no)
  // alert(single_agent[0].state)
  
  if(single_agent[0].state == 'Available'){
    $('#'+anewstate).html('<span class="agent-new-status available">Available</span>');
    $('#'+astate).html('<span class="presence circle-state available"></span>');
  } else if(single_agent[0].state == 'Away'){
    // $('#'+astate).html('<span class="presence circle-state away"></span>Away');
    $('#'+anewstate).html('<span class="agent-new-status away">Away</span>');
    $('#'+astate).html('<span class="presence circle-state away"></span>');
  } else if(single_agent[0].state == 'Out of office'){
    // $('#'+astate).html('<span class="presence circle-state out_of_office"></span>Out of office');
    $('#'+anewstate).html('<span class="agent-new-status out_of_office">Out of office</span>');
    $('#'+astate).html('<span class="presence circle-state out_of_office"></span>');
  } else if(single_agent[0].state == 'Do Not Disturb'){
    // $('#'+astate).html('<span class="presence circle-state wash-room"></span>Do Not Disturb');
    $('#'+anewstate).html('<span class="agent-new-status wash-room">Do Not Disturb</span>');
    $('#'+astate).html('<span class="presence circle-state wash-room"></span>');
  } else if(single_agent[0].state == 'Lunch'){
    // $('#'+astate).html('<span class="presence circle-state meeting"></span>Lunch');
    $('#'+anewstate).html('<span class="agent-new-status meeting">Lunch</span>');
    $('#'+astate).html('<span class="presence circle-state meeting"></span>');
  } 
  else if(single_agent[0].state == 'Busy'){
    
    // $('#'+astate).html('<span class="presence circle-state busy"></span>Busy');
    $('#'+anewstate).html('<span class="agent-new-status busy">Busy</span>');
    $('#'+astate).html('<span class="presence circle-state busy"></span>');
  } else if(single_agent[0].state == 'Business Trip'){
    // $('#'+astate).html('<span class="presence circle-state out_of_office"></span>Business Trip');
    $('#'+anewstate).html('<span class="agent-new-status out_of_office">Business Trip</span>');
    $('#'+astate).html('<span class="presence circle-state out_of_office"></span>');
  }  else{
    // $('#'+astate).html('<span class="presence circle-state out_of_office"></span>AUX');
    $('#'+anewstate).html('<span class="agent-new-status out_of_office">AUX</span>');
    $('#'+astate).html('<span class="presence circle-state out_of_office"></span>');
  }
  // $('#'+areason).html(single_agent[0].reason);

}


clearText(){
 
  this.searchValue='';
  this.searchfilter();
}

grouplist(){
  // {"operation": "call","moduleType":"call","api_type":"web","access_token":"","element_data":{"action":"list3cx_group_details","admin_id":"1359","extension_no":"12000"}}

  let access_token: any=localStorage.getItem('access_token');
  let api_req: any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"list3cx_group_details","admin_id":"'+this.admin_id+'","extension_no":"'+this.extension+'"}}';


  this.serverService.sendServer(api_req).subscribe((response: any) => {

    if(response.result.status == true){
      this.groupList = response.result.data;
    }

  },
  (error) => {
    console.log(error);
  });

}


changeMylayout(id,grpname) {
  var result;
 if(id=='All'){
  var sort = this.filterDatas.filter( (p) => p.reg == '1');     
  this.agentsQueData = sort.sort((a, b) => a.agent_no.localeCompare(b.agent_no));
    
 }
else{
  let sort =  this.filterDatas.filter( (p) => p.agentgrpid.split(',').includes(id));
  this.agentsQueData= sort.filter( (p) => p.reg == '1'); 
  this.showontype = true;

}

this.view_name = grpname;
    
    // return result;

}

toChat(){
  var urldata = "notify_chat";
  this.router.navigate(['/cx-webclient'], { queryParams: { queue: urldata } });
}

}
