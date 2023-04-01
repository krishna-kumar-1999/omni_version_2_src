import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { ServerService } from '../services/server.service';
// import { ActivatedRoute } from '@angular/router';

import { BnNgIdleService } from 'bn-ng-idle';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EditContactsComponent } from '../edit-contacts/edit-contacts.component';

declare var $: any;

declare var io: any;
// declare var googleTranslateElementInit:any;
declare var iziToast: any;
declare const window: any;
import Swal from 'sweetalert2'
// import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user_type;
  user_name;
  loadAPI: Promise<any>;
  show_sup_admin_sett = false;
  show_admin_sett = false;
  // fax_admin =false;
  reseller_values;
  h_con = false;
  show_user_sett = false;
  h_sms = false;
  h_chat = false;
  h_int_chat = false;
  h_wp = false;
  h_wp_off = false;
  h_wp_unoff = false;
  h_ticket = 'disabled';
  e_tic = false;
  i_tick = false;
  h_cbot = false;
  voice_3cx = false;
  h_fb = false;
  reseller_sett = false;
  voice;
  pred_dial;
  has_pd = false;
  lead = false;
  has_power_bi =false;
  wall_link;
  loginReq;
  profile_image;
  uadmin_id;
  logo_image;
  small_logo_image;
  userID;
  layout;
  admin_id;
  theme;
  report_checked;
  report_array;
  list_reports;
  queLogStatusNma;
  cust_pbx = false;
  wall_1 = false;
  wall_2 = false;
  wall_3 = false;
  h_fax = false;
  wall_4 = false;
  dial_status;
  is_reports;
  close_all_menu;
  fax_user = true;
  queLogStatus;
  websocket;
  admin_reports;
  message
  predective_dialer_behave;
  reqPermission;
  hidemessaging = '';
  h_tele;
  hidemessagingVoi = '';
  inst_id;
  list_wpinsts;
  showHideDialerS = true;
  mrvoip = false;
  h_webinar = false;
  h_message = false;
  has_video_call = false;
  encUser;
  wall_5 = false;
  wall_6 = false;
  wall_10 = false;
  wall_8 = false;
  h_call_rec; wall_basic; h_que_manage;
  agent_name;
  stop_interval;
  has_admin_permission = false;
  has_webclient = false;

  showsso = false;
  missedCount;
  voicemailCount;
  extension;
  voicemail_list: any;
  testing;
  has_hard_id;
  show_caller_id:any;
  VMrecordNotFound=false;
  hasUpdate = false;
  license_check;
  ad_min: any;
  update = false;
  zoho_crm = false;
  h_cli_status = false;
  chatCounts: any;
  Mrvoip_version;
  Omni_version;
  count_leftDays;
  has_internal_call_ticket = false;
  webclient_premission=false;
  has_people_premission = false;
  billing = false;
  admin = false;
  trial_show = false;
  constructor(public router: Router, public modalService: NgbModal,private _ngZone: NgZone, private serverService: ServerService, private bnIdle: BnNgIdleService) {
    this.serverService.profile.subscribe((val: any) => {
      // this.dept_settings();
      this.dialPadOpens();

      // this.hasContactAccess();
    });


    this.serverService.receiveMessage()

    this.serverService.showvedioDialer.subscribe((val: any) => {
      console.log(val);
      var dpContent = JSON.parse(val);
      if (dpContent.type == "showDialer") {
        this.showHideDialerS = false;
        $('#video_widget').click();
      } else {
        this.showHideDialerS = true;
      }
    }
    );

  }
  setNotify(){
    let notifytoken = window.location.hostname;

    let access_token: any = localStorage.getItem('access_token');
    let user_id: any = localStorage.getItem('userId');
    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"notification_code","user_id":"' + user_id + '","notification_code":"' + notifytoken + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      
      localStorage.setItem('N_token', notifytoken);
      this.requestPermission();
      console.log('Permission granted! Save to the server!', notifytoken);
    });
  }


  requestPermission() {
    // this.serverService.requestPermission();

    if (localStorage.getItem('N_token') == "undefined" || localStorage.getItem('N_token') == "" || localStorage.getItem('N_token') == "null" || localStorage.getItem('N_token') == null) {
      this.reqPermission = true;
    } else {
      this.reqPermission = false;
    }


  }
  ifnotrefreshed() {
    // alert('called')
    this.reqPermission = false;
    // this.stop_interval = setInterval(() => {
    //   this.requestPermission();
    //   // alert('revices')
    // }, 30000);
  }


  ngOnInit() {
    this.get_admin();


    this.Mrvoip_version =   localStorage.getItem('mrvoipcurVersion');
    this.Omni_version =   localStorage.getItem('curVersion');
    
    console.log(this.Mrvoip_version);
    console.log(this.Omni_version);

    this.show_caller_id = localStorage.getItem('show_caller_id');
    if (localStorage.getItem('access_token')) {

      this.notificationscall();
      // this.bnIdle.startWatching(3400).subscribe((isTimedOut: boolean) => {
      //   if (isTimedOut) {
      //     this.logout();
      //     iziToast.warning({
      //       message: "You have LoggedOut for an one hour InActive session",
      //       position: 'topRight',
      //       timeout: 1000000,
      //     });
      //   }
      // });
      if (localStorage.getItem('N_token') == "undefined" || localStorage.getItem('N_token') == "" || localStorage.getItem('N_token') == "null" || localStorage.getItem('N_token') == null) {
        this.reqPermission = true;
        // setTimeout(() => {
        //   this.requestPermission();
        //   this.ifnotrefreshed();
        //   // alert('clled')      ;
        // }, 10000);
      } else {
        // alert()
        this.reqPermission = false;

        // this.stop_interval = setInterval(() => {
        //   this.requestPermission();
        // }, 30000); //1min
      }
      this.uadmin_id = localStorage.getItem('userId');
      this.admin_id = localStorage.getItem('admin_id');
      this.admin_reports = localStorage.getItem('has_reports');
      this.extension = localStorage.getItem('ext_num');
      this.has_hard_id = localStorage.getItem('hardware_id');
      this.predective_dialer_behave = localStorage.getItem('predective_dialer_behave');

      this.message = this.serverService.currentMessage;

      this.reseller_values = localStorage.getItem('reseller');

      if(this.uadmin_id==this.admin_id){
        this.admin = true;
      }else{
        this.admin = false;
      }
      // if( this.reseller_values== '' ||this.reseller_values==null){

      //   this.fax_admin= false;
      // }
      // else
      // {
      //   this.fax_admin= true;

      // }
      if (localStorage.getItem('N_token') == "undefined" || localStorage.getItem('N_token') == "") {
        this.reqPermission = true;
      } else {
        this.reqPermission = false;
      }


      this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");
      // if(window.location.hostname=='localhost'){
      //   localStorage.setItem('socket_url',btoa("developtesting.my3cx.sg"));
      // }else{
      //   localStorage.setItem('socket_url',btoa(window.location.hostname));
      // }


      this.websocket.onopen = function (event) {
        console.log('common socket connected');

      }

      // this.websocket.onmessage = function (event) {

      //   //console.log(event.data);

      //   this.socketData = JSON.parse(event.data);
      //   console.log(this.socketData);

      //   let admin_id = localStorage.getItem('admin_id');
      //   let new_user = localStorage.getItem('userId');
      //   if (this.socketData.message_type == "chat") {
      //     if (this.socketData.message_status == "new") {
      //       if (this.socketData.message_info.admin_id == admin_id) {
      //         if (this.socketData.message_info.msg_user_type == "1") {
      //           console.log(this.socketData.message_info);
      //           var uni_id = this.socketData.message_info.chat_id;
      //           uni_id = btoa(uni_id);
      //           var dept_users = this.socketData.message_info.department_users;
      //           var nameArr = dept_users.split(',');
      //           nameArr.push(this.socketData.message_info.admin_id);
      //           nameArr.forEach(element => {
      //             if (element == localStorage.getItem('userId')) {

      //               var promise = document.querySelector('audio').play();

      //               if (promise !== undefined) {
      //                 promise.catch(error => {
      //                   iziToast.warning({
      //                     message: "Please Enable Autoplay Permission To Make Sound Alerts.",
      //                     position: 'topRight'
      //                   });
      //                 }).then(() => {
      //                   let audioPlayer = <HTMLVideoElement>document.getElementById('beepaud');
      //                   audioPlayer.play();

      //                 });
      //               }




      //               iziToast.show({
      //                 theme: 'dark',
      //                 title: 'Hi',
      //                 image: "https://updates.mconnectapps.com/"+localStorage.getItem('company_name')+"/v1.0/logo_image/omni-channels-logo.jpg",
      //                 imageWidth: 100,
      //                 message: 'New Chat Message',
      //                 position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
      //                 progressBarColor: 'rgb(0, 255, 184)',
      //                 buttons: [
      //                   ['<button onclick="openUrl()";>Open Chat</button>', function (instance, toast) {
      //                     var url = 'https://' + window.location.hostname + '#/chat?c=' + uni_id;

      //                     window.location.replace(url);
      //                   }, true], // true to focus
      //                   ['<button>Close</button>', function (instance, toast) {
      //                     instance.hide({
      //                       transitionOut: 'fadeOutUp',
      //                       onClosing: function (instance, toast, closedBy) {
      //                         console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
      //                       }
      //                     }, toast, 'buttonName');
      //                   }]
      //                 ],
      //                 onOpening: function (instance, toast) {
      //                   console.info('callback abriu!');
      //                 },
      //                 onClosing: function (instance, toast, closedBy) {
      //                   console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
      //                 }
      //               });
      //             }
      //           });
      //         }
      //       }
      //     }


      //     if (this.socketData.message_status == "existing") {
      //       if (this.socketData.message_info.admin_id == admin_id) {
      //         if (this.socketData.message_info.msg_user_type == "1") {
      //           console.log(this.socketData.message_info);
      //           var uni_id = this.socketData.message_info.chat_id;
      //           uni_id = btoa(uni_id);
      //           var dept_users = this.socketData.message_info.department_users;
      //           var nameArr = dept_users.split(',');
      //           nameArr.push(this.socketData.message_info.admin_id);
      //           nameArr.forEach(element => {
      //             if (element == localStorage.getItem('userId')) {

      //               var promise = document.querySelector('audio').play();

      //               if (promise !== undefined) {
      //                 promise.catch(error => {
      //                   iziToast.warning({
      //                     message: "Please Enable Autoplay Permission To Make Sound Alerts.",
      //                     position: 'topRight'
      //                   });
      //                 }).then(() => {
      //                   let audioPlayer = <HTMLVideoElement>document.getElementById('beepaud');
      //                   audioPlayer.play();

      //                 });
      //               }




      //               iziToast.show({
      //                 theme: 'dark',
      //                 title: this.socketData.message_info.customer_name,
      //                 image: "https://updates.mconnectapps.com/"+localStorage.getItem('company_name')+"/v1.0/logo_image/omni-channels-logo.jpg",
      //                 imageWidth: 100,
      //                 message: 'Existing Message',
      //                 position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
      //                 progressBarColor: 'rgb(0, 255, 184)',
      //                 buttons: [
      //                   ['<button onclick="openUrl()";>Open Chat</button>', function (instance, toast) {
      //                     var url = 'https://' + window.location.hostname + '#/chat?c=' + uni_id;

      //                     window.location.replace(url);
      //                   }, true], // true to focus
      //                   ['<button>Close</button>', function (instance, toast) {
      //                     instance.hide({
      //                       transitionOut: 'fadeOutUp',
      //                       onClosing: function (instance, toast, closedBy) {
      //                         console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
      //                       }
      //                     }, toast, 'buttonName');
      //                   }]
      //                 ],
      //                 onOpening: function (instance, toast) {
      //                   console.info('callback abriu!');
      //                 },
      //                 onClosing: function (instance, toast, closedBy) {
      //                   console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
      //                 }
      //               });
      //             }
      //           });
      //         }
      //       }
      //     }


      //   }
      //   if (this.socketData.message_status == "end") {
      //     if (this.socketData.message_info.admin_id == admin_id) {
      //       console.log(this.socketData.message_info);
      //       var dept_users = this.socketData.message_info.department_users;
      //       var nameArr = dept_users.split(',');
      //       nameArr.push(this.socketData.message_info.admin_id);
      //       nameArr.forEach(element => {
      //         if (element == localStorage.getItem('userId')) {
      //           var uni_id = this.socketData.message_info.chat_id;
      //           uni_id = btoa(uni_id);
      //           let audioPlayer = <HTMLVideoElement>document.getElementById('beepaud');
      //           audioPlayer.play();
      //           iziToast.show({
      //             theme: 'dark',
      //             title: 'Hi',
      //             image: "https://updates.mconnectapps.com/"+localStorage.getItem('company_name')+"/v1.0/logo_image/omni-channels-logo.jpg",
      //             imageWidth: 100,
      //             message: 'Chat Was Closed By Customer',
      //             position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
      //             progressBarColor: 'rgb(0, 255, 184)',
      //             buttons: [
      //               ['<button onclick="openUrl()";>Open Chat</button>', function (instance, toast) {
      //                 var url = 'https://' + window.location.hostname + '/#/chat?c=' + uni_id;

      //                 window.location.replace(url);
      //               }, true], // true to focus
      //               ['<button>Close</button>', function (instance, toast) {
      //                 instance.hide({
      //                   transitionOut: 'fadeOutUp',
      //                   onClosing: function (instance, toast, closedBy) {
      //                     console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
      //                   }
      //                 }, toast, 'buttonName');
      //               }]
      //             ],
      //             onOpening: function (instance, toast) {
      //               console.info('callback abriu!');
      //             },
      //             onClosing: function (instance, toast, closedBy) {
      //               console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
      //             }
      //           });
      //         }
      //       });
      //     }
      //   }


      //   if (this.socketData.message_type == "chat") {
      //     if (this.socketData.message_info.admin_id == admin_id) {
      //       if (this.socketData.message_status == "new") {

      //         $('#mc_event_list').click();
      //         $('.chat_list_search').click();
      //       }

      //     }
      //   }

      // }
      this.hasContactAccess();
      this.websocket.onmessage = function(event) {      
        console.log(event.data);  
    var self=this;
 
         var result_message = JSON.parse(event.data);
     this.has_hard_id = localStorage.getItem('hardware_id');
      //  if(result_message[0].cust_id == this.has_hard_id){
      //   this.ServerService.socket_data = result_message;
      //  } else {
      //    return false;
      //  }
      }
      this.websocket.onerror = function (event) {
        console.log('error');
      }
      this.websocket.onclose = function (event) {
        console.log('close');
      }


      if (localStorage.getItem('access_token')) {

      }
      else {
        this.router.navigate(['/login']);
      }
      this.user_type = localStorage.getItem('user_type');
      this.user_name = localStorage.getItem('user_name');
      this.userID = localStorage.getItem('userId');
      this.encUser = localStorage.getItem('encUser');

      this.layout = localStorage.getItem('layout');
      this.theme = localStorage.getItem('theme');


      let color_class = this.layout + ' ' + this.layout + '-sidebar theme-' + this.theme;
      if (this.layout == 'dark' || this.layout == 'light') {
        $("body").removeClass();
        $("body").addClass(color_class);
      } else {

      }



      if (this.user_type == 'Super Admin') {
        this.show_sup_admin_sett = true;
      }
      if (this.user_type == 'Admin') {     
        this.show_admin_sett = true;
      }
      if (this.user_type == 'Employee') {
     

        this.show_user_sett = true;
      }
      this.profile_image = localStorage.getItem('profile_image');

// alert(this.profile_image);
      if (this.profile_image != null && this.profile_image != 'null' && this.profile_image != 'undefined' && this.profile_image != '') {
        this.profile_image = localStorage.getItem('profile_image');

      } else {
        this.profile_image = 'assets/images/user.jpg';

      }


      this.logo_image = localStorage.getItem('logo_image');

      if (this.logo_image == null || this.logo_image == 'null' || this.logo_image == 'undefined' || this.logo_image == '') {
        this.logo_image = 'assets/img/mconnect-2.0.png';
        // this.logo_image = 'assets/images/mconnect-logo.png';
      } else {
        this.logo_image = localStorage.getItem('logo_image');
      }
      // alert(this.small_logo_image);
      this.small_logo_image = localStorage.getItem('small_logo_image');

      if (this.small_logo_image == null || this.small_logo_image == 'null' || this.small_logo_image == 'undefined' || this.small_logo_image == '') {
        this.small_logo_image = 'assets/images/favicon.png';
        // alert('asas')

      } else {
        this.small_logo_image = localStorage.getItem('small_logo_image');
      }


      // this.hasContactAccess();
      this.totalCount();
      this.getReports();
      // this.listVoicemail();
      this.getinstance(); 
      this.currentVersionMrvoip();
      this.checkForUpdate();
      if (localStorage.justOnce) {
        this.checkForUpdates();//this will check ommni version updates available or not

        if(this.uadmin_id !='1'){
        this.checkpermissions();
        this.license_check = setInterval(() => {
          this.checkpermissions();
        }, 1000000);
      }
      }
     
    }
    // googleTranslateElementInit();
  }
  all_socket_data(){
    var socket = io.connect('wss://'+window.location.hostname+':4011');
    // var socket = io.connect('wss://developtesting.my3cx.sg:4010');
  }
  get_admin(){
    
    let user_id = localStorage.getItem('userId');
    let admin_id = localStorage.getItem('admin_id');
    if(user_id = admin_id){
      this.update = true;
    }else{
      this.update = false;
    }
  }

  getinstance() {
    let access_token: any = localStorage.getItem('access_token');

    let api_req: any = '{"operation":"wp_instance", "moduleType":"wp_instance", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"getInstanceDetailsForAdmin","user_id":"' + this.userID + '","admin_id":"' + this.admin_id + '","user_type":"' + this.user_type + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.list_wpinsts = response.result.data;
        //  if(response.status)
      }
    },
      (error) => {
        console.log(error);
      });
  }


  getReports() {
    let access_token: any = localStorage.getItem('access_token');

    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"list_report"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.list_reports = response.result.data.report_list;
        console.log(this.list_reports);
        // console.log(response);
      }
    },
      (error) => {
        console.log(error);
      });
  }

  // openVideoPopup(link) {
  //   const modalRef = this.modalService.open(EditContactsComponent);
  //   modalRef.componentInstance.src = link;
  //   let api_reqs:any = '{"type": "show_popup", "caller_no": "123456","call_type":"incoming"}';
  //   this.serverService.editContact.next(api_reqs);
  // }
  dept_settings() {
    let access_token: any = localStorage.getItem('access_token');
    let user_id: any = localStorage.getItem('userId');
    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"get_agent_data","user_id":"' + user_id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      var agent_data = response.result.data;
      this.profile_image = agent_data.profile_image;

      if (this.profile_image == null || this.profile_image == 'null' || this.profile_image == 'undefined') {
        this.profile_image = 'assets/images/user.jpg';
      } else {
        this.profile_image = agent_data.profile_image;
      }
      if (this.logo_image == null || this.logo_image == 'null' || this.logo_image == 'undefined') {
        this.logo_image = 'assets/images/omni-channels-logo.jpg';
      } else {
        this.logo_image = agent_data.logo_image;
      }
      if (this.small_logo_image == null || this.small_logo_image == 'null' || this.small_logo_image == 'undefined') {
        this.small_logo_image = 'assets/images/favicon.png';
      } else {
        this.small_logo_image = agent_data.small_logo_image;
      }

    },
      (error) => {
        console.log(error);
      });
  }


  openMe(id) {
    // $('.dropdown-menu').css("display","none");
    $('#' + id).css("display", "block");
  }






  hasContactAccess() {
    let api_req: any = new Object();
    let conct_req: any = new Object();
    conct_req.action = "has_contact_access";
    conct_req.user_id = localStorage.getItem('userId');
    api_req.operation = "contact";
    api_req.moduleType = "contact";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = conct_req;
    // console.log(api_req);
    this.serverService.sendServer_login(api_req).subscribe((response: any) => {


      // this.h_con = response.result.data.has_contact;
      // this.h_sms = response.result.data.has_sms;
      // this.h_chat = response.result.data.has_chat;
      // this.h_wp = response.result.data.has_whatsapp;
      // this.h_cbot = response.result.data.has_chatbot;
      // this.e_tic = response.result.data.has_external_ticket;
      // this.i_tick = response.result.data.has_internal_ticket;
      // this.voice_3cx = response.result.data.voice_3cx;
      // this.has_pd = response.result.data.predective_dialer;
      // this.lead = response.result.data.lead;
      // this.wall_1 = response.result.data.wallboard_one;
      // this.wall_2 = response.result.data.wallboard_two;
      // this.wall_3 = response.result.data.wallboard_three;
      // this.wall_4 = response.result.data.wallboard_four;




      localStorage.setItem('call_Settings',response.result.data.call_sett);
      localStorage.setItem('has_sms', response.result.data.has_sms);
      localStorage.setItem('agent_name', response.result.data.agent_name);
      localStorage.setItem('has_chat', response.result.data.has_chat);
      localStorage.setItem('has_whatsapp', response.result.data.has_whatsapp);
      localStorage.setItem('has_telegram', response.result.data.has_telegram);
      localStorage.setItem('has_fb', response.result.data.has_fb);
      localStorage.setItem('has_chatbot', response.result.data.has_chatbot);
      localStorage.setItem('has_e_ticket', response.result.data.has_external_ticket);
      localStorage.setItem('has_i_ticket', response.result.data.has_internal_ticket);
      localStorage.setItem('has_reports', response.result.data.reports);
      localStorage.setItem('close_all_menu', response.result.data.close_all_menu);
      localStorage.setItem('faxuser_id', response.result.data.fax_user_id);
      localStorage.setItem('whatsapp_type', response.result.data.whatsapp_type);
      localStorage.setItem('has_video_dialer', response.result.data.has_video_call);
      localStorage.setItem('h_con', response.result.data.has_contact);
      localStorage.setItem('ext_num', response.result.data.sip_login);
      localStorage.setItem('reseller', response.result.data.reseller);
      localStorage.setItem('admin_permision', response.result.data.admin_permision);
      localStorage.setItem('voice_manage', response.result.data.voice_manage);
      localStorage.setItem('ring_step', response.result.data.dialer_ring);
      localStorage.setItem('dialer_auto_answer', response.result.data.dialer_auto_answer);
      localStorage.setItem('timezone_name', response.result.data.timezone_name);
      localStorage.setItem('has_external_contact', response.result.data.has_external_contact);
      localStorage.setItem('has_int_chat', response.result.data.has_internal_chat);
      localStorage.setItem('predective_dialer_behave', response.result.data.predective_dialer_behave);
      localStorage.setItem('show_caller_id', response.result.data.show_caller_id);
      localStorage.setItem('server_FQDN', response.result.webrtcServer.server_fqdn);
      localStorage.setItem('server_ID', response.result.webrtcServer.server_id);
      localStorage.setItem('has_predict', response.result.data.predective_dialer);
      localStorage.setItem('has_voice', response.result.data.voice_3cx);
      localStorage.setItem('has_supervisor', response.result.data.has_supervisor);
      localStorage.setItem('round_robin', response.result.data.override);
      localStorage.setItem('has_sso', response.result.data.has_sso);
      localStorage.setItem('agent_delete_permission', response.result.data.agent_delete_permission);
      localStorage.setItem('cli_status', response.result.data.cli_status);
      localStorage.setItem('has_contact_popup', response.result.data.has_contact_popup);
      localStorage.setItem('has_teams', response.result.data.has_teams);
      localStorage.setItem('has_teams_sso', response.result.data.has_teams_sso);
      localStorage.setItem('license_key', response.result.data.license_key);  
      localStorage.setItem('mrvoip_license_key', response.result.data.mrvoip_license_key);  
      localStorage.setItem('has_zohocrm', response.result.data.has_zohocrm);                  
      localStorage.setItem('pbx_url', response.result.data.pbx_url);                  
      localStorage.setItem('has_internal_call_ticket', response.result.data.has_internal_call_ticket);
      localStorage.setItem('popup_settings',response.result.data.call_popup_sett);
      localStorage.setItem('survey_per',response.result.data.servey_per);
      // return false;
      if(response.result.data.has_people=='1'){
        this.has_people_premission=true;
      }else{
        this.has_people_premission=false;
      }
      if(response.result.data.has_webclient=='1'){
        this.webclient_premission=true;
      }else{
        this.webclient_premission=false;
      }
      if(response.result.data.power_bi == '1'){
        this.has_power_bi = true;
      }else{
        this.has_power_bi = false;
      }
      if(response.result.data.has_zohocrm == '1'){
        this.zoho_crm = true;
      }else{
        this.zoho_crm = false;
      }         
      if(response.result.data.has_billing=='1'){
        this.billing = true;
      }else{
        this.billing = false;
      }
      if(response.result.data.cli_status == '1'){
        this.h_cli_status = true;
      }else{
        this.h_cli_status = false;
      }         
      if(response.result.data.has_sso == '1'){
        this.showsso = true;
        // this.StartPopup();
      }


      this.agent_name = response.result.data.agent_name;

      if (localStorage.getItem('server_FQDN') && localStorage.getItem('server_FQDN') != 'undefined' && response.result.data.voice_3cx != 0) {
        // this.loadScript('../assets/custom/js/mconnect-webrtc.js');
        // this.loadScript('../omnichannel/assets/custom/js/webConnect.js');
        this.loadScript('../assets/custom/js/webConnect.js');
        // this.loadScript('../assets/custom/js/webConnect.js');
        let api_reqs: any = '{"type": "HookRegister"}';
        this.serverService.show.next(api_reqs);
      } else {
        // iziToast.warning({
        //   message:"You Need to choose WebRTC for dialer",
        //   position:"topRight"
        // });
      }


      if (response.result.data.fax_user_id == null) {
        this.fax_user = false;
      }
      if (response.result.data.admin_permision == 1 || response.result.data.admin_permision == '1') {
        this.has_admin_permission = true;
        this.show_admin_sett = true;
        // alert()
      }
      // this.e_tic = response.result.data.has_external_ticket;
      // this.i_tick = response.result.data.has_internal_ticket;

      // 
      // //  this.report_array=this.report_checked.split();
      //  console.log(this.report_checked);

      if (response.result.status == true) {

        if (this.admin_reports == null || this.admin_reports == '') {
          this.is_reports = 'null';
        }
        else {
          this.report_checked = this.admin_reports.split(',');
          //alert(' menu'+this.report_checked);
        }

        if (response.result.data.has_contact == 1) {
          this.h_con = true;
        }

        // if (this.predective_dialer_behave == '1') {
        //   this.h_con = false;
        // }
//alert(response.result.data.has_chat)

        if (response.result.data.has_sms == 0 && response.result.data.has_chat == 0 && response.result.data.has_fb == 0 && response.result.data.has_whatsapp == 0 && response.result.data.has_telegram == 0 && response.result.data.has_fax == 0&& response.result.data.has_internal_chat == 0) {
          this.hidemessaging = 'close';
        }
        if (response.result.data.has_sms == 1 || response.result.data.has_chat == 1 || response.result.data.has_fb == 1 || response.result.data.has_whatsapp == 1 || response.result.data.has_telegram == 1 || response.result.data.has_fax == 1 || response.result.data.voice_3cx == 1)
          this.h_message = true;

        if (response.result.data.h_con == 0 && response.result.data.voice_3cx == 0) {
          this.hidemessagingVoi = 'close';
        }


        if (response.result.data.has_sms == 1) {
          this.h_sms = true;
        }

        if (response.result.data.has_webclient == 1) {
          this.has_webclient = true;
        }

        if (response.result.data.has_chat == 1) {
          this.h_chat = true;
        }
        if (response.result.data.has_internal_chat == 1) {
          this.h_int_chat = true;
        }

        if (response.result.data.has_fb == 1) {
          this.h_fb = true;
        }
        if (response.result.data.has_whatsapp == 1) {

          if (response.result.data.whatsapp_type == 0) {
            this.h_wp_unoff = true;
          }
          else {
            this.h_wp_off = true;
          }

        }

        if (response.result.data.voice_3cx == 1) {

          if (response.result.data.ext_int_status == 1) {
            this.cust_pbx = true;
            this.showHideDialerS = false;
            this.has_video_call = false;
            this.dialPadOpens();
          }
          if (response.result.data.ext_int_status == 2) {
            this.cust_pbx = false;
            this.showHideDialerS = true;
            this.has_video_call = false;


            if (response.result.data.has_video_call == 1) {
              localStorage.setItem('has_video_dialer', response.result.data.has_video_call);

              // $('#video_widget').click();
              this.showHideDialerS = false;
              this.has_video_call = true;
              $('#video_widget').click();
            }
          }
        }
        else {
          this.showHideDialerS = false;
          this.has_video_call = false;

        }

        if(response.result.data.has_internal_call_ticket == 1){
          this.has_internal_call_ticket = true;
        }

        if (response.result.data.ext_int_status == 0) {
          this.showHideDialerS = false;
          this.has_video_call = false;
        }
        if (response.result.data.has_chatbot == 1) {
          this.h_cbot = true;
        }
        if (response.result.data.has_external_ticket == 1) {
          this.e_tic = true;
          this.h_ticket = '';
        }
        if (response.result.data.has_internal_ticket == 1) {
          this.i_tick = true;
          this.h_ticket = '';
        }
        // alert(response.result.data.voice_3cx);
        // alert(this.show_admin_sett);
        if (response.result.data.voice_3cx == 1) {
          this.voice_3cx = true;
        }
        if (response.result.data.voice_3cx == 0) {
          this.voice = 'disabled';
        }
// alert(response.result.data.close_all_menu)

        if (response.result.data.close_all_menu == '1') {
          this.close_all_menu = 'close';
        }


        if (response.result.data.predective_dialer == 0) {
          this.pred_dial = 'disabled';
        }
        if (response.result.data.predective_dialer == 1) {
          this.has_pd = true;
        }
        if (response.result.data.lead == 1) {
          this.lead = true;
        }
        // alert('dsd')
        // alert(response.result.data.wallboard_one);
        if (response.result.data.wallboard_one == 1) {
          this.wall_1 = true;
        }
        if (response.result.data.wallboard_two == 1) {
          this.wall_2 = true;
        }
        if (response.result.data.wallboard_three == 1) {
          this.wall_3 = true;
        }
        if (response.result.data.wallboard_four == 1) {
          this.wall_4 = true;
        }
        if (response.result.data.wallboard_five == 1) {
          this.wall_5 = true;
        }
        if (response.result.data.wallboard_six == 1) {
          this.wall_6 = true;
        }
        if (response.result.data.wallboard_ten == 1) {
          this.wall_10 = true;
        }
        if (response.result.data.wallboard_eight == 1) {
          this.wall_8 = true;
        }
        if (response.result.data.has_fax == 1) {
          this.h_fax = true;
        }
        if (response.result.data.has_webinar == 1) {
          this.h_webinar = true;
        }

        if (response.result.data.has_telegram == 1) {
          this.h_tele = true;
        }

        if (response.result.data.mr_voip == 1) {
          this.mrvoip = true;
        }

        if (response.result.data.voice_manage == 1) {
          this.h_call_rec = true;
        }
        if (response.result.data.baisc_wallboard == 1) {
          this.wall_basic = true;
        }
        if (response.result.data.queue == 1) {
          this.h_que_manage = true;
        }
        this.reseller_values = localStorage.getItem('reseller');
        if ((this.reseller_values == 0 ||this.reseller_values == '' || this.reseller_values == null) && this.user_type != 'Super Admin') {

          this.show_sup_admin_sett = false;
        }
        else {
          // this.show_sup_admin_sett= true;
          this.reseller_sett = true;

        }



      }


      if (!localStorage.justOnce) {
        localStorage.setItem("justOnce", "true");
        window.location.reload();
      }

      //   if (!localStorage.getItem("reload")) {
      //     localStorage.setItem("reload", "true");
      //     location.reload();
      // }
      // else {
      //     localStorage.removeItem("reload");
      // }

      this.getReports();

    },
      (error) => {
        console.log(error);
      });

  }

  videowidget() {

  }


  ngAfterViewInit() {

  }

  mc() {
    this.router.navigate(['../mc']);
  }

  conatct() {
    this.router.navigate(['../contacts']);
  }

  wallboard() {
    if (this.admin_id === '128') {
      this.router.navigate(['../custom-wall']);
    } else {
      this.router.navigate(['../wallboard']);
    }



  }
  mrvopi_api(){
    this.router.navigate(['../mrvoip-apis']);
  }
  adminSettings() {
    this.router.navigate(['../admin-settings']);
  }
  faxadminSettings() {
    this.router.navigate(['../fax-admin']);
  }
  adminReport() {
    this.router.navigate(['../report-admin']);
  }
  queue() {
    this.router.navigate(['/queue']);
  }
  callHistory() {
    this.router.navigate(['/call-history']);
  }
  agents() {
    this.router.navigate(['/agents']);
  }
  pbcSettings() {
    this.router.navigate(['/pbc-settings']);
  }
  conatctRep() {
    this.router.navigate(['/contact-report']);
  }
  logout() {
    clearInterval(this.stop_interval);
    this.router.navigate(['/logout']);
  }
  zoho() {
    this.router.navigate(['/zoho-bridge']);
  }
  power_bi(){
    this.router.navigate(['/power-pi']);
  }
  composeSms() {
    this.router.navigate(['/compose-sms']);
  }
  auxCode() {
    this.router.navigate(['/aux-code']);
  }

  fullScreenBtn() {
    $("body").toggleClass("sidebar-mini");
  }







  dialPadOpens() {

    this.uadmin_id = localStorage.getItem('userId');
    let access_token: any = localStorage.getItem('access_token');
    let que: any = $('#que').val();
    let api_req: any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"queue_login_logout","user_id":"' + this.uadmin_id + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.data.status == "1") {
        this.queLogStatus = response.result.data.status;
        this.queLogStatusNma = "Logout";
      } else {
        this.queLogStatus = response.result.data.status;
        this.queLogStatusNma = "Login";
        $('#onHookIndi').addClass('red')
      }
    },
      (error) => {
        console.log(error);
      });


  }










  queLoginOut() {
    let api_reqs: any = '{"type": "queLoginOut","status":"' + this.queLogStatus + '"}';
    this.serverService.show.next(api_reqs);
  }





  goPridictive(page) {
    this.router.navigate(['/predictive-wrapups'], { queryParams: { page: page } });

  }



  ViewEventDetails(event_id) {
    //window.location.reload();

    this.inst_id = btoa(event_id);
    this.router.navigate(['/wp-unoff'], { queryParams: { wp_id: this.inst_id } });

  }

  ishasInstance() {
    let access_token: any = localStorage.getItem('access_token');

    let api_req: any = '{"operation":"wp_instance", "moduleType":"wp_instance", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"getInstanceDetailsForAdmin","user_id":"' + this.userID + '","admin_id":"' + this.admin_id + '","user_type":"' + this.user_type + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        if (!$.trim(response.result.data)) {
          Swal.fire({
            title: 'Sorry,You dont have any Instance',
            text: 'Please Contact Admin to activate your Instance.',
            icon: 'warning',
            // showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ok'
          });
        }

      }
      else {
        Swal.fire({
          title: 'Sorry, some error occured',
          // text:'Restarting the instance will disable it for a few minutes.',
          icon: 'warning',
          // showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'ok'
        });
      }
    },
      (error) => {
        console.log(error);
      });

    // let api_req1:any = '{"operation":"wp_instance", "moduleType":"wp_instance", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"readInstance","instance_id":"'+this.inst_id+'"}}';
    // this.serverService.sendServer(api_req1).subscribe((response:any) => {
    //   if(response.status==true){
    //     if(response.result.data == "CONFLICT"){

    //         iziToast.warning({
    //           message: "Instance was Conflicted. May your WhatsApp is opend on another Brower/Computer. Please refresh our page once and try again",
    //           position: 'topRight'
    //       });

    //      }

    //   } 
    //   else{

    //   }
    // }, 
    // (error)=>{
    //     console.log(error);
    // });

  }
  checklogin() {
    //   let access_token: any=localStorage.getItem('access_token');

    //   let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"getUserActiveStatus","user_id":"'+this.uadmin_id+'"}}';

    //   this.serverService.sendServer(api_req).subscribe((response:any) => {
    //     if(response.result.status== true){
    //      // alert("sdfsdfsd");

    //       if(response.result.data[0].user_status == "1" ){
    //         //alert("logouwdsdst");

    //       }
    //       else{


    //         localStorage.removeItem("access_token");
    //         localStorage.removeItem("user_name");
    //         localStorage.removeItem("user_type");
    //         localStorage.clear();
    //         this.router.navigate(['/login']);
    //         iziToast.warning({
    //           message: "You are not an Active user.Contact your Admin",
    //           position: 'topRight'
    //       });
    //       }

    //     }
    //   }, 
    //   (error)=>{
    //       console.log(error);
    //   });
  }

  showVideofialers() {
    let api_reqs: any = '{"type": "showDialer"}';
    this.serverService.showvedioDialer.next(api_reqs);
  }



  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  notificationscall() {
    //alert('123')
     var socket = io.connect('wss://'+window.location.hostname+':4011');
    // var socket = io.connect('wss://c4cteams.my3cx.sg:4011');
    var self = this;
    socket.on('connect', function () {
      console.log('connected');

      socket.on('broadcast', function (data) {
        console.log(data);
        

        if (data.notification_for == 'SMS' || data.notification_for == 'webchat' || data.notification_for == 'fb' || data.notification_for == 'whatsapp_unoff' || data.notification_for == 'line_chat') {
          let nameArr = data.user_id;
          nameArr.push(localStorage.getItem('admin_id'));
          console.log(nameArr);
         
          nameArr.forEach(element => {
            if (element == localStorage.getItem('userId')) {
              console.log(element); 
              self.serverService.sendNotifications(data);
              self.serverService.receivePopup(data);
            }

          });

        } else if(data.notification_for=='int_chat'){
          if (data.user_id == localStorage.getItem('userId')) {
            self.serverService.sendNotifications(data);
            self.serverService.receivePopup(data);
            var reload = '{"action":"reload_api","unique_id":"'+data.unique_id+'"}';
            self.serverService.internal_chat_reload.next(reload)
          }
        }else {
          if (data.notification_for == 'voicemail_notify' )
                 self.totalCount();
          if (data.user_id == localStorage.getItem('userId')) {
            self.serverService.sendNotifications(data);
            self.serverService.receivePopup(data);
          }

        }


      });
      // socket.on('message', function(data){

      // });
      socket.on('disconnect', function () {
        console.log('disconnected');
      });
    });

    socket.on("error", (error) => {
      console.log(error);
    });


  }



  //   sendNotifications(postData) {

  //     console.log(postData);
  //     if (Notification.permission !== "granted") {
  //         Notification.requestPermission();
  //     }
  //     else {
  //         var notification = new Notification('hello', {
  //             body: "Hey there!",
  //             image: "../../assets/images/icons/quickView.png",
  //         });
  //         notification.onclick = function () {
  //             window.open("http://google.com");
  //         };
  //     }

  // }


  totalCount(){
    // {"operation":"contact","moduleType":"contact","api_type":"web","access_token":"","element_data":{"action":"call_count","user_id":"1369","admin_id":"1359"}}
  
  
    this.uadmin_id = localStorage.getItem('userId');
    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"call_count","user_id":"' + this.uadmin_id + '","admin_id":"'+this.admin_id+'"}}';
  


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      this.missedCount = response.result.data.missed_call;
      this.voicemailCount = response.result.data.voicemail;
    

    },
    (error) => {
      console.log(error);
    });

  
  }

  missedChange(){
    
    this.router.navigate(['../custom-wall2']);
    this.missedCount = 0;
  }


  

  voiceopen(){

    this.listVoicemail();
    $("#voiceform").modal('show');  
    // this.listVoicemail(); 
          
  }

  notifyopen(){

    let api_req: any = new Object;
   let chat_count_req: any = new Object();

   api_req.operation = "chat";
   api_req.moduleType = "chat";
   api_req.api_type = "web";
   api_req.access_token = localStorage.getItem('access_token');

   chat_count_req.action = "chat3cx_updated"
   chat_count_req.ext_no = this.extension;
   api_req.element_data = chat_count_req;

   this.serverService.sendServer(api_req).subscribe((response: any) => {
     this.chatCount();
     var urldata = "notify_chat";
     // this.router.navigateByUrl("/cx-webclient");
     // this.router.navigate(["/cx-webclient", urldata]);
     this.router.navigate(['/cx-webclient'], { queryParams: { queue: urldata } });

   },
   (error) => {
     console.log(error);
   });



         
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
    Swal.fire({
      html:
        '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
    showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      background: 'transparent',
    });
    this.serverService.sendServer(api_req).subscribe((response: any) => {
     Swal.close();
        if(response.result.status == true){
                this.voicemail_list = response.result.data;

                for (var i = 0; i < this.voicemail_list.length; i++) {
                    this.voicemail_list[i].playaudiobtn = true;
                 // this.call_history_list[i].rec_path= "";
               this.voicemail_list[i].state= false;
                 this.voicemail_list[i].loader=false;
                  }
                this.VMrecordNotFound = this.voicemail_list.length == 0 ? true : false;

        }else{
            // this.vmcount = '0';
        }

  
      },
        (error) => {
          console.log(error);
        });


}


