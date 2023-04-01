import { Component, OnInit } from "@angular/core";
import { ServerService } from "../services/server.service";
import { Router } from "@angular/router";
declare var $: any;
declare var iziToast: any;
import Swal from "sweetalert2";

@Component({
  selector: "app-hp-agent-wall",
  templateUrl: "./hp-agent-wall.component.html",
  styleUrls: ["./hp-agent-wall.component.css"],
})
export class HpAgentWallComponent implements OnInit {
  mc_event_list;
  mc_queue_list;
  chatPageView = false;
  smsPageView = false;
  mailPageView = false;
  websocket;
  socketData;
  user_type;
  loginUser;
  admin_id;
  has_sms;
  has_chat;
  has_whatsapp;
  has_chatbot;
  has_e_ticket;
  has_i_ticket;
  has_fb;
  has_tele;
  has_line;
  chat_id;
  fb_sender_id;
  fb_chat_id;
  agentsData;
  whatsapp_type;
  wp_unoff = false;
  wp_off = false;
  h_int_chat;
  inst_id;
  has_supervisor;
  instance_value;
  i_id;
  doc_link;
  chatBot_URL;
  encAdmin;
  total_call_wait_user = 0;
  answerd_call_user = 0;
  abandoned_user = 0;
  total_calls_user = 0;
  has_hard_id;
  extension;
  show_caller_id;
  Qcalldatas;
  recordNotFound;
  show_supervisor = false;
  AllContactList;
  UserList3CX;
  constructor(private serverService: ServerService, private router: Router) {
    this.serverService.changeDetectionEmitter.subscribe(
      () => {
        //this.mcInitialize2("");
      },
      (err) => {}
    );
  }

  ngOnInit() {
    // alert('test')
    // this.hasContactAccess();
    // this.mcInitialize("");

    this.user_type = localStorage.getItem("user_type");
    this.loginUser = localStorage.getItem("userId");
    this.admin_id = localStorage.getItem("admin_id");
    this.has_sms = localStorage.getItem("has_sms");
    this.has_chat = localStorage.getItem("has_chat");
    this.has_whatsapp = localStorage.getItem("has_whatsapp");
    this.whatsapp_type = localStorage.getItem("whatsapp_type");
    this.has_chatbot = localStorage.getItem("has_chatbot");
    this.has_e_ticket = localStorage.getItem("has_e_ticket");
    this.has_i_ticket = localStorage.getItem("has_i_ticket");
    this.has_fb = localStorage.getItem("has_fb");
    this.has_tele = localStorage.getItem("has_telegram");
    this.has_line = localStorage.getItem("has_line");
    this.h_int_chat = localStorage.getItem("has_int_chat");
    this.encAdmin = localStorage.getItem("encAdmin");
    this.has_hard_id = localStorage.getItem("hardware_id");
    this.extension = localStorage.getItem("ext_num");
    this.show_caller_id = localStorage.getItem("show_caller_id");
    this.has_supervisor = localStorage.getItem("has_supervisor");

    if (this.has_supervisor == 1) {
      this.show_supervisor = true;
    } else {
      this.show_supervisor = false;
    }

    // if(this.user_type == 'Super Admin' || this.loginUser == '64'){

    // } else if(this.admin_id == '203'){
    //   this.viewMC("chat_view");
    // } else {
    //   this.viewMC("sms_view");
    // }
    if (this.has_whatsapp == "1") {
      if (this.whatsapp_type == "0") {
        this.wp_unoff = true;
      } else this.wp_off == true;
    }
    //  this.getadmininstance();
    this.chatBot_URL =
      "https://" + window.location.hostname + "/chatbot/?url=" + this.encAdmin;
    
    this.mcInitialize_for_GHL("");
     
    this.initSocket();
    this.getAllcontact();
    setTimeout(() => {
    this.UserList3CX =this.serverService.UserList3CX;    
    // if(!this.agentsData)
    // this.agentsData=this.serverService.UserList3CX;  
    }, 4000);
    console.log(this.UserList3CX)
  }
  initSocket() {
    var self = this;
    this.user_type = localStorage.getItem("user_type");
    this.loginUser = localStorage.getItem("userId");
    
    this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");

    this.websocket.onopen = function (event) {
      $("#sendonload_user").click();
      console.log("socket connected");
    };

    this.websocket.onmessage = function (event) {
      console.log(event.data);
      var result_message: any = JSON.parse(event.data);

      console.log(self.has_hard_id);
      console.log(result_message[0].cust_id);
      if (
        result_message.cust_id == self.has_hard_id ||
        result_message[0].cust_id == self.has_hard_id
      ) {
        console.log("matched");
      } else {
        console.log("not matched");
        return false;
      }

      if (result_message[0].data[0].type != undefined) {
        $("#mrVoipType_user").val(event.data);
        $("#mrVoipType_user").click();
      } else if (result_message[0].data[0].q_name != undefined) {
        if (
          result_message[0].data[0].q_name != "" &&
          result_message[0].data[0].q_name != null
        ) {
          $("#Qcalldatas").val(event.data);
          $("#Qcalldatas").click();
          $("#recordNotFound").val("check");
          $("#recordNotFound").click();
        } else {
          $("#recordNotFound").val("");
          $("#recordNotFound").click();
          $("#Qcalldatas").val();
          // $('#Qcalldatas').load();
        }
      }else if( result_message[0].data[0].agent_name!=undefined){
        $('#agent_list').val(event.data); 
        $('#agent_list').click();
      } 
    };
    this.websocket.onerror = function (event) {
      console.log("error");
    };
    this.websocket.onclose = function (event) {
      console.log("close");
      console.log("Socket Disconnected.Reconnection will be attempted");
      $("#reconnect_socket_4").click();
    };
  }

