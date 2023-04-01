import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
// import Icon from '../../../assets/images/wallboard/call.svg';
import Swal from 'sweetalert2'

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EditContactsComponent } from '../../edit-contacts/edit-contacts.component';
declare var $:any;
declare var doCall: any;
declare var transferCall: any;
declare var init_page: any;
declare var getinStatusV2: any;
declare var iziToast:any;
declare var outgoingCallEnd:any;
declare var makecallTransfer:any;
declare var makecallTransfer2:any;
declare var doCall3:any;
declare var getwebrtc:any;
declare var doHangup:any;
declare var sendDtmf:any;
declare var keepAliveNew:any;
declare var addHelpers:any;
declare var doCallATT:any;
declare var endHeplCall:any;
declare var doVideoCall: any;


// ================== SCREEN RECORDING NEEDED PACKAGES START ==================

import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
declare var $:any;
interface RecordedVideoOutput {
  blob: Blob;
  url: string;
  title: string;
}
// ================== SCREEN RECORDING NEEDED PACKAGES END ==================

@Component({
  selector: 'app-dialpad',
  templateUrl: './dialpad.component.html',
  styleUrls: ['./dialpad.component.css'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})


export class DialpadComponent implements OnInit {

    // =========== SCREEN RECORDING VAR DECLARATION STARTS ============
    private stream: any;
    private recorder: any;
    private interval: any;
    private startTime: any;
    private _stream = new Subject<MediaStream>();
    private _recorded = new Subject<RecordedVideoOutput>();
    private _recordedUrl = new Subject<string>();
    private _recordingTime = new Subject<string>();
    private _recordingFailed = new Subject<string>();

    // =========== SCREEN RECORDING VAR DECLARATION ENDS ============

    dialPadContainer;
    quelogged;
    inc_or_out;
    callBalance;
    queLogStatus;
	dialPadCirclePlus;
	dialPadRefresh;
	dialPadActionview;
	totalSeconds;
 	callduration_timer;
 	dialpadRecentCalls;
 	dialpadOutgoingCalls;
 	dialpadIncomingCalls;
     dtmf = false;
 	dialpadIncomingCallsProgress;
 	dialpadUserList;
     callDetailView;
     admincallBalance;
    userDetailView;
    sip_login;
    sip_authentication;
    sip_password;
    sip_port;
    sip_url;
    call_history_id;
    uadmin_id;
    key;
    dial_status;
    auxcodesM;
    redyForCall;
    loginUser;
    websocket;
    extension;
    has_hard_id;
    in_current_call = '';
    show_end_helper=false;
    forwordPopup ='notforword';
//For AttTrans
    forwordPopup2 ='notforword';
    dtmf2 = false;
    public isVisible: boolean = false;
    show_caller_id;
    survey_vid;
    allmyQues;
    ext_num;
    admin_id;
    dialpadOpen=false;
    ring_step;
    has_autoanswer;
    ring_tone;
    call_accepted =false;
    call_declined =false;
    endBycus=false;
    dialer_register;
    isDisabled = false;
    isDisabledButton = false;
    user_type;
    connect_count=1;
    regis;
    caller_no;
    getNums;
    showWrapUp =false;
    call_type;
    temp_status;
    produitsFiltres;
    atttransferList;
    show_minimize_button = false;
    calleridList;
    cli_status;
    Caller_function;
    webmakecall_parameter;
    voicemail_list: any;
    testing;
    vmcount;
    AllContactList;
    aud_status = true;
    scr_status = true;
    dirtransfer='number_list';
    contransfer = 'number_list';
    @Output() public found = new EventEmitter<any>();
    auxcode_list: any;
    dialpadUserListdummy: any;
    tcx_contact: void;
    show = true;
  	constructor(public serverService: ServerService, public modalService: NgbModal,private router:Router,private http:HttpClient) {

       this.serverService.show.subscribe( (val:any) => 
       {
       
        var dpContent = JSON.parse(val);
        console.log(dpContent);
        if(dpContent.type == "makecall"){
            var caller_if = dpContent.show_caller_id;            
          console.log($('#newCallNMumberCamp').val(dpContent.number));
             this.webMakeCall3(caller_if);
        } else if(dpContent.type == "makecallauto"){
            this.makecallauto(dpContent.number)
        }
        else if(dpContent.type == "logoutClick"){
           this.logoutClick();
        }else if(dpContent.type == "makecallagent"){
            var caller_if = dpContent.show_caller_id;            
            console.log($('#newCallNMumberCamp').val(dpContent.number));
               this.webMakeCallAgent(caller_if);
        }
     if(dpContent.type == "HookRegister"){
            // alert('qwqwqwq')
        
                   this.pbxSettings();
                  // this.queueStatus();
         }
        
        
        if(dpContent.type == "queLoginOut"){

                let api_reqs:any = '{"type": "queLoginOut","status":"'+this.queLogStatus+'"}';
                this.serverService.qLogin.next(api_reqs);

        //this.q_logout(dpContent.status);
        }

        if(dpContent.type == "hidepopupdialer"){
            this.dialPadClose();
        }
        if(dpContent.type == "showpopupdialer"){
            this.dialPadOpen();
        }

       });
       
       this.serverService.minimize.subscribe( (val:any) => {

         let viewContent = JSON.parse(val);
        if(viewContent.type == "minimize"){
            this.getNums = localStorage.getItem('income_calls_num');
            if(localStorage.getItem('call_end_status')=='1'){
                this.show_minimize_button = false;
                localStorage.setItem('call_end_status','0');
            }else{
                this.show_minimize_button = true;
            }
            
        }else{
            this.show_minimize_button = false;
        }

        if(viewContent.type == "attendincomingCall"){
            this.getNums = localStorage.getItem('income_calls_num');
            this.incomingCallAccept(this.getNums);
        }
        
        if(viewContent.type == "declineincomingCall"){
            this.incomingCallDecline();
        }
        if(viewContent.type == "updatewrapupCode"){
            this.addWrapupcode(viewContent.call_type,viewContent.aux_code,viewContent.cat_id,viewContent.call_note,viewContent.from_no,viewContent.to_no,viewContent.wrapCode,viewContent.opportunity,viewContent.unique_id);
        }

       });

// document.getElementById('close-call-fwd-modal').click(function() {
//     alert("click")
// });
// $("#close-call-fwd-modal").click(function() {
//     alert("click");
// });
  }

  ngOnInit() {
    if(localStorage.getItem('access_token')) {

	this.dialPadContainer=false;
	this.dialPadCirclePlus=true;
	this.dialPadRefresh=false;
    this.dialPadActionview = "number_dailer";
    this.show_caller_id = localStorage.getItem('show_caller_id');
    this.user_type = localStorage.getItem('user_type');
    this.extension = localStorage.getItem('ext_num');
    this.cli_status = localStorage.getItem('cli_status');
    $('#cli_status_id').val(this.cli_status)
    this.pbxSettings();
    this.ring_step = localStorage.getItem('ring_step');
// alert(this.ring_step);
  if(this.ring_step == 0)
        this.ring_tone ='';
  else if(this.ring_step == 1)
     this.ring_tone ='assets/images/Low.mp3';
  else if(this.ring_step == 2)
       this.ring_tone ='assets/images/Medium.mp3';
  else if(this.ring_step == 3)
  this.ring_tone ='assets/images/High.mp3';
  else 
  this.ring_tone='assets/images/incomingcall.mp3';


 
    $("#getallmyqueue").prop("checked", false);
    this.loginUser = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');

    this.ext_num=  localStorage.getItem('ext_num');
    $('#user_number').val(this.ext_num);
    console.log($('#user_number').val());
    this.has_hard_id = localStorage.getItem('hardware_id');
    if(this.has_hard_id == ""){
        // $('#addLicence').modal('show');
        //$("#addLicence").modal({"backdrop": "static"});
    } 
    else {
      this.initSocket();
        } 

 
        this.agentCallList();
        this.dialpadeContactsDropdown();

        this.getAllcontact();//This is written for getcontactName

    }


    
  }
  callsec(){
    // shareScreen();
    // alert('IN');
    $('#shareScreen').click();
}
callend(){
    // onBtnStopClicked();
    $('#stop').click();
}
  hide_mim(){
    this.show_minimize_button = false;
  }
  screen_record(){
    window.open("https://erp.cal4care.com/zohocrm/index.html");
    // alert("in");
    // $('#secrec_popup').modal('show');
}
initSocket(){
   
     
        this.websocket = new WebSocket("wss://"+window.location.hostname+":4010"); 
    //    this.websocket = new WebSocket("wss://c4cteams.my3cx.sg:4010"); 
      


        this.websocket.onopen = function(event) { 
            $('#sendonload_dial').click();
          console.log('Dialpad socket connected');
        }
    
        this.websocket.onmessage = function(event) {      
       console.log(event.data);  
   var self=this;

        var result_message = JSON.parse(event.data);
        // var pre_callid = result_message[0].data[0].callid;
        // localStorage.setItem("predict_callid",pre_callid);
    //    console.log(result_message);  
    //    console.log($('#user_number').val());
    this.has_hard_id = localStorage.getItem('hardware_id');
      if(result_message[0].cust_id == this.has_hard_id){
        // console.log('matched');
        // console.log(result_message);  
      } else {
        // console.log('not matched');
        return false;
      }
      console.log(result_message)
      if(result_message[0].data[0].obupdatecallidstatus == "true" && result_message[0].data[0].ext_num  ==$('#user_number').val()){
          $('#caller_success').click();
        // self.dialCall2();
      }
         if(result_message[0].data[0].type =='callend' && result_message[0].data[0].userno == $('#user_number').val()){            
            // iziToast.error({
            //     message: ""+result_message[0].data[0].value+"",
            //     position: 'topRight'
            // }); 
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: ""+result_message[0].data[0].value+""
              })
            $('#decline_from_mrvoip').click();

          }
          if(result_message[0].data[0].type == "qloginstatus" && result_message[0].data[0].extno ==$('#user_number').val()){
            // $('#MrvoIPQueueStatus').val(event.data);
            // $('#MrvoIPQueueStatus').click();
            // alert('1')
          }
          if(result_message[0].data[0].extlogin == "queuelogin" && result_message[0].data[0].extension ==$('#user_number').val()){
            $('#queulogin').val(event.data);
            $('#queulogin').click();
          }
          if(result_message[0].data[0].wrapuptype=="wrapupcall_id" && result_message[0].data[0].extno == $('#user_number').val()){            
            $('#wrapup_callID').val(result_message[0].data[0].callid);
            var pre_callid = result_message[0].data[0].callid;
            localStorage.setItem("predict_callid",pre_callid);
            localStorage.setItem('caller_id',pre_callid);
            // alert(result_message[0].data[0].callid)
            // $('#wrapup_callID').click();
            }
          if(result_message[0].data[0].calltype == "Incoming Call" && result_message[0].data[0].ag_no == $('#user_number').val() && result_message[0].data[0].ag_no !=null && result_message[0].data[0].ag_no !=''  && result_message[0].data[0].ag_no !='undefined'){
             console.log(result_message);  
           
            $('#queue_ids').val(result_message[0].data[0].q_no);
            iziToast.info({
                title:""+result_message[0].data[0].q_name+"",
                message: "You receiving incoming call from Queue '"+result_message[0].data[0].q_name+"'",
                position: 'topRight',                
                timeout: 100000,
            });
            // Swal.fire({
            //     title: ""+result_message[0].data[0].q_name+"",
            //     text: "You receiving incoming call from Queue "+result_message[0].data[0].q_name+"",
            //     imageUrl: "../../../assets/images/icons/call_icon.svg",
            //     imageWidth: 64,
            //     imageHeight: 64
               
            //   })
          }

           if(result_message[0].data[0].ano!=undefined){
            $('#mrVoipAData').val(event.data); 
            $('#mrVoipAData').click();
          }
    
        }
    
        this.websocket.onerror = function(event){
          console.log('error');
        }
        this.websocket.onclose = function(event){
          console.log('close');
     $('#dial_reconnect_socket').click();

    }




  }
  ngAfterViewInit() {
}




