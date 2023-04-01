import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pbc-settings',
  templateUrl: './pbc-settings.component.html',
  styleUrls: ['./pbc-settings.component.css']
})
export class PbcSettingsComponent implements OnInit {
  queue_list;
  recordNotFound = false;
  addPbx: FormGroup;
  editPbx: FormGroup;
  old_sip_url;
  uadmin_id;
  pbx_count;
  queue_length;

  bridge_list;
  bridge_key_id;
  websocket;
  user_type;
  hardware_id;
  bridge_agents;
  concurrence:any;
  bridgerecordNotFound=false;
  constructor(private serverService: ServerService,public router: Router) { }


  ngOnInit() {
    this.uadmin_id = localStorage.getItem('admin_id');
    this.hardware_id = localStorage.getItem('hardware_id');     

    this.addPbx = new FormGroup({
     'sip_port' : new FormControl(null),
     'sip_url' : new FormControl(null),
     'status':  new FormControl(null),
     'concurrency': new FormControl(null)
    });
 
 
     this.editPbx = new FormGroup({
      'sip_port' : new FormControl(null),
      'sip_url' : new FormControl(null),
      'status':  new FormControl(null),
      'concurrency': new FormControl(null)
    });
    this.pbc_settings();
    this.pbc_details();
    this.getBridges();
    this.initsocket()
   }
   initsocket() {
   

    this.user_type = localStorage.getItem('user_type');   


  
      this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");
  

    this.websocket.onopen = function (event) {
     
    }

    this.websocket.onmessage = function (event) {
      // console.log(event.data);
      var result_message = JSON.parse(event.data);
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

pbc_settings(){
  let access_token: any=localStorage.getItem('access_token');

  let api_req:any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_pbx_settings","user_id":"'+this.uadmin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.status==true){
      this.queue_list = response.result.data;
      this.concurrence =  response.result.data[0].concurrence_count;
      this.queue_length = Object.keys(response.result.data).length;;
    } else {
      this.recordNotFound = true;
    }
  }, 
  (error)=>{
      console.log(error);
  });
}


pbc_details(){
  let access_token: any=localStorage.getItem('access_token');

  let api_req:any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_pbx_details","user_id":"'+this.uadmin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.status==true){
   this.pbx_count = response.result.data[0].pbx_count;
    } 
  }, 
  (error)=>{
      console.log(error);
  });
}

editPbc(pbx){
  let access_token: any=localStorage.getItem('access_token');
  let api_req:any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_single_pbx_settings","pbx_id":"'+pbx+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.status==true){
      var agent_data = response.result.data[0];
      this.editPbx.setValue({
         'sip_port' : agent_data.sip_port,
         'sip_url' : agent_data.sip_url,
         'status' : agent_data.status,
         'concurrency' : agent_data.concurrence_count,
     });
     this.old_sip_url = pbx;

     if(agent_data.status == 1){
      $('#status').prop('checked', true);
     } else {
      $('#status').prop('checked', false);
     }

     $('#edit_pbxform').modal('show');
     this.pbc_settings();
    }   else{
            
      iziToast.warning({
          message: "PBX data could not retrive. Please try again",
          position: 'topRight'
      });
  
}
  }, 
  (error)=>{
      console.log(error);
  });
}

