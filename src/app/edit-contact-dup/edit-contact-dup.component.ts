import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
declare var iziToast: any;
declare var medi: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-contact-dup',
  templateUrl: './edit-contact-dup.component.html',
  styleUrls: ['./edit-contact-dup.component.css']
})
export class EditContactDupComponent implements OnInit {

  incomecallNum;
  getaccountid;
  acc_name;
  param1: string;
  param3;
  created_time;
  modified_time;
  contact_id;
  contact_ids;
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
  show_mini_butons = false;
  show_ans_del = false;
  show_ans = false;
  show_del = false;
  show_contact_value = false;
  showphoneloader = false;
  showdatalist = false;
  editContact: FormGroup;
  uniqueID;//Contact unique Identifier
  cont_unique_id;
  cal_Sett;
  test: any;
  email: any;
  constructor(private serverService: ServerService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, public modalService: NgbModal) {


    this.addRefined = new FormGroup({
      'add_group_name': new FormControl(null, Validators.required),
    });

    this.param1 = this.route.snapshot.queryParamMap.get('phone');
    this.fromEdit = this.route.snapshot.queryParamMap.get('from_edit');
    this.cont_unique_id = atob(this.route.snapshot.queryParamMap.get('cont_id'));

    this.param3 = this.route.snapshot.queryParamMap.get('ids');
    this.paramCall = this.route.snapshot.queryParamMap.get('calltype');

    var decodedString = atob(this.param1);
    this.param1 = decodedString;
    this.get_dailer_value = localStorage.getItem("income_calls_num");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.serverService.editContact.subscribe((val: any) => {

      var dpContent = JSON.parse(val);
      // console.log(dpContent);
      if (dpContent.type == "show_popup") {
        this.param1 = dpContent.caller_no;
        this.paramCall = dpContent.call_type;
        // this.queue_values = dpContent.queue_num;
        if (dpContent.show_buttons == "true") {
          this.show_mini_butons = true;
          this.show_ans = true;
          this.show_del = true;
        } else {
          this.show_mini_butons = false;
          this.show_ans = false;
          this.show_del = false;
        }
        console.log(this.param1);
        //  this.editConatcts();        
      }
      if (dpContent.type == "call_ended") {
        this.show_ans = false;
        this.show_del = false;
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
      'first_name' :new FormControl(null,Validators.required),
      'last_name' :new FormControl(null, Validators.required),
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
      'mailing_country' :new FormControl(null),
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
     this.uadmin_id = localStorage.getItem('userId');
     this.show_caller_id = localStorage.getItem('show_caller_id');
     this.user_type = localStorage.getItem('user_type');
    this.extension = localStorage.getItem('ext_num');

     this.getDepartments();
    //  this.getAuxCode();
     this.editConatcts();
   
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

    if ($("body").hasClass("sidebar-mini")) {
      $("body").removeClass("sidebar-mini");
      $("body").addClass("sidebar-mini");
    } else {
      $("body").addClass("sidebar-mini");
    }
    setTimeout(() => {
      this.getemail();
    }, 500);
    

  }

  ngAfterViewInit() {
    // if(this.crm_type == 'SalesForce' ){
    //   this.dailyfoodurl = this.external_contact_url;
    // } else if(this.crm_type == 'HubSpot'){
     
    // }


    if(this.crm_type == 'SalesForce' ){
      this.dailyfoodurl = this.external_contact_url;
      $('<iframe is="x-frame-bypass" class="dailyfIfram" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>').attr('src', this.dailyfoodurl).appendTo('#dailyfIframes'); 

    } else if(this.crm_type == 'HubSpot'){
      this.dailyfoodurl = this.external_contact_url;
      let access_token: any=localStorage.getItem('access_token');

      if(this.paramq ==''){
        this.dailyfoodurl = this.external_contact_url;
      } else {
        this.dailyfoodurl = 'https://api.hubapi.com/contacts/v1/search/query?q='+this.paramq+'&hapikey='+this.hapikey;
      }
      

      let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"curl_response","url":"'+this.dailyfoodurl+'"}}';

      this.serverService.sendServer(api_req).subscribe((response:any) => {
      //  console.log(response.contacts[0]);
        this.dailyfoodurlhub = response.contacts[0]['profile-url'];
       // alert(this.dailyfoodurlhub);
        $('<iframe  class="dailyfIfram" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>').attr('src', this.dailyfoodurlhub).appendTo('#dailyfIframes'); 
      }, 
      (error)=>{
          console.log(error);
      });  
    }  else if(this.crm_type == 'ZohoDesk'){
      this.dailyfoodurl = this.external_contact_url;
      let access_token: any=localStorage.getItem('access_token');
      this.z_authId  = this.route.snapshot.queryParamMap.get('authkey');
      this.z_orgId  = this.route.snapshot.queryParamMap.get('orgId');
      var number  = this.route.snapshot.queryParamMap.get('q');


      if(this.paramq ==''){
        this.dailyfoodurl = this.external_contact_url;
      } else {
        this.dailyfoodurl = 'https://desk.zoho.com/api/v1/search?module=contacts&searchStr='+this.paramq;
      }
      

      let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"curl_response_zoho_desk","url":"'+this.dailyfoodurl+'","authkey":"'+this.z_authId+'","orgID":"'+this.z_orgId+'","number":"'+number+'"}}';

      this.serverService.sendServer(api_req).subscribe((response:any) => {
        this.dailyfoodurlhub = response.result.data;
     // alert(this.dailyfoodurlhub);
        $('<iframe is="x-frame-bypass" class="dailyfIfram" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>').attr('src', this.dailyfoodurlhub).appendTo('#dailyfIframes'); 
      }, 
      (error)=>{
          console.log(error);
      });  
    }


  }
 

  openRefinement() {
    $("#dup_add_refinement").modal('show');
  }

  initSocket() {

   
      this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");
    


    this.websocket.onopen = function (event) {
      console.log('Dialpad socket connected');
    }

    this.websocket.onmessage = function (event) {
      // console.log(event.data);
      var result_message = JSON.parse(event.data);
      //    console.log(result_message);  
      //    console.log($('#dup_user_number').val());
      this.has_hard_id = localStorage.getItem('hardware_id');
      if (result_message[0].cust_id == this.has_hard_id) {
        // console.log('matched');
      } else {
        // console.log('not matched');
        return false;
      }

      // if (result_message[0].data[0].wrapuptype == "wrapupcall_id" && result_message[0].data[0].extno == $('#dup_user_number').val()) {
      //   $('#dup_wrapup_callID').val(result_message[0].data[0].callid);
      //   // alert(result_message[0].data[0].callid)
      //   // alert('asnja')
      //   // $('#dup_wrapup_callID').click();
      // }
      // if (result_message[0].data[0].calltype == "Incoming Call" && result_message[0].data[0].ag_no == $('#dup_user_number').val()) {
      //   $('#dup_queue_ids3').val(result_message[0].data[0].q_no);
      // }


    }

    this.websocket.onerror = function (event) {
      console.log('error');
    }
    this.websocket.onclose = function (event) {
      console.log('close');
      $('#dup_con_reconnect_socket').click();

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
    this.getAuxCatogory();
    if (this.fromEdit) {

    } else {
      this.getquestionnaire();
    }

    $('.settingSidebar').toggleClass('showSettingPanel');
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
    let cat_id = $('#dup_auxcodes_pop_dup').val();
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
    // alert(this.paramq);
    let conct_req:any = new Object();
    let api_req:any = new Object();
    conct_req.user_id=localStorage.getItem('userId');
    // conct_req.action="edit_contact";
    // conct_req.contact_phone = this.param1;
    conct_req.action="unique_edit_contact";
    conct_req.contact_unique_id = this.cont_unique_id;
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
              // 'reports_to' : '',
              // 'email_opt_out' : '',
              // 'skype' : '',
              'secondary_email' : '',
              // 'twitter' : '',
              // 'reporting_to' : '',
              'mailing_street' : '',
              // 'other_street' : '',
              'mailing_city' : '',
              // 'other_city' : '',
              'mailing_province' : '',
              // 'other_province' : '',
              'mailing_postal_code' : '',
              // 'other_postal_code' : '',
              'mailing_country' : '',
              // 'other_country' : '',
              'notes' :'',
              'created_by' : '',
              'modified_by' : '',
              // 'whatsapp_number' :'',
              // 'line' :'',
              // 'facebook_url' :'',
              // 'wechat' :'',
              // 'viber' :'',
              // 'telegram' :'',
              // 'instagram_url' :'',
              // 'linkedin' :'',
              'ext_no' : '',
              'country_code' : '',
            });
  
           
          } else {
  
            var home_phone = '';
            var office_phone = '';
            var mobile='';

            this.contact_ids = response.result.data.contact_id;
            this.contact_id = response.result.data.phone;
            // alert(this.contact_id);
            
            // if(this.call_record_id !='' &&this.show_caller_id == '0')
            if(this.show_caller_id == '0')
            {
              this.hide_cal1er = 'xxxxxxxxx';
              var home_phone = 'xxxxxxxxx';
              var office_phone = 'xxxxxxxxx';
              var mobile='xxxxxxxxx';
              this.click_to_call_mobile_number = response.result.data.mobile
              this.click_to_call_number = response.result.data.phone;
              this.click_to_call_office_phone = response.result.data.office_phone;
              this.click_to_call_home_phone = response.result.data.home_phone;
            } else {
              this.hide_cal1er = response.result.data.phone;
              this.click_to_call_number = response.result.data.phone;
              this.click_to_call_mobile_number = response.result.data.mobile
              this.click_to_call_office_phone = response.result.data.office_phone;
              this.click_to_call_home_phone = response.result.data.home_phone;
              home_phone = response.result.data.home_phone;
              office_phone = response.result.data.office_phone
              mobile= response.result.data.mobile;
            }
            var test_phone;
            if(response.result.data.phone == null || response.result.data.phone == undefined){
              test_phone = this.hide_cal1er;
            }else{
              test_phone = response.result.data.phone;
            }
          
            this.editContact.setValue({
              'contact_owner' : response.result.data.contact_owner,
              'contact_identifier' : response.result.data.contact_unique_identifier,
              'full_name' : response.result.data.full_name,
              'first_name' : response.result.data.first_name,
              'last_name' : response.result.data.last_name,
              'account_name' : response.result.data.account_name,
              'lead_source' : response.result.data.lead_source,
              'title' : response.result.data.title,
              'email' : response.result.data.email,
              'activity' : response.result.data.activity,
              'phone' : test_phone,
              'home_phone' : home_phone,
              'office_phone' : office_phone,
              'fax' : response.result.data.fax,
              'mobile' : mobile,
              'dob' : response.result.data.dob,
              'assistant' : response.result.data.assistant,
              'department' : response.result.data.department,
              'assitant_phone' : response.result.data.assitant_phone,
              // 'email_opt_out' : response.result.data.email_opt_out,
              'secondary_email' : response.result.data.secondary_email,
              // 'reporting_to' : response.result.data.reporting_to,
              'mailing_street' : response.result.data.mailing_street,
              // 'other_street' : response.result.data.other_street,
              'mailing_city' : response.result.data.mailing_city,
              // 'other_city' : response.result.data.other_city,
              'mailing_province' : response.result.data.mailing_province,
              // 'other_province' : response.result.data.other_province,
              'mailing_postal_code' : response.result.data.mailing_postal_code,
              // 'other_postal_code' : response.result.data.other_postal_code,
              'mailing_country' : response.result.data.mailing_country,
              // 'other_country' : response.result.data.other_country,
              'notes' :'',
              // 'created_by' : response.result.data.creater,
              // 'modified_by' : response.result.data.modifier,
              // 'whatsapp_number' :response.result.data.whatsapp_number,
              // 'line' :response.result.data.line,
              // 'facebook_url' :response.result.data.facebook_url,
              // 'wechat' :response.result.data.wechat,
              // 'viber' :response.result.data.viber,
              // 'telegram' :response.result.data.telegram,
              // 'instagram_url' :response.result.data.instagram_url,
              // 'linkedin' :response.result.data.linkedin,
              'ext_no' : response.result.data.ext_no,
              'country_code' : response.result.data.country_code,
              'job_roles' : response.result.data.job_role,
              'acc_org_ids' : response.result.data.account_org_id,
              'acc_st_names' : response.result.data.account_st_name,
              'acc_st_ids' : response.result.data.account_st_id,
            });

            this.test=response.result.data.email;
            // $('#departments').val(response.result.data.department).prop('selected', true);
            $('#res_departments').val(response.result.data.res_dept).prop('selected', true);
            this.created_time = response.result.data.created_at;
            this.modified_time = response.result.data.updated_at;
            
        this.uniqueID=response.result.data.contact_unique_identifier;
          }
          
      }, 
      (error)=>{
          console.log(error);
      });
  }
  clictToCall(to){
    // if(to == 'phone'){  this.to_num = $('#phone').val(); } else {  this.to_num = $('#mobile').val(); }
   
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
  
  // updateContact(contact_id){
  
  // let assigned_department_id: any= $('#departments').val();
  // console.log(assigned_department_id);
  
  // let res_department_id: any= $('#res_departments').val();
  // console.log(assigned_department_id);
  
  
  // let auxcodes: any= $('#auxcodes').val();
  // if(auxcodes == '0') {
  //   auxcodes = $('#auxcodes_pop').val();
  // } 
  // console.log(auxcodes);
  
  // let api_req:any = new Object();
  // let add_contact_req:any = new Object();
  // // alert('sdsds'+this.click_to_call_number);
  
  // if(contact_id == '' || contact_id == undefined){
  
  //   api_req.operation="contact";
  //   api_req.moduleType="contact";
  //   api_req.api_type="web";
  //   api_req.access_token=localStorage.getItem('access_token');
  //   let element_data:any = new Object();
  //   if(this.admin_id == this.uadmin_id){
  //     api_req.element_data = this.editContact.value;
  //     if(this.editContact.value.home_phone == "xxxxxxxxx")
  //     api_req.element_data.home_phone = this.click_to_call_home_phone;
   
  //    if(this.editContact.value.mobile == "xxxxxxxxx")
  //     api_req.element_data.mobile =   this.click_to_call_mobile_number;
   
  //    if(this.editContact.value.office_phone == "xxxxxxxxx")
  //     api_req.element_data.office_phone = this.click_to_call_office_phone;
   
  //    if(this.editContact.value.phone == "xxxxxxxxx")
  //     api_req.element_data.phone = this.click_to_call_number;
  //   } else {
  //     api_req.element_data = this.editContact.value;
  //     api_req.element_data.home_phone = this.click_to_call_home_phone;
  //     api_req.element_data.mobile = this.click_to_call_mobile_number;
  //     api_req.element_data.office_phone = this.click_to_call_office_phone;
  //     api_req.element_data.phone = this.click_to_call_number;
  //   }
  //   api_req.element_data.action='update_contact';
  //   api_req.element_data.department= assigned_department_id;
  //   api_req.element_data.res_dept=res_department_id;
  //   api_req.element_data.auxcode_name=auxcodes;
  //   api_req.element_data.callid=this.call_record_id;
  //   api_req.element_data.created_by = localStorage.getItem('userId');
  // } else {
  //   api_req.operation="contact";
  //   api_req.moduleType="contact";
  //   api_req.api_type="web";
  //   api_req.access_token=localStorage.getItem('access_token');
    
  
  // if(this.admin_id == this.uadmin_id){
  //   api_req.element_data = this.editContact.value;
  //   if(this.editContact.value.home_phone == "xxxxxxxxx")
  //    api_req.element_data.home_phone = this.click_to_call_home_phone;
  
  //   if(this.editContact.value.mobile == "xxxxxxxxx")
  //    api_req.element_data.mobile =   this.click_to_call_mobile_number;
  
  //   if(this.editContact.value.office_phone == "xxxxxxxxx")
  //    api_req.element_data.office_phone = this.click_to_call_office_phone;
  
  //   if(this.editContact.value.phone == "xxxxxxxxx")
  //    api_req.element_data.phone = this.click_to_call_number;
  // } else {
  //   api_req.element_data = this.editContact.value;
  //   api_req.element_data.home_phone = this.click_to_call_home_phone;
  //   api_req.element_data.mobile = this.click_to_call_mobile_number;
  //   api_req.element_data.office_phone = this.click_to_call_office_phone;
  //   api_req.element_data.phone = this.click_to_call_number;
  // }
  
   
  //   api_req.element_data.action='update_contact';
  //   api_req.element_data.modified_by = localStorage.getItem('userId');
  //   api_req.element_data.contact_id=contact_id;
  //   api_req.element_data.department= assigned_department_id;
  //   api_req.element_data.auxcode_name=auxcodes;
  //   api_req.element_data.callid=this.call_record_id;
  //   api_req.element_data.res_dept=res_department_id;
  // }
  // // alert( api_req.element_data.phone);
  // // return false;
  //       this.serverService.sendServer(api_req).subscribe((response: any) => {
  //       if (response.result.data == 1) {
  //         $('#add_pbxform').modal('hide');
  //               iziToast.success({
  //                   message: "Contact update successfully",
  //                   position: 'topRight'
  //               });
  //               this.editContact.value.notes = "";
  //               this.router.navigate(['/contacts']);
  //           }
  //       else{
            
  //               iziToast.warning({
  //                   message: "Contact not updated. Please try again",
  //                   position: 'topRight'
  //               });
            
  //       }
  
  //   },
  //   (error) => {
  //        iziToast.error({
  //           message: "Sorry, some server issue occur. Please contact admin",
  //           position: 'topRight'
  //       });
  //       console.log(error);
  //   });
  
  
  // }


    
  updateContact(contact_id){
  
    let assigned_department_id: any= $('#pop_departments').val();
    console.log(assigned_department_id);
    
    let res_department_id: any= $('#pop_res_departments').val();
    console.log(assigned_department_id);
    
    
    let auxcodes: any= $('#pop_auxcodes').val();
    if(auxcodes == '0') {
      auxcodes = $('#pop_auxcodes_pop').val();
    } 
    console.log(auxcodes);
    
    let api_req:any = new Object();
    let add_contact_req:any = new Object();
    // alert('sdsds'+this.click_to_call_number);
    
    if(contact_id == '' || contact_id == undefined){
    
      api_req.operation="contact";
      api_req.moduleType="contact";
      api_req.api_type="web";
      api_req.access_token=localStorage.getItem('access_token');
      let element_data:any = new Object();
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
      // api_req.element_data.home_phone = this.click_to_call_home_phone;
      // api_req.element_data.mobile = this.click_to_call_mobile_number;
      // api_req.element_data.office_phone = this.click_to_call_office_phone;
      // api_req.element_data.phone = this.click_to_call_number;
      }
      api_req.element_data.action='add_contact';
      api_req.element_data.department= assigned_department_id;
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
      // api_req.element_data.home_phone = this.click_to_call_home_phone;
      // api_req.element_data.mobile = this.click_to_call_mobile_number;
      // api_req.element_data.office_phone = this.click_to_call_office_phone;
      // api_req.element_data.phone = this.click_to_call_number;
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
    // return false;
          this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.result.data == 1) {
            $('#pop_add_pbxform').modal('hide');
                  iziToast.success({
                      message: "Contact update successfully",
                      position: 'topRight'
                  });
                  this.editContact.value.notes = "";
                  this.router.navigate(['/contacts']);
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
  
  addNotes(id,uniqueID){
    this.router.navigate(['/activity'], { queryParams: { contact_id: id,uniqueID:uniqueID } });
  }

  clictToCall2() {
    // if(to == 'phone'){  this.to_num = $('#dup_phone').val(); } else {  this.to_num = $('#dup_mobile').val(); }

    // if(to == 'phone'){  this.to_num = this.click_to_call_number; } else {  this.to_num = this.click_to_call_mobile_number; }
    let to = $('#dup_mobile_phone').val();
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
    let wrapcall_id = $('#dup_wrapup_callID').val();
    let cat_id = $('#dup_auxcodes_pop_dup').val();
    let wraupcode = $('#dup_auxcodes_subcat_dup').val();
    let opportunity = $('#opportunity').val();
    let notes = $('#dup_notes').val();
    let access_token: any = localStorage.getItem('access_token');
    let from_no;
    let to_no;
    let queue_ids = $('#dup_queue_ids3').val();

    var wrap = this.category_name + ' -> ' + wraupcode;

    if (this.paramCall == 'incoming') {
      from_no = this.param1;
      to_no = this.extension;
    }
    else if(this.fromEdit != null){
      this.paramCall ='outgoing'
      from_no = this.param1;
      to_no = this.extension;
    }else {
      from_no = this.extension;
      to_no = this.param1;
    }
    // alert(from_no)
    // alert(to_no)
    //  notes=notes.toString().replace('"',' ');
    notes = notes.toString().replaceAll(/"|'/g, '');

    var unique_identity='';
    if(this.editContact.value.contact_identifier)
      unique_identity=this.editContact.value.contact_identifier;
    // let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", 
    // "access_token":"'+access_token+'", "element_data":{"action":"add_auxcode_wall","from_no":
    // "'+from_no+'","to_no":"'+to_no+'","type":"'+this.paramCall+'","aux_code":"'+wraupcode+'",
    // "user_id":"'+this.uadmin_id+'","cat_id":"'+cat_id+'","call_note":"'+notes+'"}}';
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
    conct_req.opportunity_id = opportunity;
    conct_req.cat_id = cat_id;
    conct_req.call_note = notes;
    conct_req.call_queue_num = queue_ids;
    conct_req.user_id = this.uadmin_id;
    conct_req.admin_id = this.admin_id;
    conct_req.unique_id = unique_identity;
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
    // {"operation":"contact","moduleType":"contact","api_type":"web","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJvbW5pLmVudGVydGFpbm1lbnQuY29tLmF1IiwiYXVkIjoib21uaS5lbnRlcnRhaW5tZW50LmNvbS5hdSIsImlhdCI6MTYyMTA1ODcwOSwibmJmIjoxNjIxMDU4NzA5LCJleHAiOjE2MjEwNzY3MDksImFjY2Vzc19kYXRhIjp7InRva2VuX2FjY2Vzc0lkIjoiOTU4IiwidG9rZW5fYWNjZXNzTmFtZSI6ImFubmVzc2EiLCJ0b2tlbl9hY2Nlc3NUeXBlIjoiMiJ9fQ.vBc-2g4FoZC_xNb4dBUmQYKblkPL6l6wbI7WEes-xRI","element_data":{"action":"add_auxcode_wall","from_no":"1000","to_no":"1001","type":"outgoing","aux_code":"No Answer","user_id":"958"}}
    var socket_message = '[{"cust_id":"' + this.has_hard_id + '","data":[{"Name":"wrapupcode","callid":"' + wrapcall_id + '","wcode":"' + wrap + '","wcodenote":"' + notes + '","extno":"' + this.extension + '"}]}]';
    this.websocket.send(socket_message);
    this.closeQuestion();
    iziToast.success({
      message: "Wrapup Code Added successfully",
      position: "topRight"
    });
    // $('#dup_wrapup_callID').val('');
    $('#dup_auxcodes_pop_dup').val('');
    $('#dup_auxcodes_subcat_dup').val('');
    $('#dup_notes').val('');
    $('#opportunity').val('');
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
        $('#dup_showpop_timeline').modal('show');
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

    const modalRef = this.modalService.dismissAll(EditContactDupComponent);
    let api_reqs: any = '{"type": "minimize"}';
    this.serverService.minimize.next(api_reqs);
  }

  acceptIncomeCall() {
    let api_reqtest: any = '{"type": "showpopupdialer"}';
    this.serverService.show.next(api_reqtest);
    let api_reqs: any = '{"type": "attendincomingCall"}';
    this.serverService.minimize.next(api_reqs);
    this.show_mini_butons = true;
    this.show_ans = false;
    this.show_del = true;
  }

  declineIncomeCall() {
    let api_reqs: any = '{"type": "declineincomingCall"}';
    this.serverService.minimize.next(api_reqs);
    this.show_mini_butons = true;
    this.show_ans = false;
    this.show_del = false;
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
  generate_ticket(){  
	
    //	alert(c_id)
    // var ca_id = btoa(c_id);

       
      //     let agent_req:any = new Object();
      //     let access_token: any=localStorage.getItem('access_token');
      //     var subject = $('#subject').val();
      //     var description ='This is Email Subject' ;
         
      //     var priority=$('#PickPriority').val();
      //     var status=$('#PickStatus').val();
      //     var Dept=$('#PickDepartment').val();
      //     var agent=$('#PickAgents').val();
          var EmailTo=$('#email').val();
      //     // var email_cc=$('#email_cc').val();
      
      //     var email_cc ='Internal-ticket';; 
      //      var EmailTo ='Internal-ticket'; 
      
      
   
      
      // agent_req.action='createExternalTicket';
      // agent_req.subject=subject;
      // agent_req.description=description;
      // agent_req.department=Dept;
      // agent_req.status=status;
      // agent_req.priority_id=priority;
      // agent_req.admin_id=this.admin_id;
      // agent_req.user_id=this.uadmin_id;
      // agent_req.agent_id=agent;
      // agent_req.to=EmailTo;
      // agent_req.from_address="this.email_from";
      // var formData = new FormData();
      
      // var json_arr = JSON.stringify(agent_req);
      //     formData.append('operation', 'ticket');
      //     formData.append('moduleType', 'ticket');
      //     formData.append('api_type', 'web');
      //     formData.append('action', 'createExternalTicket');
      //     formData.append('subject', subject);
      //     formData.append('description',description);
      //     formData.append('department',Dept);
      //     formData.append('status', status);
      //     formData.append('priority_id',priority);
      //     formData.append('admin_id', this.admin_id);
      //     formData.append('user_id', this.uadmin_id);
      //     formData.append('agent_id',agent);
      //     formData.append('to', EmailTo);
      //     formData.append('from_address', "this.email_from");
      //     formData.append('mail_cc', email_cc);
      //     // formData.append('up_files', $('#create_file')[0].files[0]);
      
      //     // formData.append('logo_image', $('#logo_image')[0].files[0]);
      //     // formData.append('small_logo_image', $('#small_logo_image')[0].files[0]);
      //     // formData.append('user_id', user_id);
      //     // formData.append('element_data', json_arr);
     
       
      
         
       
      
        
      //     if (subject=='') {
      //       iziToast.warning({
      //         message: "Please Enter Email Subject",
      //         position: 'topRight'
      //       });
      //       return false;
      //     }
      //     if (Dept != '' && agent != '' && status != '' && priority != '' && EmailTo != '') {
 
      //       Swal.fire({
      //         title: 'Please Wait',
      //         allowEscapeKey: false,
      //         allowOutsideClick: false,
      //         //  background: '#19191a',
      //         showConfirmButton: false,
      //         onOpen: () => {
      //           Swal.showLoading();
      //         }
      //       });
            var b_phone_num = btoa(EmailTo);
            this.router.navigate(['/ticket-create-new'],{queryParams:{email:b_phone_num}});
      
            // return  false;
      
      //       $.ajax({
      //         url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",
      //         type: 'POST',
      //         data: formData,
      //         processData: false,  // tell jQuery not to process the data
      //         contentType: false,
      //         success: function (data) {
      //           this.parsed_data = JSON.parse(data);
      //           console.log(this.parsed_data);
      //           Swal.close();
      //           // if(this.parsed_data.result.status == "Message has been sent successfully"){   
      //           if (this.parsed_data.data == "Message has been sent successfully") {
      
      //         $("#refresh_profile").click();
      //         iziToast.success({
      //           message: "Ticket has been sent successfully",
      //           position: 'topRight'
      //       });
      //       // this.router.navigate(['/ticketing-system-new']);
      //     // $("#NavigateFunc").click();
      //       }
      //       else{
      //         iziToast.error({
      //           message: "Sorry, Some Error Occured,Please contact Admin",
      //           position: 'topRight'
      //       });
          
      //       }
      //     }  
      // });  
      // }
      
        }
    
}