handleKeyboardEvent(event: KeyboardEvent){
  
if(this.dialPadOpen){
   this.key = event.key;
  if(this.key =='0'){ $('#zero').click(); }
  if(this.key =='1'){ $('#one').click(); }
  if(this.key =='2'){ $('#two').click(); }
  if(this.key =='3'){ $('#three').click(); }
  if(this.key =='4'){ $('#four').click(); }
  if(this.key =='5'){ $('#five').click(); }
  if(this.key =='6'){ $('#six').click(); }
  if(this.key =='7'){ $('#seven').click(); }
  if(this.key =='8'){ $('#eight').click(); }
  if(this.key =='9'){ $('#nine').click(); }
  if(this.key =='*'){ $('#star').click(); }
  if(this.key =='#'){ $('#hash').click(); }
}
    if(this.dialpadOpen && $("#dialpad_number").is(":focus")){
    // alert(event.key)

  this.key = event.key;

  if(this.key =='Enter'){ 
    //  alert(this.dialPadActionview);
    if(this.forwordPopup == 'forward'){        
       this.makecallTransfer();
    } else if(this.dialPadActionview == 'outgoing_call_inprogess'){
        this.outgoingCallEnd();
    } else if(this.dialPadActionview == 'call_incoming') {
        this.incomingCallAccept('1');
    }  else if(this.dialPadActionview == 'incoming_call_inprogess') {
        this.incomingCallEnd();
    } else if(this.dialPadActionview == 'number_dailer')  {
        $('#call').click();
    }
}

//  if(this.key == 'Backspace'){ this.dialPadbackSpace(); }
 }

}
pbxSettings(){
// let api_req:any = new Object();
// let chat_req:any = new Object();
//  chat_req.action = "get_pbx_settings";
let access_token: any=localStorage.getItem('access_token');
this.uadmin_id = localStorage.getItem('userId');

let chat_req:any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_pbx_settingss","user_id":"'+this.uadmin_id+'"}}';
 
 this.serverService.sendServer(chat_req).subscribe((response:any) => {
     if(response.result.status==true){



        this.sip_login =atob(response.result.data.sip_login);        
        this.sip_authentication=atob(response.result.data.sip_authentication);
        this.sip_password=atob(response.result.data.sip_password);
        this.sip_port=atob(response.result.data.sip_port);
        this.sip_url=atob(response.result.data.sip_url);
        this.survey_vid =atob(response.result.data.sip_survey_vid);



        var sip_login =atob(response.result.data.sip_login);
        var sip_authentication=atob(response.result.data.sip_authentication);
        var sip_password=atob(response.result.data.sip_password);
        var sip_port=atob(response.result.data.sip_port);
        var sip_url=atob(response.result.data.sip_url);
        var sip_urld=atob(response.result.data.sip_url);
        // alert(response.result.data.server_ip);
        var IP=response.result.data.server_ip;
        // localStorage.setItem('pbx_url',sip_url);
        $('#sip_port').val(sip_port);
        $('#sip_urld').val(sip_urld);
        sip_login = "sip:"+sip_login+"@"+sip_url
        sip_url = "sip:"+sip_url+":"+sip_port;

        $('#server').val(sip_url);
        $('#username').val(sip_login);
        $('#authuser').val(sip_authentication);
        $('#password').val(sip_password);
        $('#displayname').val('devomni Channel');

    // $.get("entertainment.mconnectapps.com", function (data) {
	//      alert(data);
    // });
    
  
       
            if(response.result.data == false){
                // $('.circle-plus').hide();
                this.dial_status = 'external';
                return false;
            } else {

            //    if(this.admin_id == '66'){

            //         this.http.get('https://erp.cal4care.com/cms/api_cms/v1.0/webrtc_index.php?ip_addr='+IP+'&action_info=find_ip_allowed').toPromise().then(data => {
            //             // console.log(data[0].data);
            //         if(data=='111'){            
            //             //   alert("allo")
            //             setTimeout( () => { init_page(sip_login,sip_authentication,sip_password,sip_url,sip_port);  }, 3000 );
            //             setTimeout( () => { this.registerStatus(); }, 30000 );
            //         }else{
            //         // alert("notalow")
            //             $('#show_error').click();
            //         }
            //         });
            // }
            // else{
            //     alert(this.regis);
            //    if(this.regis == 'regis')
              setTimeout( () => { init_page(sip_login,sip_authentication,sip_password,sip_url,sip_port);  }, 4000 );
              setTimeout( () => { this.registerStatus();this.queueStatus();this.addHelp(); }, 10000 ); 
            // }
             
            }


      
     
     }
 }, 
 (error)=>{
     console.log(error);
 });

}
showerror(){
    this.redyForCall = 'Blocked';
    // alert(this.redyForCall);
iziToast.warning({
    message: "3CX IP need to be Whitelisted",
    position: 'topRight'
});
}
getStatus(){
    let status: any = getinStatusV2();
    localStorage.setItem('dialer_register',status);
    // alert(status);
    if(status == 'REGISTERED'){
        this.sipRegistration('1');
    }
    console.log(status);
    return status;
    
}

registerStatus(){
    this.dial_status = this.getStatus();

    // if(this.dial_status == 'REGISTERED'){
    //     this.sipRegistration('1');
    // } else if(this.dial_status == 'ESTABLISHED'){
    //     this.sipRegistration('2');
    //     setTimeout( () => { this.registerStatus2(); }, 30000 );
    // } else {
    //     this.sipRegistration('0');
    //     setTimeout( () => { this.registerStatus2(); }, 30000 );
    // }
}

registerStatus2(){
    this.dial_status = this.getStatus();

    // if(this.dial_status == 'REGISTERED'){
    //     this.sipRegistration('1');
    // } else if(this.dial_status == 'ESTABLISHED'){
    //     this.sipRegistration('2');
    // } else {
    //     this.sipRegistration('0');
    // }
}
dialPadOpen() {
    this.dialpadOpen=true;
    this.dialPadContainer = true;
    this.dialPadCirclePlus = false;
    console.log(this.dial_status);
    if(this.dial_status === 'external'){
        iziToast.warning({
            message: "Sorry, Please Change the dialer settings or give the valid pbx details",
            position: 'topRight'
        });
        return false;
    } else {
        if(localStorage.getItem('dialer_register') == 'REGISTERED')
        this.dial_status=localStorage.getItem('dialer_register')   
        else
        this.dial_status = this.getStatus();

         if(localStorage.getItem('dialer_register')!='REGISTERED'){
         if(this.dial_status == 'ESTABLISHED'){
            this.sipRegistration('2');
        } else {
            this.sipRegistration('0');
        }
    }
        if(this.dial_status == 'NULL'){
            iziToast.warning({
                message: "Please Wait Dialpad is Loading",
                position: 'topRight'
            });
            return false;
        } 
    }
    this.queueStatusWhenOpen();
    this.agentCallList();
    this.listVoicemail();
   
}




dialPadOpenInCommingCall() {
    this.dialpadOpen=true;
    if(this.dial_status === 'external'){
        iziToast.warning({
            message: "Sorry, Please Change the dialer settings or give the valid pbx details",
            position: 'topRight'
        });
        return false;
    } else {
        this.dial_status = this.getStatus();

        if(this.dial_status == 'NULL'){
            iziToast.warning({
                message: "Please Wait Dialpad is Loading",
                position: 'topRight'
            });
            this.dialPadOpen();
            return false;
        } else {

            this.dialPadContainer = true;
            this.dialPadCirclePlus = false;

        }  
    }   
}





closefullscreen(){
$("#dialpad-wrapper").removeClass("enable-fullscreen-dialpad");
$(".card").removeClass("none");
$(".main-sidebar, .main-footer, .navbar, .card, .main-content").removeClass("blur");
}

dialPadClose() {

    this.dialpadOpen=false;

    this.dialPadContainer = false;
    this.dialPadCirclePlus = true;

    $("#dialpad-wrapper").removeClass("enable-fullscreen-dialpad");
$(".card").removeClass("none");
$(".main-sidebar, .main-footer, .navbar, .card, .main-content").removeClass("blur");

}


// keyPad(key_data) {
// if(this.forwordPopup == 'forward'){
//     var dailed_number = $('#makeCallForwordNumber').val();
//     $('#makeCallForwordNumber').val(dailed_number + key_data);
// } else {
//     var dailed_number = $('#dialpad_number').val();
//     $('#dialpad_number').val(dailed_number + key_data);
// }
    

// }
keyPad(key_data) {
    if(this.dtmf == true){
        var dailed_number = $('#makeCallForwordNumber').val();
        $('#makeCallForwordNumber').val(dailed_number + key_data);
        sendDtmf(key_data);
    } else {
        if(this.forwordPopup == 'forward'){
            var dailed_number = $('#makeCallForwordNumber').val();
            $('#makeCallForwordNumber').val(dailed_number + key_data);
        } else if(this.forwordPopup == 'conference') {
            var dailed_number = $('#makeCallConferenceNumber').val();
            $('#makeCallConferenceNumber').val(dailed_number + key_data);
        } 
  else if(this.forwordPopup == 'attendedTransfer') {
            var dailed_number = $('#peer_att').val();
            $('#peer_att').val(dailed_number + key_data);
    } else {
        var dailed_number = $('#dialpad_number').val();
        console.log(dailed_number)
        console.log(key_data)
        $('#dialpad_number').val(dailed_number + key_data);
        }
    }
    }
    addStar($event){
       if($event.shiftKey){
           this.keyPad('+')
       }else{
        this.keyPad('*')

       }
    }

makeSendDtmf(){
    if(this.dtmf == true){

        sendDtmf('0');
    } 
}

recentCallSearch(data) {

    var search_txt = data.target.value.toLowerCase();

    $("#recentCalls .contact-list-item").filter(function () {
        $("#recentCalls .contact-list-item").toggle($("#recentCalls .contact-list-item").text().toLowerCase().indexOf(search_txt.toLowerCase()) !== -1);
    });

}

userListSearch(data) {

    // var search_txt = data.target.value.toLowerCase();
     var search_txt = $('#user_list_search').val();
    $("#userList .contact-list-item").filter(function () {

        $(this).toggle($(this).text().toLowerCase().indexOf(search_txt.toLowerCase()) !== -1);
    });

}

dialPadview(view_type) {

    if (view_type != "number_dailer") {

        let api_req: any = new Object();
        let dialpad_req: any = new Object();
        dialpad_req.user_id = localStorage.getItem('userId');
        dialpad_req.action = view_type;
        if (view_type == "recent_list") {
            this.getAllcontact();//This is written for getcontactName
            dialpad_req.search_text = "";
            dialpad_req.order_by_name ="id";
            dialpad_req.order_by_type = "desc";
            dialpad_req.admin_id = this.admin_id;
            dialpad_req.extension = this.extension;
            dialpad_req.action = 'recent_call_list';
            dialpad_req.limit = 50;
            dialpad_req.offset = 0;
        }

        api_req.operation = "call";
        api_req.moduleType = "call";
        api_req.api_type = "web";
        api_req.access_token = localStorage.getItem('access_token');
        api_req.element_data = dialpad_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {

            if (response.result.status == 1) {
                if (view_type == "recent_list") {
                    // console.log(response.result.data.list_data);
                    this.dialpadRecentCalls = response.result.data.list_data;
                } else if (view_type == "user_list_all") {
                    // this.dialpadUserList = response.result.data;
                    // $('#sendonload').click();
                    // this.pushbridgeuser();
                }

                this.dialPadActionview = view_type;
            }
        }, (error) => {
            console.log(error);
        });
    } else {
        this.dialPadActionview = "number_dailer";
    }

}



// dialPadbackSpace() {
//     if(this.forwordPopup == 'forward'){
//         var dialpad_number = $('#makeCallForwordNumber').val();
//         if(dialpad_number == undefined){
//         } else {
//             $('#makeCallForwordNumber').val(dialpad_number.substring(0, dialpad_number.length - 1));
//         }
//      } else {
//         var dialpad_number = $('#dialpad_number').val();
//         if(dialpad_number == undefined){
//         } else {
//             $('#dialpad_number').val(dialpad_number.substring(0, dialpad_number.length - 1));
//         }
//      }   
// }
dialPadbackSpace() {
    if(this.forwordPopup == 'forward'){
        var dialpad_number = $('#makeCallForwordNumber').val();
        if(dialpad_number == undefined){
        } else {
            $('#makeCallForwordNumber').val(dialpad_number.substring(0, dialpad_number.length - 1));
        }
     } else  if(this.forwordPopup == 'conference'){
        var dialpad_number = $('#makeCallConferenceNumber').val();
        if(dialpad_number == undefined){
        } else {
            $('#makeCallConferenceNumber').val(dialpad_number.substring(0, dialpad_number.length - 1));
        }
     }
     else if(this.forwordPopup == 'attendedTransfer') {
        var dialpad_number = $('#peer_att').val();
        if(dialpad_number == undefined){
        } else {
            $('#peer_att').val(dialpad_number.substring(0, dialpad_number.length - 1));
        }
     } else {
        var dialpad_number = $('#dialpad_number').val();
        if(dialpad_number == undefined){
        } else {
            $('#dialpad_number').val(dialpad_number.substring(0, dialpad_number.length - 1));
        }
     }   
}