chatCount(){

  let api_req: any = new Object;
  let chat_count_req: any = new Object();

  api_req.operation = "chat";
  api_req.moduleType = "chat";
  api_req.api_type = "web";
  api_req.access_token = localStorage.getItem('access_token');

  chat_count_req.action = "chat3cx_notification"
  chat_count_req.ext_no = this.extension;
  api_req.element_data = chat_count_req;

  this.serverService.sendServer(api_req).subscribe((response: any) => {

    this.chatCounts = response.result.data.counts;

  },
  (error) => {
    console.log(error);
  });

}



playaudiofun(object,id,i, type){
  object.read_status=1;
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

      // this.listVoicemail2();
      this.totalCount();
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
  

deleteVoicemail(id, vmfilename){
  // {"operation":"call","moduleType":"call","api_type":"web","access_token":"","element_data":{"action":"voicemail_delete","id":"","admin_id":""}}

  Swal.fire({
    title: 'Are you sure want to delete Voicemail?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
  
  let access_token: any=localStorage.getItem('access_token');
    
  let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"voicemail_delete","id":"'+id+'","admin_id":"'+this.admin_id+'"}}';
  
  this.serverService.sendServer(api_req).subscribe((response:any) => {

    if(response.result.status == true){
      this.listVoicemail();
      this.totalCount();
    var socket_message = '[{"cust_id":"'+this.has_hard_id+'","data":[{"Name":"vmdelete","vmfilename":"'+vmfilename+'","userno":"'+this.extension+'"}]}]';
    console.log(socket_message);
    this.websocket.send(socket_message);
    }

  }, 
  (error)=>{
    // console.log(error);
  });
}
})
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

