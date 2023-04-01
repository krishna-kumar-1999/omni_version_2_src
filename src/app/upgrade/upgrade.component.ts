import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  hasUpdate = false;
  hasUpdateMrvoip = false;
  hasUpdatewebRTC=false;
  hasUpdateVersion;
  mrvoipUpdatedVersion;
  currentVersion;
  logoomni = localStorage.getItem('logo_image');
  Omni_version;
  Mrvoip_version;
  omni_license_key;
  mrvoip_license_key;
  mrvoip_api_UpdatedVersion;
  hasUpdateMrvoip_api = false
  constructor(private serverService: ServerService, public router:Router) { }

  ngOnInit(): void {
    this.mrvoip_api_version();
    this.checkForUpdate();
    this.currentVersionMrvoip();
    this.omni_license_key = localStorage.getItem('license_key');
    this.mrvoip_license_key = localStorage.getItem('mrvoip_license_key');
    var domain_webrtc='https://'+window.location.hostname+':4001/update-webrtc.php';
    this.doesFileExist(domain_webrtc);
    
  }



  updateME(ver){
    Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;">Please Wait...<div class="pong-loader"></div></div>',
		showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent'
		});
    let chat_req:any = '{"action":"versionUpdate","ver":"'+ver+'"}';
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


checkForUpdates(){
  let access_token: any=localStorage.getItem('access_token');
  let curVersion: any=localStorage.getItem('curVersion');

  var url = window.location.hostname;
  let api_req:any = '{"action":"serverVersion","domain":"'+url+'","currentV":"'+curVersion+'"}';
  console.log(api_req);
  this.serverService.updateAllFiles(api_req).subscribe((response:any) => {

    if(response.status==true){
      this.hasUpdateVersion = response.data;
      this.hasUpdate = true;
    } else{
      // alert('Updated app is running');      
    }
  }, 
  (error)=>{
      console.log(error);
  });  
}



versionUpdate(){
  let access_token: any=localStorage.getItem('access_token');
  let curVersion: any=localStorage.getItem('curVersion');
  var url = window.location.hostname;
  // var url = 'omnidemo.3cx.asia';
  let api_req:any = '{"action":"serverVersion","domain":"'+url+'","currentV":"'+curVersion+'"}';
  this.serverService.updateAllFiles(api_req).subscribe((response:any) => {
    if(response.status==true){
      this.updateME(response.data);
    } else{
    }
  }, 
  (error)=>{
    console.log(error);
  });  
}



// =============================== MR VOIP UPDATE FUNCTIONS =====================================

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

mrvoip_api_version(){
  var url = window.location.hostname;
  let api_req:any = '{"action":"currVersion","domain":"'+url+'"}';
  this.serverService.update_mrvoip_api(api_req).subscribe((response:any)=>{
    localStorage.setItem('mrvoip_api_curVersion',response.currentversion);
    localStorage.setItem('mrvoip_api_nextVersion',response.nextversion);
    this.mrvoip_api_update();
  })
}
mrvoip_api_update(){
  let curVersion: any=localStorage.getItem('mrvoip_api_curVersion');
   var url = window.location.hostname;
  //var url = "c4cteams.my3cx.sg";
  let api_req:any = '{"action":"serverVersion_api","domain":"'+url+'","currentV":"'+curVersion+'"}';
  this.serverService.update_mrvoip_api(api_req).subscribe((response:any)=>{
    if(response.status==true){
      this.mrvoip_api_UpdatedVersion = response.data;
      this.hasUpdateMrvoip_api = true;
  } else{
  }
  })
}

// updatemrvoipZoho(){

//   Swal.fire({
//     html:
//     '<div style="display: flex;justify-content: center;">Please Wait...<div class="pong-loader"></div></div>',
//     showCloseButton: false,
//     showCancelButton: false,
//     showConfirmButton: false,
//     focusConfirm: false,
//     background: 'transparent'
//   });
//   let chat_req:any = '{"action":"versionUpdateZoho"}';
//   this.serverService.updateAllMrvoip(chat_req).subscribe((response:any) => {
//       if(response.status==true){
//         location.reload();
//       }
//   }, 
//   (error)=>{
//     console.log(error);
//     setTimeout(() => { location.reload(); }, 100000);
//   }); 

// }
updateMEMrvoip_api(){
  let ver: any=localStorage.getItem('mrvoip_api_nextVersion');
  Swal.fire({
    html:
    '<div style="display: flex;justify-content: center;">Please Wait...<div class="pong-loader"></div></div>',
    showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    background: 'transparent'
  });
  let chat_req:any = '{"action":"versionUpdate_api","ver":"'+ver+'"}';
  this.serverService.update_mrvoip_api(chat_req).subscribe((response:any) => {
      if(response.status==true){
        location.reload();
      }
  }, 
  (error)=>{
    console.log(error);
    setTimeout(() => { location.reload(); }, 100000);
  }); 
}

updateMEMrvoip(){
  let ver: any=localStorage.getItem('mrvoipnextVersion');
  Swal.fire({
    html:
    '<div style="display: flex;justify-content: center;">Please Wait...<div class="pong-loader"></div></div>',
    showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    background: 'transparent'
  });
  let chat_req:any = '{"action":"versionUpdate","ver":"'+ver+'"}';
  this.serverService.updateAllMrvoip(chat_req).subscribe((response:any) => {
      if(response.status==true){
        location.reload();
      }
  }, 
  (error)=>{
    console.log(error);
    setTimeout(() => { location.reload(); }, 100000);
  }); 
}





versionUpdateMrvoip(){
  let access_token: any=localStorage.getItem('access_token');
  let curVersion: any=localStorage.getItem('mrvoipcurVersion');
  var url = window.location.hostname;
  let api_req:any = '{"action":"serverVersion","domain":"'+url+'","currentV":"'+curVersion+'"}';
  this.serverService.updateAllMrvoip(api_req).subscribe((response:any) => {
    if(response.status==true){
        this.mrvoipUpdatedVersion = response.data;
        this.hasUpdateMrvoip = true;
    } else{
    }
  }, 
  (error)=>{
    console.log(error);
  });  
}
updatewebRTC(){   
  Swal.fire({
    html:
    '<div style="display: flex;justify-content: center;">Please Wait...<div class="pong-loader"></div></div>',
    showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    background: 'transparent'
  });
  let chat_req:any = '{"action":"updateWebrtc"}';
  this.serverService.updateAllwebRTC(chat_req).subscribe((response:any) => {
      if(response.status==true){
        location.reload();
      }
  }, 
  (error)=>{
    console.log(error);
    setTimeout(() => { location.reload(); }, 100000);
  }); 
}
 doesFileExist(urlToFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', urlToFile, false);
  xhr.send();
   
  if (xhr.status != 404) {
     this.hasUpdatewebRTC=true;
  }  
}
}
