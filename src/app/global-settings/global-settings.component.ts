import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.css']
})
export class GlobalSettingsComponent implements OnInit {
  call_history_list;
  recordNotFound = false;
  pageLimit = 20;
  paginationData:any ={"info":"hide"};
  offset_count = 0;
  getRep: FormGroup;
  auxcodes;
  uadmin_id;
  queue_list;
  res;
  show_admin_sett;
  user_type;
  small_logo_image;
  logo_image;
  myTime;
  has_external_contact;
  showurlsett = false;
  external_contact_url;
  behaviourURL;
  crm_type;
  showForZDesk = false;
  showForHubSpot = false;
  h_con;
  host_name;
  dialer_ring;
  dialer_ring_upt;
  dialer_step;

  admin_id;
  valume;
  server_list;
  server_ID;
  server_FQDN;
  has_predict;
  has_sso;
  current_ext;
  list: any;
  isShown: boolean = false ;
  ext_form : FormGroup;
  queue_no;
  survey_zip_url;
  show_sury_zip = false;
  show_survey = false;
  constructor(private serverService: ServerService) { }

   ngOnInit() {
     this.getRep = new FormGroup({
     'auxcode_name' :new FormControl(null),
     'from_date' :new FormControl(null),
     'to_date' :new FormControl(null),
     });
    this.ext_form = new FormGroup({
      'ext_num':new FormControl(null),
      'queue_num':new FormControl(null),
    })
     this.host_name =window.location.hostname;
     this.uadmin_id = localStorage.getItem('userId');
     this.has_sso = localStorage.getItem('has_sso');
    //  this.user_type = localStorage.getItem('user_type');
     this.user_type ='Admin';
     this.has_external_contact = localStorage.getItem('has_external_contact');
     this.external_contact_url = localStorage.getItem('external_contact_url');
     this.h_con = localStorage.getItem('h_con');
     this.admin_id = localStorage.getItem('admin_id');
     this.server_ID = localStorage.getItem('server_ID');
     this.server_FQDN = localStorage.getItem('server_FQDN');
     this.has_predict=localStorage.getItem('has_predict');
     if(localStorage.getItem('survey_per')=='0'){
      this.show_survey = false;
     }else{
      this.show_survey = true;
     }
    //  if(this.has_sso)
    //    this.msSSODetails();
    //  this.SsoReplyURl='https://'+window.location.hostname+'/ms-sso/simplesamlphp/www/';

     $('#webrtc_server').val(this.server_ID);

     var ext_url = localStorage.getItem('external_contact_url');
     let searchParams = new URLSearchParams(ext_url)
     let Z_orgId = searchParams.get('orgId');
     let z_authkey = searchParams.get('authkey');

  
     this.crm_type = localStorage.getItem('crm_type');
     if(this.crm_type == 'HubSpot' && this.has_external_contact == '1'){
      this.showForHubSpot = true;
      this.showForZDesk = false;
     // this.behaviourURL = 'https://omni.mconnectapps.com/#/edit-contacts?q=%CallerNumber%&hapikey=ed15f3fa-87c4-4169-a555-6bb845c257e9';
      this.behaviourURL = 'https://'+window.location.hostname+'/#/edit-contacts?q=%CallerNumber%&hapikey=ed15f3fa-87c4-4169-a555-6bb845c257e9';
      if(this.uadmin_id == '64'){
        this.external_contact_url = 'https://'+window.location.hostname+'/#/edit-contacts?q=hubSpot&hapikey=ed15f3fa-87c4-4169-a555-6bb845c257e9';
      }
     
      $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://app.hubspot.com/login/" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')

    } else if(this.crm_type == 'SalesForce' && this.has_external_contact == '1'){
      this.behaviourURL = '?locale=in';
      $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://login.salesforce.com/?locale=in" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
    }else if(this.crm_type == 'FreshDesk'  && this.has_external_contact == '1'){
      this.behaviourURL = '?locale=in';
      $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://freshdesk.com/login" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
    } else if(this.crm_type == 'FreshDesk'  && this.has_external_contact == '1'){
      this.behaviourURL = '?locale=in';
      $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://freshdesk.com/login" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
    } else if(this.crm_type == 'Insightly'  && this.has_external_contact == '1'){
      this.behaviourURL = '?locale=in';
      $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://login.insightly.com/User/Login" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
    } else if(this.crm_type == 'Shopify'  && this.has_external_contact == '1'){
      this.behaviourURL = '?locale=in';
      $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://accounts.shopify.com/store-login" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
    } else if(this.crm_type == 'Vtiger'  && this.has_external_contact == '1'){
      this.behaviourURL = '?locale=in';
      $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://www.vtiger.com/log-in/" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
    } else if(this.crm_type == 'Zendesk'  && this.has_external_contact == '1'){
      this.behaviourURL = '?locale=in';
      $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://www.zendesk.com/login/" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
    } else if(this.crm_type == 'Zoho'  && this.has_external_contact == '1'){
      this.behaviourURL = 'https://'+window.location.hostname+'/#/edit-contacts?q=%CallerNumber%&authkey=<Authorization Key>&orgId=<orgId>';
      $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://www.zoho.com/desk/login.html" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
    } else if(this.crm_type == 'ZohoDesk'  && this.has_external_contact == '1'){
      this.showForZDesk = true;
      this.showForHubSpot = false;
      // if(this.uadmin_id == '64'){
      //   this.external_contact_url = 'https://omni.mconnectapps.com/#/edit-contacts?q=hubSpot&hapikey=ed15f3fa-87c4-4169-a555-6bb845c257e9';
      // } else {
      //   this.behaviourURL = 'https://omni.mconnectapps.com/#/edit-contacts?q=%CallerNumber%&authkey=<Authorization Key>&orgId=<orgId>';
      // }
      if(this.uadmin_id == '64'){
        this.external_contact_url = 'https://'+window.location.hostname+'/#/edit-contacts?q=%CallerNumber%&authkey=cd8bc68182aec5ae48a9b60faab2f051&orgId=719234391';
        this.behaviourURL = 'https://'+window.location.hostname+'/#/edit-contacts?q=%CallerNumber%&authkey=cd8bc68182aec5ae48a9b60faab2f051&orgId=719234391';
      } else {
        this.behaviourURL = 'https://'+window.location.hostname+'/#/edit-contacts?q=%CallerNumber%&authkey=<Authorization Key>&orgId=<orgId>';
      }
     
      $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://www.zoho.com/desk/login.html" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
    }

     if(this.external_contact_url == undefined || this.external_contact_url == 'undefined'){
      this.external_contact_url = '';
     }
     $('input:radio[name=has_external_contact][value='+this.has_external_contact+']').prop('checked', true);
     $("input:radio[name='has_external_contact'][value='"+this.has_external_contact+"']").prop('checked', 'checked');
     if(this.user_type == 'Admin'){
       this.show_admin_sett = true;
     }
     if(this.has_external_contact == '1'){
      this.showurlsett = true;
     }
    
     this.dept_settings();
     this.listwebrtc();
     this.get_current_ext();
     this.get_dailer_file();
     this.call_settings();
     this.get_survay();
     this.get_survey_zip_url();
   }

