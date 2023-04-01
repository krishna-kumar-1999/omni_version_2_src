import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
declare var iziToast: any;
declare var medi: any;

import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.component.html',
  styleUrls: ['./edit-contacts.component.css']
})

export class EditContactsComponent implements OnInit {

  incomecallNum;
  getaccountid;
  acc_name;
  param1: string;
  param3;
  created_time;
  modified_time;
  contact_id;
  addRefined: FormGroup;
  departments;
  uadmin_id;
  auxcodes;
  fromEdit;
  questions;
  to_num;
  call_record_id;
  admin_id;
  dailyfood = false;
  alladmin = true;
  refineshow = false;
  dsk_access;
  hasdsk = false;
  show_failed = false;
  hasnodsk = true;
  external_contact_url;
  public allowMp = true;
  public startrec = false;
  dailyfoodurl;
  has_external_contact;
  IFlink;
  show_caller_id;
  hide_cal1er = '0';
  click_to_call_number;
  click_to_call_mobile_number;
  click_to_call_office_phone;
  click_to_call_home_phone;
  crm_type;
  hapikey;
  paramq;
  dailyfoodurlhub;
  z_authId;
  z_orgId;
  paramCall;
  popupnumber;
  MDy_bearer_token;
  contact_name;
  phone_activity;
  websocket;
  extension;
  has_hard_id;
  recordNotFound;
  single_timeline;
  Tsubject;
  Tdescription;
  Tphone;
  Trecord;
  Twrapcode;
  Twrapnote;
  conc_query_list;
  user_type;
  queue_values;
  listsuggestion: any;
  paginationdata: any;
  no_contact = false;
  showloading = false;
  auxcode_Category;
  start_list;
  end_list;
  category_name;
  get_dailer_value;
  show_mini_butons = true;
  show_ans_del = false;
  show_ans = false;
  show_del = false;
  show_contact_value = false;
  showphoneloader = false;
  showdatalist = false;
  Queue_number;
  admin_permission;
  showactivities = false;
  showrap = true;
  editContact: FormGroup;
  oldNotes;
  multipleContacts;
  showmultiple = false;
  showcreateTicket = false;
  getuniqueId;
  cal_Sett: string;
  test:any;
  email: any;

  constructor(private serverService: ServerService, private router: Router, private route: ActivatedRoute, public modalService: NgbModal) {


    this.addRefined = new FormGroup({
      'add_group_name': new FormControl(null, Validators.required),
    });

    this.param1 = this.route.snapshot.queryParamMap.get('phone');
    this.param3 = this.route.snapshot.queryParamMap.get('ids');
    this.paramCall = this.route.snapshot.queryParamMap.get('calltype');

    var decodedString = atob(this.param1);
    this.param1 = decodedString;
    this.get_dailer_value = localStorage.getItem("income_calls_num");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.serverService.editContact.subscribe((val: any) => {

      var dpContent = JSON.parse(val);
      
      if (dpContent.type == "show_popup") {
        this.param1 = dpContent.caller_no;
        this.paramCall = dpContent.call_type;
        // this.queue_values = dpContent.queue_num;
        if (dpContent.show_buttons == "true") {
          // console.log(dpContent.show_buttons);
          // this.show_mini_butons = true;
          this.show_ans = true;
          this.show_del = true;
        } else {
          // console.log('jashdff');
          // this.show_mini_butons = false;
          this.show_ans = false;
          this.show_del = false;
        }
        console.log(this.param1);
        //  this.editConatcts();        
      }
      if (dpContent.type == "call_ended") {
        // alert('in')
        localStorage.removeItem('ans_click');
        this.show_ans = false;
        this.show_del = false;
      }
      if (dpContent.type == "call_info") {
        // alert('in')
        var test = localStorage.getItem('ans_click');
               
        if(test != '1'){
          this.show_ans = true;
          this.show_del = true;
          }

          if(test == '1'){
            this.show_del = true;
          }
        this.param1 = dpContent.caller_no;
        this.paramCall = dpContent.call_type;


      }


    });

  }

  ngOnChanges() {

  }


  enterfullname(){
    
    var a =  this.editContact.controls['first_name'].value;
   var b = this.editContact.controls['last_name'].value;
   var c = a +' '+b;
   this.editContact.controls['full_name'].setValue(c);

 }