agentCallList(){
            
         let api_req:any = new Object();
        let agents_req:any = new Object();
        
        api_req.operation="call";
        api_req.moduleType="call";
        api_req.api_type="web";
      
        agents_req.action="get_agentCallList";
        agents_req.user_id=localStorage.getItem('userId');
              
        api_req.access_token=localStorage.getItem('access_token');
        api_req.element_data = agents_req;
        this.serverService.sendServer(api_req).subscribe((response:any) => {
            
            this.calleridList = response.result.data;
            
      
        }, 
        (error)=>{
            console.log(error);
        });
      
      
    }

    calleridPopup(){
        $("#choose_callerid").modal('show');         
    }
    
    updateCaller(){

        var callerstring = $("#add_callerID").val();
    
        var test = callerstring.match(/\d/g);
        var callerid = test.join("");
    


        if(callerid == null || callerid == undefined || callerid == 'null' || callerid == 'undefined' || callerid == ''){
            iziToast.warning({
                message:"Pleas choose caller ID",
                position:"topRight"
            });
            return false;
        }
        $("#choose_callerid").modal('hide');     
        Swal.fire({
            html:
                '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
        showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            background: 'transparent'
        });
        var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"updateobcallerid","obcalid_extno":"'+this.extension+'","obcallerid":"'+callerid+'"}]}]';
        this.websocket.send(socket_message);

        var promise = new Promise(function(resolve, reject) { 			
             document.getElementById("caller_success").addEventListener("click", () => {
               resolve('');
               Swal.close();
            })
         
           }); 			
       
        promise.then(() => {          
      if(this.Caller_function=='webMakeCallRef'){
              this.webMakeCallRef(this.webmakecall_parameter,'1');
        } else if(this.Caller_function=='webMakeCall2Ref'){
            this.webMakeCall2Ref('1');
        }else{
            this.webMakeCall3Ref('1');
        }
              }) 
        // var formData = new FormData();
        // var self = this;
        // formData.append('action', 'updateobcallerid');
        // formData.append('apikey', "G-KaPdSgVkYp3s6v9y/B?E(H+MbQeThW");
        // formData.append('extension', localStorage.getItem('ext_num'));
        // formData.append('obcallerid',callerid);
  

        // $.ajax({  
        //     url:"https://hpgasales.my3cx.sg:5010/api/values/",  
        //     type : 'POST',
        //     data : formData,
        //     processData: false,  // tell jQuery not to process the data
        //     contentType: false, 
        //     success:function(data){ 
        //         Swal.close();
        //       this.parsed_data = JSON.parse(data);
        //       if(this.parsed_data.status == 200){
    
        //         var dialpad_number = $('#dialpad_number').val(callerid);
    
        //         if(this.in_current_call == 'incoming_call_inprogess'){
        //             console.log('outgoing_call_inprogess');
        //             var number_data = this.clean_number(dialpad_number);
        //             this.dialPadDetailView('outgoing_call_inprogess', number_data);
        //             $('#dialpad_number').val('');
        //             transferCall(dialpad_number); 
        //             this.in_current_call = '';
        //          } else {
        //              if (dialpad_number.length > 1) {
        //                  this.webMakeCall(dialpad_number,'1');
        //              }
        //          }
              
        //       } else {
        //         iziToast.error({
        //             message: "Sorry, Some Error Occured",
        //             position: 'topRight'
        //         });
        //       }
        //     }  
        // });  
        

    }
caller_success(){
    // alert('call')
//     Swal.close();
//     if(this.Caller_function=='webMakeCallRef'){
//         this.webMakeCallRef(this.webmakecall_parameter,'1');
//   } else if(this.Caller_function=='webMakeCall2Ref'){
//       this.webMakeCall2Ref('1');
//   }else{
//       this.webMakeCall3Ref('1');
//   }
}

dialCall() {  
    // alert('1')  
    var dialpad_number = $('#dialpad_number').val();
        if(this.in_current_call == 'incoming_call_inprogess'){
           console.log('outgoing_call_inprogess');
           var number_data = this.clean_number(dialpad_number);
           this.dialPadDetailView('outgoing_call_inprogess', number_data);
           $('#dialpad_number').val('');
           transferCall(dialpad_number); 
           this.in_current_call = '';
        } else {
            if (dialpad_number.length > 1) {
                this.webMakeCall(dialpad_number,'1');
            }
        }    
}

dialCall2() {
    // alert('2')  

    var dialpad_number = $('#dialpad_number').val();

        if(this.in_current_call == 'incoming_call_inprogess'){
           console.log('outgoing_call_inprogess');
           var number_data = this.clean_number(dialpad_number);
           this.dialPadDetailView('outgoing_call_inprogess', number_data);
           $('#dialpad_number').val('');
           transferCall(dialpad_number); 
           this.in_current_call = '';
        } else {
            if (dialpad_number.length > 1) {
                this.webMakeCall(dialpad_number,'1');
            }
        }



    
}


webMakeCall(number_key,show_caller_id) {
    // alert('1');

    //this.show_caller_id = show_caller_id;
    var number_data = this.clean_number(number_key);
    if (!$('#dialpad-refresh').length) {
        this.dialPadOpenInCommingCall();
    }

//    alert(number_data); return false;
    if (number_data.length > 1) {
// alert(number_data);
// alert(this.cli_status);
// this.dialpadUserList. 
// let myItems = this.dialpadUserList.filter(item => item.sip_login == number_key);
// console.log(this.dialpadUserList);
let myItems;
if(this.dialpadUserList){
 myItems = this.dialpadUserList.filter(item => item.agent_no == number_key);
 
if(myItems.length>0){
   
    this.inc_or_out = number_data;
    $('#make_call_number').val(number_data);
    this.dialPadDetailView('outgoing_call_inprogess', number_data);
    // alert('q')
    doCall();
    $('#dialpad_number').val('');
}
else{
    if(this.cli_status=='1'){    
    console.log('hel1')
    this.webmakecall_parameter=number_key;
        this.Caller_function='webMakeCallRef';
        this.calleridPopup();   
        // return false;
     }else{  
          this.inc_or_out = number_data;
            $('#make_call_number').val(number_data);
            this.dialPadDetailView('outgoing_call_inprogess', number_data);
           
            doCall();
            $('#dialpad_number').val('');
        }
        
}
    }
else{
    if(this.cli_status=='1'){    
        console.log('hel2')
        this.webmakecall_parameter=number_key;
            this.Caller_function='webMakeCallRef';
            this.calleridPopup();   
            // return false;
         }else{  
              this.inc_or_out = number_data;
                $('#make_call_number').val(number_data);
                this.dialPadDetailView('outgoing_call_inprogess', number_data);
               
                doCall();
                $('#dialpad_number').val('');
            }
        }
}
}



webMakeCall2(show_caller_id) {
    //this.show_caller_id = show_caller_id;
   var number_key =  $('#newCallNMumber').val();
    var number_data = this.clean_number(number_key);
    if (!$('#dialpad-refresh').length) {
        this.dialPadOpenInCommingCall();
    }


//    alert(number_data); return false;
    if (number_data.length > 1) {
  if (this.dialpadUserList) {
        // let myItems = this.dialpadUserList.filter(item => item.sip_login == number_key);
        let myItems = this.dialpadUserList.filter(item => item.agent_no == number_key);

if(myItems.length>0){
       this.inc_or_out = number_data;
        $('#make_call_number').val(number_data);
        this.dialPadDetailView('outgoing_call_inprogess', number_data);
      
        doCall3('',number_data);
        $('#dialpad_number').val('');
    }else{
        if(this.cli_status=='1'){
            console.log('hel3')
            this.Caller_function='webMakeCall2Ref';
            this.calleridPopup();    
           // return false;
         }else{
        this.inc_or_out = number_data;
        $('#make_call_number').val(number_data);
        this.dialPadDetailView('outgoing_call_inprogess', number_data);
        doCall3('',number_data);
        $('#dialpad_number').val('');
    }
    }
}
    else{
        if(this.cli_status=='1'){
            console.log('hel4')
            this.Caller_function='webMakeCall2Ref';
            this.calleridPopup();    
           // return false;
         }else{
        this.inc_or_out = number_data;
        $('#make_call_number').val(number_data);
        this.dialPadDetailView('outgoing_call_inprogess', number_data);
        doCall3('',number_data);
        $('#dialpad_number').val('');
    }
    }
    }

}
webMakeCall3(show_caller_id) {
    // this.show_caller_id = show_caller_id;
    // this.redyForCall = 'On Hook';

   var number_key =  $('#newCallNMumberCamp').val();  
    var number_data = this.clean_number(number_key);
    if (!$('#dialpad-refresh').length) {
        this.dialPadOpenInCommingCall();
    }
  


    // alert(number_data); 
// return false;
    if (number_data.length > 1) {
        if (this.dialpadUserList) {
        // let myItems = this.dialpadUserList.filter(item => item.sip_login == number_key);
        let myItems = this.dialpadUserList.filter(item => item.agent_no == number_key);

        if(myItems.length>0){
            this.inc_or_out = number_data;
            $('#make_call_number').val(number_data);    
            this.dialPadDetailView('outgoing_call_inprogess', number_data);
    
            doCall3('',number_data);
        }
        else{
            if(this.cli_status=='1'){
                console.log('hel5')
                this.Caller_function='webMakeCall3Ref';
                this.calleridPopup();    
                // return false;
             }else{
            this.inc_or_out = number_data;
            $('#make_call_number').val(number_data);    
            this.dialPadDetailView('outgoing_call_inprogess', number_data);
            doCall3('',number_data);
             }
        }
    
    }
}
    else{
        if(this.cli_status=='1'){
            console.log('hel6')
            this.Caller_function='webMakeCall3Ref';
            this.calleridPopup();    
            // return false;
         }else{
        this.inc_or_out = number_data;
        $('#make_call_number').val(number_data);    
        this.dialPadDetailView('outgoing_call_inprogess', number_data);
        doCall3('',number_data);
         }
    }
}


webMakeCallAgent(show_caller_id) {
    // this.show_caller_id = show_caller_id;
    // this.redyForCall = 'On Hook';

   var number_key =  $('#newCallNMumberCamp').val();  
    var number_data = this.clean_number(number_key);
    if (!$('#dialpad-refresh').length) {
        this.dialPadOpenInCommingCall();
    }
  


    // alert(number_data); 
// return false;
    if (number_data.length > 1) {
            this.inc_or_out = number_data;
            $('#make_call_number').val(number_data);    
            this.dialPadDetailView('outgoing_call_inprogess', number_data);
    
            doCall3('',number_data);    
    }
}


