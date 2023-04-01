import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';

declare var $: any;
import Swal from 'sweetalert2'
declare var iziToast: any;
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-agent-setting-clone',
  templateUrl: './agent-setting-clone.component.html',
  styleUrls: ['./agent-setting-clone.component.css']
})
export class AgentSettingCloneComponent implements OnInit {
  addAgent: FormGroup;
  editAgent: FormGroup;
  callerList: any;
  agents_list;
  recordNotFound = false;
  pageLimit = 10;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  agent_count;
  hideAddButt = true;
  editShippingAddresss = false;
  h_con;
  h_fb;
  show_user_sett;
  sip_logins_main;
  h_sms;
  h_chat;
  h_int_chat;
  h_wp;
  h_ticket;
  e_tic;
  i_tick;
  h_cbot;
  has_wechat;
  has_telegram;
  has_fax;
  voice_3cx;
  cli_status;
  H_PD;
  lead;
  cust_pbx;
  wall_1;
  wall_2;
  wall_3;
  has_hard_id
  show_act_wall
  wall_4;
  h_2fa;
  admin_id;
  showCallTariffsDet;
  a_pass;
  dsk_access;
  reports;
  admin_permision;
  reportChecked;
  report_checked;
  list_reports;
  report_id; 
  call_ids;
  sip_pass;
  close_all_menu;
  hardware_id;
  loginUser;
  websocket;
  user_type;
  predective_dialer_behave; dynamicUsers; customHtmls;
  sendingmail = false;
  InternalChat;
  smsChat;
  h_webinar; callTariffs; showCallTariffsDetEdit;
  pdfurl;
  showvideo;
  has_video;
  no_report = false;
  agent_3cx_rep = false;
  caller_enable = false;
  agent_grp;
  upd_agent_3cx_rep = false;
  show_caller_id = '1';
  voice_manage;
  doc_link;
  h_dialer_auto_answer;
  total_agent_count;
  able_to_add;
  // this
  has_sso;
  have_sso;
admin_permission;
callerIDChecked;
contactByCountry;
country_list: any;
  constructor(private serverService: ServerService, private sanitizer: DomSanitizer,private router: Router) {
    this.serverService.showvedioDialer.subscribe((val: any) => {
      console.log(val);
      var update = JSON.parse(val);
      if (update.type == "update_user") {

        this.agentsList({});
      }
    }
    );
    this.serverService.showvedioDialer.subscribe((val: any) => {
      console.log(val);
      var dpContent = JSON.parse(val);
      if (dpContent.type == "showDialer") {

        this.showvideo = true;
      }
      else if (dpContent.type == "showDialer") {

        this.agentsList({});
      } 
      else {
        this.showvideo = false;
      }
    }
    
    );

  }

  ngOnInit() {
    this.admin_permission = localStorage.getItem('admin_permision');
		this.user_type = localStorage.getItem('user_type');

    if (this.user_type == 'Super Admin') {
			this.user_type = 1;          
		}
		else if (this.user_type == 'Admin' || this.admin_permission =='1') {
			this.user_type = 2;		
		}
		else {
			this.user_type = 3;
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'You have no access view that page!',
      // });
      // setTimeout(() => {
        this.router.navigate(['/']);
      // }, 2000);
      return false;
		}
    $("#clone_agent_user_pwd").keydown(function (e) {

      console.log(e.which);
      if (e.which == 32) {
        iziToast.warning({
          message: "Sorry, Whitespace not allowed",
          position: 'topRight'
        });
        return false;
      }
      return e.which !== 32;
    });
    $("#clone_agent_user_name").keydown(function (e) {

      console.log(e.which);
      if (e.which == 32) {
        iziToast.warning({
          message: "Sorry, Whitespace not allowed",
          position: 'topRight'
        });
        return false;
      }
      return e.which !== 32;
    });
    $("#clone_update_user_pwd").keydown(function (e) {

      console.log(e.which);
      if (e.which == 32) {
        iziToast.warning({
          message: "Sorry, Whitespace not allowed",
          position: 'topRight'
        });
        return false;
      }
      return e.which !== 32;
    });
    this.addAgent = new FormGroup({
      'agent_name': new FormControl(null, Validators.required),
      'emailid': new FormControl(null),
      // [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
      'phone_number': new FormControl(null),
      'user_name': new FormControl(null, Validators.required),
      // 'user_pwd': new FormControl('', [Validators.required, Validators.minLength(3), UsernameValidator.cannotContainSpace]),
      //  'user_pwd' : new FormControl(' ',[Validators.required,UsernameValidator.cannotContainSpace]),
      // 'user_pwd' : new FormControl(null,Validators.required),
      'sip_login': new FormControl(null),
      'sip_username': new FormControl(null),
      'sip_password': new FormControl(null),
      'has_contact': new FormControl(0),
      'close_all_menu': new FormControl(0),
      'voice_3cx': new FormControl(0),
      'cli_status': new FormControl(0),
      'predective_dialer': new FormControl(0),
      'has_sms': new FormControl(0),
      'has_chat': new FormControl(0),
      'has_int_chat': new FormControl(0),
      'has_whatsapp': new FormControl(0),
      'has_chatbot': new FormControl(0),
      'has_fb': new FormControl(0),
      'has_wechat': new FormControl(0),
      'has_telegram': new FormControl(0),
      'has_fax': new FormControl(0),//This for LINE not for FAX
      'has_internal_ticket': new FormControl(0),
      'has_external_ticket': new FormControl(0),
      'wallboard_one': new FormControl(0),
      'wallboard_two': new FormControl(0),
      'wallboard_three': new FormControl(0),
      'wallboard_four': new FormControl(0),
      'two_factor': new FormControl(0),
      'dsk_access': new FormControl(0),
      'dsk_username': new FormControl(0),
      'dsk_password': new FormControl(0),
      'admin_permision': new FormControl(0),
      'supervisors': new FormControl(0),
      // 'lead': new FormControl(0),
      'user_status': new FormControl(0),
      'predective_dialer_behave': new FormControl(0),
      'has_webinar': new FormControl(0),
      'dialer_auto_answer': new FormControl(0),
      'has_webclient': new FormControl(0),
      // 'has_sso': new FormControl(0)

    });

    // $('#clone_edit_billing_address').modal('show');
    this.editAgent = new FormGroup({
      'user_name': new FormControl(null, Validators.required),
      'email_id': new FormControl(null),
      'agent_name': new FormControl(null, Validators.required),
      'sip_login': new FormControl(null),
      'sip_username': new FormControl(null),
      'sip_password': new FormControl(null),
      'phone_number': new FormControl(null),
      'user_id': new FormControl(null),
      'voice_3cx': new FormControl(0),
      'admin_permision': new FormControl(0),
      'close_all_menu': new FormControl(0),
      'predective_dialer': new FormControl(0),
      'has_sms': new FormControl(0),
      // 'lead': new FormControl(0),
      'has_contact': new FormControl(0),
      'has_chat': new FormControl(0),
      'has_internal_chat': new FormControl(0),
      'has_whatsapp': new FormControl(0),
      'has_chatbot': new FormControl(0),
      'has_fb': new FormControl(0),
      'has_wechat': new FormControl(0),
      'has_telegram': new FormControl(0),
      'has_fax': new FormControl(0),//This for LINE
      'has_internal_ticket': new FormControl(0),
      'has_external_ticket': new FormControl(0),
      'wallboard_one': new FormControl(0),
      'wallboard_two': new FormControl(0),
      'wallboard_three': new FormControl(0),
      'wallboard_four': new FormControl(0),
      'two_factor': new FormControl(0),
      'dsk_access': new FormControl(0),
      'dsk_username': new FormControl(0),
      'dsk_password': new FormControl(0),
      'user_status': new FormControl(0),
      'predective_dialer_behave': new FormControl(0),
      'has_webinar': new FormControl(0),
      'dialer_auto_answer': new FormControl(0),
      'cli_status': new FormControl(0),
      'has_supervisors': new FormControl(0),
      'has_webclients': new FormControl(1),
      

      // 'has_sso': new FormControl(0)


    });
    this.pbc_details();
    // this.listReports();
    this.getReports();
      // this.agentsList({}); 

    this.has_video = localStorage.getItem('has_video_dialer');
    this.admin_id = localStorage.getItem('admin_id');
    this.report_id = localStorage.getItem('has_reports');
    this.hardware_id = localStorage.getItem('hardware_id');
    this.show_caller_id = localStorage.getItem('show_caller_id');
    this.voice_manage = localStorage.getItem('voice_manage');


    this.report_id = this.report_id.split(',');


    if (this.report_id == '' || this.report_id == null || this.report_id == "") {
      this.no_report = true;
    }
    //  if (! localStorage.justOnces) {
    //   localStorage.setItem("justOnces", "true");
    //   window.location.reload();
    // }
    this.initsocket();

    this.callerIDList();

    // $.validator.addMethod("nowhitespace", function(value, element) {
    //   return this.optional(element) || /^S+$/i.test(value);
    // }, "No white space please");  
      // this.getcalltariffs();
      // this.call_recording();
  }

