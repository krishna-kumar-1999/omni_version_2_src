import { Component, OnInit } from '@angular/core';
import  Swal from 'sweetalert2';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-sso-settings',
  templateUrl: './sso-settings.component.html',
  styleUrls: ['./sso-settings.component.css']
})
export class SsoSettingsComponent implements OnInit {
  SsoReplyURl;
  admin_id;
  generateAccessTok;
  agents_list;
  userchecked;
  omni_users;
  teams_users;
  omnichecked;
  teamschecked;
  sso_entity_id;
  sso_reply_url;
  azure_ad_id;

  shownbutton = false;
  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.admin_id = localStorage.getItem('admin_id');

    this.msSSODetails();
    // this.SsoReplyURl='https://'+window.location.hostname+'/ms-sso/simplesamlphp/www/';
    this.SsoReplyURl="https://"+window.location.hostname+":4003/ms-sso/simplesamlphp/www/";
    this.sso_reply_url="https://"+window.location.hostname+":4003/ms-sso/simplesamlphp/www/";
    // this.SsoReplyURl="https://updates.mconnectapps.com/"+localStorage.getItem('company_name')+"/ms-sso/simplesamlphp/www/";
    // this.sso_reply_url="https://updates.mconnectapps.com/"+localStorage.getItem('company_name')+"/ms-sso/simplesamlphp/www/";
    this.getAgentsList();
    this.StartPopup();
  }
  
  activateSSO(){
    let access_token: any=localStorage.getItem('access_token'); 
    let admin_id: any=localStorage.getItem('admin_id');  
    //  if((<HTMLInputElement>document.getElementById('federation_metadata_xml')).value != null){
    //   var ins = (<HTMLInputElement>document.getElementById('federation_metadata_xml')).files.length;
    //   console.log(ins)
    //       for (var x = 0; x < ins; x++) {
    //         formData.append("federation_metadata_xml", (<HTMLInputElement>document.getElementById('federation_metadata_xml')).files[x]);
    //       }
    //     }else{
    //       iziToast.warning({
    //               message: "Please add Federation Metadata XML File",
    //                position: 'topRight'
    //            });
    //     }
  console.log($('#federation_metadata_xml')[0].files[0]);
    if( $('#federation_metadata_xml')[0].files[0] == undefined ||  $('#federation_metadata_xml')[0].files[0] == null){

      iziToast.warning({
        message: "Please add Federation Metadata XML File",
        position: 'topRight'
    });

    return false;
    }

    let agent_req:any = new Object();
    // agent_req.sso_entity_id=$("#sso_entity_id").val();
    // agent_req.sso_reply_url=$("#sso_reply_url").val();
    // agent_req.azure_ad_id=$("#azure_ad_id").val();
    // sso_entity_id;
    // sso_reply_url;
    // azure_ad_id;

    agent_req.sso_entity_id= this.sso_entity_id;
    agent_req.sso_reply_url= this.sso_reply_url;
    agent_req.azure_ad_id=this.azure_ad_id;
    agent_req.admin_id=admin_id;
 
    agent_req.admin_id=admin_id;
    // alert(this.sso_entity_id)
    // alert(this.sso_reply_url)
    // alert(this.azure_ad_id)
    // return false;
    var formData = new FormData();
    var json_arr = JSON.stringify(agent_req);
    console.log(json_arr)
    formData.append('operation', 'zohocrm');
    formData.append('moduleType', 'zohocrm');
    formData.append('api_type', 'web');
    formData.append('action', 'activateSSO');
    formData.append('access_token', access_token);
    formData.append('federation_metadata_xml', $('#federation_metadata_xml')[0].files[0]);
    formData.append('element_data', json_arr);


    //console.log(formData); return false;
  
  $.ajax({  
    url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
    type : 'POST',
    data : formData,
    processData: false,  // tell jQuery not to process the data
    contentType: false, 
    success:function(data){ 
      this.parsed_data = JSON.parse(data);
      console.log(this.parsed_data );
      iziToast.success({
        message: "Added successfully",
        position: 'topRight'
    });
    this.msSSODetails();
    this.StartPopup();
    }  
});  

  }

  msSSODetails(){  
    let access_tokens: any=localStorage.getItem('access_token'); 
    let admin_id: any=localStorage.getItem('admin_id');   
    let api_req:any = '{"operation":"zohocrm", "moduleType":"zohocrm", "api_type": "web", "access_token":"'+access_tokens+'","element_data":{"action":"listSSO","admin_id":"'+admin_id+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      console.log(response);
      if(response.result){
        var data = response.result.data[0];
        console.log(data);
        this.generateAccessTok = true;
        // $("#sso_entity_id").val(data.sso_entity_id);
        // $("#sso_reply_url").val(data.sso_reply_url);
        // $("#azure_ad_id").val(data.azure_ad_id);

        this.sso_entity_id = data.sso_entity_id;
        if(data.sso_reply_url)
        this.sso_reply_url = data.sso_reply_url;
        this.azure_ad_id = data.azure_ad_id;



        //alert(data.access_token)          
      } 
    }, 
    (error)=>{
        console.log(error);
    });
  }
  getAgentsList(){
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="user_list";
    agents_req.user_id=localStorage.getItem('userId');
      agents_req.search_text='';
      agents_req.order_by_name='user.user_id';
      agents_req.order_by_type='desc';
      agents_req.limit=100;
      agents_req.offset=0;
    api_req.operation="agents";
    api_req.moduleType="agents";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    
      this.serverService.sendServer(api_req).subscribe((response:any) => {
        this.agents_list=response.result.data.list_data;
      let api_data:any = '{"type":"3cx_list"}';
      this.serverService.showvedioDialer.next(api_data);
    
      }, 
      (error)=>{
          console.log(error);
      });
    
    
  }
  getAddeduser(){
  
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="ssoUsers";
    agents_req.admin_id=this.admin_id
     
    api_req.operation="zohocrm";
    api_req.moduleType="zohocrm";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
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
      this.serverService.sendServer(api_req).subscribe((response:any) => {
      Swal.close();
          this.omni_users=response.result.data.omni_users;
          this.teams_users=response.result.data.teams_users;
          if(response.result.data.omni_main_users !=null&&response.result.data.omni_main_users!='null'&&response.result.data.omni_main_users!='')
          this.omnichecked = response.result.data.omni_main_users.split(",");
          if(response.result.data.teams_main_users !=null&&response.result.data.teams_main_users!='null'&&response.result.data.teams_main_users!='')
          this.teamschecked = response.result.data.teams_main_users.split(",");
        }, 
      (error)=>{
          console.log(error);
      });
  }
  AddOmniUser(){
   
    var omni_users = $('.ads_Checkbox_omni:checked').map(function(){
      return this.value;
  }).get();
  omni_users = omni_users.join();

  if(omni_users=='' || omni_users ==null || omni_users==undefined){
    iziToast.warning({
      message: "Please select the users",
      position: 'topRight'
  });
  return false
  }
  let api_req:any = new Object();
  let agents_req:any = new Object();
  agents_req.action="addMSOmniUsers";
  agents_req.admin_id=this.admin_id;
  agents_req.users=omni_users;
   
  api_req.operation="zohocrm";
  api_req.moduleType="zohocrm";
  api_req.api_type="web";
  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = agents_req; 
    $('#addAgentSSO').modal('hide');

  Swal.fire({
    html:
      '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
  showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    background: 'transparent', 

  }); 
    this.serverService.sendServer(api_req).subscribe((response:any) => {
    Swal.close();
      if (response.result.data == true) {
        iziToast.success({
            message: "Updated successfully",
            position: 'topRight'
        });
        this.getAddeduser();
    } else {
    
        iziToast.warning({
            message: "Sorry not updated. Please try again",
            position: 'topRight'
        });
}
    }, 
    (error)=>{
        console.log(error);
    });
  }
  slectAllQue(){
  if($("#selectAllQ").prop("checked")) {
    $(".ads_Checkbox_omni").prop("checked", true);
} else {
    $(".ads_Checkbox_omni").prop("checked", false);
} 
}
slectuniqueque(){
  $("#selectAllQ").prop("checked", false);
}