//Caller ID
webMakeCallRef(number_key,show_caller_id) {
    //this.show_caller_id = show_caller_id;
    if(number_key==undefined||number_key=='undefined'||number_key==''){
        iziToast.warning({
            message:"Sorry,Some error occured,Call Again",
            position:"topRight"
        });
        return false;
    }
    var number_data = this.clean_number(number_key);
    // if (!$('#dialpad-refresh').length) {
    //     this.dialPadOpenInCommingCall();
    // }

//    alert(number_data); return false;
    if (number_data.length > 1) {
        // alert(number_data);
        this.inc_or_out = number_data;
        $('#make_call_number').val(number_data);
        this.dialPadDetailView('outgoing_call_inprogess', number_data);
        doCall();
        $('#dialpad_number').val('');
    }
}
webMakeCall2Ref(show_caller_id) {
    //this.show_caller_id = show_caller_id;
   var number_key =  $('#newCallNMumber').val();
   if(number_key==undefined||number_key=='undefined'||number_key==''){
    iziToast.warning({
        message:"Sorry,Some error occured,Call Again",
        position:"topRight"
    });
    return false;
}
    var number_data = this.clean_number(number_key);
    // if (!$('#dialpad-refresh').length) {
    //     this.dialPadOpenInCommingCall();
    // }


//    alert(number_data); return false;
    if (number_data.length > 1) {

        this.inc_or_out = number_data;
        $('#make_call_number').val(number_data);
        this.dialPadDetailView('outgoing_call_inprogess', number_data);

        doCall3('',number_data);
        $('#dialpad_number').val('');

    }
}
webMakeCall3Ref(show_caller_id) {
    // this.show_caller_id = show_caller_id;
    // this.redyForCall = 'On Hook';

   var number_key =  $('#newCallNMumberCamp').val();
   if(number_key==undefined||number_key=='undefined'||number_key==''){
    iziToast.warning({
        message:"Sorry,Some error occured,Call Again",
        position:"topRight"
    });
    return false;
}
    var number_data = this.clean_number(number_key);
    // if (!$('#dialpad-refresh').length) {
    //     this.dialPadOpenInCommingCall();
    // }   // alert(number_data); 
// return false;
    if (number_data.length > 1) {
        this.inc_or_out = number_data;
        $('#make_call_number').val(number_data);    
        this.dialPadDetailView('outgoing_call_inprogess', number_data);

        doCall3('',number_data);
    
    }
}
outGongCallstatus(){
    this.admincallBalance = this.admincallBalance * 1000;
    setTimeout(function(){ 
        var outGongCallstatus = $('#outGongCallstatus').val();
        if(outGongCallstatus == 'inCall'){
            iziToast.error({
                        message: "Sorry, Admin Has Insufficient Balance. Please Contact Support",
                        position: 'topRight'
                    });
                    this.outgoingCallEnd()
        }

    }, this.admincallBalance);
}

countdownTim(){
    //alert(this.callBalance);
    this.callBalance = this.callBalance * 1000;
    setTimeout(function(){ 
        var CallToCut = $('#outGongCallstatus').val();
        if(CallToCut == 'inCall'){
            iziToast.error({
                        message: "Sorry, Insufficient Balance. Please Contact Support",
                        position: 'topRight'
                    });
                    this.outgoingCallEnd()
        }
    
    }, this.callBalance);
}


outgoingCallEnd() {
    outgoingCallEnd();
    $("#makecallHanupBtn").click();
    if(this.dialPadActionview == 'call_incoming'){
        this.dialPadDetailViewIncomming('call_history_detail','');
    } else {
        this.dialPadDetailView('call_history_detail', this.call_history_id);
    }

    $('#animate-dialpad').modal('hide');
    $(".forwardDialpadPanel").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel").hide();
    $(".forwardDialpadPanel2").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel2").hide();
    this.dtmf =false;
    this.forwordPopup = 'outgoingCallEnd';
    $('#makeCallForwordNumber').val('');
    let api_reqs:any = '{"type": "call_ended"}';
    this.serverService.editContact.next(api_reqs);
    // console.log(api_reqs)
    this.callend();
}
Closemodal1(){
    $(".forwardDialpadPanel").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel").hide();
}
Closemodal2(){
    $(".forwardDialpadPanel2").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel2").hide();
}
outgoingCallEnd2() {
    // outgoingCallEnd();
    // alert('snkaj');
    $("#makecallHanupBtn").click();
    if(this.dialPadActionview == 'call_incoming'){
        this.dialPadDetailViewIncomming('call_history_detail','');
    } else {
        this.dialPadDetailView('call_history_detail', this.call_history_id);
    }

    $('#animate-dialpad').modal('hide');
    $(".forwardDialpadPanel").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel").hide();
    $(".forwardDialpadPanel2").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel2").hide();
    this.dtmf =false;
    this.forwordPopup = 'outgoingCallEnd';
    $('#makeCallForwordNumber').val('');
    $('#peer_att').val('');
    let api_reqs:any = '{"type": "call_ended"}';
    this.serverService.editContact.next(api_reqs);
}
outgoingCallEndREASON(){
    // alert('asas')
   var reason= $('#endCallByJsREASON').val();
    iziToast.warning({
        message:reason,
        position:'topRight'
    })
}
incomingCallAccept(det) {
    this.call_accepted=true;
    $('#accept_callscall').click();
    // this.dialPadDetailView('incoming_call_inprogess', this.call_history_id);
    this.dialPadDetailViewIncomming('incoming_call_inprogess', det);
}



incomingCallRecordStop(type) {

    var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"callrecord","extnum":"'+this.extension+'","status":"stop"}]}]';
    this.websocket.send(socket_message);
$('#rec_stop_btn').css('display','none');
$('#rec_start_btn').css('display','block');
}

// Unmute audio in the call
incomingCallRecordStart(type) {

    var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"callrecord","extnum":"'+this.extension+'","status":"start"}]}]';
    this.websocket.send(socket_message);
$('#rec_stop_btn').css('display','block');
$('#rec_start_btn').css('display','none');
}





incomingCallDecline() {
    this.call_declined=true;

    $("#incomingCallHangupBtn").click();
   
    
    this.dialPadDetailViewIncomming('call_history_detail', this.call_history_id);
}

incomingCallEndByCustomer() {
    // alert('true');
    this.dialPadDetailViewIncomming('call_history_detail', this.call_history_id);

}

incomingCallEnd() {
    // alert('ended');

    outgoingCallEnd();
    $("#incomingCallHangupBtn").click();
    this.dialPadDetailViewIncomming('call_history_detail','');
    $('#animate-dialpad').modal('hide');
    $(".forwardDialpadPanel").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel").hide();
    $(".forwardDialpadPanel2").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel2").hide();
    this.dtmf =false;
    this.forwordPopup = 'incCallEnd';
    $('#makeCallForwordNumber').val('');
    $('#dialpad_number').val('');
    let api_reqs:any = '{"type": "call_ended"}';
    this.serverService.editContact.next(api_reqs);
    this.endCallTransfer();
    this.callend();
    
}




endIncCallSection(){
    console.log(this.dialPadActionview);
    if(this.dialPadActionview == 'call_incoming'){
        outgoingCallEnd();
    this.dialPadDetailViewIncomming('call_history_detail','');
    $('#animate-dialpad').modal('hide');
    $(".forwardDialpadPanel").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel").hide();
    $(".forwardDialpadPanel2").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel2").hide();
     this.dtmf =false;
    this.forwordPopup = 'incCallEnd';
    $('#makeCallForwordNumber').val('');
    $('#dialpad_number').val('');
    let api_reqs:any = '{"type": "call_ended"}';
    this.serverService.editContact.next(api_reqs);
    }
}

clean_number(number_key) {
    var number_data = number_key.trim();
    return number_data.replace(/[\s-/.\u00AD]/g, '');
}

incoming_call_trigger() {
    
    // $('#accept_callscall').click();
    // this.incomingCallAccept();
    //alert(this.has_autoanswer);
    
    var call_incoming_number = $('#call_incoming_number').val();
    this.inc_or_out = call_incoming_number;
    localStorage.setItem('income_calls_num',call_incoming_number);
    if (call_incoming_number != "") {

    //Disconnect the Webclient IFrame 
    let api_reqs:any = '{"type": "close_webclient"}';     
    this.serverService.editContact.next(api_reqs);

        this.dialPadOpenInCommingCall();
        this.dialPadDetailViewIncomming('call_incoming', call_incoming_number);
        this.has_autoanswer = localStorage.getItem('dialer_auto_answer');
            if(this.has_autoanswer == '1'){
                //$('#call').unbind( "click" );
                iziToast.info({
                    message: "Call will be answered automatically after 5 seconds",
                    position: 'topRight'
                });
                setTimeout( () => {
                    if(this.call_declined==false && this.call_accepted == false){
                        this.incomingCallAccept(this.dialpadIncomingCalls.phone);
                        // alert('snjas');
                    }
                     
                    
                    }, 5000 );
            }
        
    }
    // this.has_autoanswer = localStorage.getItem('has_fb');
    // $('#accept_callscall').click();
    // if(this.has_autoanswer == '1'){
    //     $('#accept_callscall').click();
    // }
}