  ngOnInit() {
    this.cal_Sett = localStorage.getItem('call_Settings');
    this.editContact = new FormGroup({
      'contact_owner' :new FormControl(null,Validators.required),
      'full_name' :new FormControl(null),
      'first_name' :new FormControl(null),
      'last_name' :new FormControl(null),
      'account_name' :new FormControl(null,Validators.required),
      'lead_source' :new FormControl(null),
      'title' :new FormControl(null),
      'department' :new FormControl(null),
      // 'email' :new FormControl(null,[
      //   Validators.required,
      //   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'email' :new FormControl(null),
      'activity' :new FormControl(null),
      'phone' :new FormControl(null,Validators.required),
      'home_phone' :new FormControl(null),
      'office_phone' :new FormControl(null),
      'fax' :new FormControl(null),
      'mobile' :new FormControl(null),
      'dob' :new FormControl(null),
      'assistant' :new FormControl(null),
      'assitant_phone' :new FormControl(null),
      // 'reports_to' :new FormControl(null),
      // 'email_opt_out' :new FormControl(0),
      // 'skype' :new FormControl(null),
      'secondary_email' :new FormControl(null),
      // 'twitter' :new FormControl(null),
      // 'reporting_to' :new FormControl(null),
      'mailing_street' :new FormControl(null),
      // 'other_street' :new FormControl(null),
      'mailing_city' :new FormControl(null),
      // 'other_city' :new FormControl(null),
      'mailing_province' :new FormControl(null),
      // 'other_province' :new FormControl(null),
      'mailing_postal_code' :new FormControl(null),
      // 'other_postal_code' :new FormControl(null),
      'mailing_country' :new FormControl(null, Validators.required),
      // 'other_country' :new FormControl(null),
      // 'created_by' :new FormControl(null),
      'notes' :new FormControl(null),
      // 'modified_by' :new FormControl(null),
      // 'whatsapp_number' :new FormControl(null),
      // 'line' :new FormControl(null),
      // 'facebook_url' :new FormControl(null),
      // 'wechat' :new FormControl(null),
      // 'viber' :new FormControl(null),
      // 'telegram' :new FormControl(null),
      // 'instagram_url' :new FormControl(null),
      // 'linkedin' :new FormControl(null),
      'ext_no' : new FormControl(null),
      'country_code' : new FormControl(null),
      'job_roles' : new FormControl(null),
      'acc_org_ids' : new FormControl(null),
      'acc_st_names' : new FormControl(null),
      'acc_st_ids' : new FormControl(null),
      'contact_identifier' : new FormControl(null,Validators.required)
     });

    // this.editContact = new FormGroup({
    //   'contact_owner' :new FormControl(null,Validators.required),
    //   'first_name' :new FormControl(null),
    //   'last_name' :new FormControl(null),
    //   'account_name' :new FormControl(null,Validators.required),
    //   'lead_source' :new FormControl(null,Validators.required),
    //   'title' :new FormControl(null),
    //   // 'email' :new FormControl(null,[
    //   //   Validators.required,
    //   //   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    //   'email' :new FormControl(null,Validators.required),
    //   'activity' :new FormControl(null),
    //   'phone' :new FormControl(null,Validators.required),
    //   'home_phone' :new FormControl(null),
    //   'office_phone' :new FormControl(null),
    //   'fax' :new FormControl(null),
    //   'mobile' :new FormControl(null),
    //   'dob' :new FormControl(null),
    //   'assistant' :new FormControl(null),
    //   'assitant_phone' :new FormControl(null),
    //   'reports_to' :new FormControl(null),
    //   'email_opt_out' :new FormControl(0),
    //   'skype' :new FormControl(null),
    //   'secondary_email' :new FormControl(null),
    //   'twitter' :new FormControl(null),
    //   'reporting_to' :new FormControl(null),
    //   'mailing_street' :new FormControl(null),
    //   'other_street' :new FormControl(null),
    //   'mailing_city' :new FormControl(null),
    //   'other_city' :new FormControl(null),
    //   'mailing_province' :new FormControl(null),
    //   'other_province' :new FormControl(null),
    //   'mailing_postal_code' :new FormControl(null),
    //   'other_postal_code' :new FormControl(null),
    //   'mailing_country' :new FormControl(null),
    //   'other_country' :new FormControl(null),
    //   'created_by' :new FormControl(null),
    //   'notes' :new FormControl(null),
    //   'modified_by' :new FormControl(null),
    //   'whatsapp_number' :new FormControl(null),
    //   'line' :new FormControl(null),
    //   'facebook_url' :new FormControl(null),
    //   'wechat' :new FormControl(null),
    //   'viber' :new FormControl(null),
    //   'telegram' :new FormControl(null),
    //   'instagram_url' :new FormControl(null),
    //   'linkedin' :new FormControl(null),
    //   'country_code' : new FormControl(null)
    //  });
     this.uadmin_id = localStorage.getItem('userId');
     this.show_caller_id = localStorage.getItem('show_caller_id');
     this.user_type = localStorage.getItem('user_type');
    this.extension = localStorage.getItem('ext_num');

    // this.editContact.controls['phone'].setValue(this.get_dailer_value);
     console.log(this.get_dailer_value)
    // this.editContact.patchValue({
    //   phone :this.get_dailer_value,
    // })
    // this.editContact.controls['phone'].setValue(this.get_dailer_value);

    //  this.getDepartments();
    //  this.getAuxCode();
     this.editConatcts();
     this.getAuxCatogory();
    //  this.getNotes(this.get_dailer_value);
    // if(this.fromEdit){
     
    // } else {
    //   this.getquestionnaire();
    // }
    
    this.admin_id = localStorage.getItem('admin_id');
    this.dsk_access = localStorage.getItem('dsk_access');
    this.has_external_contact = localStorage.getItem('has_external_contact');
    this.external_contact_url = localStorage.getItem('external_contact_url');
    this.crm_type = localStorage.getItem('crm_type');
    console.log(this.external_contact_url);
    if(this.admin_id == '128'){
      this.dailyfood = true;
      this.alladmin = false;
      this.dailyfoodurl = 'http://dkb.dailyfoodsa.com/maestrokb/crm_report.php?customer_number='+this.param1;
    }
    if(this.has_external_contact == '1'){
      this.dailyfood = true;
      this.alladmin = false;
      this.dailyfoodurl = this.external_contact_url;

    }
    this.initSocket();
    // if(this.fromEdit){

    // } else {
    //   this.getquestionnaire();
    // } 
    // let api_reqs:any = '{"type": "sidebar"}';
    // this.serverService.sidebar.next();

    // if ($("body").hasClass("sidebar-mini")) {
    //   $("body").removeClass("sidebar-mini");
    //   $("body").addClass("sidebar-mini");
    // } else {
    //   $("body").addClass("sidebar-mini");
    // }
     if ($(".settingSidebar").hasClass("showSettingPanel")) {
      $(".settingSidebar").removeClass("showSettingPanel");
      $(".settingSidebar").addClass("showSettingPanel");
    } else {
      $(".settingSidebar").addClass("showSettingPanel");
    }
    // $('.settingSidebar').addClass('showSettingPanel');
   
    this.getemail();
  }

  ngAfterViewInit() {
    // if(this.crm_type == 'SalesForce' ){
    //   this.dailyfoodurl = this.external_contact_url;
    // } else if(this.crm_type == 'HubSpot'){

    // }


    if (this.crm_type == 'SalesForce') {
      this.dailyfoodurl = this.external_contact_url;
      $('<iframe is="x-frame-bypass" class="dailyfIfram" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>').attr('src', this.dailyfoodurl).appendTo('#pop_dailyfIframes');

    } else if (this.crm_type == 'HubSpot') {
      this.dailyfoodurl = this.external_contact_url;
      let access_token: any = localStorage.getItem('access_token');

      if (this.paramq == '') {
        this.dailyfoodurl = this.external_contact_url;
      } else {
        this.dailyfoodurl = 'https://api.hubapi.com/contacts/v1/search/query?q=' + this.paramq + '&hapikey=' + this.hapikey;
      }


      let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"curl_response","url":"' + this.dailyfoodurl + '"}}';