addpbx(){
  $('#add_pbxform').modal('show');
}
editPbxData(main_url){
console.log(main_url);

  let agent_req:any = this.editPbx.value;
  console.log(agent_req.sip_id)
  let access_token: any=localStorage.getItem('access_token');

  let api_req:any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"edit_single_pbx_settings","sip_port":"'+agent_req.sip_port+'","sip_url":"'+agent_req.sip_url+'","concurrence":"'+agent_req.concurrency+'","edit_fom_url":"'+main_url+'","admin_id":"'+this.uadmin_id+'"}}';

      this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == 1) {
              $('#edit_pbxform').modal('hide');
              this.pbc_settings();
              iziToast.success({
                  message: "PBX updated successfully",
                  position: 'topRight'
              });
          }
      else{
          
              iziToast.warning({
                  message: "PBX not updated. Please try again",
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



addPbxData(){
    let agent_req:any = this.addPbx.value;
    console.log(agent_req.sip_id)
    let access_token: any=localStorage.getItem('access_token');
  
    let api_req:any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"add_single_pbx_settings","sip_port":"'+agent_req.sip_port+'","sip_url":"'+agent_req.sip_url+'","admin_id":"'+this.uadmin_id+'"}}';
  
        this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.result.status == 1) {
                $('#add_pbxform').modal('hide');
              
                iziToast.success({
                    message: "PBX added successfully",
                    position: 'topRight'
                });
                this.pbc_settings();
            }
        else{
            
                iziToast.warning({
                    message: "PBX not updated. Please try again",
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

  deletedata(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        let access_token: any=localStorage.getItem('access_token');
        let admin_id: any=localStorage.getItem('admin_id');
  let api_req:any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_pbx","id":"'+id+'","admin_id":"'+admin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.data==1){
      Swal.fire(
        'Deleted!',
        'success'
      );
      this.pbc_settings();
      this.pbc_details();
    }

  }, 
  (error)=>{
      console.log(error);
  });
      }
    })
  }

  // ..................................Phone Bridges>................................
  getBridges(){
    Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent'
		});
  let access_token: any=localStorage.getItem('access_token');

  let api_req:any = '{"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"listPhoneBridge","user_id":"'+this.uadmin_id+'","admin_id":"'+this.uadmin_id+'","limit":"50","offset":"0"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    Swal.close();
    if(response.result.status==true){
   this.bridge_list = response.result.data.list_info;
    } 
  }, 
  (error)=>{
      console.log(error);
  });
}
  addbridgeData(){  
    let access_token: any=localStorage.getItem('access_token');
    let ip_address=$('#ip_address').val();
    let bridge_sip_url=$('#bridge_sip_url').val();
    let bridge_sip_port=$('#bridge_sip_port').val();
    if(ip_address==''||ip_address==null||ip_address=='undefined'){
      iziToast.warning({
        message:"Please Add PBX IP",
        position:"topRight"
      });
      return false;
    }
    Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent'
		});
    let api_req:any = '{"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"addPhoneBridge","sip_port":"'+bridge_sip_port+'","ip_address":"'+ip_address+'","sip_url":"'+bridge_sip_url+'","user_id":"'+this.uadmin_id+'","admin_id":"'+this.uadmin_id+'"}}';
  
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          Swal.close();
        if (response.result.status == 1) {
                $('#addBridge').modal('hide');
                $('#ip_address').val('');
                $('#bridge_sip_url').val('');
                $('#bridge_sip_port').val('');
                iziToast.success({
                    message: "Phone bridge added successfully",
                    position: 'topRight'
                });
                this.getBridges();

                var socket_message = '[{"cust_id":"' + this.hardware_id + '","data":[{"Name":"getbridgedet","pbxip":"' + ip_address + '"}]}]';
                this.websocket.send(socket_message);
            }
        else{
            
                iziToast.warning({
                    message: "Bridge not updated. Please try again",
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
  editBridge(pbx){
    Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent'
		});
    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"editPhoneBridge","key_id":"'+pbx+'","admin_id":"'+this.uadmin_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      Swal.close();
      $('#updateBridge').modal('show');
      if(response.result.status==true){
        var agent_data = response.result.data;  
       $('#up_ip_address').val(agent_data.ip_address);
       $('#up_bridge_sip_url').val(agent_data.sip_url);
       $('#up_bridge_sip_port').val(agent_data.sip_port);  
     
       this.bridge_key_id=agent_data.id;
      }  else{
              
        iziToast.warning({
            message: "PBX data could not retrive. Please try again",
            position: 'topRight'
        });
    
  }
    }, 
    (error)=>{
        console.log(error);
    });
  }
  updateBridge(){   
    Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent'
		}); 
    let ip_address=$('#up_ip_address').val();
    let bridge_sip_url=$('#up_bridge_sip_url').val();
    let bridge_sip_port=$('#up_bridge_sip_port').val();
      let access_token: any=localStorage.getItem('access_token');    
      let api_req:any = '{"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"updatePhoneBridge","user_id":"'+this.uadmin_id+'","admin_id":"'+this.uadmin_id+'","ip_address":"'+ip_address+'","sip_url":"'+bridge_sip_url+'","sip_port":"'+bridge_sip_port+'","key_id":"'+this.bridge_key_id+'"}}';
          this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();

          if (response.result.status == 1) {
                  $('#updateBridge').modal('hide');
                  this.getBridges();
                  iziToast.success({
                      message: "Bridge updated successfully",
                      position: 'topRight'
                  });
                  var socket_message = '[{"cust_id":"' + this.hardware_id + '","data":[{"Name":"getbridgedet","pbxip":"' + ip_address + '"}]}]';
                  this.websocket.send(socket_message);
              }
          else{
                  iziToast.warning({
                      message: "Sorry, not updated. Please try again",
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
    deletebridges(id,ip){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          let access_token: any=localStorage.getItem('access_token');
          let admin_id: any=localStorage.getItem('admin_id');
    let api_req:any = '{"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"deletePhoneBridge","key_id":"'+id+'","admin_id":"'+admin_id+'","ip_address":"'+ip+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.data==1){
        Swal.fire(
          'Deleted!',
          'success'
        );
      this.getBridges();
      }
  
    }, 
    (error)=>{
        console.log(error);
    });
        }
      })
    }
viewBridgeDetails(id){
  Swal.fire({
    html:
      '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
  showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    background: 'transparent'
  }); 
  let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"view_phone_bridge_users","ip_address":"'+id+'","admin_id":"'+this.uadmin_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      Swal.close();

      if(response.status=='true'){   
        this.bridge_agents=response.agents;
    $('#ViewBridge').modal({"backdrop": "static"});
     this.bridgerecordNotFound = this.bridge_agents == null ? true : false;

      }
  
    }, 
    (error)=>{
        console.log(error);
    });
}
}