  checkMe(){
    this.recordNotFound = $('#recordNotFound').val();

    if(this.recordNotFound != 'check'){     
           this.Qcalldatas =[];
    }

  }

  changeAgents(){
    let socketData = $('#agent_list').val(); 
    let mData = JSON.parse(socketData);
    this.agentsData = mData[0].data;
    
  }

  tranferbutton(id,hard_id){    
    var options = {};
    //alert(this.agentsData)
    if(!this.agentsData){
   // alert('1')
       $.map(this.UserList3CX,function(o) {options[o.agent_no] = o.agent_no +' '+o.agent;});
    }
    else{
    //alert('2')
        $.map(this.agentsData,function(o) {options[o.agent_number] = o.agent_number +' '+o.agent_name;});
    }
   

    
  console.log(options);
  console.log(this.agentsData);
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
          $('#transfercall').val(transfer);
          $('#transfercall').click(); 
                 }
     });
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


  getadmininstance() {
    let access_token: any = localStorage.getItem("access_token");

    let api_req: any =
      '{"operation":"wp_instance", "moduleType": "wp_instance", "api_type": "web", "access_token":"' +
      access_token +
      '", "element_data":{"action":"getInstanceDetailsForAdmin","user_id":"' +
      this.loginUser +
      '","user_type":"' +
      this.user_type +
      '"}}';

    this.serverService.sendServer(api_req).subscribe(
      (response: any) => {
        if (response.status == true) {
          if (response.result.data.length)
            this.instance_value = response.result.data[0].wp_inst_id;

          // this.routedept=response.result.data.dept;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  Qcalldatasfunc(){
    let socketData = $('#Qcalldatas').val(); 
    let mData = JSON.parse(socketData);
      this.Qcalldatas = mData[0].data;
  }

  viewMC(mc_block) {
    if (mc_block == "mail_view") {
      // this.mailPageView = true;
      // this.chatPageView = false;
      // this.smsPageView = false;
      this.router.navigate(["/ticketing-system-new"]);
    }
    if (mc_block == "chat_view") {
      // this.chatPageView = true;
      // this.mailPageView = false;
      // this.smsPageView = false;

      this.router.navigate(["/chat"]);
    }
    if (mc_block == "sms_view") {
      // this.chatPageView = false;
      // this.mailPageView = false;
      // this.smsPageView = true;
      this.router.navigate(["/sms"]);
    }
    if (mc_block == "wp_view") {
      // this.chatPageView = false;
      // this.mailPageView = false;
      // this.smsPageView = true;
      if (this.wp_unoff) {
        this.i_id = btoa(this.instance_value);
        this.router.navigate(["/wp-unoff"], {
          queryParams: { wp_id: this.i_id },
        });
      } else {
        this.router.navigate(["/wp-chat"]);
      }
    }
    if (mc_block == "fb_view") {
      // this.chatPageView = false;
      // this.mailPageView = false;
      // this.smsPageView = true;
      this.router.navigate(["/fb-chat"]);
    }
    if (mc_block == "line_view") {
      // this.chatPageView = false;
      // this.mailPageView = false;
      // this.smsPageView = true;
      this.router.navigate(["/line-chat"]);
    }
    if (mc_block == "tele_view") {
      // this.chatPageView = false;
      // this.mailPageView = false;
      // this.smsPageView = true;
      this.router.navigate(["/tele-chat"]);
    }
    if (mc_block == "internal_chat") {
      // this.chatPageView = false;
      // this.mailPageView = false;
      // this.smsPageView = true;
      this.router.navigate(["/internal-chat"]);
    }
  }

  ViewEventDetails(event_type, event_id, wp_id) {
    if (event_type == 1) {
      this.chat_id = btoa(event_id);
      this.router.navigate(["/chat"], { queryParams: { c: this.chat_id } });
    } else if (event_type == 7) {
      this.fb_sender_id = btoa(event_id);
      this.router.navigate(["/fb-chat"], {
        queryParams: { c: this.fb_sender_id },
      });
    } else if (event_type == 5) {
      this.chat_id = btoa(event_id);
      this.inst_id = btoa(wp_id);
      // this.i_id= btoa(this.instance_value);
      // alert(this.inst_id);

      // if()
      if (this.wp_unoff) {
        this.router.navigate(["/wp-unoff"], {
          queryParams: { c: this.chat_id, wp_id: this.inst_id },
        });
      } else {
        this.router.navigate(["/wp-chat"], {
          queryParams: { c: this.chat_id },
        });
      }
    } else if (event_type == 6) {
      this.chat_id = btoa(event_id);

      this.router.navigate(["/sms"], { queryParams: { c: this.chat_id } });
    } else if (event_type == 8) {
      this.chat_id = btoa(event_id);
      this.router.navigate(["/internal-chat"], {
        queryParams: { c: this.chat_id },
      });
    } else if (event_type == 9) {
      this.chat_id = btoa(event_id);
      this.router.navigate(["/line-chat"], {
        queryParams: { l: this.chat_id },
      });
    } else if (event_type == 10) {
      this.chat_id = btoa(event_id);
      this.router.navigate(["/tele-chat"], {
        queryParams: { c: this.chat_id },
      });
    } else if (event_type == 11) {
      this.chat_id = btoa(event_id);
      if (this.chat_id != null && this.chat_id != "")
        this.router.navigate(["/ticket-view-thread"], {
          queryParams: { ticket_id: this.chat_id },
        });
    }
  }

  hasContactAccess() {
    let api_req: any = new Object();
    let conct_req: any = new Object();
    conct_req.action = "has_contact_access";
    conct_req.user_id = localStorage.getItem("userId");
    api_req.operation = "contact";
    api_req.moduleType = "contact";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem("access_token");
    api_req.element_data = conct_req;
    // console.log(api_req);
    this.serverService.sendServer(api_req).subscribe(
      (response: any) => {
        if (response.result.data.has_internal_chat == 1) {
          this.h_int_chat = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showdoc(link) {
    this.doc_link = link;
    $("#document_model").modal("show");
  }
  changeWallType() {
    let socketData = $("#mrVoipType_user").val();
    let mData = JSON.parse(socketData);
    this.socketData = mData[0].data[0];

    // if(this.socketData.type =="awb5_waiting"){
    if (this.socketData.type == "waiting") {
      this.total_call_wait_user = this.socketData.value;
    }
    // else if(this.socketData.type =="awb5_answered"){
    else if (this.socketData.type == "answered") {
      this.answerd_call_user = this.socketData.value;
    }
    // else if(this.socketData.type =="awb5_abandoned"){
    else if (this.socketData.type == "abandoned") {
      this.abandoned_user = this.socketData.value;
    }
    // else if(this.socketData.type =="awb5_total"){
    else if (this.socketData.type == "total") {
      this.total_calls_user = this.socketData.value;
    }
  }
  sendonloadUser() {
    // var socket_message  =  '[{"Name":"onload"}]';
    var socket_message =
      '[{"cust_id":"' +
      this.has_hard_id +
      '","data":[{"Name":"user_onload","Type":"basic_wallboard"}]}]';
    this.websocket.send(socket_message);
  }

  mcInitialize_for_GHL(search_text) {
    //only get recent Calls
    Swal.fire({
      html:
        '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      background: "transparent",
    });
    let api_req: any = new Object();
    let dialpad_req: any = new Object();
    api_req.operation = "call";
    api_req.moduleType = "call";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem("access_token");
    dialpad_req.user_id = localStorage.getItem("userId");
    dialpad_req.search_text = "";
    dialpad_req.order_by_name = "id";
    dialpad_req.order_by_type = "desc";
    dialpad_req.admin_id = this.admin_id;
    dialpad_req.extension = this.extension;
    dialpad_req.action = "recent_call_list";
    dialpad_req.limit = 50;
    dialpad_req.offset = 0;

    api_req.element_data = dialpad_req;

    this.serverService.sendServer(api_req).subscribe(
      (response: any) => {
        Swal.close();
        if (response.result.status == 1) {
          setTimeout(() => {
          this.mc_event_list = response.result.data.list_data;            
          }, 4000);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  GetContactName(number) {   
    var agent_3cx;
    if(this.UserList3CX)
        agent_3cx = this.UserList3CX.filter(item => item.agent_no == number); 
     else
        return ''
   
    if(agent_3cx.length>0){ 
      return agent_3cx[0].agent;  
    }else{
    if(this.AllContactList)
    var myItems = this.AllContactList.find(item => item.phone === number|| item.mobile === number);
   // console.log(myItems.length)
   if(myItems!=undefined){        
       return myItems.first_name;
   }else
   return ''
  }
 }
 getAllcontact(){
   //   if(this.AllContactList)
   //   return false;
let access_token: any=localStorage.getItem('access_token');

let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"whole_contact_list","admin_id":"'+this.admin_id+'"}}';

this.serverService.sendServer(api_req).subscribe((response:any) => {
if(response.result.status==true){
   this.AllContactList=response.result.data
}
}, 
(error)=>{
 // console.log(error);
});
}
}