      this.serverService.sendServer(api_req).subscribe((response: any) => {
        //  console.log(response.contacts[0]);
        this.dailyfoodurlhub = response.contacts[0]['profile-url'];
        // alert(this.dailyfoodurlhub);
        $('<iframe  class="dailyfIfram" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>').attr('src', this.dailyfoodurlhub).appendTo('#pop_dailyfIframes');
      },
        (error) => {
          console.log(error);
        });
    } else if (this.crm_type == 'ZohoDesk') {
      this.dailyfoodurl = this.external_contact_url;
      let access_token: any = localStorage.getItem('access_token');
      this.z_authId = this.route.snapshot.queryParamMap.get('authkey');
      this.z_orgId = this.route.snapshot.queryParamMap.get('orgId');
      var number = this.route.snapshot.queryParamMap.get('q');


      if (this.paramq == '') {
        this.dailyfoodurl = this.external_contact_url;
      } else {
        this.dailyfoodurl = 'https://desk.zoho.com/api/v1/search?module=contacts&searchStr=' + this.paramq;
      }


      let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"curl_response_zoho_desk","url":"' + this.dailyfoodurl + '","authkey":"' + this.z_authId + '","orgID":"' + this.z_orgId + '","number":"' + number + '"}}';

      this.serverService.sendServer(api_req).subscribe((response: any) => {
        this.dailyfoodurlhub = response.result.data;
        // alert(this.dailyfoodurlhub);
        $('<iframe is="x-frame-bypass" class="dailyfIfram" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>').attr('src', this.dailyfoodurlhub).appendTo('#pop_dailyfIframes');
      },
        (error) => {
          console.log(error);
        });
    }


  }
  tesr() {
    medi();
    this.allowMp = false;
    $("#pop_btns").css("display", "block");
  }

  openRefinement() {
    $("#pop_add_refinement").modal('show');
  }

  initSocket() {
var self=this;
     
      this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");
    


    this.websocket.onopen = function (event) {
      console.log('Dialpad socket connected');
    }

    this.websocket.onmessage = function (event) {
      // console.log(event.data);
      var result_message = JSON.parse(event.data);
      //    console.log(result_message);  
      //    console.log($('#pop_user_number').val());
      this.has_hard_id = localStorage.getItem('hardware_id');
      if (result_message[0].cust_id == this.has_hard_id) {
        // console.log('matched');
      } else {
        // console.log('not matched');
        return false;
      }

      if (result_message[0].data[0].wrapuptype == "wrapupcall_id" && result_message[0].data[0].extno == $('#pop_user_number').val()) {
        $('#pop_wrapup_callID').val(result_message[0].data[0].callid);
        // alert(result_message[0].data[0].callid)
        // alert('asnja')
        // $('#pop_wrapup_callID').click();
      }
      if (result_message[0].data[0].calltype == "Incoming Call" && result_message[0].data[0].ag_no == $('#pop_user_number').val()) {
        $('#pop_queue_ids2').val(result_message[0].data[0].q_no);
      //   self.Queue_number=result_message[0].data[0].q_no;
      //   // alert(result_message[0].data[0].q_no)
      //   iziToast.info({
      //     title:""+result_message[0].data[0].q_no+"",
      //     message: "Queue No is '"+result_message[0].data[0].q_no+"'",
      //     position: 'topRight',                
      //     timeout: 1000,
      // });
      }


    }

    this.websocket.onerror = function (event) {
      console.log('error');
    }
    this.websocket.onclose = function (event) {
      console.log('close');
      $('#pop_reconnect_socket').click();

    }




  }
  getquestionnaire() {
    if (this.questions != null)
      return false;

    let access_token: any = localStorage.getItem('access_token');
    let admin_id: any = localStorage.getItem('admin_id');
    let api_req: any = '{"operation":"questionaire", "moduleType":"questionaire", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"get_user_queue","user_id":"' + admin_id + '"}}';

    // this.serverService.sendServer(api_req).subscribe((response:any) => {
    //   if(response.status==true){
    //     // $('.settingSidebar').addClass('showSettingPanel');
    //     this.questions= response.result.data;
    //   } else {
    //   }
    // }, 
    // (error)=>{
    //     console.log(error);
    // });
  }

  closeQuestion() {
    $('.settingSidebar').removeClass('showSettingPanel');
  }


  toggleClass() {
    // this.getAuxCode();
    if (this.fromEdit) {

    } else {
      this.getquestionnaire();
    }

    $('.settingSidebar').toggleClass('showSettingPanel');
  }


  toggleClassActivities() {
    // this.getAuxCode();
    // if (this.fromEdit) {

    // } else {
    //   this.getquestionnaire();
    // }
    this.showactivities = true;
    this.showrap = false;

    // $('.settingSidebar').toggleClass('showSettingPanel');
  }


  toggleClassWrap(){
    this.showactivities = false;
    this.showrap = true;
  }



  getDepartments() {
    if (this.departments != null)
      return false;

    let access_token: any = localStorage.getItem('access_token');
    let admin_id: any = localStorage.getItem('admin_id');
    let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"get_dept_settings","user_id":"' + admin_id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        this.departments = response.result.data;
      } else {
      }
    },
      (error) => {
        console.log(error);
      });
  }
  getAuxCatogory() {

    if (this.auxcode_Category != null)
      return false;

    let access_token: any = localStorage.getItem('access_token');
    let admin_id: any = localStorage.getItem('admin_id');
    let api_req: any = '{"operation":"getAuxcode", "moduleType":"contact", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"get_aux_code_category","admin_id":"' + admin_id + '","user_id":"' + this.uadmin_id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        this.auxcode_Category = response.result.data;
        setTimeout(() => {
          this.getAuxCode();
        }, 2000);
      } else {
      }
    },
      (error) => {
        console.log(error);
      });
  }

  getAuxCode() {
    // if(this.auxcodes!=null)
    //  return false;
    let cat_id = $('#pop_auxcodes_pop').val();
    // alert(cat_id)
    this.getCatname(cat_id);
    let access_token: any = localStorage.getItem('access_token');

    let api_req: any = '{"operation":"getAuxcode", "moduleType":"contact", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"getuax_by_cat","cat_id":"' + cat_id + '","admin_id":"' + this.admin_id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        this.auxcodes = response.result.data;
      } else {
      }
    },
      (error) => {
        console.log(error);
      });
  }
 
  getCatname(id) {
    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"getAuxcode_data", "moduleType": "contact", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"edit_aux_code_category","cat_id":"' + id + '","admin_id":"' + this.admin_id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        var agent_data = response.result.data;
        this.category_name = agent_data.category_name;

      } else {
        iziToast.warning({
          message: "Wrap Up codes not retrive. Please try again",
          position: 'topRight'
        });

      }
    },
      (error) => {
        console.log(error);
      });
  }
  editConatcts(){
    // alert(this.paramCall);
    //  alert(this.paramq);
    // this.param1.slice(3);
     
    console.log(this.param1.slice(this.param1.length - 8)); //Outputs: Tabs1


var caller_num=this.param1;
if(this.param1.length >7)
caller_num=this.param1.slice(this.param1.length - 8);

//console.log(caller_num);

    let conct_req:any = new Object();
    let api_req:any = new Object();
    conct_req.user_id=localStorage.getItem('userId');
    conct_req.action="edit_contact";
    conct_req.contact_phone = caller_num;
    // conct_req.contact_phone = '1234567';
    if(this.call_record_id == null && this.fromEdit == null && this.paramq!=null){
      conct_req.contact_phone = this.paramq;
      conct_req.screenPoupus = 'true';
    }
    
    // else if(this.paramCall == null && this.paramq != null){
    //   alert('sdsdsd')
    //   conct_req.contact_phone=this.paramq;
    // }
    // else
    // conct_req.contact_phone=this.param1;
    // if(this.param1 == null && this.fromEdit == null){
    //   conct_req.contact_phone = this.paramCall;
    //   conct_req.screenPoupus = 'true';
    // }
    // this.paramq
  
    // alert(conct_req.contact_phone);
    // alert(this.paramq);
    api_req.operation="contact";
    api_req.moduleType="contact";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = conct_req;
  
      this.serverService.sendServer(api_req).subscribe((response:any) => {      

          if(response.result.data==false){

            this.showcreateTicket = false;
              
            this.editContact.controls['phone'].setValue(this.get_dailer_value);
        
            // if(this.call_record_id !='' && this.show_caller_id == '0')
              if(this.show_caller_id == '0')
              {
              this.hide_cal1er = 'xxxxxxxxx';
              if(this.call_record_id == null && this.fromEdit == null && this.paramq!=null)
                  this.click_to_call_number = this.paramq;
              else
              this.click_to_call_number = this.param1;
  
              //  alert('hided'+this.click_to_call_number)
  
            } 
            else if(this.call_record_id == null && this.fromEdit == null&& this.paramq != null){
            this.hide_cal1er = this.paramq;
            this.click_to_call_number = this.paramq;
            // alert(this.click_to_call_number)
            }
            else {
              this.hide_cal1er = this.param1;
              this.click_to_call_number = this.param1;
            }
            this.editContact.setValue({
              'contact_owner' : '',
              'full_name' : '',
              'first_name' : '',
              'last_name' : '',
              'account_name' : '',
              'lead_source' : '',
              'title' : '',
              'email' : '',
              'activity' : '',
              'phone' : this.hide_cal1er,
              'home_phone' : '',
              'office_phone' : '',
              'fax' : '',
              'mobile' :'',
              'dob' : '',
              'assistant' : '',
              'assitant_phone' : '',
              'reports_to' : '',
              'email_opt_out' : '',
              'skype' : '',
              'secondary_email' : '',
              'twitter' : '',
              'reporting_to' : '',
              'mailing_street' : '',
              'other_street' : '',
              'mailing_city' : '',
              'other_city' : '',
              'mailing_province' : '',
              'other_province' : '',
              'mailing_postal_code' : '',
              'other_postal_code' : '',
              'mailing_country' : '',
              'other_country' : '',
              'notes' :'',
              'created_by' : '',
              'modified_by' : '',
              'whatsapp_number' :'',
              'line' :'',
              'facebook_url' :'',
              'wechat' :'',
              'viber' :'',
              'telegram' :'',
              'instagram_url' :'',
              'linkedin' :'',
              'country_code' : '',
            });
  
  
  
           
          } else {
        
  
            var home_phone = '';
            var office_phone = '';
            var mobile='';
            let getdata :any;
            if(response.result.data.length == 1)
            getdata = response.result.data[0];
            if(response.result.data.length > 1){
            getdata = response.result.data;
            // this.showmultiple = true;
            this.multipleContacts = response.result.data;
            // console.log(this.multipleContacts);
            }

            this.contact_id = getdata.contact_id;
            
            // if(this.call_record_id !='' &&this.show_caller_id == '0')
            if(this.show_caller_id == '0')
            {
              this.hide_cal1er = 'xxxxxxxxx';
              var home_phone = 'xxxxxxxxx';
              var office_phone = 'xxxxxxxxx';
              var mobile='xxxxxxxxx';
              this.click_to_call_mobile_number = getdata.mobile
              this.click_to_call_number = getdata.phone;
              this.click_to_call_office_phone = getdata.office_phone;
              this.click_to_call_home_phone = getdata.home_phone;
            } else {
              this.hide_cal1er = getdata.phone;
              this.click_to_call_number = getdata.phone;
              this.click_to_call_mobile_number = getdata.mobile
              this.click_to_call_office_phone = getdata.office_phone;
              this.click_to_call_home_phone = getdata.home_phone;
              home_phone = getdata.home_phone;
              office_phone = getdata.office_phone
              mobile= getdata.mobile;
            }
          
            // this.editContact.setValue({
            //   'contact_owner' : response.result.data.contact_owner,
            //   'first_name' : response.result.data.first_name,
            //   'last_name' : response.result.data.last_name,
            //   'account_name' : response.result.data.account_name,
            //   'lead_source' : response.result.data.lead_source,
            //   'title' : response.result.data.title,
            //   'email' : response.result.data.email,
            //   'activity' : response.result.data.activity,
            //   'phone' : this.hide_cal1er,
            //   'home_phone' : home_phone,
            //   'office_phone' : office_phone,
            //   'fax' : response.result.data.fax,
            //   'mobile' : mobile,
            //   'dob' : response.result.data.dob,
            //   'assistant' : response.result.data.assistant,
            //   'assitant_phone' : response.result.data.assitant_phone,
            //   'reports_to' : response.result.data.reports_to,
            //   'email_opt_out' : response.result.data.email_opt_out,
            //   'skype' : response.result.data.skype,
            //   'secondary_email' : response.result.data.secondary_email,
            //   'twitter' : response.result.data.twitter,
            //   'reporting_to' : response.result.data.reporting_to,
            //   'mailing_street' : response.result.data.mailing_street,
            //   'other_street' : response.result.data.other_street,
            //   'mailing_city' : response.result.data.mailing_city,
            //   'other_city' : response.result.data.other_city,
            //   'mailing_province' : response.result.data.mailing_province,
            //   'other_province' : response.result.data.other_province,
            //   'mailing_postal_code' : response.result.data.mailing_postal_code,
            //   'other_postal_code' : response.result.data.other_postal_code,
            //   'mailing_country' : response.result.data.mailing_country,
            //   'other_country' : response.result.data.other_country,
            //   'notes' :'',
            //   'created_by' : response.result.data.creater,
            //   'modified_by' : response.result.data.modifier,
            //   'whatsapp_number' :response.result.data.whatsapp_number,
            //   'line' :response.result.data.line,
            //   'facebook_url' :response.result.data.facebook_url,
            //   'wechat' :response.result.data.wechat,
            //   'viber' :response.result.data.viber,
            //   'telegram' :response.result.data.telegram,
            //   'instagram_url' :response.result.data.instagram_url,
            //   'linkedin' :response.result.data.linkedin,
            //   'country_code' : response.result.data.country_code
            // });
            // ================== NEW CODE ============
            this.hide_cal1er = this.param1;
            this.editContact.setValue({
              'contact_owner' : getdata.contact_owner,
              'contact_identifier' : getdata.contact_unique_identifier,
              'full_name' : getdata.full_name,
              'first_name' : getdata.first_name,
              'last_name' : getdata.last_name,
              'account_name' : getdata.account_name,
              'lead_source' : getdata.lead_source,
              'title' : getdata.title,
              'email' : getdata.email,
              'activity' : getdata.activity,
              'phone' : getdata.phone,
              'home_phone' : home_phone,
              'office_phone' : office_phone,
              'fax' : getdata.fax,
              'mobile' : mobile,
              'dob' : getdata.dob,
              'assistant' : getdata.assistant,
              'assitant_phone' : getdata.assitant_phone,
              // 'email_opt_out' : getdata.email_opt_out,
              'secondary_email' : getdata.secondary_email,
              // 'reporting_to' : getdata.reporting_to,
              'mailing_street' : getdata.mailing_street,
              // 'other_street' : getdata.other_street,
              'mailing_city' : getdata.mailing_city,
              // 'other_city' : getdata.other_city,
              'mailing_province' : getdata.mailing_province,
              // 'other_province' : getdata.other_province,
              'mailing_postal_code' : getdata.mailing_postal_code,
              // 'other_postal_code' : getdata.other_postal_code,
              'mailing_country' : getdata.mailing_country,
              // 'other_country' : getdata.other_country,
              'notes' :'',
              // 'created_by' : getdata.creater,
              // 'modified_by' : getdata.modifier,
              // 'whatsapp_number' :getdata.whatsapp_number,
              // 'line' :getdata.line,
              // 'facebook_url' :getdata.facebook_url,
              // 'wechat' :getdata.wechat,
              // 'viber' :getdata.viber,
              // 'telegram' :getdata.telegram,
              // 'instagram_url' :getdata.instagram_url,
              // 'linkedin' :getdata.linkedin,
              'department' : getdata.department,
              'country_code' : getdata.country_code,
              'ext_no':getdata.ext_no,
              'job_roles' : getdata.job_role,
              'acc_org_ids' : getdata.account_org_id,
              'acc_st_names' : getdata.account_st_name,
              'acc_st_ids' : getdata.account_st_id,
            });


            if(!getdata.phone && !getdata.mobile)
            this.editContact.controls['phone'].setValue(this.get_dailer_value);

              //Get activity based on unique ID
              if(getdata.contact_unique_identifier && localStorage.getItem('has_internal_call_ticket') == '1'){
              this.getNotes(getdata.contact_unique_identifier);
              this.getuniqueId = getdata.contact_unique_identifier;
              this.showcreateTicket = true;
              }else{
                this.showcreateTicket = false;
              }
            //Only 
//             if(getdata.department){
//               // alert('test')
//               this.getDepartments();
// setTimeout(() => {
//   $('#pop_departments').val(getdata.department).prop('selected', true);  
// }, 3000);
//             }
            $('#pop_res_departments').val(getdata.res_dept).prop('selected', true);
            this.created_time = getdata.created_at;
            this.modified_time = getdata.updated_at;
  
          }
          
      }, 
      (error)=>{
          console.log(error);
      });
  }
  clictToCall(to){
    // if(to == 'phone'){  this.to_num = $('#pop_phone').val(); } else {  this.to_num = $('#pop_mobile').val(); }
   
    if(to == 'phone'){  this.to_num = this.click_to_call_number; } else {  this.to_num = this.click_to_call_mobile_number; }
    
     if(this.to_num == ''){
         iziToast.warning({
           message: "No Number To Call",
           position: 'topRight'
         });
     } else {
   
   
       let access_token: any=localStorage.getItem('access_token');
     
       var extention = localStorage.getItem('ext_int_status');
       //alert(extention);
       if(extention == '2'){
        let api_reqs:any = '{"type": "makecall", "number": "'+this.to_num+'","show_caller_id":"'+this.show_caller_id+'"}';
        this.serverService.show.next(api_reqs);
       } else {
        let api_reqs:any = '{"type": "makecallauto", "number": "'+this.to_num+'"}';
        this.serverService.show.next(api_reqs);
       }
   
     }
     console.log(this.to_num);
   }
  
  updateContact(contact_id){

  // let assigned_department_id: any= $('#pop_departments').val();
  // console.log(assigned_department_id);
  
  let res_department_id: any= $('#pop_res_departments').val();
  // console.log(assigned_department_id);
  
  
  let auxcodes: any= $('#pop_auxcodes').val();
  if(auxcodes == '0') {
    auxcodes = $('#pop_auxcodes_pop').val();
  } 
  console.log(auxcodes);
  
  let api_req:any = new Object();
  let add_contact_req:any = new Object();
  // alert('sdsds'+this.click_to_call_number);
  
  if(contact_id == '' || contact_id == undefined ||contact_id == null || contact_id == 'null'){
  
    api_req.operation="contact";
    api_req.moduleType="contact";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    let element_data:any = new Object();
    if(this.admin_id == this.uadmin_id){
      api_req.element_data = this.editContact.value;

      api_req.element_data.job_role = this.editContact.value.job_roles;
      api_req.element_data.acc_org_id = this.editContact.value.acc_org_ids;
      api_req.element_data.acc_st_name = this.editContact.value.acc_st_names;
      api_req.element_data.acc_st_id= this.editContact.value.acc_st_ids;
      api_req.element_data.contact_unique_identifier = this.editContact.value.contact_identifier;


      if(this.editContact.value.home_phone == "xxxxxxxxx")
      api_req.element_data.home_phone = this.click_to_call_home_phone;
   
     if(this.editContact.value.mobile == "xxxxxxxxx")
      api_req.element_data.mobile =   this.click_to_call_mobile_number;
   
     if(this.editContact.value.office_phone == "xxxxxxxxx")
      api_req.element_data.office_phone = this.click_to_call_office_phone;
   
     if(this.editContact.value.phone == "xxxxxxxxx")
      api_req.element_data.phone = this.click_to_call_number;
    } else {
    // alert( this.click_to_call_mobile_number)

      api_req.element_data = this.editContact.value;
      // api_req.element_data.contact_owner = this.editContact.value.contact_owner;
      // api_req.element_data.first_name = this.editContact.value.first_name;
      // api_req.element_data.last_name = this.editContact.value.last_name;
      // api_req.element_data.account_name = this.editContact.value.account_name;
      // api_req.element_data.lead_source = this.editContact.value.lead_source;
      // api_req.element_data.title = this.editContact.value.title;
      // api_req.element_data.email = this.editContact.value.email;
      // api_req.element_data.activity = this.editContact.value.activity;
      // api_req.element_data.phone = this.editContact.value.phone;
      // api_req.element_data.home_phone = this.editContact.value.home_phone;
      // api_req.element_data.office_phone = this.editContact.value.office_phone;
      // api_req.element_data.fax = this.editContact.value.fax;
      // api_req.element_data.mobile = this.editContact.value.mobile;
      // api_req.element_data.dob = this.editContact.value.dob;
      // api_req.element_data.assistant = this.editContact.value.assistant;
      // api_req.element_data.assitant_phone = this.editContact.value.assitant_phone;
      // api_req.element_data.mailing_street = this.editContact.value.mailing_street;
      // api_req.element_data.mailing_city = this.editContact.value.mailing_city;
      // api_req.element_data.mailing_province = this.editContact.value.mailing_province;
      // api_req.element_data.mailing_postal_code = this.editContact.value.mailing_postal_code;
      // api_req.element_data.mailing_country = this.editContact.value.mailing_country;
      // api_req.element_data.country_code = this.editContact.value.country_code;
      api_req.element_data.job_role = this.editContact.value.job_roles;
      api_req.element_data.acc_org_id = this.editContact.value.acc_org_ids;
      api_req.element_data.acc_st_name = this.editContact.value.acc_st_names;
      api_req.element_data.acc_st_id= this.editContact.value.acc_st_ids;
      api_req.element_data.contact_unique_identifier = this.editContact.value.contact_identifier;
      // api_req.element_data.home_phone = this.click_to_call_home_phone;
      // api_req.element_data.mobile = this.click_to_call_mobile_number;
      // api_req.element_data.office_phone = this.click_to_call_office_phone;
      // api_req.element_data.phone = this.click_to_call_number;
    }
    api_req.element_data.action='add_contact';
    // api_req.element_data.department= assigned_department_id;
    api_req.element_data.res_dept=res_department_id;
    api_req.element_data.auxcode_name=auxcodes;
    api_req.element_data.callid=this.call_record_id;
    api_req.element_data.created_by = localStorage.getItem('userId');
  } else {
    api_req.operation="contact";
    api_req.moduleType="contact";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    
  
  if(this.admin_id == this.uadmin_id){
    api_req.element_data = this.editContact.value;
    if(this.editContact.value.home_phone == "xxxxxxxxx")
     api_req.element_data.home_phone = this.click_to_call_home_phone;
  
    if(this.editContact.value.mobile == "xxxxxxxxx")
     api_req.element_data.mobile =   this.click_to_call_mobile_number;
  
    if(this.editContact.value.office_phone == "xxxxxxxxx")
     api_req.element_data.office_phone = this.click_to_call_office_phone;
  
    if(this.editContact.value.phone == "xxxxxxxxx")
     api_req.element_data.phone = this.click_to_call_number;
  } else {
 
    api_req.element_data = this.editContact.value;
    api_req.element_data.home_phone = this.click_to_call_home_phone;
    api_req.element_data.mobile = this.click_to_call_mobile_number;
    api_req.element_data.office_phone = this.click_to_call_office_phone;
    api_req.element_data.phone = this.click_to_call_number;
  }
  
   
    api_req.element_data.action='update_contact';
    api_req.element_data.modified_by = localStorage.getItem('userId');
    api_req.element_data.contact_id=contact_id;
    // api_req.element_data.department= assigned_department_id;
    api_req.element_data.auxcode_name=auxcodes;
    api_req.element_data.callid=this.call_record_id;
    api_req.element_data.res_dept=res_department_id;
  }
  // alert( api_req.element_data.phone);
//   console.log(api_req);
//   alert(this.editContact.value.mobile)
//  return false;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.result.data == 1) {
          $('#pop_add_pbxform').modal('hide');
                iziToast.success({
                    message: "Contact update successfully",
                    position: 'topRight'
                });
                this.editContact.value.notes = "";
                // this.router.navigate(['/contacts']);
            }
        else{
            
                iziToast.warning({
                    message: "Contact not updated. Please try again",
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
  
  addNotes(id){
    this.router.navigate(['/activity'], { queryParams: { contact_id: id } });
  }

  clictToCall2() {
    // if(to == 'phone'){  this.to_num = $('#pop_phone').val(); } else {  this.to_num = $('#pop_mobile').val(); }

    // if(to == 'phone'){  this.to_num = this.click_to_call_number; } else {  this.to_num = this.click_to_call_mobile_number; }
    let to = $('#pop_mobile_phone').val();
    if (to == '') {
      iziToast.warning({
        message: "No Number To Call",
        position: 'topRight'
      });
    } else {


      let access_token: any = localStorage.getItem('access_token');

      var extention = localStorage.getItem('ext_int_status');
      //alert(extention);
      if (extention == '2') {
        let api_reqs: any = '{"type": "makecall", "number": "' + to + '","show_caller_id":"' + this.show_caller_id + '"}';
        this.serverService.show.next(api_reqs);
      } else {
        let api_reqs: any = '{"type": "makecallauto", "number": "' + to + '"}';
        this.serverService.show.next(api_reqs);
      }

    }
    console.log(to);
  }

  addWrapupcode() {
    let wrapcall_id = $('#pop_wrapup_callID').val();
    let cat_id = $('#pop_auxcodes_pop').val();
    let wraupcode = $('#pop_auxcodes_subcat').val();
    let opportunity = $('#opportunity').val();
    let notes = $('#pop_notes').val();
    let access_token: any = localStorage.getItem('access_token');
    let from_no;
    let to_no;
    let queue_ids = $('#pop_queue_ids3').val();
//     if(!wraupcode){
// iziToast.warning({
//   message:"Please choose wrapupCode",
//   position:"topRight"
// })
// return false
//     }
     var wrap = this.category_name + ' -> ' + wraupcode;
// alert(this.paramCall)
    if (this.paramCall == 'incoming') {
      from_no = this.param1;
      to_no = this.extension;
    }
    else {
      from_no = this.extension;
      to_no = this.param1;
    }
// alert(to_no)

    //  notes=notes.toString().replace('"',' ');
    notes = notes.toString().replaceAll(/"|'/g, '');

    if(queue_ids==''||queue_ids==null){
      console.log('No Queuename found');
     }
    // let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", 
    // "access_token":"'+access_token+'", "element_data":{"action":"add_auxcode_wall","from_no":
    // "'+from_no+'","to_no":"'+to_no+'","type":"'+this.paramCall+'","aux_code":"'+wraupcode+'",
    // "user_id":"'+this.uadmin_id+'","cat_id":"'+cat_id+'","call_note":"'+notes+'"}}';
      var unique_identity='';
    if(this.editContact.value.contact_identifier)
      unique_identity=this.editContact.value.contact_identifier;

    let api_reqs: any = '{"type": "updatewrapupCode","call_type": "'+this.paramCall+'","aux_code": "'+wraupcode+'","cat_id": "'+cat_id+'","call_note": "'+notes+'","from_no": "'+from_no+'","to_no": "'+to_no+'","wrapCode": "'+wrap+'","opportunity": "'+opportunity+'","unique_id": "'+unique_identity+'"}';

    this.serverService.minimize.next(api_reqs);
return false;  
    let api_req: any = new Object;
    let conct_req: any = new Object();

    api_req.operation = "contact";
    api_req.moduleType = "contact";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');

    conct_req.from_no = from_no;
    conct_req.to_no = to_no;
    conct_req.type = this.paramCall;
    conct_req.aux_code = wraupcode;
    conct_req.cat_id = cat_id;
    conct_req.call_note = notes;
    conct_req.call_queue_num = queue_ids;
    conct_req.user_id = this.uadmin_id;
    api_req.element_data = conct_req;


    api_req.element_data.admin_id = this.admin_id;
    api_req.element_data.action = "add_auxcode_wall";
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == false) {

      }
    },
      (error) => {
        console.log(error);
      });
    // {"operation":"contact","moduleType":"contact","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJvbW5pLmVudGVydGFpbm1lbnQuY29tLmF1IiwiYXVkIjoib21uaS5lbnRlcnRhaW5tZW50LmNvbS5hdSIsImlhdCI6MTYyMTA1ODcwOSwibmJmIjoxNjIxMDU4NzA5LCJleHAiOjE2MjEwNzY3MDksImFjY2Vzc19kYXRhIjp7InRva2VuX2FjY2Vzc0lkIjoiOTU4IiwidG9rZW5fYWNjZXNzTmFtZSI6ImFubmVzc2EiLCJ0b2tlbl9hY2Nlc3NUeXBlIjoiMiJ9fQ.vBc-2g4FoZC_xNb4dBUmQYKblkPL6l6wbI7WEes-xRI","element_data":{"action":"add_auxcode_wall","from_no":"1000","to_no":"1001","type":"outgoing","aux_code":"No Answer","user_id":"958"}}
    var socket_message = '[{"cust_id":"' + this.has_hard_id + '","data":[{"Name":"wrapupcode","callid":"' + wrapcall_id + '","wcode":"' + wrap + '","wcodenote":"' + notes + '","extno":"' + this.extension + '"}]}]';
    this.websocket.send(socket_message);
    this.closeQuestion();
    iziToast.success({
      message: "Wrapup Code Added successfully",
      position: "topRight"
    });
    // $('#pop_wrapup_callID').val('');
    $('#pop_auxcodes_pop').val('');
    $('#pop_auxcodes_subcat').val('');
    $('#pop_notes').val('');
  }
  gettimedetails(act_id) {

    let get_single_timeline: any = new Object();
    get_single_timeline.accessToken = this.MDy_bearer_token;
    get_single_timeline.activity_id = act_id;
    get_single_timeline.apiFor = "get_single_timeline";
    this.serverService.MDy_Contacts_API(get_single_timeline).subscribe((response: any) => {

      // if(response.status==true){
      if (response.data != "") {
        this.single_timeline = response.data[0];
        let Tdata = response.data[0];
        console.log(this.single_timeline);
        this.Tsubject = Tdata.subject;
        this.Tdescription = Tdata.description;
        this.Tphone = Tdata.phonenumber;
        this.Trecord = Tdata.new_recordingurl;
        this.Twrapcode = Tdata.new_wrapupcode;
        this.Twrapnote = Tdata.new_wrapupnote;
        //  alert(this.Trecord);
        //  this.phone_activity=this.phone_activity.reverse();
        //  console.log(this.phone_activity)
        $('#pop_showpop_timeline').modal('show');
        this.recordNotFound = false;

      } else {
        this.Tsubject = '';
        this.Tdescription = '';
        this.Tphone = '';
        this.Trecord = '';
        this.Twrapcode = '';
        this.Twrapnote = '';
        iziToast.warning({
          message: 'Sorry, cannot fetch timeline details',
          position: 'topRight'
        })
        this.recordNotFound = true;
      }


    },
      (error) => {
        console.log(error);
      });
  }


  closeModelPopup(link) {

    const modalRef = this.modalService.dismissAll(EditContactsComponent);
    let api_reqs: any = '{"type": "minimize"}';
    this.serverService.minimize.next(api_reqs);
  }

  acceptIncomeCall() {
    localStorage.setItem('ans_click','1');
    let api_reqtest: any = '{"type": "showpopupdialer"}';
    this.serverService.show.next(api_reqtest);
    let api_reqs: any = '{"type": "attendincomingCall"}';
    this.serverService.minimize.next(api_reqs);
    this.show_mini_butons = true;
    this.show_ans = false;
    this.show_del = true;


    if(this.multipleContacts.length > 1){
      var options = {};
      $.map(this.multipleContacts, function (o) {
        options[o.contact_id] = o.contact_owner;
      });
      const trans =  Swal.fire({
        title: 'Multiple Contact is Available',
        input: 'select',
        inputOptions: options,
        allowOutsideClick: false,
        inputPlaceholder: 'Please Select a Contact Owner',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== '') {
              resolve('');
              this.selectSingleContact(value);
            } else {
              resolve('You need to select a Contact Owner :)')
            }
          })
        }
      })
  
    }
  
  }

  declineIncomeCall() {
    sessionStorage.removeItem('ans_click');
    let api_reqs: any = '{"type": "declineincomingCall"}';
    this.serverService.minimize.next(api_reqs);
    this.show_mini_butons = true;
    this.show_ans = false;
    this.show_del = false;
  }

  closeModal(){
    const modalRef = this.modalService.dismissAll(EditContactsComponent);

  }

  getNotes(param1){
    let conct_req:any = new Object();
    let api_req:any = new Object();
    conct_req.user_id=localStorage.getItem('userId');
    conct_req.action="get_contact_notes";
    // conct_req.contact_id=param1;
    conct_req.unique_id=param1;
    api_req.operation="contact";
    api_req.moduleType="contact";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = conct_req;
  
      this.serverService.sendServer(api_req).subscribe((response:any) => {

        if(response.result.status==true){
          this.oldNotes=response.result.data;
        }
    }, 
    (error)=>{
        console.log(error);
    });
  }


  selectSingleContact(events){

    // let filtervalue = events.target.value;
    let filtervalue = events;

    let result = this.multipleContacts.filter(word => word.contact_id == filtervalue);
    
    let filterresult = result[0];

    this.editContact.setValue({
      'contact_owner' : filterresult.contact_owner,
      'contact_identifier' : filterresult.contact_unique_identifier,
      'full_name' : filterresult.full_name,
      'first_name' : filterresult.first_name,
      'last_name' : filterresult.last_name,
      'account_name' : filterresult.account_name,
      'lead_source' : filterresult.lead_source,
      'title' : filterresult.title,
      'email' : filterresult.email,
      'activity' : filterresult.activity,
      'phone' : filterresult.phone,
      'home_phone' : filterresult.home_phone,
      'office_phone' : filterresult.office_phone,
      'fax' : filterresult.fax,
      'mobile' : filterresult.mobile,
      'dob' : filterresult.dob,
      'assistant' : filterresult.assistant,
      'assitant_phone' : filterresult.assitant_phone,
      // 'email_opt_out' : filterresult.email_opt_out,
      'secondary_email' : filterresult.secondary_email,
      // 'reporting_to' : filterresult.reporting_to,
      'mailing_street' : filterresult.mailing_street,
      // 'other_street' : filterresult.other_street,
      'mailing_city' : filterresult.mailing_city,
      // 'other_city' : filterresult.other_city,
      'mailing_province' : filterresult.mailing_province,
      // 'other_province' : filterresult.other_province,
      'mailing_postal_code' : filterresult.mailing_postal_code,
      // 'other_postal_code' : filterresult.other_postal_code,
      'mailing_country' : filterresult.mailing_country,
      // 'other_country' : filterresult.other_country,
      'notes' :'',
      // 'created_by' : filterresult.creater,
      // 'modified_by' : filterresult.modifier,
      // 'whatsapp_number' :filterresult.whatsapp_number,
      // 'line' :filterresult.line,
      // 'facebook_url' :filterresult.facebook_url,
      // 'wechat' :filterresult.wechat,
      // 'viber' :filterresult.viber,
      // 'telegram' :filterresult.telegram,
      // 'instagram_url' :filterresult.instagram_url,
      // 'linkedin' :filterresult.linkedin,
      'department' : filterresult.department,
      'country_code' : filterresult.country_code,
      'ext_no':filterresult.ext_no,
      'job_roles' : filterresult.job_role,
      'acc_org_ids' : filterresult.account_org_id,
      'acc_st_names' : filterresult.account_st_name,
      'acc_st_ids' : filterresult.account_st_id,
    });


  }

  createcallticket(){

    // { "operation":"ticket", "moduleType": "ticket", "api_type": "web", "element_data": { "action":"add_internal_call_tickets", "from_user":"SS","from_user_id":"3", "subject":"TEST_call", "message":"Hello3", "contact_id":"4","admin_id":"2","status_id":"1","priority_id":"1" } }

    if(this.getuniqueId != "" && this.getuniqueId != undefined && this.getuniqueId != 'undefined' && this.getuniqueId != null){

    let msg = $("#pop_notes").val();
    let subjects =  this.editContact.value.first_name +' ' +this.editContact.value.last_name + '' + 'Internal Ticket';

    let created_req:any = new Object();
    let api_req:any = new Object();
    created_req.from_user=localStorage.getItem('user_name');
    created_req.from_user_id=localStorage.getItem('userId');
    created_req.action="add_internal_call_tickets";
    created_req.subject=subjects;
    created_req.message=msg; 
    created_req.contact_id=this.getuniqueId;
    created_req.admin_id=localStorage.getItem('admin_id');
    created_req.status_id= '3';
    created_req.priority_id= '2';

    api_req.operation="ticket";
    api_req.moduleType="ticket";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = created_req;
  
      this.serverService.sendServer(api_req).subscribe((response:any) => {

                if(response.result.data== 1){
                  this.showcreateTicket = false;
                  iziToast.success({
                    message: "Ticket Create successfully",
                    position: 'topRight'
                  });
                }else if(response.result.data == 2){
                  iziToast.error({
                    message: "Ticket Creation Failed",
                    position: 'topRight'
                  });
                }else if(response.result.data == 3){
                  iziToast.success({
                    message: "Ticket Create successfully and Merged",
                    position: 'topRight'
                  });
                }
    }, 
    (error)=>{
        console.log(error);
    });

  }

  }
  getemail(){
    if(localStorage.getItem('call_Settings')=='1')
    {
      // this.test= this.editContact.value.email
      console.log('email_value:',this.test)
      if(this.test!=''){
    let data:any = new Object();
    let datas:any = new Object();
    data.operation = "contact";
    data.moduleType = "contact";
    data.api_type = "web";
    data.access_token = localStorage.getItem('access_token');
    datas.action = "ticket";
    // datas.admin_id = localStorage.getItem('admin_id');
    datas.mail=this.test;
    data.element_data = datas;
    // {"operation":"curreny", "moduleType":"curreny", "api_type": "web", "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NjIzNTY0MTcsIm5iZiI6MTY2MjM1NjQxNywiZXhwIjoxNjYyMzc0NDE3LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoiRGluZXNodGVzdGluZyIsInRva2VuX2FjY2Vzc1R5cGUiOiIyIn19.cb66sGuFriNnKDDGtIKDudIdwpQUZ5HUOtdRvbkFIKk", 
    // "element_data":{"action":"curreny_list"}}
    console.log('testing:',data);
    this.serverService.sendServer(data).subscribe((response:any)=>{
      console.log('testing_data:',response);
      if(response.status == true){
        this.email = response.result.data;
        this.test=response;
      }

    });

      }else{
        iziToast.error({
          message: "Sorry, Some Error Occured",
          position: 'topRight'
      });
      }
    }

  }


}