  initsocket() {
    this.loginUser = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');

    this.user_type = localStorage.getItem('user_type');
    // if(this.loginUser == '64'){
    //   this.websocket = new WebSocket("wss://socket.mconnectapps.com:5013/"); 
    // } else if(this.loginUser == '164'){
    //   this.websocket = new WebSocket("wss://socket.mconnectapps.com:5014/"); 
    // } else if(this.loginUser == '201'){
    //   this.websocket = new WebSocket("wss://socket.mconnectapps.com:5014/"); 
    // } else {
    //   this.websocket = new WebSocket("wss://socket.mconnectapps.com:5012/"); 
    // }

    
 
      this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");
      // this.websocket = new WebSocket("wss://developtesting.my3cx.sg:4010");

    this.websocket.onopen = function (event) {
      $('#clone_sendonload').click();
      console.log('agent socket connected');
    }

    this.websocket.onmessage = function (event) {
      // console.log(event.data);
      var result_message = JSON.parse(event.data);
      this.hardware_id = localStorage.getItem('hardware_id');
      if (result_message[0].cust_id == this.hardware_id) {
        console.log('matched');
        //  console.log(result_message);

        // this.callonce = setTimeout(() => {
          // this.closeLoading();
          Swal.close();
        // }, 15000);

      } else {
        console.log('not matched');
        Swal.close();

        return false;
      }

      if (result_message[0].data[0].status == "false") {
        $('#clone_datagetsfailed').click();
        Swal.close();

      } else if (result_message[0].user_list == "user_listFrom3cx") {
        // $('#clone_AgentsFrom3cx').val(event.data);
        // $('#clone_AgentsFrom3cx').click();
        // this.dynamicUsers = result_message[0].data;
        //console.log(this.dynamicUsers);
        // $('#clone_addAllAgentsFrom3cxss').modal('show');s
      }
      else if (result_message[0].data[0].sipdata == "getagentdet") {

        $('#clone_sip_username_add').val(result_message[0].data[0].sip_username);
        $('#clone_sip_password_add').val(result_message[0].data[0].sip_password);
        $('#clone_sip_username').val(result_message[0].data[0].sip_username);
        $('#clone_u_sip_password').val(result_message[0].data[0].sip_password);
        Swal.close();


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

  call_recording() {
    let access_token: any = localStorage.getItem('access_token');

    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"view_agent_group","admin_id":"' + this.admin_id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        this.agent_grp = response.result.data;
        console.log(this.agent_grp);

      } else {
        this.recordNotFound = true;
      }
    },
      (error) => {
        console.log(error);
      });
  }