StartPopup(){

  let access_token: any=localStorage.getItem('access_token');
  // {"operation":"contact","moduleType":"contact","api_type":"web","access_token":"","element_data":{"action":"has_activation_teams","admin_id":"1429"}}

  let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"has_activation_teams","admin_id":"'+this.admin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {

    if(response.result.status == true){
      


      if(response.result.data.sso == '1'){

        this.shownbutton = true;

      }

    }

  }, 
  (error)=>{
      console.log(error);
  });


}


AddTeamsUser(){
  var team_users = $('.ads_Checkbox_teams:checked').map(function(){
    return this.value;
}).get();
team_users = team_users.join();


if(team_users=='' || team_users ==null || team_users==undefined){
  iziToast.warning({
    message: "Please select the users",
    position: 'topRight'
});
return false
}

let api_req:any = new Object();
let agents_req:any = new Object();
agents_req.action="addMSTeamsUsers";
agents_req.admin_id=this.admin_id;
agents_req.users=team_users;
 
api_req.operation="zohocrm";
api_req.moduleType="zohocrm";
api_req.api_type="web";
api_req.access_token=localStorage.getItem('access_token');
api_req.element_data = agents_req;
      $('#addAgentTeams').modal('hide');

Swal.fire({
  html:
    '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
showCloseButton: false,
  showCancelButton: false,
  showConfirmButton: false,
  focusConfirm: false,
  background: 'transparent',


}); 
  this.serverService.sendServer(api_req).subscribe((response:any) => {
  Swal.close();
    if (response.result.data == true) {
      iziToast.success({
          message: "Updated successfully",
          position: 'topRight'
      });
      this.getAddeduser();
  } else {
  
      iziToast.warning({
          message: "Sorry not updated. Please try again",
          position: 'topRight'
      });
}
  }, 
  (error)=>{
      console.log(error);
  });
}
slectAllagent(){
  if($("#slectAllagent").prop("checked")) {
    $(".ads_Checkbox_teams").prop("checked", true);
} else {
    $(".ads_Checkbox_teams").prop("checked", false);
} 
}
slectuniqueagent(){
  $("#slectAllagent").prop("checked", false);
}
// activtemaintab(){   
// alert('1')
//   $("#agentsQueue").removeClass("active");
//   $("#mainTab").addClass("active");

// }
}
