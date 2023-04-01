import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';
import { DialpadComponent } from '../mc/dialpad/dialpad.component';
declare var $:any;
declare var iziToast:any;
declare var medi: any;
declare var dialPadOpen: any;
@Component({
  selector: 'app-campaign-contact-popup',
  templateUrl: './campaign-contact-popup.component.html',
  styleUrls: ['./campaign-contact-popup.component.css']
})
export class CampaignContactPopupComponent implements OnInit {
  param1;
  editData;
  campaigns;
  phoneLists;
  listPhones =true;
  showDetails = false;
  campNAme;
  contact_id;
  auxcodes;
  constructor(private serverService: ServerService, private router:Router,private route: ActivatedRoute, private sanitizer: DomSanitizer) { 
    this.param1 = this.route.snapshot.queryParamMap.get('phone'); 
  }

  ngOnInit(): void {
    this.editData = new FormGroup({
      'campigen' : new FormControl(null),
      'customer_name' : new FormControl(null),
      'address' : new FormControl(null),
      'state' : new FormControl(null),
      'city' : new FormControl(null),
      'zipcode' : new FormControl(null),
      'country' : new FormControl(null),
      'phone_number' : new FormControl(null),
      'source_data' : new FormControl(null),
      'notes' : new FormControl(null)
     });
     this.edit_popup_contact(this.param1);
     this.getCamps();
     this.getAuxCode();
  }
  getAuxCode(){

    let access_token: any=localStorage.getItem('access_token');
    let admin_id: any=localStorage.getItem('admin_id');
    let api_req:any = '{"operation":"getAuxcode", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_aux_code","admin_id":"'+admin_id+'"}}';
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

  edit_popup_contact(phone_no){
    let access_token: any=localStorage.getItem('access_token');
    let user_is: any=localStorage.getItem('userId');
    let api_req:any = '{"operation":"predective_dialer_contact", "moduleType": "predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"edit_popup_contact","phone_no":"'+phone_no+'","user_id":"'+user_is+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.status==true){
        var d = response.result.data;
        if(d.length > 1){
          this.listPhones = true;
           this.phoneLists = response.result.data;
        } else {
          this.showDetails = true;
          this.listPhones = false;
          var response = response.result.data[0];
          this.editData.setValue({
            'campigen': response.camp_name,
            'customer_name' : response.customer_name,
            'address' : response.address,
            'state' : response.state,
            'city' : response.city,
            'zipcode' : response.zipcode,
            'country' : response.country,
            'phone_number' : response.phone_number,
            'source_data' : response.source_data,
            'notes' : response.notes
         });

         this.contact_id = response.campaign_id;

        }

      }
        
    }, 
    (error)=>{
        console.log(error);
    });

  }

  editContact(id){
    let access_token: any=localStorage.getItem('access_token');
    let user_is: any=localStorage.getItem('userId');
    let api_req:any = '{"operation":"predective_dialer_contact", "moduleType": "predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"edit_contact","contact_id":"'+id+'","user_id":"'+user_is+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {

      if(response.status=='true'){
        this.showDetails = true;
        this.listPhones = false;
        this.editData.setValue({
          'campigen': response.campaign_name,
          'customer_name' : response.customer_name,
          'address' : response.address,
          'state' : response.state,
          'city' : response.city,
          'zipcode' : response.zipcode,
          'country' : response.country,
          'phone_number' : response.phone_number,
          'source_data' : response.source_data,
          'notes' : response.notes
       });
       this.contact_id = response.campaign_id;
      }   else{
              
        iziToast.warning({
            message: "Data could not retrive. Please try again",
            position: 'topRight'
        });
    
  }
    }, 
    (error)=>{
        console.log(error);
    });
  }
 


  updateData(contact_id){
    let camp_name: any= $('#camp_names').val();
    let aux_code: any= $('#aux_code').val();
    // alert(aux_code);
    console.log(camp_name);  
    let api_req:any = new Object();
    let add_contact_req:any = new Object();
    api_req.operation="predective_dialer_contact";
    api_req.moduleType="predective_dialer_contact";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = this.editData.value;
    api_req.element_data.action='update_camp_call';
    api_req.element_data.camp_id= contact_id;
    api_req.element_data.phone_no= this.param1;
    api_req.element_data.stat= aux_code;
    api_req.element_data.user_id = localStorage.getItem('userId');
    api_req.element_data.admin_id = localStorage.getItem('admin_id');    
    console.log(api_req);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
    if (response.result.data == 1) {
            iziToast.success({
                message: "Contact updated successfully",
                position: 'topRight'
            });
            this.router.navigate(['../mc']);
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





  getCamps(){
    let access_token: any=localStorage.getItem('access_token');
    let user_is: any=localStorage.getItem('userId');
  
    let api_req:any = '{"operation":"predective_dialer_contact", "moduleType":"predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_campaign","admin_id":"'+user_is+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        this.campaigns = response.result.data;
        console.log(this.campaigns);
      } else {
      }
    }, 
    (error)=>{
        console.log(error);
    });
  }

}