dialPadDetailViewIncomming(view_type, detail_id) {
    //alert("ouyt");
    this.isDisabled = false;
    this.showWrapUp =false;
    this.call_type='incoming';
     this.show_end_helper=false;

    if (detail_id == '' || detail_id == undefined) {

        detail_id = null;
    }
        let api_req: any = new Object();
        let dialpad_req: any = new Object();
        dialpad_req.user_id = localStorage.getItem('userId');
        dialpad_req.action = view_type;
        console.log(view_type)
        if (view_type == "call_history_detail") {
            iziToast.destroy();
            console.log(this.dialpadIncomingCalls);
            $('#animate-dialpad').modal('hide');
            $(".forwardDialpadPanel").addClass('hide-fwd-dialpad');
            $(".forwardDialpadPanel").removeClass('active');
            $(".forwardDialpadPanel").hide();
            $(".forwardDialpadPanel2").addClass('hide-fwd-dialpad');
            $(".forwardDialpadPanel2").removeClass('active');
            $(".forwardDialpadPanel2").hide();
            this.dtmf =false;            
            $('#makeCallForwordNumber').val('');
            this.forwordPopup = 'forwarded';
            this.callDetailView = '';
            console.log(this.dialPadActionview)

            if(this.dialPadActionview == 'call_incoming' || this.dialPadActionview == 'incoming_call_inprogess'){
                var detail_id = this.dialpadIncomingCalls.phone;
                dialpad_req.call_data = "Call from " + detail_id;
            //   alert("incom"+detail_id);
            } 
            else {
                var detail_id = $('#outcall_number').val();
                dialpad_req.call_data = "Called to " + detail_id; 
                //alert("ouyt"+detail_id);
            }
            dialpad_req.call_type = "incoming";
            dialpad_req.phone = detail_id;
            // const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const tz = localStorage.getItem('timezone_name');

// console.log(tz);
            let d = new Date();
            let sydneyTime = d.toLocaleString(undefined, {timeZone: tz});

            dialpad_req.call_start_dt = sydneyTime;
            this.callDetailView = dialpad_req;
            
        } else if (view_type == "call_incoming") {
            // alert("sdsd"+detail_id);
            dialpad_req.call_data = "Call from " + detail_id;
            dialpad_req.customer_id = 0;
            dialpad_req.call_type = "incoming";
            dialpad_req.phone = detail_id;
            dialpad_req.call_status = "open";
            dialpad_req.call_note = "";
            $('#outcall_number').val(detail_id);
            // this.incomingNotification(detail_id);
        }  else if (view_type == "incoming_call_inprogess") {
            iziToast.destroy();
            this.isDisabled = true;
               
            dialpad_req.call_data = "Call from " + detail_id;
            dialpad_req.customer_id = 0;
            dialpad_req.call_type = "incoming";
            dialpad_req.phone = detail_id;
            dialpad_req.call_status = "open";
            dialpad_req.call_note = "";
        }
            this.caller_no=detail_id;
            this.dialpadIncomingCalls = dialpad_req;
            this.dialPadActionview = view_type;
            detail_id = btoa(detail_id); // Base64 encode the String


            api_req.operation = "call";
            api_req.moduleType = "call";
            api_req.api_type = "web";
            api_req.access_token = localStorage.getItem('access_token');
            api_req.element_data = dialpad_req;
            if (view_type == "call_incoming") {
                this.dialpadIncomingCalls = dialpad_req;
                // $('#call_history_id').val(response.result.data);
                // this.call_history_id = response.result.data;
              // this.router.navigate(['/edit-contacts'], { queryParams: { phone: detail_id,calltype: this.call_type} });
               this.openModelPopup('');
               let data=  {title: 'Incomming call from '+atob(detail_id)+'', notification_for: 'incomming_call', click_action: ' ', unique_id: ' ', sound: 'default', badge: '1', host_name: 'https://'+window.location.hostname+':4001'+''};
              this.serverService.sendNotifications(data);
            }
    return false;
            this.serverService.sendServer(api_req).subscribe((response: any) => {
    
                if (response.result.status == 1) {
    
                
                        if (view_type == "call_incoming") {
                        this.dialpadIncomingCalls = dialpad_req;
                        $('#call_history_id').val(response.result.data);
                        this.call_history_id = response.result.data;
                        var predective_dialer_behave = localStorage.getItem('predective_dialer_behave');
                        if(predective_dialer_behave == '0')
                        {
                            var has_external_contact = localStorage.getItem('has_external_contact');
    
                            if(has_external_contact == '0') {
                       this.router.navigate(['/edit-contacts'], { queryParams: { phone: detail_id , call_rec_id: this.call_history_id} });
                            } else {                             
                                var crm_type = localStorage.getItem('crm_type');
                                if(crm_type == 'HubSpot'){
                                var ext_url = localStorage.getItem('external_contact_url');
                                let searchParams = new URLSearchParams(ext_url)
                                let h_authkey = searchParams.get('hapikey');
                                var decodedString = atob(detail_id );
                              this.router.navigate(['/edit-contacts'], { queryParams: { q: decodedString , hapikey: h_authkey} });                   
                               } else if(crm_type == 'ZohoDesk'){
                                var ad = localStorage.getItem('admin_id');
    
                                var ext_url = localStorage.getItem('external_contact_url');
                                let searchParams = new URLSearchParams(ext_url)
                                let Z_orgId = searchParams.get('orgId');
                                let z_authkey = searchParams.get('authkey');
    
                                var decodedString = atob(detail_id );
                               this.router.navigate(['/edit-contacts'], { queryParams: { q: decodedString ,authkey: z_authkey,orgId: Z_orgId } });                
                               }else if(crm_type == 'SalesForce'){
                               this.router.navigate(['/edit-contacts'], { queryParams: { q: 'locale=in' } });                   
                              } else {
        
                               }
                            }
                           
    
                        } else {
                            
    
                            var has_external_contact = localStorage.getItem('has_external_contact');
    
                            if(has_external_contact == '0') {
                                this.router.navigate(['/predictive-dialer-calls'], { queryParams: { phone: detail_id , call_rec_id: this.call_history_id} });
                            } else {
                                var crm_type = localStorage.getItem('crm_type');
                                if(crm_type == 'HubSpot'){
                                    var decodedString = atob(detail_id );
                                 this.router.navigate(['/edit-contacts'], { queryParams: { q: decodedString , hapikey: 'ed15f3fa-87c4-4169-a555-6bb845c257e9'} });                   
                               } else if(crm_type == 'ZohoDesk'){
                                   var ad = localStorage.getItem('admin_id');
                                   var ext_url = localStorage.getItem('external_contact_url');
                                   let searchParams = new URLSearchParams(ext_url)
                                   let Z_orgId = searchParams.get('orgId');
                                   let z_authkey = searchParams.get('authkey');
       
                                   var decodedString = atob(detail_id );
                                   this.router.navigate(['/edit-contacts'], { queryParams: { q: decodedString ,authkey: z_authkey,orgId: Z_orgId } });    
                                               
                               }else if(crm_type == 'SalesForce'){
                                this.router.navigate(['/edit-contacts'], { queryParams: { q: 'locale=in' } });                   
                              } else {
        
                               }
                            }
                        }
                      
                    }
                }
            }, (error) => {
                console.log(error);
            });

    }



    dialPadDetailView(view_type, detail_id) {
        this.isDisabled = false;
       this.showWrapUp =false;
    this.show_end_helper=false;
        if (detail_id == '' || detail_id == undefined) {
    
            detail_id = null;
        }
           
    
        if (view_type != "number_dailer") { 
    
            let api_req: any = new Object();
            let dialpad_req: any = new Object();
            dialpad_req.user_id = localStorage.getItem('userId');
            dialpad_req.action = view_type;
            if (view_type == "call_history_detail") {
                dialpad_req.callid = detail_id;
                $('#animate-dialpad').modal('hide');
                $(".forwardDialpadPanel").addClass('hide-fwd-dialpad');
                $(".forwardDialpadPanel").removeClass('active');
                $(".forwardDialpadPanel").hide();
                $(".forwardDialpadPanel2").addClass('hide-fwd-dialpad');
                $(".forwardDialpadPanel2").removeClass('active');
                $(".forwardDialpadPanel2").hide();
                this.dtmf =false;
                $('#makeCallForwordNumber').val('');
                
                this.forwordPopup = 'forwarded';
                this.callDetailView = dialpad_req;

                        $('#newCallNMumber').val($('#outcall_number').val());
                        this.callDetailView.call_data= "Call to "+$('#outcall_number').val();
                        this.callDetailView.phone= $('#outcall_number').val();

                        const tz = localStorage.getItem('timezone_name');
                                    let d = new Date();
                                    let sydneyTime = d.toLocaleString(undefined, {timeZone: tz});
                        this.callDetailView.call_start_dt=sydneyTime;
                        this.dialPadActionview = view_type;
                        this.caller_no=detail_id;

return false;
            } else if (view_type == "user_detail_view") {
                dialpad_req.user_id = detail_id;
            } else if (view_type == "outgoing_call_inprogess") {
                this.isDisabled = true;

               this.isDisabledButton = true;
                this.showWrapUp=true;
                this.call_type='outgoing';
                dialpad_req.call_data = "Calling to " + detail_id;
                dialpad_req.customer_id = 0;
                dialpad_req.call_type = "outgoing";
                dialpad_req.phone = detail_id;
                dialpad_req.call_status = "answered";
                dialpad_req.call_note = "";
                this.dialpadOutgoingCalls = dialpad_req;
                // $('#call_history_id').val(response.result.data);
                // this.call_history_id = response.result.data;
                // detail_id = btoa(detail_id);
               // alert('answered')
               this.dialPadActionview = view_type;
               this.caller_no=detail_id;


    return false;
                
            } else if (view_type == "call_incoming") {
            //    alert('old func');
                dialpad_req.call_data = "Call from " + detail_id;
                dialpad_req.customer_id = 0;
                dialpad_req.call_type = "incoming";
                dialpad_req.phone = detail_id;
                dialpad_req.call_status = "open";
                dialpad_req.call_note = "";
                this.call_type='incoming';

            } else if (view_type == "incoming_call_inprogess") {
                dialpad_req.callid = detail_id;
                this.in_current_call = view_type;
                this.call_type='incoming';

            }

            api_req.operation = "call";
            api_req.moduleType = "call";
            api_req.api_type = "web";
            api_req.access_token = localStorage.getItem('access_token');
            api_req.element_data = dialpad_req;
            this.caller_no=detail_id;
    
            this.serverService.sendServer(api_req).subscribe((response: any) => {
    
                if (response.result.status == 1) {
    
                  //  this.inc_or_out  =  response.result.data.phone;
                //  alert(view_type);
    
                    if (view_type == "call_history_detail") {

                        this.callDetailView = response.result.data;
                        $('#newCallNMumber').val($('#outcall_number').val());
                        this.callDetailView.call_data= "Call to "+$('#outcall_number').val();
                        this.callDetailView.phone= $('#outcall_number').val();



                        // const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                        const tz = localStorage.getItem('timezone_name');

                        // console.log(tz);
                                    let d = new Date();
                                    let sydneyTime = d.toLocaleString(undefined, {timeZone: tz});
                        this.callDetailView.call_start_dt=sydneyTime;
                        
                     
                    } else if (view_type == "user_detail_view") {
                        this.userDetailView = response.result.data;
                    } else if (view_type == "outgoing_call_inprogess") {
                        this.showWrapUp=true;
this.call_type='outgoing';
                        this.dialpadOutgoingCalls = dialpad_req;
                        $('#call_history_id').val(response.result.data);
                        this.call_history_id = response.result.data;
                        detail_id = btoa(detail_id); // Base64 encode the String
                    //    this.router.navigate(['/edit-contacts'], { queryParams: { phone: detail_id , call_rec_id: this.call_history_id} });
    
                    } 
                    else if (view_type == "call_incoming") {
                        this.dialpadIncomingCalls = dialpad_req;
                        $('#call_history_id').val(response.result.data);
                        this.call_history_id = response.result.data;
                        detail_id = btoa(detail_id); // Base64 encode the String
                        var predective_dialer_behave = localStorage.getItem('predective_dialer_behave');
                        if(predective_dialer_behave == '0')
                        {
                            var has_external_contact = localStorage.getItem('has_external_contact');
    
                            if(has_external_contact == '0') {
                       this.router.navigate(['/edit-contacts'], { queryParams: { phone: detail_id , call_rec_id: this.call_history_id} });
                            } else {
                                var crm_type = localStorage.getItem('crm_type');
                                if(crm_type == 'HubSpot'){
                                var ext_url = localStorage.getItem('external_contact_url');
                                let searchParams = new URLSearchParams(ext_url)
                                let h_authkey = searchParams.get('hapikey');
                                var decodedString = atob(detail_id );
                              this.router.navigate(['/edit-contacts'], { queryParams: { q: decodedString , hapikey: h_authkey} });                   
                               } else if(crm_type == 'ZohoDesk'){
                                var ad = localStorage.getItem('admin_id');
    
                                var ext_url = localStorage.getItem('external_contact_url');
                                let searchParams = new URLSearchParams(ext_url)
                                let Z_orgId = searchParams.get('orgId');
                                let z_authkey = searchParams.get('authkey');
    
                                var decodedString = atob(detail_id );
                               this.router.navigate(['/edit-contacts'], { queryParams: { q: decodedString ,authkey: z_authkey,orgId: Z_orgId } });                
                               }else if(crm_type == 'SalesForce'){
                               this.router.navigate(['/edit-contacts'], { queryParams: { q: 'locale=in' } });                   
                              } else {
        
                               }
                            }
                           
    
                        } else {
                            
    
                            var has_external_contact = localStorage.getItem('has_external_contact');
    
                            if(has_external_contact == '0') {
                                //this.router.navigate(['/predictive-dialer-calls'], { queryParams: { phone: detail_id , call_rec_id: this.call_history_id} });
                            } else {
                                var crm_type = localStorage.getItem('crm_type');
                                if(crm_type == 'HubSpot'){
                                    var decodedString = atob(detail_id );
                                 this.router.navigate(['/edit-contacts'], { queryParams: { q: decodedString , hapikey: 'ed15f3fa-87c4-4169-a555-6bb845c257e9'} });                   
                               } else if(crm_type == 'ZohoDesk'){
                                   var ad = localStorage.getItem('admin_id');
                                   var ext_url = localStorage.getItem('external_contact_url');
                                   let searchParams = new URLSearchParams(ext_url)
                                   let Z_orgId = searchParams.get('orgId');
                                   let z_authkey = searchParams.get('authkey');
       
                                   var decodedString = atob(detail_id );
                                   this.router.navigate(['/edit-contacts'], { queryParams: { q: decodedString ,authkey: z_authkey,orgId: Z_orgId } });    
                                               
                               }else if(crm_type == 'SalesForce'){
                                this.router.navigate(['/edit-contacts'], { queryParams: { q: 'locale=in' } });                   
                              } else {
        
                               }
                            }
                        }
                        this.has_autoanswer = localStorage.getItem('dialer_auto_answer');
                       
                        if(this.has_autoanswer == '1'){
                            iziToast.info({
                                message: "Call will be answered automatically after 5 seconds",
                                position: 'topRight'
                            });
                            setTimeout( () => { this.incomingCallAccept('1'); }, 5000 );
    
                        }
                    }
                    this.dialPadActionview = view_type;
                }
            }, (error) => {
                console.log(error);
            });
        }
    
    }



sendOnload(status,reason,queues){
 //  alert(queues);
    var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"queuestatus","extension":"'+this.extension+'","status":"'+status+'","reason":"'+reason+'","queues":"'+queues+'"}]}]';
    this.websocket.send(socket_message);
}




q_logout(queu){
    // this.myProfile();
    if(queu == 1){
        Swal.fire({
            title: 'Confirm Queue Logout',
            text: "This action will log you OUT of all queues and queue calls will not be sent to your extension until you log back in",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Not now',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
                this.aux_codeDatas();
                this.myqueues();
            }
          })

    } else {
        this.loginQ()  
    }
    
}


