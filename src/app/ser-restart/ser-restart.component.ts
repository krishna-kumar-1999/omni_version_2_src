import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2'
declare var iziToast:any;
declare var $:any;
@Component({
  selector: 'app-ser-restart',
  templateUrl: './ser-restart.component.html',
  styleUrls: ['./ser-restart.component.css']
})
export class SerRestartComponent implements OnInit {

  constructor(private serverservice : ServerService) { }
  list_data;
  selectedPersonArray:any=[];
  sel_values:any;
  select_row: Set<number> = new Set<number>();
  checkedRows: any = [];
  confg_btn=false;
  websocket;
  ngOnInit(): void {
    this.config_button();
    this.get_service_status();
    this.initsocket();
  }
  initsocket() {
   
      this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");
      // this.websocket = new WebSocket("wss://developtesting.my3cx.sg:4010");
  var self = this;
    this.websocket.onopen = function (event) {
      $('#sendonload').click();
      console.log('agent socket connected');
    }

    this.websocket.onmessage = function (event) {
      var result_message = JSON.parse(event.data);
console.log(result_message.action);
if(result_message.action=='response-startMrvoip'){
  self.get_service_status();
}else if(result_message.action=='response-startWebrtc'){
  self.get_service_status();
}else if(result_message.action=='response-stopMrvoip'){
  self.get_service_status();
}else if(result_message.action=='response-stopWebrtc'){
  self.get_service_status();
}else if(result_message.action=='response-restartMrVoip'){
  self.get_service_status();
}else if(result_message.action=='response-restartwebrtcService'){
  self.get_service_status();
}
    }
    this.websocket.onerror = function (event) {
      Swal.close();

      console.log('error');
    }
    this.websocket.onclose = function (event) {
      Swal.close();

      console.log('close');
    }
  }
  service_list(){
    setTimeout(() => {
      this.list_data = [
        { name: 'Mr.VoIP',action_name:'restartMrvoipService',port:""},
        // { name: 'nginx',action_name:'restartServerService',port:"4001"},
        { name: 'Webrtc',action_name:'restartwebrtcService',port:""},
        // { name: 'Websocket',action_name:'restartwebsocketService',port:"4010"},
        // { name: 'Notification Socket',action_name:'restartnotificationsocketService',port:"4011"}
      ];
    }, 2000);
  }
  config_b()
{
  $("#add_config").modal("show")
}  
config_button(){
    let api_req:any='{"action":"get_fqdn_user_details"}';
    this.serverservice.get_serves_status(api_req).subscribe((response:any)=>{
      console.log(response);
      if(response.data!=''){
        if(response.data.name==''&&response.data.pass==''){
          this.confg_btn=true;
        }else{
          this.confg_btn=false;
        }
      }
    })
  }
  submit(){
    var user_name = $("#user_name").val();
    var password = $("#pass_word").val();
    var port = $("#port").val();
    if(user_name==''||user_name==undefined||user_name==null||user_name=='undefined'||user_name=='null'){
      iziToast.warning({
        message: "Please enter your user name",
        position: 'topRight'
    });
    return false;
    }
    if(password==''||password==undefined||password==null||password=='undefined'||password=='null'){
      iziToast.warning({
        message: "Please enter your password",
        position: 'topRight'
    });
    return false;
    }
    if(port==''||port==undefined||port==null||port=='undefined'||port=='null'){
      iziToast.warning({
        message: "Please enter your port number",
        position: 'topRight'
    });
    return false;
    }
    let api_req:any='{"action":"restartMrvoipService","uname":"root","pass":"?uniquE@@123","port":"22"}';
    this.serverservice.get_serves_status(api_req).subscribe((response:any)=>{
      console.log(response);
      if(response.status==true){
        iziToast.success({
          message: "successfully configure",
          position: 'topRight'
      });
      $("#add_config").modal("hide")
      this.config_button();
      }
    })
  }
  start(val){
    console.log(this.sel_values);
    var k = this.sel_values.split(',');
    for(var i=0;i<=k.length-1;i++){
      console.log(k[i]);
      var action;
      if(val=='start'){
        if(k[i]=='restartMrvoipService'){
          action = '{"action":"startMrvoip"}';
        }else if(k[i]=='restartwebrtcService'){
          action = '{"action":"startWebrtc"}';
        }
      }else if(val=='stop'){
        if(k[i]=='restartMrvoipService'){
          action = '{"action":"stopMrvoip"}';
        }else if(k[i]=='restartwebrtcService'){
          action = '{"action":"stopWebrtc"}';
        }
      }else{
        if(k[i]=='restartMrvoipService'){
          action = '{"action":"restartMrVoip"}';
        }else if(k[i]=='restartwebrtcService'){
          action = '{"action":"restartwebrtcService"}';
        }
      }
      this.websocket.send(action);
    }
    return false;
    let api_req:any='{"action":"services_datas","services_name":"'+this.sel_values+'","service_type":"'+val+'"}';
    this.serverservice.get_serves_status(api_req).subscribe((response:any)=>{
      console.log(response);
      if(response.data!=''){
        iziToast.success({
          message: "Service Successfully "+val,
          position: 'topRight'
      });
      this.get_service_status();
      }
    })
  }
  get_service_status(){
    let api_req:any = '{"action":"get_all_service_status"}';
    this.serverservice.get_serves_status(api_req).subscribe((response:any)=>{
      console.log(response);
      if(response.data!=''){
        this.list_data = response.data;
      }
    })
  }
  // toggleItemInArr(arr, item) {
  //   console.log(arr)
  //   const index = arr.indexOf(item);
  //   index === - 1 ? arr.push(item) : arr.splice(index, 1);
  // }
  
  // addThisPersonToArray(person: any, event) {
  //   if (!event.ctrlKey) {
  //     this.selectedPersonArray = [];
  //     this.sel_values = person;
  //   }
  //   this.toggleItemInArr(this.selectedPersonArray, person);
  //   this.sel_values = this.selectedPersonArray.map(x=>x).join(",");
  //   console.log(this.sel_values)
  // }
  
  // isPersonSelected(person: any) {
  //   return this.selectedPersonArray.indexOf(person) !== -1;
  // }
  addThisPersonToArray(person: any, event){
    
  if(this.select_row.has(person)) {
    this.select_row.delete(person);
    const index: number = this.selectedPersonArray.indexOf(person);
    if (index !== -1) {
        this.selectedPersonArray.splice(index, 1);
    }        
    
   }
   else {
     this.select_row.add(person);
     var result = this.list_data.map(id => id.action_name).join(',');
    var k = result.split(',')
    for(var i=0;i<=k.length;i++){
      if(k[i]==person){
this.selectedPersonArray.push(person);
      }
    }
   }
   this.sel_values = this.selectedPersonArray.map(x=>x).join(",");
    console.log(this.sel_values)

  }
  isPersonSelected(person: any) {
    return this.select_row.has(person);
  }
}
