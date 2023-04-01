import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lead-management',
  templateUrl: './lead-management.component.html',
  styleUrls: ['./lead-management.component.css']
})
export class LeadManagementComponent implements OnInit {
  contacts_list;
  recordNotFound = false;
  pageLimit = 20;
  paginationData:any ={"info":"hide"};
  offset_count = 0;
  agent_count;
  show_admin_sett = false;
  user_type;
  user_id;
  addConatct;
  campaigns;
  admin_id;
  editData;
  contact_id;
  contac_id;
  show_user_sett;
  hide_admin_sett = true;
  doc_link;
  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit() {
    this.user_type = localStorage.getItem('user_type');
    this.user_id = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');
    if(this.user_type == 'Admin'){
      this.show_admin_sett = true;
    }
    if(this.user_type == 'Employee'){
      this.hide_admin_sett = false;
    }

      this.editData = new FormGroup({
        'name' : new FormControl(null),
        'email' : new FormControl(null),
        'city' : new FormControl(null),
        'country' : new FormControl(null),
        'phone' : new FormControl(null),
        'message' : new FormControl(null),
      });
    this.contactsList({});
  }


  contactsList(data){
    var list_data= this.listDataInfo(data);
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="lead_list";
    agents_req.admin_id=localStorage.getItem('admin_id');
    agents_req.user_id=localStorage.getItem('userId');
    agents_req.search_text=list_data.search_text;
    agents_req.order_by_name=list_data.order_by_name;
    agents_req.order_by_type=list_data.order_by_type;
    agents_req.limit=list_data.limit;
    agents_req.offset=list_data.offset;
    api_req.operation="lead";
    api_req.moduleType="lead";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    this.serverService.sendServer(api_req).subscribe((response:any) => {
    
        if(response.result.status==1){
    
          this.contacts_list=response.result.data.list_data;
            this.offset_count = list_data.offset;
            this.paginationData = this.serverService.pagination({'offset':response.result.data.list_info.offset, 'total':response.result.data.list_info.total, 'page_limit' :this.pageLimit });
            this.recordNotFound = this.contacts_list.length == 0 ? true : false;
        }
        

    }, 
    (error)=>{
        console.log(error);
    });

}

listDataInfo(list_data){

  list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
  list_data.order_by_name = list_data.order_by_name == undefined ? "lead.id" : list_data.order_by_name;
  list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
  list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
  list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
  return list_data;
}
  addContact(id){
    this.contac_id = id;
    $('#add_pbxform').modal('show');
  }

  uploadCSV(){
    this.router.navigate(['../csv-contact-upload']);
  }



  deleteContact(contact_id){
    
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
    
      let api_req:any = '{"operation":"lead", "moduleType":"lead", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_lead","user_id":"'+this.user_id+'","lead_id":"'+contact_id+'"}}';
    
      this.serverService.sendServer(api_req).subscribe((response:any) => {

        console.log(response);
        if(response.result.data==true){
          iziToast.success({
            message: "Contact deleted successfully",
            position: 'topRight'
        });
        this.contactsList({});
        } else {
          iziToast.warning({
            message: "Contact not deleted, Please try again!",
            position: 'topRight'
        });
        }
      }, 
      (error)=>{
          console.log(error);
      });
    
  }  
})
}


 



  editContact(id){
    let access_token: any=localStorage.getItem('access_token');
    let user_is: any=localStorage.getItem('userId');
    let api_req:any = '{"operation":"lead", "moduleType": "lead", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_singlelead","lead_id":"'+id+'","user_id":"'+user_is+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {

      if(response.status==true){
        this.editData.setValue({
          'name' : response.result.data.name,
          'email' : response.result.data.email,
          'city' : response.result.data.city,
          'country' : response.result.data.country,
          'phone' : response.result.data.phone,
          'message' : response.result.data.message,
       });

  

       this.contact_id = response.result.data.id;
       $('#camp_names').val(response.campaign_id).prop('selected', true);
       $('#edit_adminform').modal('show');
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


updateData(lead_id){
  let api_req:any = new Object();
  let add_contact_req:any = new Object();
  api_req.operation="lead";
  api_req.moduleType="lead";
  api_req.api_type="web";
  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = this.editData.value;
  api_req.element_data.action='update_lead';
  api_req.element_data.lead_id= lead_id;
  api_req.element_data.user_id = localStorage.getItem('userId');
  api_req.element_data.admin_id = localStorage.getItem('admin_id');    
  console.log(api_req);
  this.serverService.sendServer(api_req).subscribe((response: any) => {
  if (response.result.data == 1) {
    $('#add_pbxform').modal('hide');
          iziToast.success({
              message: "Contact updated successfully",
              position: 'topRight'
          });
          $('#edit_adminform').modal('hide');
          this.contactsList({});
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






addPbxData(contac_id){
  
  let access_token: any=localStorage.getItem('access_token');
  let con = $('#cnvert_id').val();
  let api_req:any = '{"operation":"lead", "moduleType": "lead", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"lead_onchange","lead_id":"'+contac_id+'","contact_option":"'+con+'"}}';

      this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        if(response.result.data==1){
              $('#add_pbxform').modal('hide');
            
              iziToast.success({
                  message: "Contact converted successfully",
                  position: 'topRight'
              });
              this.contactsList({});   
            }else{
              $('#add_pbxform').modal('hide');
              iziToast.warning({
                message: " Contact already converted",
                position: 'topRight'
            });
            }       
            }else{
          
              iziToast.warning({
                  message: " Please try again",
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

showdoc(link){   
  this.doc_link=link;
 $("#document_model").modal('show');   
}


}