myqueues(){
    let access_token: any=localStorage.getItem('access_token');
    let admin_id: any=localStorage.getItem('admin_id');
    let api_req:any = '{"operation":"queue", "moduleType":"queue", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"user_queue","agent_id":"'+this.uadmin_id+'","admin_id":"'+admin_id+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any) => {
        if(response.result.status == true){
                this.allmyQues = response.result.data;
                $('#Qlogform').modal('show');
        }
    }, 
    (error)=>{
        console.log(error);
    });   
}


logoutClick(){
    // this.sendOnload('0','Omni Logout','');
    // var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"omnistatus","extension":"'+this.extension+'","status":"0"}]}]';
    // this.websocket.send(socket_message);

    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"in_login_logout","agent_id":"'+this.uadmin_id+'","reason":"Away","status":"0"}}';
  
    // this.serverService.sendServer(api_req).subscribe((response:any) => {

    //     // let api_reqs:any = '{"type": "profile"}';
    //     // this.serverService.profile.next(api_reqs);
    //   if(response.result.status == true){
    //     // iziToast.success({
    //     //     message: "Logout successfully",
    //     //     position: 'topRight'
    //     // });
    //   } else {
    //     // iziToast.error({
    //     //     message: "Sorry some error occured",
    //     //     position: 'topRight'
    //     // });
       
    //   }
    // }, 
    // (error)=>{
    //     console.log(error);
    // });
}

updateQ(){
    let access_token: any=localStorage.getItem('access_token');
    $(".getallmyqueues").each(function() {
        $("#checkedAll").prop("checked", true);
    });
    $(".getallmyqueues").prop("checked", true);
    var queues = $('.getallmyqueues:checked').map(function(){
        return this.value;
    }).get();

    

    if(queues ==''|| queues=='0' ){
        iziToast.warning({
            message: "Sorry, there is no queue to exit",
            position: 'topRight'
        }); 
        return false;
    }

    let que: any =  $('#que').val();  

    if(que ==''|| que=='0' ){
        iziToast.warning({
            message: "Please Select Auxcode",
            position: 'topRight'
        }); 
        return false;
    }
    this.sendOnload('0',que,queues);
    Swal.fire({
        html:
            '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
    showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        background: 'transparent'
    });

    let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"in_login_logout","agent_id":"'+this.uadmin_id+'","reason":"'+que+'","status":"0"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
Swal.close();
        // let api_reqs:any = '{"type": "profile"}';
        // this.serverService.profile.next(api_reqs);

      if(response.result.status == true){

        
        iziToast.success({
            message: "Logout successfully",
            position: 'topRight'
        });
        $('#Qlogform').modal('hide');
        this.dialPadClose();
      } else {
        iziToast.error({
            message: "Sorry some error occured",
            position: 'topRight'
        });
        $('#Qlogform').modal('hide');
      }
    }, 
    (error)=>{
        console.log(error);
    });
}



// q_login(){
    
//     $('#Qloginform').modal('show');
// }



loginQ(){
    let access_token: any=localStorage.getItem('access_token');
    let que: any =  $('#que').val();  
    console.log(que);
    let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"in_login_logout","agent_id":"'+this.uadmin_id+'","reason":"-","status":"1"}}';
    this.sendOnload('1',que,'');
    this.queLogStatus = '1';
    Swal.fire({
        html:
            '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
    showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        background: 'transparent'
    });
    this.serverService.sendServer(api_req).subscribe((response:any) => {
Swal.close();
        // let api_reqs:any = '{"type": "profile"}';
        // this.serverService.profile.next(api_reqs);
        if(response.result.status == true){
            
        iziToast.success({
            message: "Login successfully!",
            position: 'topRight'
        });
        this.redyForCall = 'On Hook';
      } else {
        iziToast.error({
            message: "Sorry some error occured",
            position: 'topRight'
        });
      }
    }, 
    (error)=>{
        console.log(error);
    });
}






aux_codeDatas(){
    let access_token: any=localStorage.getItem('access_token');
    let admin_id: any=localStorage.getItem('admin_id');
    let api_req:any = '{"operation":"auxcode", "moduleType":"auxcode", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_auxcode","admin_id":"'+admin_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        this.auxcodesM = response.result.data;
      } 
    }, 
    (error)=>{
        console.log(error);
    });
  }

openFullscreen(){

$("#dialpad-wrapper").addClass("enable-fullscreen-dialpad");
$(".card").addClass("none");
$(".main-sidebar, .main-footer, .navbar, .card, .main-content").addClass("blur");


}








myProfile(){
    let api_req:any = new Object();
    let get_agent_req:any = new Object();
    get_agent_req.user_id=localStorage.getItem('userId');
    get_agent_req.action='get_agent_data';
    api_req.operation="agents";
    api_req.moduleType="agents";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = get_agent_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {  
          if(response.result.status==true){
                this.extension = response.result.data.sip_login;
          }
           
        }, 
        (error)=>{
            console.log(error);
        });
  }


sipRegistration(status){
    let access_token: any=localStorage.getItem('access_token');
    let user_id: any=localStorage.getItem('userId');

    let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"sip_registered_status","user_id":"'+user_id +'","status":"'+status+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
     
    }, 
    (error)=>{
        console.log(error);
    });
  }



  Callforword(type){
    if(type == 'dtmf'){
        this.dtmf = true;
    } else {
        this.dtmf = false;
    }
    $(".forwardDialpadPanel").addClass('active');
    $(".forwardDialpadPanel").show();
    $(".forwardDialpadPanel").removeClass('hide-fwd-dialpad');
    this.dialpadeContactsDropdown();
 // To hide warm transfer
    $(".forwardDialpadPanel2").addClass('hide-fwd-dialpad');
    $(".forwardDialpadPanel2").hide();
    $(".forwardDialpadPanel2").removeClass('active');
    this.forwordPopup = 'forward';
  }






  makecallTransfer(){
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to transfer this call to "+ $('#makeCallForwordNumber').val()+"",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {

      var dialNumber = $('#makeCallForwordNumber').val();
      var number_data = this.clean_number(dialNumber);
      this.dialPadDetailView('call_history_detail', this.call_history_id);
      $('#animate-dialpad').modal('hide');
        $(".forwardDialpadPanel").addClass('hide-fwd-dialpad');
         $(".forwardDialpadPanel").show();
      this.forwordPopup = 'forwarded';
      $('#makeCallForwordNumber').val('');
      $('#dialpad_number').val('');
      makecallTransfer(number_data);
            this.in_current_call = '';
        }
    });
  }

  checkallQueues(){
    if($('#getallmyqueue').is(':checked')){
        $(".getallmyqueues").each(function() {
            $("#checkedAll").prop("checked", true);
        });
        $(".getallmyqueues").prop("checked", true);
    } else {
        $(".getallmyqueues").each(function() {
            this.checked=false;
        });
        $(".getallmyqueues").prop("checked", false);
    }

}
checksingleQueue(){  
    $("#getallmyqueue").prop("checked",false);
  }







transferCallToSurvay(){
    // if(this.survey_vid)
    // alert(this.survey_vid)
    if(this.survey_vid==0||this.survey_vid=='0'||this.survey_vid==''||this.survey_vid==undefined||this.survey_vid==null)
    {
        iziToast.warning({
        message:"Survey not configured",
        position:"topRight"
        })
        return false
    }
    var ani = this.inc_or_out;
    var dins = this.sip_login;
    let access_token: any=localStorage.getItem('access_token');
    let admin_id: any=localStorage.getItem('admin_id');

    let api_req:any = '{"operation":"pre_camp", "moduleType":"pre_camp", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"insert_survey","posted_key":"","ani":"'+ani+'","dins":"'+dins+'","admin_id":"'+admin_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {

        if(response.result.data==1){

            var admin_id = localStorage.getItem('admin_id');
            makecallTransfer2(this.survey_vid); 
      } else {
        iziToast.error({
            message: "Sorry some error occured",
            position: 'topRight'
        });
      }
     
    }, 
    (error)=>{
        console.log(error);
    });
  }




  makecallauto(tono){
    //   alert(tono);
    //   return false;
    let access_token: any=localStorage.getItem('access_token');
    this.uadmin_id = localStorage.getItem('userId');
    let chat_req:any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_pbx_settingss","user_id":"'+this.uadmin_id+'"}}';
     this.serverService.sendServer(chat_req).subscribe((response:any) => {
         if(response.result.status==true){
            this.sip_login =atob(response.result.data.sip_login);        
            var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"clicktocall","fromno":"'+this.sip_login+'","tono":"'+tono+'"}]}]';
            this.websocket.send(socket_message);         
         }
     }, 
     (error)=>{
         console.log(error);
     });   
}

q_logout_from_mob(){
    let socketData = $('#queulogin').val(); 
    let mData = JSON.parse(socketData);
    let status= mData[0].data[0].status;
    let queues= mData[0].data[0].queues;
    // alert(status);
    // this.myProfile();
    if(status == 1){
        // this.loginQ_from_mob() ;
        this.queLogStatus = '1';
        this.redyForCall = 'On Hook';
        iziToast.success({
            message: "Found Queue Login from 3CX",
            position: 'topRight'
        });

    } else {
        iziToast.warning({
            message: "Queue logged out from 3CX",
            position: 'topRight'
        });
        this.dialPadClose();
        //  this.Logout_from_mob();
    }
}

Logout_from_mob(){
    let access_token: any=localStorage.getItem('access_token');
    let socketData = $('#queulogin').val(); 
    let mData = JSON.parse(socketData);    
    let queues= mData[0].data[0].queues;
    let reason=mData[0].data[0].reason; 

    let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"in_login_logout","agent_id":"'+this.uadmin_id+'","reason":"Logged out from 3CX","status":"0"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {

        // let api_reqs:any = '{"type": "profile"}';
        // this.serverService.profile.next(api_reqs);

      //  this.sendOnload('0',reason,queues);
      if(response.result.status == true){

        
        iziToast.warning({
            message: "Queue logged out from 3CX",
            position: 'topRight'
        });
        //$('#Qlogform').modal('hide');
        this.dialPadClose();
      } else {
        iziToast.error({
            message: "Sorry some error occured",
            position: 'topRight'
        });
        $('#Qlogform').modal('hide');
      }
    }, 
    (error)=>{
        console.log(error);
    });
}



loginQ_from_mob(){
    let access_token: any=localStorage.getItem('access_token');
    let socketData = $('#queulogin').val(); 
    let mData = JSON.parse(socketData);
    // let status= mData[0].data[0].status;
    let queues= mData[0].data[0].queues;
	// let que: any =  $('#que').val();  
    let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"in_login_logout","agent_id":"'+this.uadmin_id+'","reason":"-","status":"1"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {

        // let api_reqs:any = '{"type": "profile"}';
        // this.serverService.profile.next(api_reqs);
       // this.sendOnload('1','',queues);
        if(response.result.status == true){
            
        iziToast.success({
            message: "Found Queue Login from 3CX",
            position: 'topRight'
        });
        this.queLogStatus = '1';
        this.redyForCall = 'On Hook';
      } else {
        iziToast.error({
            message: "Sorry some error occured",
            position: 'topRight'
        });
      }
    }, 
    (error)=>{
        console.log(error);
    });
}
makecallConference(){
    var dialNumber = $('#makeCallConferenceNumber').val();
    var number_data = this.clean_number(dialNumber);
      var dins = this.sip_login;
      if(this.dialPadActionview == 'incoming_call_inprogess'){
        var s = $('#call_incoming_number').val();
            // alert('Call From '+s+', to '+dins); 
      } else {
        var s = $('#outcall_number').val();
            // alert('Call From '+dins+', to '+s); 
      }
  }
  callConference(){
    $(".cnferenumCalldiv").addClass('active');
    $(".cnferenumCalldiv").show();
    $(".cnferenumCalldiv").removeClass('hide-fwd-dialpad');
    this.forwordPopup = 'conference';
  }