  openAgentsFrom() {

    let socketData = $('#clone_AgentsFrom3cx').val();
    let mData = JSON.parse(socketData);
    this.dynamicUsers = mData[0].data;
    this.closeLoading();

    console.log(this.dynamicUsers);
    console.log(this.sip_logins_main);
    $('#clone_addAllAgentsFrom3cx').modal('hide');
    $('#clone_addAllAgentsFrom3cx').modal('show');
  }
  postdatatoDB123() {
    var users = $('.all3cxUsers1:checked').map(function () {
      console.log(this.value);

      return this.value;

    }).get();
    var str = users.toString();
    console.log(str);
    var output = str.split(',')



   // var mydata = this.agent_count - this.agents_list.length;

    // alert(mydata);
    // alert(output.length);
    // alert(this.agents_list.length);

    // if(output.length >= this.agent_count || this.agent_count <= this.agents_list.length){
    // if(output.length > this.agent_count || this.agent_count <= this.total_agent_count){

    //   // if(mydata == 0 && mydata >1 ){
    //   iziToast.warning({
    //     message: "Sorry.. You have a limits for "+this.agent_count+" users only",
    //     position: 'topRight'
    //   });
    //   return false;
    // }
    //alert(JSON.stringify(this.dynamicUsers));
    let access_token: any = localStorage.getItem('access_token');
    Swal.fire({
      html:
        '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
    showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      background: 'transparent'
    });
    let api_req: any = '{"operation":"queue", "moduleType":"queue", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"user_add","hardware_id":"' + this.hardware_id + '","users":"' + users + '","all_data":' + JSON.stringify(this.dynamicUsers) + '}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close()
      if (response.result.data == '1') {
        iziToast.success({
          message: "Data Updated successfully",
          position: 'topRight'
        });
        this.agentsList({});
        $('#clone_addAllAgentsFrom3cx').modal('hide');
      } else if (response.result.data == 'exceed agent limit') {
        iziToast.error({
          message: "Sorry... You have a limits for " + this.agent_count + " users only",
          position: 'topRight'
        });
      }
    },
      (error) => {
        console.log(error);
      });


    if (this.hardware_id != '') {
      var socket_message = '[{"cust_id":"' + this.hardware_id + '","data":[{"Name":"omniagents","agents":"' + users + '"}]}]';
      console.log(socket_message)
      this.websocket.send(socket_message);
    }

  }




  chemyAvailability() {

    $(this).addClass("active");

    return false;

    var users = $('.newD:checked').map(function () {
      return this.value;
    }).get();

    var str = users.toString()
    var output = str.split(',')

    //alert(output);
    var mydata = this.agent_count - this.agents_list.length;

    if (mydata) {
      iziToast.warning({
        message: "sorry.. You have to choose " + this.agent_count + " users only",
        position: 'topRight'
      });
      return false;
    }

  }



  datagetsucced() {
    iziToast.success({
      message: "Data Retrived Successfully",
      position: 'topRight'
    });
    this.agentsList({});
  }


  datagetsfailed() {
    iziToast.success({
      message: "Sorry Some Error Occur",
      position: 'topRight'
    });
    this.agentsList({});
  }







  getReports() {
    let access_token: any = localStorage.getItem('access_token');

    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"list_report"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.list_reports = response.result.data.report_list;
        this.country_list = response.result.data.countries;
        // console.table(this.list_reports);
        // console.log(response);
      }
    },
      (error) => {
        console.log(error);
      });
  }

  // listReports(){

  //   let access_token: any=localStorage.getItem('access_token');
  //   let uadmin_id: any=localStorage.getItem('userId');

  //   let api_req:any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"list_report","user_id":"'+uadmin_id+'"}}';

  //   this.serverService.sendServer(api_req).subscribe((response:any) => {
  //     if(response.result.status==true){
  //       this.list_report = response.result.data[0].agent_counts;
  //     } 
  //   }, 
  //   (error)=>{
  //       console.log(error);
  //   });
  // }


  pbc_details() {
    let access_token: any = localStorage.getItem('access_token');
    let admin_id: any = localStorage.getItem('admin_id');

    let api_req: any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"get_pbx_details","user_id":"' + admin_id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        this.agent_count = response.result.data[0].agent_counts;
        this.agentsList({});
      }
    },
      (error) => {
        console.log(error);
      });
  }

  listDataInfo(list_data) {

    list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "asc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  agentsList(data) {
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let agents_req: any = new Object();
    agents_req.action = "user_list";
    agents_req.user_id = localStorage.getItem('admin_id');
    agents_req.search_text = list_data.search_text;
    agents_req.order_by_name = list_data.order_by_name;
    agents_req.order_by_type = list_data.order_by_type;
    agents_req.limit = list_data.limit;
    agents_req.offset = list_data.offset;
    api_req.operation = "agents";
    api_req.moduleType = "agents";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = agents_req;
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
$('#clone_add_agents_form').modal('hide');

      if (response.result.status == 1) {

        this.agents_list = response.result.data.list_data;
        this.offset_count = list_data.offset;
        this.total_agent_count = response.result.data.list_info.available_users;
        this.able_to_add = response.result.data.list_info.can_add;
        this.paginationData = this.serverService.pagination({ 'offset': response.result.data.list_info.offset, 'total': response.result.data.list_info.total, 'page_limit': this.pageLimit });
        if(this.agents_list)
        this.recordNotFound = this.agents_list.length == 0 ? true : false;




        this.sip_logins_main = response.result.data.sip_logins;



        if (response.result.data.user_permission.has_contact == '0') {

          this.h_con = 'disabled';
        }

        if (response.result.data.user_permission.has_fb == '0') {

          this.h_fb = 'disabled';
        }
        if (response.result.data.user_permission.has_sms == '0') {
          this.h_sms = 'disabled';
        }
        if (response.result.data.user_permission.has_chat == '0') {
          this.h_chat = 'disabled';
        }
        if (response.result.data.user_permission.has_internal_chat == '0') {
          this.h_int_chat = 'disabled';
        }
        if (response.result.data.user_permission.has_whatsapp == '0') {
          this.h_wp = 'disabled';
        }
        if (response.result.data.user_permission.has_wechat == '0') {
          this.has_wechat = 'disabled';
        }
        if (response.result.data.user_permission.has_telegram == '0') {
          this.has_telegram = 'disabled';
        }
        if (response.result.data.user_permission.has_fax == '0') {
          this.has_fax = 'disabled';
        }
        if (response.result.data.user_permission.has_chatbot == '0') {
          this.h_cbot = 'disabled';
        }
        if (response.result.data.user_permission.has_webinar == '0') {
          this.h_webinar = 'disabled';
        } if (response.result.data.user_permission.dialer_auto_answer == '0') {
          this.h_dialer_auto_answer = 'disabled';
        }
        if (response.result.data.user_permission.has_external_ticket == '0') {
          this.e_tic = 'disabled';
        }
        if (response.result.data.user_permission.has_internal_ticket == '0') {
          this.i_tick = 'disabled';
        }
        if (response.result.data.user_permission.voice_3cx == '0') {
          this.voice_3cx = 'disabled';
        }
        if (response.result.data.user_permission.cli_status == '0') {
          this.cli_status = 'disabled';
        }
        if (response.result.data.user_permission.admin_permision == '1') {
          this.admin_permision = 'disabled';
        }



        if (response.result.data.user_permission.close_all_menu == '0') {
          this.close_all_menu = 'close';
        }



        if (response.result.data.user_permission.predective_dialer == '0') {
          this.H_PD = 'disabled';
        }
        // if (response.result.data.user_permission.lead == '0') {
        //   this.lead = 'disabled';
        // }
        if (response.result.data.user_permission.wallboard_one == '0') {
          this.wall_1 = 'disabled';
        }
        if (response.result.data.user_permission.wallboard_two == '0') {
          this.wall_2 = 'disabled';
        }
        if (response.result.data.user_permission.wallboard_three == '0') {
          this.wall_3 = 'disabled';
        }
        if (response.result.data.user_permission.wallboard_four == '0') {
          this.wall_4 = 'disabled';
        // }if (response.result.data.user_permission.has_sso == '0') {
        //   this.has_sso = 'disabled';
        }
        if (response.result.data.user_permission.two_factor == '0') {
          this.h_2fa = 'disabled';
        }

        if (this.able_to_add < 1) {
          this.hideAddButt = false;
        } else {
          this.hideAddButt = true;
        }




      }


    },
      (error) => {
        console.log(error);
      });

  }
  addAgents() {

    this.addAgent.reset();
    $('#clone_add_agents_form').modal('show');
    $('#clone_has_webclient').prop('checked', true);

  }
  editAgents(id) {

    $('#clone_edit_agents_key').val(id);
    $('#clone_edit_agents_button').click();

  }


  actCamp(to_per, id) {
    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"agents", "moduleType": "agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"change_agent_permission","keyword":"' + to_per + '","user_id":"' + id + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.data == 1) {
      }
    },
      (error) => {
        console.log(error);
      });
  }








  deleteAgentdata(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#clone_3085d6',
      cancelButtonColor: '#clone_d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        let access_token: any = localStorage.getItem('access_token');
        let admin_id: any = localStorage.getItem('admin_id');
        let api_req: any = '{"operation":"agents", "moduleType": "agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"delete_agent","user_id":"' + id + '","admin_id":"' + admin_id + '"}}';

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.result.data == 1) {
            Swal.fire(
              'Deleted!',
              'success'
            );
            this.agentsList({});
          }

        },
          (error) => {
            console.log(error);
          });
      }
    })
  }

  editAgentForm(id) {
    this.editAgent.reset();

    $('#clone_geteditonce').click();

    let api_req: any = new Object();
    let get_agent_req: any = new Object();
    get_agent_req.user_id = id.value;
    get_agent_req.action = 'get_agent_data';
    api_req.operation = "agents";
    api_req.moduleType = "agents";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = get_agent_req;
    Swal.fire({
      html:
        '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
    showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      background: 'transparent'
        });
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close()
      if (response.result.status == 1) {
        $('#clone_edit_agents_form').modal('show');
        var agent_data = response.result.data;
        this.editAgent.setValue({
          'user_name': agent_data.user_name,
          'email_id': agent_data.email_id,
          'sip_login': agent_data.sip_login,
          'sip_username': agent_data.sip_username,
          'sip_password': agent_data.sip_password,
          'agent_name': agent_data.agent_name,
          'phone_number': agent_data.phone_number,
          'user_id': agent_data.user_id,
          'voice_3cx': agent_data.voice_3cx,
          'close_all_menu': agent_data.close_all_menu,
          'has_contact': agent_data.has_contact,
          'admin_permision': agent_data.admin_permision,
          'predective_dialer': agent_data.predective_dialer,
          // 'lead': agent_data.lead,
          'has_sms': agent_data.has_sms,
          'has_chat': agent_data.has_chat,
          'has_internal_chat': agent_data.has_internal_chat,
          'has_whatsapp': agent_data.has_whatsapp,
          'has_chatbot': agent_data.has_chatbot,
          'has_fb': agent_data.has_fb,
          'has_wechat': agent_data.has_wechat,
          'has_telegram': agent_data.has_telegram,
          'has_fax': agent_data.has_fax,
          'has_internal_ticket': agent_data.has_internal_ticket,
          'has_external_ticket': agent_data.has_external_ticket,
          'wallboard_one': agent_data.wallboard_one,
          'wallboard_two': agent_data.wallboard_two,
          'wallboard_three': agent_data.wallboard_three,
          'wallboard_four': agent_data.wallboard_four,
          'two_factor': agent_data.two_factor,
          'dsk_access': agent_data.dsk_access,
          'dsk_username': agent_data.dsk_user_name,
          'dsk_password': agent_data.dsk_user_pwd,
          'user_status': agent_data.user_status,
          'predective_dialer_behave': agent_data.predective_dialer_behave,
          'has_webinar': agent_data.has_webinar,
          'dialer_auto_answer': agent_data.dialer_auto_answer,
          'cli_status':agent_data.cli_status,
          'has_supervisors':agent_data.has_supervisor,
          'has_webclients':agent_data.has_webclient,
          // 'has_sso': agent_data.has_sso,

        });

        var encodedString = btoa(agent_data.sip_login);
        let company_name: any = localStorage.getItem('company_name');
        if (agent_data.voice_3cx == 1) {
          this.showCallTariffsDetEdit = true;
        } else {
          this.showCallTariffsDetEdit = false;
        }


        $('#clone_eMPlanName').val(agent_data.call_plan);
        $('#clone_ecall_rate').val(agent_data.call_rate);
        $('#clone_ecall_prefix').val(agent_data.call_prefix);
        $('#clone_evalid_from').val(agent_data.valid_from);
        $('#clone_evalid_to').val(agent_data.valid_to);

        $('#clone_e_tax_name').val(agent_data.tax_name);
        $('#clone_e_tax_per').val(agent_data.tax_per);
      if(agent_data.caller_ids)
        this.call_ids =agent_data.caller_ids.split(',');

        console.log(this.call_ids)

        $('#clone_upd_recording_grp').val(agent_data.ag_group);

        // $('#clone_eMPlanName option[value='+agent_data.plan_id+']').attr("selected",true); 
        // $('select[name^="eMPlanName"] option[value='+agent_data.plan_id+']').attr("selected","selected");
        if (this.has_video == '1') { this.customHtmls = 'https://omni.mconnectapps.com/webDialer/?login=' + response.result.encLogin; }
        else { this.customHtmls = 'https://omni.mconnectapps.com/WOV-dialer/?login=' + response.result.encLogin; }
        this.smsChat = 'https://omni.mconnectapps.com/sms-widget/?login=' + response.result.encLogin;
        this.InternalChat = 'https://omni.mconnectapps.com/internal-chat-widget/?login=' + response.result.encLogin;

        if (agent_data.reports == null || agent_data.reports == '') {
          ///alert('dasas')
          this.upd_agent_3cx_rep = false;
          this.reportChecked = agent_data.reports;
        }
        else {
          this.upd_agent_3cx_rep = false;
          this.reportChecked = agent_data.reports.split(",");
          //... if (this.voice_manage == '1') {
          //   if (this.reportChecked.includes("3"))
          //     this.upd_agent_3cx_rep = true;
          // }
        }
        // caller ID
         if (agent_data.caller_ids == null || agent_data.caller_ids == '') {
          this.callerIDChecked = agent_data.caller_ids;
        }
        else {         
          this.callerIDChecked = agent_data.caller_ids.split(",");
        }
         if (agent_data.contact_country == null || agent_data.contact_country == '') {
          this.contactByCountry = agent_data.contact_country;
        }
        else {         
          this.contactByCountry = agent_data.contact_country.split(",");
        }
      $('#clone_update_callerId').val(this.callerIDChecked);
      $('#clone_update_countrycontact').val(this.contactByCountry);
        if (agent_data.cli_status == 1) {
          $('#clone_upd_cli_status').prop('checked', true);
          this.caller_enable=true;
        } else {
          $('#clone_upd_cli_status').prop('checked', false);
          this.caller_enable=false;
        }
        $('#clone_edit_reports').val(this.reportChecked);
        if (agent_data.voice_3cx == 1) {
          $('#clone_voice_3cx').prop('checked', true);
        } else {
          $('#clone_voice_3cx').prop('checked', false);
        }
        if (agent_data.cli_status == 1) {
          $('#clone_cli_status').prop('checked', true);
        } else {
          $('#clone_cli_status').prop('checked', false);
        }

        if (agent_data.close_all_menu == 1) {
          $('#clone_close_all_menu').prop('checked', true);
        } else {
          $('#clone_close_all_menu').prop('checked', false);
        }

        if (agent_data.predective_dialer == 1) {
          $('#clone_predective_dialer').prop('checked', true);
        } else {
          $('#clone_predective_dialer').prop('checked', false);
        }
        // if (agent_data.lead == 1) {
        //   $('#clone_lead').prop('checked', true);
        // } else {
        //   $('#clone_lead').prop('checked', false);
        // }



        if (agent_data.has_contact == 1) {
          $('#clone_has_contact').prop('checked', true);
        } else {
          $('#clone_has_contact').prop('checked', false);
        }
        if (agent_data.has_sms == 1) {
          $('#clone_has_sms').prop('checked', true);
        } else {
          $('#clone_has_sms').prop('checked', false);
        }
        if (agent_data.has_chat == 1) {
          $('#clone_has_chat').prop('checked', true);
        } else {
          $('#clone_has_chat').prop('checked', false);
        }
        if (agent_data.has_internal_chat == 1) {
          $('#clone_has_int_chat').prop('checked', true);
        } else {
          $('#clone_has_int_chat').prop('checked', false);
        }
        if (agent_data.has_chatbot == 1) {
          $('#clone_has_chatbot').prop('checked', true);
        } else {
          $('#clone_has_chatbot').prop('checked', false);
        }

        if (agent_data.has_whatsapp == 1) {
          $('#clone_has_whatsapp').prop('checked', true);
        } else {
          $('#clone_has_whatsapp').prop('checked', false);
        }

        if (agent_data.has_fb == 1) {
          $('#clone_has_fb').prop('checked', true);
        } else {
          $('#clone_has_fb').prop('checked', false);
        }
        if (agent_data.has_wechat == 1) {
          $('#clone_has_wechat').prop('checked', true);
        } else {
          $('#clone_has_wechat').prop('checked', false);
        }
        if (agent_data.has_telegram == 1) {
          $('#clone_has_telegram').prop('checked', true);
        } else {
          $('#clone_has_telegram').prop('checked', false);
        }

        if (agent_data.has_fax == 1) {
          $('#clone_has_fax').prop('checked', true);
        } else {
          $('#clone_has_fax').prop('checked', false);
        }

        if (agent_data.has_internal_ticket == 1) {
          $('#clone_has_internal_ticket').prop('checked', true);
        } else {
          $('#clone_has_internal_ticket').prop('checked', false);
        }

        if (agent_data.has_external_ticket == 1) {
          $('#clone_has_external_ticket').prop('checked', true);
        } else {
          $('#clone_has_external_ticket').prop('checked', false);
        }
        //  alert(agent_data.has_webinar);
        if (agent_data.has_webinar == 1) {
          $('#clone_has_webinar').prop('checked', true);
        } else {
          $('#clone_has_webinar').prop('checked', false);
        }
        if (agent_data.dialer_auto_answer == 1) {
          $('#clone_dialer_auto_answer').prop('checked', true);
        } else {
          $('#clone_dialer_auto_answer').prop('checked', false);
        }

        if (agent_data.wallboard_one == 1) {
          $('#clone_wallboard_one').prop('checked', true);
        } else {
          $('#clone_wallboard_one').prop('checked', false);
        }
        if (agent_data.wallboard_two == 1) {
          $('#clone_wallboard_two').prop('checked', true);
        } else {
          $('#clone_wallboard_two').prop('checked', false);
        }
        if (agent_data.wallboard_three == 1) {
          $('#clone_wallboard_three').prop('checked', true);
        } else {
          $('#clone_wallboard_three').prop('checked', false);
        }
        if (agent_data.wallboard_four == 1) {
          $('#clone_wallboard_four').prop('checked', true);
        } else {
          $('#clone_wallboard_four').prop('checked', false);
        }
        // if (agent_data.has_sso == 1) {
        //   $('#clone_has_sso').prop('checked', true);
        // } else {
        //   $('#clone_has_sso').prop('checked', false);
        // }
        if (agent_data.admin_permision == 1) {
          $('#clone_admin_permisions').prop('checked', true);
        } else {
          $('#clone_admin_permisions').prop('checked', false);
        }

        if (agent_data.has_supervisor == 1) {
          $('#clone_upd_supervisors').prop('checked', true);
        } else {
          $('#clone_upd_supervisors').prop('checked', false);
        }
        if (agent_data.has_webclient == 1) {
          $('#clone_upd_webclients').prop('checked', true);
        } else {
          $('#clone_upd_webclients').prop('checked', false);
        }
        if (agent_data.two_factor == 1) {
          $('#clone_two_factor').prop('checked', true);
        } else {
          $('#clone_two_factor').prop('checked', false);
        }


        if (agent_data.user_status == 1) {
          $('#clone_user_status').prop('checked', true);
        } else {
          $('#clone_user_status').prop('checked', false);
        }
        if (agent_data.predective_dialer_behave == 1) {
          $('#clone_predective_dialer_behave').prop('checked', true);
        } else {
          $('#clone_predective_dialer_behave').prop('checked', false);
        }

        if (agent_data.dsk_access == 1) {
          this.dsk_access = 'disableds';
        }



        this.a_pass = agent_data.password;
        this.sip_pass = agent_data.sip_password;


  
      }
      else {

        iziToast.warning({
          message: "Agent data could not retrive. Please try again",
          position: 'topRight'
        });

      }

    },
      (error) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      });

  }





  addAgentData() {

    if (this.addAgent.value.user_name == '' || this.addAgent.value.user_name == 'null') {
      iziToast.warning({
        message: "Please Enter Username",
        position: 'topRight'
      });
    }

    if (this.addAgent.value.dsk_access == true) {

      if (this.addAgent.value.dsk_username == '' || this.addAgent.value.dsk_username == 'null' || this.addAgent.value.dsk_username == '0') {
        iziToast.warning({
          message: "Please Enter DKB Username",
          position: 'topRight'
        });
        return false;
      }

      if (this.addAgent.value.dsk_password == '' || this.addAgent.value.dsk_password == 'null' || this.addAgent.value.dsk_password == '0') {
        iziToast.warning({
          message: "Please Enter DKB Password",
          position: 'topRight'
        });
        return false;
      }


    }
    // if(this.addAgent.value.dsk_password == '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'){

    // }


    if (!this.no_report)
      var add_reports = $('#clone_add_reports').val().join();
    if(this.caller_enable)
      var caller_ids = $('#clone_add_callerId').val().join();

      var add_countrycontact = $('#clone_add_countrycontact').val().join();

      console.log(caller_ids);

    var agent_pass = $('#clone_agent_user_pwd').val();
    // console.log(agent_pass);

    if ($("#clone_agent_user_pwd").val() == '' || $("#clone_agent_user_pwd").val() == undefined) {
      iziToast.warning({
        message: "Please Enter Password",
        position: 'topRight'
      });
      return false;
    }
    //  if(this.addAgent.value.emailid == '' || this.addAgent.value.emailid==null || this.addAgent.value.emailid=='0'){
    //   iziToast.warning({
    //       message: "Please Enter Email ID",
    //       position: 'topRight'
    //   });
    //   return false;
    // }
    // alert(this.addAgent.value.emailid);
    //    else{
    //       $("#clone_agent_user_pwd").keydown(function (e) {

    //         console.log(e.which); 
    //         if(e.which == 32){
    //                 iziToast.warning({
    //                   message: "Please No Whitespace",
    //                   position: 'topRight'
    //               }); 
    //               return false;
    //         }
    //         return e.which !== 32;
    //   });
    // }
    var sip_user = $('#clone_sip_username_add').val();
    var sip_pass = $('#clone_sip_password_add').val();

    let api_req: any = new Object();
    let add_agent_req: any = new Object();
    add_agent_req.admin_id = localStorage.getItem('admin_id');
    add_agent_req.agent_name = this.addAgent.value.agent_name;
    add_agent_req.email_id = this.addAgent.value.emailid;
    add_agent_req.phone_number = this.addAgent.value.phone_number;
    add_agent_req.user_name = this.addAgent.value.user_name;
    add_agent_req.user_pwd = agent_pass;
    add_agent_req.sip_login = this.addAgent.value.sip_login;
    add_agent_req.sip_password = sip_pass;
    add_agent_req.sip_username = sip_user;
    add_agent_req.voice_3cx = this.addAgent.value.voice_3cx;
    add_agent_req.cli_status = this.addAgent.value.cli_status;
    add_agent_req.close_all_menu = this.addAgent.value.close_all_menu;
    add_agent_req.reports = add_reports;

    add_agent_req.caller_ids = caller_ids;
    add_agent_req.countrycontact = add_countrycontact;

    add_agent_req.predective_dialer = this.addAgent.value.predective_dialer;
    // add_agent_req.lead = this.addAgent.value.lead;
    add_agent_req.has_contact = this.addAgent.value.has_contact;
    add_agent_req.has_sms = this.addAgent.value.has_sms;
    add_agent_req.has_whatsapp = this.addAgent.value.has_whatsapp;
    add_agent_req.has_chatbot = this.addAgent.value.has_chatbot;
    add_agent_req.has_chat = this.addAgent.value.has_chat;
    add_agent_req.has_internal_chat = this.addAgent.value.has_int_chat;
    add_agent_req.has_fb = this.addAgent.value.has_fb;
    add_agent_req.has_wechat = this.addAgent.value.has_wechat;
    add_agent_req.has_telegram = this.addAgent.value.has_telegram;
    add_agent_req.has_fax = this.addAgent.value.has_fax;
    add_agent_req.has_internal_ticket = this.addAgent.value.has_internal_ticket;
    add_agent_req.has_external_ticket = this.addAgent.value.has_external_ticket;
    add_agent_req.wallboard_one = this.addAgent.value.wallboard_one;
    add_agent_req.wallboard_two = this.addAgent.value.wallboard_two;
    add_agent_req.wallboard_three = this.addAgent.value.wallboard_three;
    add_agent_req.wallboard_four = this.addAgent.value.wallboard_four;
    add_agent_req.two_factor = this.addAgent.value.two_factor;
    add_agent_req.admin_permision = this.addAgent.value.admin_permision;
    add_agent_req.supervisors = this.addAgent.value.supervisors;
    add_agent_req.dsk_access = this.addAgent.value.dsk_access;
    add_agent_req.dsk_username = this.addAgent.value.dsk_username;
    add_agent_req.dsk_password = this.addAgent.value.dsk_password;
    add_agent_req.user_status = this.addAgent.value.user_status;
    add_agent_req.predective_dialer_behave = this.addAgent.value.predective_dialer_behave;
    add_agent_req.has_webinar = this.addAgent.value.has_webinar;
    add_agent_req.dialer_auto_answer = this.addAgent.value.dialer_auto_answer;
    // add_agent_req.has_sso = this.addAgent.value.has_sso;

    add_agent_req.plan_id = $('#clone_MPlanName').val();
    add_agent_req.call_rate = $('#clone_call_rate').val();
    add_agent_req.call_prefix = $('#clone_call_prefix').val();
    add_agent_req.valid_from = $('#clone_valid_from').val();
    add_agent_req.valid_to = $('#clone_valid_to').val();

    add_agent_req.tax_name = $('#clone_a_tax_name').val();
    add_agent_req.tax_per = $('#clone_a_tax_per').val();

    add_agent_req.ag_group = $('#clone_recording_grp').val();
    // alert(add_agent_req.ag_group);

    add_agent_req.action = 'add_agent';
    api_req.operation = "agents";
    api_req.moduleType = "agents";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = add_agent_req;

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
      if (response.result.status == true) {
        console.log(response.result.status);
        if (response.result.data == 0) {
          iziToast.error({
            message: "Sorry Some server error occured.Please contact Admin",
            position: 'topRight'
          });
        }
        else {
          $('#clone_add_agents_form').modal('hide');
          this.addAgent.reset();
          iziToast.success({
            message: "Agent - " + response.result.data.agent_name + " added successfully",
            position: 'topRight'
          });
          $('#clone_add_agents_form').modal('hide');
          $('#clone_agentsList').click();
          this.addAgent.reset();
          this.dsk_access = '';
        }
      }
      else if (response.result.status == false) {
        iziToast.warning({
          message: "Username already excites",
          position: 'topRight'
        });
      }
      else {

        iziToast.warning({
          message: "Agent not added. Please try again",
          position: 'topRight'
        });

      }

    },
      (error) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      });


  }



  editAgentData() {

    let api_req: any = new Object();
    let agent_req: any = this.editAgent.value;


    //       alert(this.editAgent.value.admin_permision);
    //       alert(this.editAgent.value.close_all_menu);
    // return false;
    if (this.editAgent.value.dsk_access == '1') {

      if (this.editAgent.value.dsk_username == '') {
        iziToast.warning({
          message: "Please Enter DKB Username",
          position: 'topRight'
        });
        return false;
      }

      if (this.editAgent.value.dsk_password == '') {
        iziToast.warning({
          message: "Please Enter DKB Password",
          position: 'topRight'
        });
        return false;
      }

    }

    //   if(this.editAgent.value.email_id == '' ){
    //     iziToast.warning({
    //         message: "Please Enter Email ID",
    //         position: 'topRight'
    //     });
    //     return false;
    // }
    if ($("#clone_update_user_pwd").val() == '' || $("#clone_update_user_pwd").val() == undefined) {
      iziToast.warning({
        message: "Please Enter Password",
        position: 'topRight'
      });
      return false;
    }

    //   $('#clone_update_user_pwd').keypress(function( e ) {
    //     if(e.which === 32) 
    //     console.log('ejief');
    //       return false;
    //  });
    //   if($("#clone_update_user_pwd").val() =='' || $("#clone_update_user_pwd").val() ==undefined ){
    //     iziToast.warning({
    //         message: "Please Enter Password",
    //         position: 'topRight'
    //     });

    // }
    // alert(this.editAgent.value.has_webinar);




    if (!this.no_report) {
      var test = $('#clone_edit_reports').val(); 
      var reports;
      if(test != 'null' && test != '' && test != 'undefined' && test != null){
      reports = test.join();
      }else{
       reports = '';
      }
      if (this.upd_agent_3cx_rep) {
        agent_req.ag_group = $('#clone_upd_recording_grp').val();
      }
    }
    var callerIDs;
    if($('#clone_update_callerId').val())
    callerIDs = $('#clone_update_callerId').val().join(); 
    else
    callerIDs = $('#clone_update_callerId').val(); 

    var country_contact;
    if($('#clone_update_countrycontact').val())
    country_contact = $('#clone_update_countrycontact').val().join(); 
    else
    country_contact = $('#clone_update_countrycontact').val(); 

 
 
    var m_pass = $('#clone_update_user_pwd').val();
    agent_req.admin_id = localStorage.getItem('admin_id');
    agent_req.action = 'update_agent';
    agent_req.reports = reports;
    agent_req.caller_ids = callerIDs;
    agent_req.countrycontact = country_contact;
    agent_req.password = m_pass;
    api_req.operation = "agents";
    api_req.moduleType = "agents";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = agent_req;
    agent_req.plan_id = $('#clone_eMPlanName').val();
    agent_req.call_rate = $('#clone_ecall_rate').val();
    agent_req.call_prefix = $('#clone_ecall_prefix').val();
    agent_req.valid_from = $('#clone_evalid_from').val();
    agent_req.valid_to = $('#clone_evalid_to').val();

    agent_req.tax_name = $('#clone_e_tax_name').val();
    agent_req.tax_per = $('#clone_e_tax_per').val();

    // alert(agent_req.ag_group);

    agent_req.sip_username = $('#clone_sip_username').val();
    agent_req.sip_password = $('#clone_u_sip_password').val();

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
      if (response.result.data == 0) {
        $('#clone_edit_agents_form').modal('hide');
        iziToast.warning({
          message: "Sorry Some error occured.Please contact Admin",
          position: 'topRight'
        });;
      }
      else if (response.result.data == 1) {
        $('#clone_edit_agents_form').modal('hide');
        this.editAgent.reset();
        this.dsk_access = '';
        iziToast.success({
          message: "Agent - " + agent_req.agent_name + " updated successfully",
          position: 'topRight'
        });
        $('#clone_agentsList').click();
      }
      else {

        iziToast.warning({
          message: "Agent data not updated. Please try again",
          position: 'topRight'
        });

      }

    },
      (error) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      });
  }




  dskAccess(event) {

    if (event == 'add') {

      if (this.addAgent.value.dsk_access == true) {
        this.dsk_access = 'disableds';
      } else {
        this.dsk_access = '';
      }

    } else {

      if (this.editAgent.value.dsk_access == true) {
        this.dsk_access = 'disableds';
      } else {
        this.dsk_access = '';
      }
    }
  }





  toggleClasss() {
    $(event.target).toggleClass("fa-eye fa-eye-slash");
    var input = $($(event.target).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  };

  retriveFrom3cx(dev) {
    if (dev == '') {
      iziToast.warning({
        message: "Please Enter the Extension",
        position: 'topRight'
      });
      return false;
    }

    if (this.hardware_id != '') {
      var socket_message = '[{"cust_id":"' + this.hardware_id + '","data":[{"Name":"getagentdet","agentno":"' + dev + '"}]}]';
      this.websocket.send(socket_message);
    }
  }




  sendWelcomeMail(id, email) {
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: false,
      //  background: '#clone_19191a',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
      }
    });

    this.sendingmail = true;
    let access_token: any = localStorage.getItem('access_token');


    if (email == 'null' || email == null) {
      iziToast.warning({
        message: "Please update email address to send welcome email",
        position: 'topRight'
      });
      return false;
    }

    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"welcome_email","user_id":"' + id + '","email":"' + email + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        this.sendingmail = false;
        this.closeLoading();
        iziToast.success({
          message: "Welcome Email Sent Successfully",
          position: 'topRight'
        });
      } else {
        this.closeLoading();
        iziToast.warning({
          message: "Sorry,Mail not sent",
          position: 'topRight'
        });
        this.sendingmail = false;

      }
    },
      (error) => {
        this.closeLoading();
        console.log(error);
      });
  }

  closeLoading() {
    Swal.close();
  }

  logoutagent(id) {

    let access_token: any = localStorage.getItem('access_token');
    let user_id: any = localStorage.getItem('userId');

    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"user_log_out","user_id":"' + id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.data == 1) {

      } else {

      }
    },
      (error) => {
        console.log(error);
      });

  }

  getCallTariffsList() {
    // alert(this.agent_3cx_rep)
    if (this.addAgent.value.voice_3cx == null || this.addAgent.value.voice_3cx == false) {
      this.showCallTariffsDet = true;
      //... this.agent_3cx_rep = true;

    } else {
      this.showCallTariffsDet = false;
      //... this.agent_3cx_rep = false;

    }
  }

  enableCallerID(type){
    if(type=='add'){
    if (this.addAgent.value.cli_status == null || this.addAgent.value.cli_status == false) {
      this.caller_enable = true;

    } else {
      this.caller_enable = false;

    }
  }else{
    if (this.editAgent.value.cli_status == null || this.editAgent.value.cli_status == false) {
      this.caller_enable = true;

    } else {
      this.caller_enable = false;

    }
  }
  }

  getCallTariffsListe() {
    if (this.editAgent.value.voice_3cx == null || this.editAgent.value.voice_3cx == false) {
      this.showCallTariffsDetEdit = true;
    } else {
      this.showCallTariffsDetEdit = false;
    }
  }

  getcalltariffs() {
    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"call_tarrif", "moduleType":"call_tarrif", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"view_call_tarrif","admin_id": "' + this.admin_id + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.callTariffs = response.result.data.plans;
      } else {
      }
    },
      (error) => {
        console.log(error);
      });
  }

  edit_billing_address() {

    // $('#clone_edit_billing_address').reset();


    var user_id = $('#clone_edit_agents_key').val();
    let access_token: any = localStorage.getItem('access_token');
    let admin_id: any = localStorage.getItem('admin_id');
    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"edit_agent_billing_det","admin_id": "' + this.admin_id + '","id":"' + user_id + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {


        if (response.result.data != "") {
          // alert(response.result.data);
          var ab = response.result.data[0]
          //alert(ab.edit_ship); 
          if (ab.edit_ship == '1') {
            $('#clone_eedit_ship').prop('checked', true);
            $('#clone_editShippingAddresss').attr('style', 'display:flex');
            $('#clone_econtact_person').val(ab.contact_person);
            $('#clone_eadd1').val(ab.add1);
            $('#clone_eadd2').val(ab.add2);
            $('#clone_ecity').val(ab.city);
            $('#clone_estate').val(ab.state);
            $('#clone_ezip_code').val(ab.zip_code);
            $('#clone_ecountry').val(ab.country);
            $('#clone_e_monthly_charges').val(ab.monthly_charges);
            $('#clone_e_discount_per').val(ab.discount);
            $('#clone_eship_contact').val(ab.ship_contact);
            $('#clone_eship_to').val(ab.ship_to);
            $('#clone_eship_add1').val(ab.ship_add1);
            $('#clone_eship_add2').val(ab.ship_add2);
            $('#clone_eship_city').val(ab.ship_city);
            $('#clone_eship_state').val(ab.ship_state);
            $('#clone_eship_zip').val(ab.ship_zip);
            $('#clone_eship_country').val(ab.ship_country);
          } else {

            $('#clone_econtact_person').val(ab.contact_person);
            $('#clone_eadd1').val(ab.add1);
            $('#clone_eadd2').val(ab.add2);
            $('#clone_ecity').val(ab.city);
            $('#clone_estate').val(ab.state);
            $('#clone_ezip_code').val(ab.zip_code);
            $('#clone_ecountry').val(ab.country);
            $('#clone_e_monthly_charges').val(ab.monthly_charges);
            $('#clone_e_discount_per').val(ab.discount);
          }





          //  $('#clone_edit_agents_form').modal('hide');
          $('#clone_edit_billing_address').modal('show');

        } else {
          // alert('called');
          //  $('#clone_edit_agents_form').modal('hide');
          $('#clone_edit_billing_address').modal('show');

          // temp for clean a id values
          $('#clone_econtact_person').val('');
          $('#clone_eadd1').val('');
          $('#clone_eadd2').val('');
          $('#clone_ecity').val('');
          $('#clone_estate').val('');
          $('#clone_ezip_code').val('');
          $('#clone_ecountry').val('');
          $('#clone_e_monthly_charges').val('');
          $('#clone_e_discount_per').val('');
          $('#clone_eship_contact').val('');
          $('#clone_eship_to').val('');
          $('#clone_eship_add1').val('');
          $('#clone_eship_add2').val('');
          $('#clone_eship_city').val('');
          $('#clone_eship_state').val('');
          $('#clone_eship_zip').val('');
          $('#clone_eship_country').val('');
          $('#clone_econtact_person').val('');
          $('#clone_eadd1').val('');
          $('#clone_eadd2').val('');
          $('#clone_ecity').val('');
          $('#clone_estate').val('');
          $('#clone_ezip_code').val('');
          $('#clone_ecountry').val('');
          $('#clone_e_monthly_charges').val('');
          $('#clone_e_discount_per').val('');



        }


      } else {

      }
    },
      (error) => {
        console.log(error);
      });



  }

  editShippingAddress() {
    if ($("#clone_eedit_ship").is(":checked")) {
      this.editShippingAddresss = true;
      $('#clone_editShippingAddresss').attr('style', 'display:flex');
    } else {
      this.editShippingAddresss = false;
      $('#clone_editShippingAddresss').attr('style', 'display:none');
    }

  }

  editShippingAddressMain() {
    // var user_id = $('#clone_edit_agents_key').val();
    // var contact_person =  $('#clone_contact_person').val();
    // var add1 =  $('#clone_add1').val();
    // var add2 =  $('#clone_add2').val();
    // var city =  $('#clone_city').val();
    // var state =  $('#clone_state').val();
    // var zip_code =  $('#clone_zip_code').val();
    // var country =  $('#clone_country').val();
    // var edit_ship =  $('#clone_edit_ship').val();
    // var ship_contact =  $('#clone_ship_contact').val();
    // var ship_to =  $('#clone_ship_to').val();
    // var ship_add1 =  $('#clone_ship_add1').val();
    // var ship_add2 =  $('#clone_ship_add2').val();
    // var ship_city =  $('#clone_ship_city').val();
    // var ship_state =  $('#clone_ship_state').val();
    // var ship_zip =  $('#clone_ship_zip').val();
    // var ship_country =  $('#clone_ship_country').val();

    var user_id = $('#clone_edit_agents_key').val();
    var contact_person = $('#clone_econtact_person').val();
    var add1 = $('#clone_eadd1').val();
    var add2 = $('#clone_eadd2').val();
    var city = $('#clone_ecity').val();
    var state = $('#clone_estate').val();
    var zip_code = $('#clone_ezip_code').val();
    var country = $('#clone_ecountry').val();
    var ship_contact = $('#clone_eship_contact').val();
    var ship_to = $('#clone_eship_to').val();
    var ship_add1 = $('#clone_eship_add1').val();
    var ship_add2 = $('#clone_eship_add2').val();
    var ship_city = $('#clone_eship_city').val();
    var ship_state = $('#clone_eship_state').val();
    var ship_zip = $('#clone_eship_zip').val();
    var ship_country = $('#clone_eship_country').val();
    var monthly_charges = $('#clone_e_monthly_charges').val();
    var discount_per = $('#clone_e_discount_per').val();


    if (contact_person == "" || add1 == "" || city == "" || state == "" || zip_code == "" || country == "") {
      iziToast.warning({
        message: "Please Fill The Required Field",
        position: 'topRight'
      });
      return false;
    }

    if ($("#clone_eedit_ship").is(":checked")) {
      var edit_ship = '1';
    } else {
      var edit_ship = '0';
    }

    if ($("#clone_eedit_ship").is(":checked")) {
      if (ship_contact == "" || ship_to == "" || ship_add1 == "" || ship_city == "" || ship_state == "" || ship_zip == "" || ship_country == "") {
        iziToast.warning({
          message: "Please Fill The Required Field",
          position: 'topRight'
        });
        return false;
      }
      else {
        ship_contact = contact_person;
        ship_to = contact_person;
        ship_add1 = add1;
        ship_add2 = add2;
        ship_city = city;
        ship_state = state;
        ship_zip = zip_code;
        ship_country = country;
      }
    }
    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"update_agent_billing_det","admin_id": "' + this.admin_id + '","user_id":"' + user_id + '","contact_person":"' + contact_person + '","add1":"' + add1 + '","add2":"' + add2 + '","city":"' + city + '","state":"' + state + '","zip_code":"' + zip_code + '","country":"' + country + '","edit_ship":"' + edit_ship + '","ship_contact":"' + ship_contact + '","ship_to":"' + ship_to + '","ship_add1":"' + ship_add1 + '","ship_add2":"' + ship_add2 + '","ship_city":"' + ship_city + '","ship_state":"' + ship_state + '","ship_zip":"' + ship_zip + '","ship_country":"' + ship_country + '","monthly_charges":"' + monthly_charges + '","discount_per":"' + discount_per + '"}}';

    // console.log(api_req); return false;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        $('#clone_edit_billing_address').modal('hide');
        // $('#clone_edit_billing_address').reset();
        this.editShippingAddresss = false;
      } else {
      }
    },
      (error) => {
        console.log(error);
      });



  }

  AddShippingAddressMain() {
    var user_id = $('#clone_edit_agents_key').val();
    var contact_person = $('#clone_contact_person').val();
    var add1 = $('#clone_add1').val();
    var add2 = $('#clone_add2').val();
    var city = $('#clone_city').val();
    var state = $('#clone_state').val();
    var zip_code = $('#clone_zip_code').val();
    var country = $('#clone_country').val();
    var ship_contact = $('#clone_ship_contact').val();
    var ship_to = $('#clone_ship_to').val();
    var ship_add1 = $('#clone_ship_add1').val();
    var ship_add2 = $('#clone_ship_add2').val();
    var ship_city = $('#clone_ship_city').val();
    var ship_state = $('#clone_ship_state').val();
    var ship_zip = $('#clone_ship_zip').val();
    var ship_country = $('#clone_ship_country').val();

    if (contact_person == "" || add1 == "" || city == "" || state == "" || zip_code == "" || country == "") {
      iziToast.warning({
        message: "Please Fill The Required Field",
        position: 'topRight'
      });
      return false;
    }

    if ($("#clone_eedit_ship").is(":checked")) {
      var edit_ship = '1';
    } else {
      var edit_ship = '0';
    }

    if ($("#clone_eedit_ship").is(":checked")) {
      if (ship_contact == "" || ship_to == "" || ship_add1 == "" || ship_city == "" || ship_state == "" || ship_zip == "" || ship_country == "") {
        iziToast.warning({
          message: "Please Fill The Required Field",
          position: 'topRight'
        });
        return false;
      }
    }
    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"update_agent_billing_det","admin_id": "' + this.admin_id + '","user_id":"' + user_id + '","contact_person":"' + contact_person + '","add1":"' + add1 + '","add2":"' + add2 + '","city":"' + city + '","state":"' + state + '","zip_code":"' + zip_code + '","country":"' + country + '","edit_ship":"' + edit_ship + '","ship_contact":"' + ship_contact + '","ship_to":"' + ship_to + '","ship_add1":"' + ship_add1 + '","ship_add2":"' + ship_add2 + '","ship_city":"' + ship_city + '","ship_state":"' + ship_state + '","ship_zip":"' + ship_zip + '","ship_country":"' + ship_country + '"}}';

    // console.log(api_req); return false;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        $('#clone_edit_billing_address').modal('hide');
        this.editShippingAddresss = false;
      } else {
      }
    },
      (error) => {
        console.log(error);
      });



  }

  


  retriveUsersFrom3cx() {



    this.has_hard_id = localStorage.getItem('hardware_id');
    // alert(this.has_hard_id);
  if(this.has_hard_id == "" || this.has_hard_id == null){
      // alert("sdjnsdh");
      // $("#clone_addLicence").modal({"backdrop": "static"});
      iziToast.error({
        message: "Your Licence Key May expired!.. Please Contact Admin",
        position: 'topRight'
      });
      this.show_act_wall = true;
    } else {
      this.checkLicenseKey();
      // alert("asdfghjkl");

    }



  }


  checkLicenseKey() {
    let access_token: any = localStorage.getItem('access_token');
    let login_user: any = localStorage.getItem('userId');

    // let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"check_hardware","user_id":"'+login_user+'"}}';
    // this.serverService.sendServer(api_req).subscribe((response:any) => {
    //   if(response.result.data.value=='1'){
    // this.initsocket();   
    Swal.fire({
      title: 'Please Wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      //  background: '#clone_19191a',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
      }
    });
    if (this.hardware_id != '') {
      var socket_message = '[{"cust_id":"' + this.hardware_id + '","data":[{"Name":"getagents"}]}]';
      console.log(socket_message);

      this.websocket.send(socket_message);

    }
    // }
    else {
      iziToast.error({
        message: "Your Licence Key may expired!.. Please contact admin",
        position: 'topRight'
      });
      // $("#clone_addLicence").modal({"backdrop": "static"});
      this.show_act_wall = true;
    }
    // }, 
    // (error)=>{
    //     console.log(error);
    // });
  }
  activateLicenseKey() {
    let access_token: any = localStorage.getItem('access_token');
    let login_user: any = localStorage.getItem('userId');
    let adminId: any = localStorage.getItem('admin_id');

    let l_key: any = $('#clone_licence_key').val();
    if (l_key == "") {
      iziToast.error({
        message: "Please enter the licence key",
        position: 'topRight'
      });
      return false;
    }
    let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"check_license","user_id":"' + adminId + '","license_key":"' + l_key + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.data.value == 1) {
        localStorage.setItem('hardware_id', response.result.data.hardware_id);
        this.initsocket();
        iziToast.success({
          message: "Wallboard activated",
          position: 'topRight'
        });
        $("#clone_addLicence").modal('hide');

      } else {
        iziToast.error({
          message: "Please enter a valid key",
          position: 'topRight'
        });

      }
    },
      (error) => {
        console.log(error);
      });
  }


  genInvoice(id, email) {
    let access_token: any = localStorage.getItem('access_token');
    let admin_id: any = localStorage.getItem('admin_id');
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: false,
      //  background: '#clone_19191a',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
      }
    });

    let api_req: any = '{"operation":"call_tarrif", "moduleType":"call_tarrif", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"gen_invoice","user_id":"' + id + '","admin_id":"' + admin_id + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);
      this.closeLoading();
      if (response.status == true) {

        if (response.result.data == null) {
          iziToast.error({
            message: "Sorry,some error occure",
            position: 'topRight'
          });
        } else if (response.result.data.data == '2') {
          this.pdfurl = response.result.data.url;
          $("#clone_showGeneratedPdf").modal('show');

        }

        else if (response.result.data.data == '3') {
          iziToast.error({
            message: "Update user billing address",
            position: 'topRight'
          });
          Swal.fire({
            title: 'Update user Billing Address',
            text: "click the update user icon -> Update Billing Address",
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: '#clone_3085d6',
            confirmButtonText: 'Got it'
          })

        }
        else if (response.result.data.data == '4') {
          iziToast.error({
            message: "Admin billing Address not available",
            position: 'topRight'
          });
          Swal.fire({
            title: 'Update Admin Billing Address',
            text: "Go to profile(by clicking profile Icon)-> Update Billing Address",
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: '#clone_3085d6',
            confirmButtonText: 'Got it'
          })

        } else if (response.result.data.data == '5') {
          iziToast.error({
            message: "User does not have call plan",
            position: 'topRight'
          });
          Swal.fire({
            title: 'Voice 3CX permission',
            text: "Update your user with voice3CX permission,you should provide plan details for specific user",
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: '#clone_3085d6',
            confirmButtonText: 'Got it'
          })

        }
        else {
          var arrStr = encodeURIComponent(JSON.stringify(response));

          // document.location.href = 'https://hp.mconnectapps.com/api/storage/contact/download.php?res='+arrStr;
          var url = "https://updates.mconnectapps.com/"+localStorage.getItem('company_name')+"/storage/invoice/invoice.php";
          var form = $('<form action="' + url + '" method="post">' +
            '<input type="text" name="res" value="' + arrStr + '" />' +
            '</form>');
          $('body').append(form);
          form.submit();
        }

      }
    },
      (error) => {
        console.log(error);
      });
  }

  selectReport() {

  }


  eventGetChange() {
    // alert(this.voice_manage);
    if (this.voice_manage == '1') {
      $('#clone_add_reports').on('click', function () {
        var vals = $(this).val();
        if (vals.indexOf("3") > -1) {
          $("#clone_enablereport").val("3cx");
          $("#clone_enablereport").click();
        } else {
          $("#clone_enablereport").val("non");
          $("#clone_enablereport").click();
        }
      })
    }

  }

  

  enablereport() {
    var test = $("#clone_enablereport").val();
    if (test == "3cx")
      this.agent_3cx_rep = true;
    else
      this.agent_3cx_rep = false;
  }

  eventupdate() {
    // alert(this.voice_manage);

    if (this.voice_manage == '1') {
      $('#clone_edit_reports').on('click', function () {
        var vals = $(this).val();
        if (vals.indexOf("3") > -1) {
          $("#clone_updatereport").val("3cx");
          $("#clone_updatereport").click();
        } else {
          $("#clone_updatereport").val("non");
          $("#clone_updatereport").click();
        }

      })
    }
  }
  updatereport() {
    var test = $("#clone_updatereport").val();
    if (test == "3cx")
      this.upd_agent_3cx_rep = true;
    else
      this.upd_agent_3cx_rep = false;
  }
  clictToCall(to) {
    // if(to == 'phone'){  this.to_num = $('#clone_phone').val(); } else {  this.to_num = $('#clone_mobile').val(); }
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
        let api_reqs: any = '{"type": "makecall", "number": "' + to + '","show_caller_id":"' + this.show_caller_id + '"}';
        this.serverService.show.next(api_reqs);
      } else {
        let api_reqs: any = '{"type": "makecallauto", "number": "' + to + '"}';
        this.serverService.show.next(api_reqs);
      }

    }
  }
  showdoc(link) {
    this.doc_link = link;
    $("#clone_document_model").modal('show');
  }


  callerIDList(){
    // {"operation":"call","moduleType":"call","api_type":"web","access_token":"","element_data":{"action":"getcaller_list","admin_id":"1359"}}
  
      let api_req:any = new Object();
      let agents_req:any = new Object();
      
      api_req.operation="call";
      api_req.moduleType="call";
      api_req.api_type="web";
  
      agents_req.action="getcaller_list";
      agents_req.admin_id=localStorage.getItem('admin_id');
  
      api_req.access_token=localStorage.getItem('access_token');
      api_req.element_data = agents_req;
      this.serverService.sendServer(api_req).subscribe((response:any) => {
        if(response.result.status == true){
          
          this.callerList = response.result.data;
           console.log(this.callerList);
          // this.recordNotFound = this.callerList.length == 0 ? true : false;
        } else {
        
            // iziToast.warning({
            //     message: " No data found",
            //     position: 'topRight'
            // });
  
          }
          
  
      }, 
      (error)=>{
          console.log(error);
      });
  
  }


}