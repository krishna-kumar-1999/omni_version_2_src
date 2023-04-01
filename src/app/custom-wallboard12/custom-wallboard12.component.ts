import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'


@Component({
  selector: 'app-custom-wallboard12',
  templateUrl: './custom-wallboard12.component.html',
  styleUrls: ['./custom-wallboard12.component.css']
})
export class CustomWallboard12Component implements OnInit {

  websocket;
  socketData;
  user_type;
  loginUser;
  admin_id;
  has_hard_id;
  admin_permision;
  extension;
  has_admin = false;
  has_user = false;
  show_act_wall = false;
  call_offers;
  abandoned;
  slacount;
  call_waiting;
  queueData;

  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit(): void {

    this.user_type = localStorage.getItem('user_type');

    this.loginUser = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');

    this.user_type = localStorage.getItem('user_type');
    this.admin_permision = localStorage.getItem('admin_permision');
    this.extension = localStorage.getItem('ext_num');


    if (this.user_type == 'Admin' || this.admin_permision == '1') {
      this.has_admin = true;
    } else {
      this.has_admin = false;
      this.has_user = true;
    }
    // if(this.admin_permision ==1)
    //     this.user_admin= true;
    // else 
    //   this.user_admin= false;


    this.has_hard_id = localStorage.getItem('hardware_id');
    if (this.has_hard_id == "") {
      $("#addLicence").modal({ "backdrop": "static" });
      this.show_act_wall = true;
    } else {
      this.initSocket();
      // this.getagentsdata();
    }




  }

  
  sendOnload(){
    this.has_hard_id = localStorage.getItem('hardware_id');
    var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"onload","Type":"advance_wallboard_1"}]}]' ;
    this.websocket.send(socket_message);
   }
  
  


  initSocket() {
    this.has_hard_id = localStorage.getItem('hardware_id');

 
      this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");
      

    this.websocket.onopen = function (event) {
      $('#sendonload12').click();
      console.log('custom walboard 1 connected');
    }
    var self = this;
    this.websocket.onmessage = function (event) {
      // console.log(event.data);
      var result_message = JSON.parse(event.data);
      console.log(result_message);
      this.has_hard_id = localStorage.getItem('hardware_id');
      if (result_message[0].cust_id == this.has_hard_id) {
        // console.log('matched');
      } else {
        // console.log('not matched');
        return false;
      }

      var ext_no = localStorage.getItem('ext_num');


      if (result_message[0].data[0].type != undefined) {
        $('#mrVoipType12').val(event.data);
        $('#mrVoipType12').click();
      }      
      else if(result_message[0].data[0].queue_name!=undefined){

        $('#ques_list12').val(event.data); 
        $('#ques_list12').click();
      } else if(result_message[0].data[0].single_queue!=undefined){
        $('#single_queue12').val(event.data); 
        $('#single_queue12').click();
      } 

    }
    this.websocket.onerror = function (event) {
      console.log('error');
    }
    this.websocket.onclose = function (event) {
      console.log('close');
      console.log('Socket Disconnected.Reconnection will be attempted');
      $('#wallreconnect_socket').click();
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

  changeWallType(){
    let socketData = $('#mrVoipType12').val(); 
    let mData = JSON.parse(socketData);
    this.socketData = mData[0].data[0];


     var type = this.socketData.type;
    var val = this.socketData.value;

      if(type == 'total')
        this.call_offers = val;
        if(type == 'abandoned')
        this.abandoned = val;
        if(type == 'overallsla')
        this.slacount = val;
        if(type == 'waiting')
        this.call_waiting = val;
    
  }


  changeData(){

    let socketData = $('#ques_list12').val(); 
    let mData = JSON.parse(socketData);
    this.queueData = mData[0].data;
  }


  single_queue(){
    let socketData = $('#single_queue12').val(); 
    let mData = JSON.parse(socketData);
    var single_queue2 = mData[0].data;
  
    // [{"cust_id":"8C05-99D2-0563-BF38-6561-6DB1-8501-CC0D","data":[{"single_queue":"1","single_queue_name":"AU_Claims","queue_no":"8002","callwaiting":"0","avgwaiting":"00:00:00","answerd":"0","p_anscall":"0","missed":"0","avg_talking":"00:00:00","avalagnt":"1","busyagnt":"0","lngwaiting":"00:00:00","sla_count":"0","sla_per":"0","p_abandond":"0","total_call":"0"}]}]
    console.table(socketData);
  
    var total_call = single_queue2[0].queue_no+'12_total_call';
    var padandond = single_queue2[0].queue_no+'12_pabandond';
    var slapercent = single_queue2[0].queue_no+'12_sla_per';
    var callwaiting = single_queue2[0].queue_no+'12_callwaiting';
   
    $('#'+total_call).html(single_queue2[0].total_call); 
    $('#'+padandond).html(single_queue2[0].p_abandond);
    $('#'+slapercent).html(single_queue2[0].sla_per);
    $('#'+callwaiting).html(single_queue2[0].callwaiting);

  }
  



}