shownotification(){

}
public loadScript(url: string) {
    console.log('scriptCalled');
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  removejscssfile(filename, filetype){
    // alert(filename);
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
     if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
      allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
   }
reconnect_janus(){
    this.redyForCall ="Dialer Disconnected";
    this.dial_status ="Not Registered";
    // this.loadScript('../assets/custom/js/mconnect-webrtc.js');
    // this.removejscssfile('../assets/custom/js/webConnect.js','js');

    // this.loadScript('../assets/custom/js/webConnect.js');
    // this.pbxSettings();
    //    $('#sip_urld').val(this.sip_url);
    //    var sip_login = "sip:"+sip_login+"@"+sip_url
    //    var sip_url = "sip:"+sip_url+":"+this.sip_port;

    //     $('#server').val(sip_url);
    //     $('#username').val(sip_login);
    //     $('#authuser').val(this.sip_authentication);
    //     $('#password').val(this.sip_password);
    //     $('#displayname').val('devomni Channel');
    // setTimeout( () => { init_page(sip_login,this.sip_authentication,this.sip_password,sip_url,this.sip_port);  }, 5000 );
// setTimeout(() => {    this.pbxSettings();}, 2000);
    if(this.connect_count==1){
        iziToast.show({           
            icon: 'fa fa-phone',           
            message: 'Server was disconnected,Reconnect will attempt with 5 seconds',
            position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
               [
                '<button>Reload</button>',
                function (instance, toast) {
                //   window.location.reload();
                }
              ]
            ]
          });
          setTimeout(() => {
            //   window.location.reload();
              this.connect_count++;
        }, 5000);
    }
   
    // this.pbxSettings();
}
queueStatus(){
    let access_token: any=localStorage.getItem('access_token');
	// let que: any =  $('#que').val();  
 
    let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"queue_login_logout","user_id":"'+this.uadmin_id+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.data.status== "1"){
        // this.dialPadContainer = true;
        // this.dialPadCirclePlus = false;
        this.temp_status='1';
        this.queLogStatus = response.result.data.status;
        this.redyForCall = 'On Hook';
      } else if(response.result.data.status== "0") {
        this.temp_status='0';
        this.queLogStatus = response.result.data.status;
        this.redyForCall = response.result.data.reason;
        // this.dialPadContainer = true;
        // this.dialPadCirclePlus = false;
        $('#onHookIndi').addClass('red')
      }else{
        this.queLogStatus = '0';
        this.redyForCall = 'Off Hook';
        var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"reqqueuestatus","extension":"'+this.extension+'"}]}]';
        this.websocket.send(socket_message);
      }
      var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"reqqueuestatus","extension":"'+this.extension+'"}]}]';
      this.websocket.send(socket_message);
    }, 
    (error)=>{
        console.log(error);
    });
}
queueStatusWhenOpen(){
    let access_token: any=localStorage.getItem('access_token');
	// let que: any =  $('#que').val();  
 
    let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"queue_login_logout","user_id":"'+this.uadmin_id+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.data.status== "1"){
        // this.dialPadContainer = true;
        // this.dialPadCirclePlus = false;
        this.temp_status='1';
        this.queLogStatus = response.result.data.status;
        this.redyForCall = 'On Hook';
      } else if(response.result.data.status== "0") {
        this.temp_status='0';
        this.queLogStatus = response.result.data.status;
        this.redyForCall = response.result.data.reason;
        // this.dialPadContainer = true;
        // this.dialPadCirclePlus = false;
        $('#onHookIndi').addClass('red')
      }else{
        this.queLogStatus = '0';
        this.redyForCall = 'Off Hook';
        var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"reqqueuestatus","extension":"'+this.extension+'"}]}]';
        this.websocket.send(socket_message);
      }
    //   var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"reqqueuestatus","extension":"'+this.extension+'"}]}]';
    //   this.websocket.send(socket_message);
    }, 
    (error)=>{
        console.log(error);
    });
}

queueStatus2(){
    let access_token: any=localStorage.getItem('access_token');
	// let que: any =  $('#que').val();  
    let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"queue_login_logout","user_id":"'+this.uadmin_id+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.data.status== "1"){
        // this.dialPadContainer = true;
        // this.dialPadCirclePlus = false;
        this.queLogStatus = response.result.data.status;
        this.redyForCall = 'On Hook';
      } else if(response.result.data.status== "0") {
        this.queLogStatus = response.result.data.status;
        this.redyForCall = response.result.data.reason;
        // this.dialPadContainer = true;
        // this.dialPadCirclePlus = false;
        $('#onHookIndi').addClass('red')
      }else{
        this.queLogStatus = '0';
        this.redyForCall = 'Off Hook';
        var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"reqqueuestatus","extension":"'+this.extension+'"}]}]';
        this.websocket.send(socket_message);
      }
    }, 
    (error)=>{
        console.log(error);
    });
}

WrapUpUpdated(){
    let detail_id=btoa(this.caller_no);

    this.router.navigate(['/edit-contacts'], { queryParams: {phone:detail_id, calltype:this.call_type} });
    this.showWrapUp=false;         
}
incomingNotification(id){
    // alert(id)
    let access_token: any=localStorage.getItem('access_token');
	// let que: any =  $('#que').val();  
    let api_req:any = '{"operation":"chat", "moduleType":"chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"send_notification","user_id":"'+this.loginUser+'","text":"Receiving New incoming call from '+id+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any) => {

    });
}
 MrvoIPQueueStatus(){
    let access_token: any=localStorage.getItem('access_token');
    let socketData = $('#MrvoIPQueueStatus').val(); 
    let mData = JSON.parse(socketData);    
    let Status= mData[0].data[0].value;
    let reason= mData[0].data[0].reason;
    if(this.temp_status != Status){
      console.log('Mismathced');
        let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"in_login_logout","agent_id":"'+this.uadmin_id+'","reason":"'+reason+'","status":"'+Status+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {

        // let api_reqs:any = '{"type": "profile"}';
        // this.serverService.profile.next(api_reqs);
       // this.sendOnload('1','',queues);
        if(response.result.status == true){
            this.queueStatus2();
      } 
      
    }, 
    (error)=>{
        console.log(error);
    });
    }
    if(Status == 1){
        this.queLogStatus =1;
        this.redyForCall = 'On Hook';
    // let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"in_login_logout","agent_id":"'+this.uadmin_id+'","reason":"-","status":"1"}}';
  
    // this.serverService.sendServer(api_req).subscribe((response:any) => {

    //     let api_reqs:any = '{"type": "profile"}';
    //     this.serverService.profile.next(api_reqs);
    //    // this.sendOnload('1','',queues);
    //     if(response.result.status == true){
    //         this.queueStatus2();
    //   } 
      
    // }, 
    // (error)=>{
    //     console.log(error);
    // });
}
if(Status == 0){
         this.queLogStatus = 0;
         this.redyForCall = reason;     
        $('#onHookIndi').addClass('red');
    // let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"in_login_logout","agent_id":"'+this.uadmin_id+'","reason":"Logged out from 3CX","status":"0"}}';
  
    // this.serverService.sendServer(api_req).subscribe((response:any) => {
    //     let api_reqs:any = '{"type": "profile"}';
    //     this.serverService.profile.next(api_reqs);
    //   if(response.result.status == true){
    //     this.queueStatus2();

    //   } 
    // }, 
    // (error)=>{
    //     console.log(error);
    // });
}
  }

  dialpadeContactsDropdown(){
    //   alert('1')
// this.uadmin_id = localStorage.getItem('userId');
    
//     let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web","element_data":{"action":"user_list_all","user_id":"'+this.uadmin_id+'"}}';
  
//     this.serverService.sendServer(api_req).subscribe((response:any) => {
//         this.dialpadUserList = response.result.data;
//         // this.pushbridgeuser();
        
//     }, 
//     (error)=>{
//         console.log(error);
//     });

// $('#sendonload').click();

  }

  sendOnAgentload(){
    var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"user_list","Type":"agent_details"}]}]';
    this.websocket.send(socket_message);
   }
  

   changeAgentsdata(){

    let socketData = $('#mrVoipAData').val(); 
    let mData = JSON.parse(socketData);
  
    this.dialpadUserList = mData[0].data;
    this.serverService.UserList3CX = this.dialpadUserList;
    console.log(this.dialpadUserList)
    // this.filterDatas = mData[0].data;    
   
  }
  



  autosuggestAccName(){      
    let acc_name = $("#makeCallForwordNumber").val();
    const searchString = acc_name.toLowerCase();
   
    if(this.dialpadUserList)
    this.produitsFiltres=this.dialpadUserList.filter(item => {
        return (
            // item.agent_name.toLowerCase().includes(searchString)
            item.agent.toLowerCase().includes(searchString)
        )
    });
console.log(this.produitsFiltres);
  }
  
  autosuggestAccName2(){
      
    let acc_name = $("#peer_att").val();
    const searchString = acc_name.toLowerCase();
    if(this.dialpadUserList)
    this.atttransferList=this.dialpadUserList.filter(item => {
        return (
            // item.agent_name.toLowerCase().includes(searchString)
            item.agent.toLowerCase().includes(searchString)
        )
    });
console.log(this.atttransferList);
  }

  addtotransfer(){
    //   alert('');
      let num =$('#cities').val();
      const myArr = num.split("-");
    //   alert(myArr);
    console.log(myArr);
    $('#makeCallForwordNumber').val(myArr[1]);
  }


  adransfer(){
    //   alert();
      let num =$('#add_tansfer').val();
    //   alert(num);
    $('#peer_att').val(num);
  }
  copynumber(to){
    Swal.fire({
        title: 'Confirm for Call',
        text:' Call to '+ to+'',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm!'
      }).then((result) => {
        if (result.value) {
            console.log($('#newCallNMumberCamp').val(to));
            this.webMakeCall3(to);
        }
      });
}
openModelPopup(link) {

    var queue_num = $('#queue_ids').val();

    let api_reqtest:any = '{"type": "hidepopupdialer"}';
    this.serverService.show.next(api_reqtest);

  //  this.caller_no.length === 1 && this.caller_no.match(/[a-z]/i);

    // if(this.caller_no.length > 5 && this.caller_no != 'PlayFile' && this.caller_no != 'cm_barge_in'&& this.caller_no != 'unknown'&& this.caller_no != 'anonymous' && localStorage.getItem('has_contact_popup') =='1'){
    if(this.caller_no.length > 5 && this.caller_no != 'PlayFile' && this.caller_no != 'cm_barge_in'&& this.caller_no != 'unknown'&& this.caller_no != 'anonymous' && localStorage.getItem('popup_settings') =='0'){
   this.modalService.dismissAll(EditContactsComponent);
    const modalRef = this.modalService.open(EditContactsComponent, {backdrop: 'static', keyboard: false});
    modalRef.componentInstance.src = link;
    let api_reqs:any = '{"type": "show_popup", "caller_no": "'+this.caller_no+'","call_type":"'+this.call_type+'","queue_num":"'+queue_num+'","show_buttons":"true"}';
    console.log(api_reqs);
    this.serverService.editContact.next(api_reqs);
    this.show_minimize_button = false;
}else if(this.caller_no.length > 5 && this.caller_no != 'PlayFile' && this.caller_no != 'cm_barge_in'&& this.caller_no != 'unknown'&& this.caller_no != 'anonymous' && localStorage.getItem('popup_settings') =='1'){
    this.router.navigate(['/predictive-dialer-calls'], { queryParams: { phone: this.caller_no , call_rec_id: this.call_history_id} });
    this.dialPadOpen();
}else{
    this.dialPadOpen();
}
  }
  openModelPopupfromFoot(link) {

    var queue_num = $('#queue_ids').val();

    // let api_reqtest:any = '{"type": "hidepopupdialer"}';
    // this.serverService.show.next(api_reqtest);

   this.modalService.dismissAll(EditContactsComponent);
    const modalRef = this.modalService.open(EditContactsComponent);
    modalRef.componentInstance.src = link;
    // let api_reqs:any = '{"type": "show_popup", "caller_no": "'+this.caller_no+'","call_type":"'+this.call_type+'","queue_num":"'+queue_num+'","show_buttons":"true"}';
    // console.log(api_reqs);
    // this.serverService.editContact.next(api_reqs);
    let api_reqs2:any = '{"type": "call_info", "caller_no": "'+this.caller_no+'","call_type":"'+this.call_type+'"}';    
    this.serverService.editContact.next(api_reqs2);
    this.show_minimize_button = false;
  }
  Callforword2(type){
    if(type == 'dtmf'){
        this.dtmf2 = true;
    } else {
        this.dtmf2 = false;
    }
    this.dialpadeContactsDropdown();
    $(".forwardDialpadPanel2").addClass('active');
    $(".forwardDialpadPanel2").show();
    $(".forwardDialpadPanel2").removeClass('hide-fwd-dialpad');
    this.forwordPopup = 'attendedTransfer';
    $('#addhelper').click();
    $('.demoClass').hide();
    $('#peer_att').val()=="";
     // To hide Blind transfer
     $(".forwardDialpadPanel").addClass('hide-fwd-dialpad');
     $(".forwardDialpadPanel").removeClass('active');
     $(".forwardDialpadPanel").hide();
  }

  makecallTransfer2(e){
    console.log(e)
    //  alert('trns')
    //   var dialNumber = $('#makeCallForwordNumber').val();
    //   var number_data = this.clean_number(dialNumber);
    //   this.dialPadDetailView('call_history_detail', this.call_history_id);
    //   $('#animate-dialpad').modal('hide');
    //     $(".forwardDialpadPanel2").addClass('hide-fwd-dialpad');
    //      $(".forwardDialpadPanel2").show();
    //   this.forwordPopup = 'forwarded';
    //   $('#makeCallForwordNumber').val('');
    //   $('#dialpad_number').val('');
    //   makecallTransfer(number_data);
    //         this.in_current_call = '';
    // alert($('#peer_att').val());
    console.log($('#peer_att').val())
    if($('#peer_att').val()==""){
        iziToast.warning({
            message:"Please Enter the number",
            position:'topRight'
        });
        return false;
    }
    doCallATT(1);
 this.show_end_helper=true;
  }