   listwebrtc(){
    //  alert(this.server_list)
     if(this.server_list != null )
        return false;

    var access_token=localStorage.getItem('access_token');
    let api:any='{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"list_webrtc_servers"}}';
    this.serverService.sendServer(api).subscribe((response:any)=>{
      if(response.status ==true){
        // alert('cksnns')
        this.server_list=response.result.data;
        console.log(this.server_list);
      }
    })
    
  }
  
  call_popup(evn:boolean){
    if(localStorage.getItem('popup_settings')=='1'){
      var text = "Would you Need to Assign 3cx Call Popup?";
      }else{
      var text = "Would you Need to Assign Predictive Dialer Call Popup?";
      }
      if(evn==true){
       var check_val = 1;
      }else{
        var check_val = 0;
      }
      Swal.fire({
        title: 'Are you sure?',
        text: text ,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update it!'
      }).then((result) => {
        if (result.value) {
          let api_req:any = '{"operation":"predective_dialer_contact","moduleType":"predective_dialer_contact","api_type":"web","access_token":"'+localStorage.getItem('access_token')+'","element_data":{"action":"edit_popup","admin_id":"'+localStorage.getItem('admin_id')+'","call_popup_sett":"'+check_val+'"}}';
          this.serverService.sendServer(api_req).subscribe((response:any)=>{
            if(response.result.data==1){
              window.location.reload();
            }
          })
        }else{
          if(localStorage.getItem('popup_settings')=='1'){
            $('#popup_sett').prop('checked', true);
          }else{
          $('#popup_sett').prop('checked', false);
          }
        }
      });
  }
  call_update(evn:boolean){
if(localStorage.getItem('call_Settings')=='1'){
var text = "Would you Need to Assign incoming Call Wrapup code?";
}else{
var text = "Would you Need to Assign incoming Call Ticket?";
}
if(evn==true){
 var check_val = 1;
}else{
  var check_val = 0;
}
Swal.fire({
  title: 'Are you sure?',
  text: text ,
  icon: 'info',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Update it!'
}).then((result) => {
  if (result.value) {
let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+localStorage.getItem('access_token')+'", "element_data":{"action":"update_call_settings","admin_id":"'+this.admin_id+'","call_sett":"'+check_val+'"}}';
this.serverService.sendServer(api_req).subscribe((response:any)=>{
  if(response.result.data==1){
    this.call_settings();
    iziToast.success({
     message: "Call Settings Updated",
     position: 'topRight'
    });
  }else{
    iziToast.error({
      message: "Sorry, Some Error Occured",
      position: 'topRight'
  });
  }
})
  }else{
    if(localStorage.getItem('call_Settings')=='1'){
      $('#call_set').prop('checked', true);
    }else{
    $('#call_set').prop('checked', false);
    }
  }
});
  }
  get_survay(){
    let api_req:any = '{"operation":"chat","moduleType":"chat","api_type":"web","access_token":"'+localStorage.getItem('access_token')+'","element_data":{"action":"get_survay_data","user_id":"'+localStorage.getItem('admin_id')+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any)=>{
      if(response.result.status==true){
        $("#survey_number").val(response.result.data);
      }
    })
  }
  get_survey_zip_url(){
    let api_req:any = '{"operation":"predective_dialer_contact","moduleType":"predective_dialer_contact","api_type": "web", "access_token":"'+localStorage.getItem('access_token')+'", "element_data":{"action":"get_survey_zip"}}';
    this.serverService.sendServer(api_req).subscribe((response:any)=>{
      if(response.result.data!=''){
        this.survey_zip_url = response.result.data;
        if(this.survey_zip_url!=0&&this.survey_zip_url!='0'&&this.survey_zip_url!=''){
          this.show_sury_zip = true;
        }else{
          this.show_sury_zip = false;
        }
      }
    })
  }
  UpdateSurvey(){
    var survey_number = $("#survey_number").val();
    let api_re:any = '{"operation":"predective_dialer_contact","moduleType":"predective_dialer_contact","api_type": "web", "access_token":"'+localStorage.getItem('access_token')+'", "element_data":{"action":"survuy_config","user_id":"'+localStorage.getItem('user_id')+'","queue_no":"'+survey_number+'","company_name":"'+localStorage.getItem('company_name')+'","admin_id":"'+localStorage.getItem('admin_id')+'"}}';
this.serverService.sendServer(api_re).subscribe((response:any)=>{
  if(response.result.data!=''){
    let api_req:any = '{"operation":"chat","moduleType":"chat","api_type":"web","access_token":"'+localStorage.getItem('access_token')+'","element_data":{"action":"update_survay","survey_number":"'+survey_number+'","user_id":"'+localStorage.getItem('admin_id')+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any)=>{
      if(response.result.status==true){
        if(response.result.data==1){
          this.get_survey_zip_url();
          this.get_survay();
          iziToast.success({
          message: "Settings Updated",
          position: 'topRight'
          });
        }else{
          iziToast.error({
            message: "Sorry, Some Error Occured",
            position: 'topRight'
        });
        }
      }
    })
  }else{
    iziToast.error({
      message: "Sorry, Some Error Occured",
      position: 'topRight'
  });
  }
})
    
  }
  call_settings(){
    let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+localStorage.getItem('access_token')+'", "element_data":{"action":"get_call_settings","admin_id":"'+this.admin_id+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any)=>{
      localStorage.setItem('call_Settings',response.result.data.call_sett);
      if(response.result.data.call_sett == 1){
        $('#call_set').prop('checked', true);
       } else {
        $('#call_set').prop('checked', false);
       }
       if(response.result.data.call_popup_sett==1){
        $('#popup_sett').prop('checked', true);
       }else{
        $('#popup_sett').prop('checked', false);
       }
    })
  }
   dept_settings(){
    let access_token: any=localStorage.getItem('access_token');
    let user_id: any=localStorage.getItem('admin_id');
    let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_admin_global_settings","user_id":"'+user_id+'"}}';
    // let api_reqs:any = '{"type": "profile"}';
    // this.serverService.profile.next(api_reqs);
    // let api_reqss:any = '{"type": "ring"}';
    // this.serverService.show.next(api_reqss);

    this.serverService.sendServer(api_req).subscribe((response:any) => {
      var agent_data = response;
      this.myTime = agent_data.user_timezone;
    
      $('#dialer_det').val(agent_data.dialer_value).prop('selected', true);
      localStorage.setItem('ring_step',agent_data.dialer_ring); 

      if(agent_data.dialer_ring =='6' ){
        $('#has_default_call').prop('checked', true);
        $("#volume_step").attr('disabled','disabled');

      } else {
        $('#has_default_call').prop('checked', false);
        agent_data.dialer_ring++;
        $('#volume_step').val(agent_data.dialer_ring++);
        $("#volume_step").removeAttr('disabled');

      }
      if(agent_data.show_caller_id =='1' ){
        $('#show_caller_id').prop('checked', true);
      } else {
        $('#show_caller_id').prop('checked', false);
      }
      if(agent_data.cli_status =='1' ){
        $('#show_cli_id').prop('checked', true);
      } else {
        $('#show_cli_id').prop('checked', false);
      }
      if(agent_data.has_contact_popup =='1' ){
        $('#has_contact_popup').prop('checked', true);
      } else {
        $('#has_contact_popup').prop('checked', false);
      }
  
      if(agent_data.has_case_mgnt =='1' ){
        $('#has_case_mgnt').prop('checked', true);
      } else {
        $('#has_case_mgnt').prop('checked', false);
      }
      if(agent_data.has_video_call == '1' ){
        localStorage.setItem('has_video_dialer', agent_data.has_video_call);
        
        $('#has_video_call').prop('checked', true);
      } else {
        localStorage.setItem('has_video_dialer', agent_data.has_video_call);

        $('#has_video_call').prop('checked', false);
      }
      

      // if(agent_data.dialer_ring =='1' ){
      //   $('#show_caller_id').prop('checked', true);
      // } else {
      //   $('#show_caller_id').prop('checked', false);
      // }
      $('#crm_type').val(this.crm_type).prop('selected', true);
      this.small_logo_image = agent_data.small_logo_image;
      this.logo_image = agent_data.logo_image;
      this.queue_list = response.timezone_options;
    }, 
    (error)=>{
        console.log(error);
    });
  }

  //  getAuxCode(){
  //  let access_token: any=localStorage.getItem('access_token');
  //  let api_req:any = '{"operation":"user", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"edit_dialer_timezone","user_id":"'+this.uadmin_id+'"}}';
  //  this.serverService.sendServer(api_req).subscribe((response:any) => {
  //    if(response.status == "true"){
  //     $('#timezone').val(response.user_timezone).prop('selected', true);
  //     $('#dialer_det').val(response.user_dialer).prop('selected', true);
  //    this.auxcodes = response.result.data;
  //    } else {
  //    }
  //  }, 
  //  (error)=>{
  //    console.log(error);
  //  });
  //  }



  //  get_timezone(){
  //   let access_token: any=localStorage.getItem('access_token');
  //   let api_req:any = '{"operation":"getTimezone", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_timezone"}}';
  //   this.serverService.sendServer(api_req).subscribe((response:any) => {
  //     if(response.status=="true"){
  //       this.queue_list = response.timezone_options;
  //       console.log(this.queue_list);
  //     } else {
       
  //     }
  //   }, 
  //   (error)=>{
  //       console.log(error);
  //   });
  // }



  // updateGlobalSet(){
  //   let access_token: any=localStorage.getItem('access_token');
  //   let timezone_id: any= $('#timezone').val();
  //   let dialer_det: any= $('#dialer_det').val();
  //   let api_req:any = '{"operation":"user", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"update_dialer_timezone","user_id":"'+this.uadmin_id+'","timezone_id":"'+timezone_id+'","ext_int_status":"'+dialer_det+'"}}';
    
  //   this.serverService.sendServer(api_req).subscribe((response:any) => {
  //     if(response.result.data==1){
  //       iziToast.success({
  //         message: "Settings Updated",
  //         position: 'topRight'
  //       });
  //     } else {
  //     }
  //   }, 
  //   (error)=>{
  //     console.log(error);
  //   });
  // }


  updateGlobalSet(){
 
    let user_id: any =  localStorage.getItem('admin_id'); 
    let api_req:any = new Object();
  
      var formData = new FormData();
      var show_caller_id = '0';  if($('#show_caller_id').prop('checked')){ show_caller_id = '1'; }
      var has_video_call = '0';  if($('#has_video_call').prop('checked')){ has_video_call = '1'; }
      var has_cli_status = '0';  if($('#show_cli_id').prop('checked')){ has_cli_status = '1'; }
      var has_contact_popup = '0';  if($('#has_contact_popup').prop('checked')){ has_contact_popup = '1'; }
      var has_case_mgnt = '0';  if($('#has_case_mgnt').prop('checked')){ has_case_mgnt = '1'; }
      let access_token: any=localStorage.getItem('access_token');
      let timezone_id: any= $('#timezone').val();
      let ext_int_status: any= $('#dialer_det').val();
      let dialer_ring_upt: any= $('#volume_step').val();
       var dialer_step: any=dialer_ring_upt -1;
// alert(dialer_step);

// return false;

var has_def_call = '0';  if($('#has_default_call').prop('checked')){ has_def_call = '1'; }
if(has_def_call == '1'){
  dialer_step = '6';
}
      if(has_video_call == '1'){
        // localStorage.setItem('has_video_dialer',)
        localStorage.setItem('has_video_dialer', has_video_call);

        let api_reqs:any = '{"type": "showDialer"}';
        this.serverService.showvedioDialer.next(api_reqs);
      } else {

        localStorage.setItem('has_video_dialer', has_video_call);
   

        let api_reqs:any = '{"type": "hideDialer"}';
        this.serverService.showvedioDialer.next(api_reqs);

      }
  
      formData.append('operation', 'agents');
      formData.append('moduleType', 'agents');
      formData.append('api_type', 'web');
      formData.append('action', 'admin_global_settings');
      formData.append('access_token', access_token);
      formData.append('logo_image', $('#logo_image')[0].files[0]);
      formData.append('small_logo_image', $('#small_logo_image')[0].files[0]);
      formData.append('user_id', user_id);
      formData.append('timezone_id', timezone_id);
      formData.append('show_caller_id', show_caller_id);
      formData.append('has_video_call', has_video_call);
      formData.append('ext_int_status',ext_int_status);
      formData.append('cli_status',has_cli_status);
      formData.append('has_contact_popup',has_contact_popup);
      formData.append('case_mgnt',has_case_mgnt);
      formData.append('dialer_ring',dialer_step);
      formData.append('webrtc_server',$('#webrtc_server').val());
  
  
      console.log(formData);
    
    $.ajax({  
      url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
      type : 'POST',
      data : formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false, 
      success:function(data){ 
        this.parsed_data = JSON.parse(data);
        console.log(this.parsed_data );
        if(this.parsed_data.status == 'true'){    
          iziToast.success({
            message: "Data Updated Successfully",
            position: 'topRight'
        });
        // $("#refresh_page").click();
        localStorage.setItem('show_caller_id', show_caller_id);
        localStorage.setItem('cli_status', has_cli_status);
        localStorage.setItem('has_contact_popup', has_contact_popup);
        localStorage.setItem('case_mgnt', has_case_mgnt);
        localStorage.setItem('ext_int_status',ext_int_status);
        localStorage.setItem('ring_step',dialer_step);
        localStorage.setItem('server_ID',$('#webrtc_server').val());
        // $("#checkring").click();

        //location.reload();
        } else {
          iziToast.error({
            message: "Sorry, Some Error Occured",
            position: 'topRight'
        });
        // history.go(-1);
        //location.reload();
        }
      }  
  });  
  
    }
  