downloadfile(files){
let result =  new Audio("data:audio/wav;base64," + files);
console.log(result);
return result;

}
listVoicemail2(){
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
   Swal.close();
      if(response.result.status == true){
              this.voicemail_list = response.result.data;

              for (var i = 0; i < this.voicemail_list.length; i++) {
                  this.voicemail_list[i].playaudiobtn = true;
               // this.call_history_list[i].rec_path= "";
             this.voicemail_list[i].state= false;
               this.voicemail_list[i].loader=false;
                }
              this.VMrecordNotFound = this.voicemail_list.length == 0 ? true : false;

      }else{
          // this.vmcount = '0';
      }


    },
      (error) => {
        console.log(error);
      });


}


StartPopup(){

  let access_token: any=localStorage.getItem('access_token');
  // {"operation":"contact","moduleType":"contact","api_type":"web","access_token":"","element_data":{"action":"has_activation_teams","admin_id":"1429"}}

  let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"has_activation_teams","admin_id":"'+this.admin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {

    if(response.result.status == true){
      
      // this.teamstitle = 2;

      if(response.result.data.agents != '1' || response.result.data.pbx != '1' || response.result.data.sso != '1'){

      this.showOneTimeModal();
      }else{
        $("#ModalOneTime").modal('hide');  
      }

    }

  }, 
  (error)=>{
      console.log(error);
  });


}
  