addhelperasdsadasds(){
    
}
addHelp(){
    setTimeout(() => {
        addHelpers();
}, 2000);
}

endCallTransfer(){
    this.show_end_helper=false;
    endHeplCall();
}
makecallTransferDemo(){
    this.show_end_helper=false;
    var socket_message  =  '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"attn_transfer","extension":"'+this.extension+'"}]}]';
    this.websocket.send(socket_message);
     $(".forwardDialpadPanel2").addClass('hide-fwd-dialpad');
     $(".forwardDialpadPanel2").removeClass('active');
     $(".forwardDialpadPanel2").hide();
}

addWrapupcode(call_type,aux_code,cat_id,call_note,from_no,to_no,wrap,opportunity,unique_id) {  
    let wrapcall_id = $('#wrapup_callID').val();
    // let wrapcall_id = $('#wrapup_callID').val();

    var admin_permission = localStorage.getItem('admin_permision');
    
var queue_num = $('#queue_ids').val();  
    let api_req: any = new Object;
    let conct_req: any = new Object();

    api_req.operation = "contact";
    api_req.moduleType = "contact";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');

    conct_req.from_no = from_no;
    conct_req.to_no = to_no;
    conct_req.type = call_type;
    conct_req.aux_code = aux_code;
    conct_req.opportunity_id = opportunity;
    conct_req.cat_id = cat_id;
    conct_req.call_id_3cx = wrapcall_id;
    conct_req.call_note = call_note;
    conct_req.call_queue_num = queue_num;
    conct_req.user_id = this.uadmin_id; 
    conct_req.admin_id = localStorage.getItem('admin_id');
    conct_req.unique_id = unique_id;
    api_req.element_data = conct_req;


    // api_req.element_data.admin_id = this.admin_id;
    api_req.element_data.action = "add_auxcode_wall";
    this.serverService.sendServer(api_req).subscribe((response: any) => {
     
      if (response.status == false) {

      }
    },
      (error) => {
        console.log(error);
      });
    var socket_message = '[{"cust_id":"' + this.has_hard_id + '","data":[{"Name":"wrapupcode","callid":"' + wrapcall_id + '","wcode":"' + wrap + '","wcodenote":"' + call_note + '","extno":"' + this.extension + '"}]}]';
    this.websocket.send(socket_message);
    $('.settingSidebar').removeClass('showSettingPanel');
    iziToast.success({
      message: "Wrapup Code Added successfully",
      position: "topRight"
    });
    $('#auxcodes_pop').val('');
    $('#auxcodes_subcat').val('');
    $('#notes').val('');
  }
  close_callerID(){
    $("#choose_callerid").modal('hide');         
  }

  voiceopen(){
    $("#voicemailform").modal('show');  
    // this.listVoicemail(); 
          
  }

  listVoicemail(){
    // {"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"", "element_data":{"action":"voicemail_list","admin_id":"1359","ext_no":"10003"}}
    let api_req: any = new Object;
    let voice_req: any = new Object();

    api_req.operation = "call";
    api_req.moduleType = "call";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');

    voice_req.action = "voicemail_list";
    voice_req.admin_id = this.admin_id;
    voice_req.ext_no = this.extension;
    api_req.element_data = voice_req;
  
    this.serverService.sendServer(api_req).subscribe((response: any) => {
     
        if(response.result.status == true){
                this.voicemail_list = response.result.data;
                this.vmcount = this.voicemail_list.length;
                for (var i = 0; i < this.voicemail_list.length; i++) {
                    this.voicemail_list[i].playaudiobtn = true;
                 // this.call_history_list[i].rec_path= "";
               this.voicemail_list[i].state= false;
                 this.voicemail_list[i].loader=false;
                  }
        }else{
            this.vmcount = '0';
        }

  
      },
        (error) => {
          console.log(error);
        });


}



playaudiofun(id,i, type){
    if(type == 'play'){
      this.call_list_rec_path(id,i);
    }else{
      if(!this.testing.paused) this.testing.pause();
      this.testing.currentTime = 0;
    
    
      this.voicemail_list[i].state = !this.voicemail_list[i].state  // flips the boolean value for the clicked item 
      for (let item of this.voicemail_list) {  
         if ( item !== this.voicemail_list[i] ) { 
             item.state = false; 
         }
      }
    
    }
    
    }


call_list_rec_path(id,i){
    let access_token: any=localStorage.getItem('access_token');
    
    let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"voicemail_rec_path","id":"'+id+'"}}';
    
    this.serverService.sendServer(api_req).subscribe((response:any) => {

      this.listVoicemail();
      if(response.result.status==true){
    // console.log(response);
    
    if(this.testing != undefined){
    if(!this.testing.paused) this.testing.pause();
    this.testing.currentTime = 0;
    }
 
    this.voicemail_list[i].state = !this.voicemail_list[i].state  // flips the boolean value for the clicked item 
    for (let item of this.voicemail_list) {  
       if ( item !== this.voicemail_list[i] ) { 
           item.state = false; 
       }
    }
 
    this.testing= new Audio("data:audio/wav;base64," + response.result.data[0].vmrec);
     this.testing.play();
     var self = this;
 
   this.testing.addEventListener('ended', function() {
     this.currentTime = 0;
     this.pause();
 
 
     self.voicemail_list[i].state = !self.voicemail_list[i].state  // flips the boolean value for the clicked item 
     for (let item of self.voicemail_list) {  
        if ( item !== self.voicemail_list[i] ) { 
            item.state = false; 
        }
     }
 
   }, false);
 
     
 
    
      } else {
      }
    }, 
    (error)=>{
      // console.log(error);
    });
    }
    GetContactName(number) {

        if(this.dialpadUserList)       
        var agent_3cx = this.dialpadUserList.filter(item => item.agent_no == number);       
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

    getAgentName(number,type) {
        // console.log(number);
        // console.log(type);
        
        let myArray:any;

        var sort_by_to = number.split(" ");

         var values = sort_by_to.includes("Call");  
         var to_values = sort_by_to.includes("to");  
         if(values == true && to_values == true){
            // console.log(to_values);
            // if(to_values == true){
                const data4 = number.split("Call to ");
                myArray = data4;
            // }
         }else if(type == 'call_from'){
            const data1 = number.split("Call from ");
            myArray = data1;
        }else  if(type == 'called_to'){
        const data2 = number.split("Called to ");
        myArray = data2;
        }else if(type == 'calling_to'){
        const data3 = number.split("Calling to ");
        myArray = data3;
        }
        // console.log(data1);
        // if(data1[1] != '' && data1[1] != undefined && data1[1] != null){
        //     myArray = data1;
        // }
        // if(data1[2] != '' && data1[2] != undefined && data1[2] != null){
        //     myArray = data2;
        // }

        // console.log('hello');
        
        // console.log(this.dialpadUserList);
        if(this.dialpadUserList)       
        var agent_3cx = this.dialpadUserList.filter(item => item.agent_no == myArray[1]); 
        else
        return ''
        // console.log(agent_3cx)      
        
        if(agent_3cx.length>0){ 
          return agent_3cx[0].agent;  
        }else{
         if(this.AllContactList)
         var myItems = this.AllContactList.find(item => item.phone === myArray[1]|| item.mobile === myArray[1]);
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
    webMakeVideoCall(number_key,show_caller_id) {
        //this.show_caller_id = show_caller_id;
        var number_data = this.clean_number(number_key);
        if (!$('#dialpad-refresh').length) {
            this.dialPadOpenInCommingCall();
        }
        
        //    alert(number_data); return false;
        if (number_data.length > 1) {
        // alert(number_data);
            this.inc_or_out = number_data;
            $('#make_call_number').val(number_data);
            this.dialPadDetailView('outgoing_call_inprogess', number_data);
            doVideoCall();
            $('#makeVideoBox').show();
            $('#dialpad_number').val('');
        }
        }
    dialVideoCall() {
        $('.position-abs').show();
        $('#details').show();
        var dialpad_number = $('#dialpad_number').val();
    
        if(this.in_current_call == 'incoming_call_inprogess'){
            console.log('outgoing_call_inprogess');
            var number_data = this.clean_number(dialpad_number);
            this.dialPadDetailView('outgoing_call_inprogess', number_data);
            $('#dialpad_number').val('');
            transferCall(dialpad_number); 
            this.in_current_call = '';
        } else {
            if (dialpad_number.length > 1) {
                this.webMakeVideoCall(dialpad_number,'1');
            }
        }
        }

// ========================  SCREEN RECORDING STARTS =============================

getRecordedUrl(): Observable<string> {
    return this._recordedUrl.asObservable();
  }

  getRecordedBlob(): Observable<RecordedVideoOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  getStream(): Observable<MediaStream> {
    return this._stream.asObservable();
  }

  startRecording() {
    var browser = <any>navigator;
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this._recordingTime.next('00:00');

    return new Promise((resolve, reject) => {
      browser.mediaDevices
        .getDisplayMedia({
          video: {
            displaySurface: 'browser', // monitor, window, application, browser
            logicalSurface: true,
            cursor: 'always', // never, always, motion
          },
        })
        .then((screenStream: any) => {
            console.log('recording navin')
          navigator.mediaDevices.getUserMedia({ audio: true }).then((mic) => {
            screenStream.addTrack(mic.getTracks()[0]);
            this.stream = screenStream;
            this.record();
            resolve(this.stream);
          });
        })
        .catch((error: any) => {
          this._recordingFailed.next();
          reject;
        });
    });
  }

  abortRecording() {
    this.stopMedia();
  }

  private record() {
    this.recorder = new RecordRTC(this.stream, {
      type: 'video',
      mimeType: 'video/webm',
      bitsPerSecond: 44000,
    });
    this.recorder.startRecording();
    this.startTime = moment();
    this.interval = setInterval(() => {
      const currentTime = moment();
      const diffTime = moment.duration(currentTime.diff(this.startTime));
      const time =
        this.toString(diffTime.minutes()) +
        ':' +
        this.toString(diffTime.seconds());
      this._recordingTime.next(time);
      this._stream.next(this.stream);
    }, 500);
  }

  private toString(value: any) {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stopRecording(this.processVideo.bind(this));
      this.processVideo.bind(this.recorder)
      this.processVideo(this.recorder);
      this.stopMedia();
    }
  }

  private processVideo(audioVideoWebMURL: any) {
    console.log(audioVideoWebMURL);
    $("#video").attr("src", audioVideoWebMURL)​
    const recordedBlob = this.recorder.getBlob();
    this.recorder.getDataURL(function (dataURL: any) {});
    const recordedName = encodeURIComponent(
      'video_' + new Date().getTime() + '.webm'
    );
    this._recorded.next({
      blob: recordedBlob,
      url: audioVideoWebMURL,
      title: recordedName,
    });
    this.stopMedia();

    
    this.recorder.save(recordedName);
  }
  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach((track: any) => track.stop());
        this.stream.getVideoTracks().forEach((track: any) => track.stop());
        this.stream.stop();
        this.stream = null;
      }
    }
  }


// ========================  SCREEN RECORDING ENDS =============================

}