checkring(){
  window.location.reload();

        // if(this.admin_id == '64' || this.admin_id== '1166')
}
setval(){
$('#incommingCalltone6')[0].pause();
$('#incommingCalltone0')[0].pause();
$('#incommingCalltone2')[0].pause();
$('#incommingCalltone3')[0].pause();
$('#incommingCalltone1')[0].pause();
  var has_def_ring = '0';  if($('#has_default_call').prop('checked')){ has_def_ring = '1'; }
// alert(has_def_ring);
if(has_def_ring == '1'){
$('#incommingCalltone6')[0].play();
$("#volume_step").attr('disabled','disabled');

// return false;
}
else{  
// alert('1223');
$("#volume_step").removeAttr('disabled');

  let data =$('#volume_step').val();
  if(data == '1'){
this.valume="Silent";
$('#incommingCalltone0')[0].play();
  }
  else if(data == '2'){
this.valume="Low";
$('#incommingCalltone1')[0].play();
  }
  else if(data == '3'){
this.valume="Medium";
$('#incommingCalltone2')[0].play();
  }
  else if(data == '4'){
    this.valume="High";
    $('#incommingCalltone3')[0].play();

      }
    }

}
    showCRMlink(crm){

      if(crm=="ext"){
        this.showurlsett=true;
      } else {
        this.showurlsett=false;
        $('#dailyfIframes').html('');
      }

    }
  
    updateCRMSet(){
      let access_token: any=localStorage.getItem('access_token');
      let user_id: any=localStorage.getItem('admin_id');
      this.external_contact_url =  $("#external_contact_url").val();
      this.has_external_contact = $("input[name='has_external_contact']:checked").val() ;
      var crm_type = $('#crm_type').val();
      let api_req:any = '{"operation":"agents","moduleType":"agents","api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"update_external_contact","user_id":"'+user_id+'","has_external_contact":"'+this.has_external_contact+'","external_contact_url":"'+this.external_contact_url+'","crm_type":"'+crm_type+'"}}';
      this.serverService.sendServer(api_req).subscribe((response:any) => {
        console.log(response);
        if(response.result.data == 1){
          localStorage.setItem('has_external_contact', this.has_external_contact);
          localStorage.setItem('external_contact_url', this.external_contact_url);
          localStorage.setItem('crm_type', crm_type);
          iziToast.success({
            message: "Updated successfully",
            position: 'topRight'
        });
        } 
      }, 
      (error)=>{
          console.log(error);
      });
    }

    crmType(){
      var crmType = $('#crm_type').val();
     
      if(crmType == 'HubSpot' ){
        this.showForZDesk = false;
        this.showForHubSpot = true;
        if(this.uadmin_id == '64'){
          this.external_contact_url = 'https://'+window.location.hostname+'/#/edit-contacts?q=hubSpot&hapikey=ed15f3fa-87c4-4169-a555-6bb845c257e9';
        }
        this.behaviourURL = 'https://'+window.location.hostname+'/#/edit-contacts?q=%CallerNumber%&hapikey=ed15f3fa-87c4-4169-a555-6bb845c257e9';
        $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://app.hubspot.com/login/" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
  
      } else if(crmType == 'SalesForce'){
        if(this.uadmin_id == '64'){
          this.external_contact_url = '';
        }
        this.behaviourURL = '?locale=in';
        $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://login.salesforce.com/?locale=in" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
      }else if(crmType == 'FreshDesk'){
        if(this.uadmin_id == '64'){
          this.external_contact_url = '';
        }
        this.behaviourURL = '?locale=in';
        $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://freshdesk.com/login" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
      } else if(crmType == 'FreshDesk'){
        if(this.uadmin_id == '64'){
          this.external_contact_url = '';
        }
        this.behaviourURL = '?locale=in';
        $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://freshdesk.com/login" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
      } else if(crmType == 'Insightly'){
        if(this.uadmin_id == '64'){
          this.external_contact_url = '';
        }
        this.behaviourURL = '?locale=in';
        $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://login.insightly.com/User/Login" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
      } else if(crmType == 'Shopify'){
        if(this.uadmin_id == '64'){
          this.external_contact_url = '';
        }
        this.behaviourURL = '?locale=in';
        $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://accounts.shopify.com/store-login" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
      } else if(crmType == 'Vtiger'){
        if(this.uadmin_id == '64'){
          this.external_contact_url = '';
        }
        this.behaviourURL = '?locale=in';
        $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://www.vtiger.com/log-in/" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
      } else if(crmType == 'Zendesk'){
        if(this.uadmin_id == '64'){
          this.external_contact_url = '';
        }
        this.behaviourURL = '?locale=in';
        $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://www.zendesk.com/login/" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
      } else if(crmType == 'Zoho'){
        if(this.uadmin_id == '64'){
          this.external_contact_url = '';
        }
        this.behaviourURL = 'https://'+window.location.hostname+'/#/edit-contacts?q=%CallerNumber%&authkey=<Authorization Key>&orgId=<orgId>';
        $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://www.zoho.com/desk/login.html" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
      } else if(crmType == 'ZohoDesk'){
        this.showForZDesk = true;
        this.showForHubSpot = false;
        if(this.uadmin_id == '64'){
          this.external_contact_url = 'https://'+window.location.hostname+'/#/edit-contacts?q=%CallerNumber%&authkey=cd8bc68182aec5ae48a9b60faab2f051&orgId=719234391';
          this.behaviourURL = 'https://'+window.location.hostname+'/#/edit-contacts?q=%CallerNumber%&authkey=cd8bc68182aec5ae48a9b60faab2f051&orgId=719234391';
        } else {
          this.behaviourURL = 'https://'+window.location.hostname+'/#/edit-contacts?q=%CallerNumber%&authkey=<Authorization Key>&orgId=<orgId>';
        }
        
        $('#dailyfIframes').html('<iframe class="dailyfIfram" src="https://www.zoho.com/desk/login.html" width="100%" height="800px" frameborder="0" allowfullscreen ></iframe>')
      }

      
    }


