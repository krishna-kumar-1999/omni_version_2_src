import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;


import Swal from 'sweetalert2'
@Component({
  selector: 'app-predictive-dialer-contact',
  templateUrl: './predictive-dialer-contact.component.html',
  styleUrls: ['./predictive-dialer-contact.component.css']
})
export class PredictiveDialerContactComponent implements OnInit {
  param1: string;
  created_time;
  modified_time;
  contact_id;
  editContact: FormGroup;
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
  dsk_access;
  hasdsk = false
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
  address
  campaign_id
  city
  country
  created_at
  customer_name
  delete_status
  dnd
  lead_id
  notes
  queue_status
  source_data
  state
  phone_number
  updated_at
  zipcode;
  id;
  campaigns
  constructor(private serverService: ServerService, private router:Router,private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.param1 = this.route.snapshot.queryParamMap.get('phone');
  //   var decodedString = atob(this.param1 );
  //  this.param1 = decodedString;
  //  alert(this.param1)
  
    this.call_record_id = this.route.snapshot.queryParamMap.get('call_rec_id');
    this.fromEdit = this.route.snapshot.queryParamMap.get('from_edit');
    this.IFlink = this.route.snapshot.queryParamMap.get('clink');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }


  ngOnInit(): void {
    this.uadmin_id = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');
     this.show_caller_id = localStorage.getItem('show_caller_id');
     this.getDepartments();
     this.getAuxCode();
     
     this.getCamps();
      this.getCallerDetails();
  }
getquestionnaire(){
    let access_token: any=localStorage.getItem('access_token');

    let api_req:any = '{"operation":"questionaire", "moduleType":"questionaire", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_user_queue","user_id":"'+this.uadmin_id+'"}}';

    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.status==true){
        // $('.settingSidebar').addClass('showSettingPanel');
        this.questions= response.result.data;
      } else {
      }
    },
    (error)=>{
        console.log(error);
    });
  }

  getDepartments(){
    let access_token: any=localStorage.getItem('access_token');

    let api_req:any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_dept_settings","user_id":"'+this.admin_id+'"}}';

    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        this.departments = response.result.data;
      } else {
      }
    },
    (error)=>{
        console.log(error);
    });
  }


  getAuxCode( ){
    let access_token: any=localStorage.getItem('access_token');

    let api_req:any = '{"operation":"getAuxcode", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_aux_code","admin_id":"'+this.admin_id+'"}}';

    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        this.auxcodes = response.result.data;

      } else {
      }
    },
    (error)=>{
        console.log(error);
    });
  }

  getCallerDetails(){
    let access_token: any=localStorage.getItem('access_token');

    let api_req:any = '{"operation":"predective_dialer_contact", "moduleType":"predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"camp_call","admin_id":"'+this.admin_id+'","phone_no":"'+this.param1+'"}}';

    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        this.address =  response.result.data.address;
        this.campaign_id = response.result.data.campaign_id
        this.city = response.result.data.city
        this.country = response.result.data.country
        this.created_at = response.result.data.created_at
        this.customer_name = response.result.data.customer_name
        this.delete_status = response.result.data.delete_status
        this.dnd = response.result.data.dnd
        this.lead_id = response.result.data.lead_id
        this.notes = response.result.data.notes
        this.queue_status = response.result.data.queue_status
        this.source_data = response.result.data.source_data
        this.state = response.result.data.state
        this.phone_number = response.result.data.phone_number
        this.updated_at = response.result.data.updated_at
        this.zipcode = response.result.data.zipcode


        $('#camp_names').val(this.campaign_id ).prop('selected', true);

      }
    },
    (error)=>{
        console.log(error);
    });
  }




  getCamps(){
    let access_token: any=localStorage.getItem('access_token');
    let user_is: any=localStorage.getItem('userId');

    let api_req:any = '{"operation":"predective_dialer_contact", "moduleType":"predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_campaign","admin_id":"'+this.admin_id+'"}}';

    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        this.campaigns = response.result.data;
        $('#wrapup').val(this.dnd).prop('selected', true);
      } else {
      }
    },
    (error)=>{
        console.log(error);
    });
  }


 changeStatus(){
    this.predictive_popup();
    let access_token: any=localStorage.getItem('access_token');
    let user_is: any=localStorage.getItem('userId');
    //var id=
   var stat = $('#wrapup').val();
   var id:any;
    let api_req:any = '{"operation":"predective_dialer_contact", "moduleType":"predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"update_camp_call","admin_id":"'+this.admin_id+'","phone_no":"'+ this.param1+'","stat":"'+stat+'","camp_id":"'+this.campaign_id+'"}}';
    console.log(api_req)
  //  return false;
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        iziToast.success({
          message: "Data Updated",
          position: 'topRight'
        });
        if(stat=='fax&vm'){
        this.router.navigate(['/predictive-wrapups'], { queryParams: { page: 'cHJlZGljX0ZBWF9WTQ' } });
        }
        if(stat=='interested'){
          this.router.navigate(['/predictive-wrapups'], { queryParams: { page: 'cHJlZGljX0ludGVyZXN0ZWQ=' } });
          }
          if(stat=='unanswered'){
            this.router.navigate(['/predictive-wrapups'], { queryParams: { page: 'cHJlZGljX05vX0Fuc3dlcg==' } });
            }
            if(stat=='call-back'){
              this.router.navigate(['/predictive-wrapups'], { queryParams: { page: 'cHJlZGljX0NhbGxfQmFjaw==' } });
              }
              if(stat=='dnd'){
                this.router.navigate(['/predictive-wrapups'], { queryParams: { page: 'cHJlZGljX0RORA==' } });
                }
                if(stat=='answered'){
                  this.router.navigate(['/predictive-wrapups'], { queryParams: { page: 'cHJlZGljX2Fuc3dlcmVk' } });
                  }

      } else {
      }
    },
    (error)=>{
        console.log(error);
    });
  }
  predictactivity(number){
    // var b_phone_num = btoa(number);
    // $("#edit_adminform").modal('hide');
    this.router.navigate(['/predictive-activity'] ,{ queryParams: { phone: number}});
  }
  predictive_popup(){
    let access_token: any=localStorage.getItem('access_token');
    let user_is: any=localStorage.getItem('userId');
    let call_id: any=localStorage.getItem('predict_callid');
    var wrap_status = $('#wrapup').val();
    let api_req:any = '{"operation":"predective_dialer_contact", "moduleType":"predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"predictive_dialer_details","admin_id":"'+this.admin_id+'","phone_no":"'+ this.param1+'","wrap_status":"'+wrap_status+'","call_id":"'+call_id+'"}}';
    console.log(api_req)
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        // alert(response);
      }
    },
    (error)=>{
        console.log(error);
    });
  }

}