showOneTimeModal(){
    $("#ModalOneTime").modal('show');   
  }

  finishFunction(){
    this.StartPopup();
  }

  closepopup(){
    // this.StartPopup();
    $("#ModalOneTime").modal('hide');  

  }
  //Check Server updates
checkForUpdates(){
  // alert('1')
  let access_token: any=localStorage.getItem('access_token');
  let curVersion: any=localStorage.getItem('curVersion');

  var url = window.location.hostname;
  let api_req:any = '{"action":"serverVersion","domain":"'+url+'","currentV":"'+curVersion+'"}';
  console.log(api_req);
  this.serverService.updateAllFiles(api_req).subscribe((response:any) => {

    if(response.status==true){
      // this.hasUpdateVersion = response.data;
      this.hasUpdate = true;
    } else{
      this.versionUpdateMrvoip();//this will check just mrvoip updates is available or not
    }
  }, 
  (error)=>{
      console.log(error);
  });  
}

versionUpdateMrvoip(){
  let access_token: any=localStorage.getItem('access_token');
  let curVersion: any=localStorage.getItem('mrvoipcurVersion');
  var url = window.location.hostname;
  let api_req:any = '{"action":"serverVersion","domain":"'+url+'","currentV":"'+curVersion+'"}';
  this.serverService.updateAllMrvoip(api_req).subscribe((response:any) => {
    if(response.status==true){
      this.hasUpdate = true;
    } else{
    }
  }, 
  (error)=>{
    console.log(error);
  });  
}
 //Check Server updates End


 //Check Licence Key
 checkpermissions(){

  // // // console.log('enter the check')
 let loginReq:any = new Object();
let api_req:any = new Object();
loginReq.action="get_alluserdet";

 
  loginReq.license_key=localStorage.getItem('license_key');
  // loginReq.license_key="CF14-KY49-71AH-57PH-HZXW-33J4G-121212";
 
api_req.operation="agents";
api_req.moduleType="agents";
api_req.api_type="web";
api_req.element_data=loginReq; 
var user_type = localStorage.getItem('user_type');

      this.serverService.sendServerOmniLogin(api_req).subscribe((response:any) => {
        if(response.result.data  != null){
          
          console.log(response)

          let date1:any = new Date(response.result.data.expire_count_dt);
          let date2:any = new Date();
          console.log(date1)
          console.log(date2)
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          this.count_leftDays = diffDays;
          if(this.count_leftDays<7){
            this.trial_show = true;
          }else{
            this.trial_show = false;
          }
          // console.log(diffTime + " milliseconds");
          console.log(diffDays + " days");
          if(response.result.data.license_expired == "false"){
          
           }else{
            if(user_type != 'Super Admin'){
              // // // console.log('updateadmin');
          
               setTimeout(() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("user_name");
                localStorage.removeItem("user_type");
                localStorage.clear();
               this.router.navigate(['/login']);
                Swal.fire({
                  icon: 'error',
                  title: 'Your License has been expired',
                  text: 'Please contact admin for more details',
                });
                clearInterval(this.license_check);
                return false;
               }, 2000);
              
             }            
          }
        }else{
         if(user_type != 'Super Admin'){
          setTimeout(() => {
            localStorage.removeItem("access_token");
          localStorage.removeItem("user_name");
          localStorage.removeItem("user_type");
          localStorage.clear();
         this.router.navigate(['/login']);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Session License missing..Please login Again',
          });
          clearInterval(this.license_check);
          return false;
          }, 2000);
          
         }
        
         
        } 
      }, 
        (error)=>{
            // // // console.log(error);
        });


}


currentVersionMrvoip(){

  let access_token: any=localStorage.getItem('access_token');
  var url = window.location.hostname;
  let api_req:any = '{"action":"currVersion","domain":"'+url+'"}';
  this.serverService.updateAllMrvoip(api_req).subscribe((response:any) => {
    // if(response.status==true){
      localStorage.setItem('mrvoipcurVersion',response.currentversion);
      localStorage.setItem('mrvoipnextVersion',response.nextversion);
      this.versionUpdateMrvoip();
      this.Mrvoip_version=response.currentversion;
    // } else{
    // }
  }, 
  (error)=>{
    console.log(error);
  }); 
  
  
}




checkForUpdate(){
  var url = window.location.hostname;
  let api_req:any = '{"action":"getversionUpdate"}';
  this.serverService.updateAllFiles(api_req).subscribe((response:any) => {
      localStorage.setItem('curVersion',response.currVersion);
      this.checkForUpdates();
      this.Omni_version=response.currVersion;
  }, 
  (error)=>{
      console.log(error);
  });  
}

// googleTranslateElementInit(){

// }

}