Update3cxFiles(){


  Swal.fire({
    title: 'Are you sure?',
    text: "Would you Like to Update it",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Update'
  }).then((result) => {
    if (result.value) {

  let chat_req:any = '{"action":"webClientUpdate"}';
  this.serverService.updateAllFiles(chat_req).subscribe((response:any) => {
  if(response.status==true){
    location.reload();
  }
}, 
(error)=>{
  console.log(error);
  setTimeout(() => { location.reload(); }, 100000);
}); 

}
});

}
get_current_ext(){
  let access_token: any = localStorage.getItem('access_token');
  let api_req:any='{"operation":"predective_dialer_contact","moduleType":"predective_dialer_contact","api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_cam_details"}}';
  this.serverService.sendServer(api_req).subscribe((response:any)=>{
    if(response.result.status==true){
      if(response.result.data.current_ext=='12345'){
        this.current_ext = '';
        this.queue_no = '';
        this.isShown=false;
      }else{
        this.current_ext = response.result.data.current_ext;
        this.queue_no = response.result.data.queue_no;
        this.isShown=true;
      }
      if(this.current_ext!='12345'){
      this.ext_form.setValue({
        'ext_num' : this.current_ext,
        'queue_num' : this.queue_no,
      })
    }
  }
},(error)=>{
  console.log(error);
});
}
get_dailer_file(){
  let api:any = '{"operation":"predective_dialer_contact","moduleType":"predective_dialer_contact","api_type": "web", "access_token":"'+localStorage.getItem('access_token')+'", "element_data":{"action":"get_zip_file"}}';
  this.serverService.sendServer(api).subscribe((res:any)=>{
if(res.result.status==true){
  if(res.result.data!=0){
    this.list = res.result.data
  }
}
  })
}
settings(){
  let ext_num = $("#number").val();
  if($('#number').val() == ''){
    iziToast.warning({
      message: "Please enter CFD number",
      position: 'topRight'
  });
  return false;
  }
  if(ext_num==12345){
    this.ext_form.value.queue_num='';
  }else{
  if(this.ext_form.value.queue_num==''||this.ext_form.value.queue_num==null||this.ext_form.value.queue_num=='null'){
    iziToast.warning({
      message: "Please enter queue number",
      position: 'topRight'
  });
  return false;
  }
}
  //alert(queue_no);
  let access_token: any = localStorage.getItem('access_token');
  let user_id=localStorage.getItem('userId');
  let api_req:any = '{"operation":"predective_dialer_contact","moduleType":"predective_dialer_contact","api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"pdc_settings","user_id":"'+user_id+'","ext_num":"'+ext_num+'","queue_no":"'+this.ext_form.value.queue_num+'"}}';
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    console.log(response);
    if(response.result.status==true){
      if(response.result.data=='Queue number not valid'){
        iziToast.warning({
          message: "Queue number not valid",
          position: 'topRight'
      });
      return false;
      }else{
      this.list = response.result.data;
      //this.isShown=true;
      this.get_current_ext();
      }
    //  alert(this.list)
      iziToast.success({
        message: "Updated successfully",
        position: 'topRight'
    });
    $('#number').val('');
    $('#queue_num').val('');
  } 
  }, 
  (error)=>{
      console.log(error);
  });

}

}


