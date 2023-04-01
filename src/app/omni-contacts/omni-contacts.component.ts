import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-omni-contacts',
  templateUrl: './omni-contacts.component.html',
  styleUrls: ['./omni-contacts.component.css']
})
export class OmniContactsComponent implements OnInit {
  contacts_list;
  recordNotFound = false;
  pageLimit = 10;
  paginationData:any ={"info":"hide"};
  offset_count = 0;
  agent_count;
  show_admin_sett = false;
  user_type;
  user_id;
  hide_admin_sett = true;
  admin_id;
  dailyfood = false;
  alladmin = true;
  dsk_access;
  hasdsk = false
  hasnodsk = true;
  show_caller_id ='1';
  doc_link;
  admin_permission;
  constructor(private serverService: ServerService, private router:Router) { }


  ngOnInit(): void {
    this.user_type = localStorage.getItem('user_type');
    this.user_id = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');
    this.dsk_access = localStorage.getItem('dsk_access');
    this.admin_permission = localStorage.getItem('admin_permision');
    this.show_caller_id = localStorage.getItem('show_caller_id');
    if(this.admin_id == '128'){
      this.dailyfood = true;
      this.alladmin = false;
    }
    if(this.dsk_access == '1'){
      this.hasdsk = true;
      this.hasnodsk = false;
    }
    if(this.user_type == 'Admin'){
      this.show_admin_sett = true;
    }
    if(this.user_type == 'Employee'){
      this.hide_admin_sett = false;
    }

    if(this.user_type == 'Employee' && this.admin_permission =='1'){
      this.hide_admin_sett = true;
      this.show_admin_sett = true;
    }


    if(this.admin_permission =='1') 
    this.user_id = localStorage.getItem('admin_id');


    this.contactsList({});
  }


  contactsList(data){
    var list_data= this.listDataInfo(data);
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="contact_list";
    agents_req.user_id= this.user_id;
    agents_req.search_text=list_data.search_text;
    agents_req.order_by_name=list_data.order_by_name;
    agents_req.order_by_type=list_data.order_by_type;
    agents_req.limit=list_data.limit;
    agents_req.offset=list_data.offset;
    api_req.operation="contact";
    api_req.moduleType="contact";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    this.serverService.sendServer(api_req).subscribe((response:any) => {
    
        if(response.status==1){
    
          this.contacts_list=response.data.list_data;
            this.offset_count = list_data.offset;
            this.paginationData = this.serverService.pagination({'offset':response.data.list_info.offset, 'total':response.data.list_info.total, 'page_limit' :this.pageLimit });
            this.recordNotFound = this.contacts_list.length == 0 ? true : false;
        }
        

    }, 
    (error)=>{
        console.log(error);
    });

}

listDataInfo(list_data){

  list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
  list_data.order_by_name = list_data.order_by_name == undefined ? "contact.contact_id" : list_data.order_by_name;
  list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
  list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
  list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
  return list_data;
}
  addContact(){
    this.router.navigate(['../add-contacts']);
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
    
      let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_contact","user_id":"'+this.user_id+'","contact_id":"'+contact_id+'"}}';
    
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


  deleteWholeContact(){


    var i = 0;
    var invalidContacts = [];
    $('.invalidContacts:checked').each(function () {
      invalidContacts[i++] = $(this).val();
      console.log(invalidContacts);
    }); 
  console.log(invalidContacts.length);
  if(invalidContacts.length==0){
    iziToast.warning({
      message: "Please Choose atleast 1 Contact",
      position: 'topRight'
  });


  return false;
  }


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
    
      let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_multiple_contact","user_id":"'+this.user_id+'","contact_id":"'+invalidContacts+'"}}';
    
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





  editContact(phone_num,contact_unique_identifier) {
    var b_phone_num = btoa(phone_num); // Base64 encode the String
    var contact_unique_id = btoa(contact_unique_identifier); // Base64 encode the String

    this.router.navigate(['/edit-contacts-dup'], { queryParams: { phone: b_phone_num ,cont_id:contact_unique_id, from_edit:'edit' }});
  }


  clictToCall(to){
    // if(to == 'phone'){  this.to_num = $('#phone').val(); } else {  this.to_num = $('#mobile').val(); }
   
    
     if(to == ''){
         iziToast.warning({
           message: "No Number To Call",
           position: 'topRight'
         });
     } else {
   
   
       let access_token: any=localStorage.getItem('access_token');
     
       var extention = localStorage.getItem('ext_int_status');
       //alert(extention);
       if(extention == '2'){
        let api_reqs:any = '{"type": "makecall", "number": "'+to+'","show_caller_id":"'+this.show_caller_id+'"}';
        this.serverService.show.next(api_reqs);
       } else {
        let api_reqs:any = '{"type": "makecallauto", "number": "'+to+'"}';
        this.serverService.show.next(api_reqs);
       }
   
     }
   }

   showdoc(link){   
    this.doc_link=link;
   $("#document_model").modal('show');   
  }


  slectAll(){
    // alert("sjd");
    if($("#selectAllQ").prop("checked")) {
      // this.isSelected= true;
      $(".invalidContacts").prop("checked", true);
  } else {
    // this.isSelected= false;
  
      $(".invalidContacts").prop("checked", false);
  } 
  }

  slectunique(){
    $("#selectAllQ").prop("checked",false)
    }


}
