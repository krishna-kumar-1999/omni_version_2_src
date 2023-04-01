import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-webinar-settings',
  templateUrl: './webinar-settings.component.html',
  styleUrls: ['./webinar-settings.component.css']
})
export class WebinarSettingsComponent implements OnInit {
  queue_list;
  recordNotFound = false;
  api_token;
  country;
  created_dt;
  extension_number;
  fqdn;
  id;
  uadmin_id;
  subscribers_limit;
  countries;json;
  constructor(private serverService: ServerService) { }


  ngOnInit() {
    this.uadmin_id = localStorage.getItem('admin_id');

    this.pbc_settings();
    this.get_countries();
   }

   
pbc_settings(){
  let access_token: any=localStorage.getItem('access_token');

  let api_req:any = '{"operation":"getConfiguration", "moduleType": "webinar_configuration", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_configuration","admin_id":"'+this.uadmin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.status==true){
      this.api_token = response.result.data.api_token;
      this.created_dt = response.result.data.created_dt;
      this.extension_number = response.result.data.extension_number;
      this.fqdn = response.result.data.fqdn;
      this.id = response.result.data.id;
      this.subscribers_limit =response.result.data.subscribers_limit;
 
      this.country = response.result.data.country;
// alert(this.country);
      $('#country').val(this.country);
      
      this.recordNotFound = false;
    } 
    
    if(response.result.data==false){
      this.recordNotFound = true;
    }
  }, 
  (error)=>{
      console.log(error);
  });
}

get_countries(){
  let access_token: any=localStorage.getItem('access_token');

  let api_req:any = '{"operation":"getConfiguration", "moduleType": "webinar_configuration", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_countries"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.status==true){
     
      this.countries=response.result.data;
      
     
    } 
    
    
  }, 
  (error)=>{
      console.log(error);
  });
}


editPbc(){
  $('#edit_pbxform').modal('show');
  $('#country').val(this.country);

}

updtaeConf(){

  let access_token: any=localStorage.getItem('access_token');
  var subscribers_limit = $('#subscribers_limit').val();
  var fqdn = $('#fqdn').val();
  var api_token = $('#api_token').val();
  var extension_number = $('#extension_number').val();
  var country = $('#country').val();

if(fqdn == ''|| fqdn==undefined){
  iziToast.warning({
    message: "Please fill fqdn",
    position: 'topRight'
});
return false;
}
if(extension_number == ''|| extension_number==undefined){
  iziToast.warning({
    message: "Please fill extension number",
    position: 'topRight'
});
return false;
}if(api_token == ''|| api_token==undefined){
  iziToast.warning({
    message: "Please fill api token",
    position: 'topRight'
});
return false;
}if(subscribers_limit == ''|| subscribers_limit==undefined){
  iziToast.warning({
    message: "Please fill subscribers limit",
    position: 'topRight'
});
return false;
}if(country == ''|| country==undefined){
  iziToast.warning({
    message: "Please fill country",
    position: 'topRight'
});
return false;
}



  let api_req:any = '{"operation":"insertConfiguration", "moduleType": "webinar_configuration", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"insert_configuration","admin_id":"'+this.uadmin_id+'","fqdn":"'+fqdn+'","api_token":"'+api_token+'","extension_number":"'+extension_number+'","country":"'+country+'","subscribers_limit":"'+subscribers_limit+'"}}';

      this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.data == 1) {
              $('#edit_pbxform').modal('hide');
              this.pbc_settings();
              this.get_countries();
              iziToast.success({
                  message: "Webinar configuration updated successfully",
                  position: 'topRight'
              });
          }
      else{
          
              iziToast.warning({
                  message: "Not updated. Please try again",
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

addpbx(){
  $('#add_pbxform').modal('show');
}



addConf(){

  let access_token: any=localStorage.getItem('access_token');
  var subscribers_limit = $('#a_subscribers_limit').val();
  var fqdn = $('#a_fqdn').val();
  var api_token = $('#a_api_token').val();
  var extension_number = $('#a_extension_number').val();
  var country = $('#a_country').val();

if(fqdn == ''|| fqdn==undefined){
  iziToast.warning({
    message: "Please fill fqdn",
    position: 'topRight'
});
return false;
}
if(extension_number == ''|| extension_number==undefined){
  iziToast.warning({
    message: "Please fill extension number",
    position: 'topRight'
});
return false;
}if(api_token == ''|| api_token==undefined){
  iziToast.warning({
    message: "Please fill api token",
    position: 'topRight'
});
return false;
}if(subscribers_limit == ''|| subscribers_limit==undefined){
  iziToast.warning({
    message: "Please fill subscribers limit",
    position: 'topRight'
});
return false;
}if(country == ''|| country==undefined){
  iziToast.warning({
    message: "Please fill country",
    position: 'topRight'
});
return false;
}



  let api_req:any = '{"operation":"insertConfiguration", "moduleType": "webinar_configuration", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"insert_configuration","admin_id":"'+this.uadmin_id+'","fqdn":"'+fqdn+'","api_token":"'+api_token+'","extension_number":"'+extension_number+'","country":"'+country+'","subscribers_limit":"'+subscribers_limit+'"}}';

      this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.data == 1) {
              $('#add_pbxform').modal('hide');
              this.pbc_settings();
              this.get_countries();
              iziToast.success({
                  message: "Webinar configuration updated successfully",
                  position: 'topRight'
              });
          }
      else{
          
              iziToast.warning({
                  message: "Not updated. Please try again",
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
    }

  }, 
  (error)=>{
      console.log(error);
  });
      }
    })
  }
}

