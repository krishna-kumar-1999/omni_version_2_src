import { Component, OnInit } from '@angular/core';
import  Swal from 'sweetalert2';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
declare var CryptoJS:any;
@Component({
  selector: 'app-sso-settings-clone',
  templateUrl: './sso-settings-clone.component.html',
  styleUrls: ['./sso-settings-clone.component.css']
})
export class SsoSettingsCloneComponent implements OnInit {
  SsoReplyURl;
  admin_id;
  generateAccessTok;
  agents_list;
  userchecked;
  omni_users1;
  teams_users1;
  omnichecked;
  teamschecked;
  company_name;

  // has_teams;
  teams_access_id;//just encrypted values of domain
  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.admin_id = localStorage.getItem('admin_id');
    this.company_name = localStorage.getItem('company_name');
    // this.has_teams = localStorage.getItem('has_teams');
    this.msSSODetails();
    this.SsoReplyURl='https://'+window.location.hostname+'/'+this.company_name+'/ms-sso/simplesamlphp/www/';
    // this.SsoReplyURl='https://omni.mconnectapps.com/RVTest1/ms-sso/simplesamlphp/www/';
    this.getAgentsList();
 //   this.encryptAES('Selva','Cal4care');
  }
  activateSSO(){
    let access_token: any=localStorage.getItem('access_token'); 
    let admin_id: any=localStorage.getItem('admin_id');   

    if( $('#clone_federation_metadata_xml')[0].files[0] == undefined ||  $('#clone_federation_metadata_xml')[0].files[0] == null){

      iziToast.warning({
        message: "Please add Federation Metadata XML File",
        position: 'topRight'
    });

    return false;
    }


    let agent_req:any = new Object();
    agent_req.sso_entity_id=$("#clone_sso_entity_id").val();
    agent_req.sso_reply_url=$("#clone_sso_reply_url").val();
    agent_req.azure_ad_id=$("#clone_azure_ad_id").val();
    agent_req.admin_id=admin_id;
    agent_req.company_name=this.company_name;
    var formData = new FormData();
    var json_arr = JSON.stringify(agent_req);
    console.log(json_arr)
    formData.append('operation', 'zohocrm');
    formData.append('moduleType', 'zohocrm');
    formData.append('api_type', 'web');
    formData.append('action', 'activateSSO');
    formData.append('access_token', access_token);
    formData.append('federation_metadata_xml', $('#clone_federation_metadata_xml')[0].files[0]);
    formData.append('element_data', json_arr);


    //console.log(formData); return false;
  
  $.ajax({  
    url:"https://omni.mconnectapps.com/api/v1.0/index_new.php",  
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
        $("#clone_sso_entity_id").val(data.sso_entity_id);
        $("#clone_sso_reply_url").val(data.sso_reply_url);
        $("#clone_azure_ad_id").val(data.azure_ad_id);
        //alert(data.access_token)  
        //Just added to show DB value URL instead of localDomain 
        if(data.sso_reply_url){
          this.SsoReplyURl=data.sso_reply_url;
        }       
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
      
          
    
      }, 
      (error)=>{
          console.log(error);
      });
    
    
  }
  getAddeduser(){
     this.getAgentsList();
    let api_req:any = new Object();
    let agents_req:any = new Object();

   
//alert(this.has_teams);


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
          this.omni_users1=response.result.data.omni_users;
          this.teams_users1=response.result.data.teams_users;
          // this.teams_access_id= JSON.parse(response.result.data.team_access_data);
          this.teams_access_id= this.encryptAES(response.result.data.team_access_data,'domainEnCryPtion');
       
          if(response.result.data.omni_main_users)
          this.omnichecked = response.result.data.omni_main_users.split(",");
          if(response.result.data.teams_main_users)
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
    $('#clone_addAgentSSO').modal('hide');

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
  if($("#clone_selectAllQ").prop("checked")) {
    $(".ads_Checkbox_omni").prop("checked", true);
} else {
    $(".ads_Checkbox_omni").prop("checked", false);
} 
}
slectuniqueque(){
  $("#clone_selectAllQ").prop("checked", false);
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
      $('#clone_addAgentTeams').modal('hide');

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
  if($("#clone_slectAllagent").prop("checked")) {
    $(".ads_Checkbox_teams").prop("checked", true);
} else {
    $(".ads_Checkbox_teams").prop("checked", false);
} 
}
slectuniqueagent(){
  $("#clone_slectAllagent").prop("checked", false);
}

encryptAES = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString();
  // alert(encrypt);
};
}
