import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-new-outbound-fax',
  templateUrl: './new-outbound-fax.component.html',
  styleUrls: ['./new-outbound-fax.component.css']
})
export class NewOutboundFaxComponent implements OnInit {
  addDoc: FormGroup;
  outFax:FormGroup;
  uadmin_id;
  public isKeyAvail = false;
  public isItemAvailable = false;
  s_licence_key : any;
  items: any;
  docs:any;
  accessToken:any;
  user_id:any;
  faxuser_id;
  constructor(private serverService: ServerService, private router: Router ) { }

  ngOnInit() {
    this.faxuser_id = localStorage.getItem('faxuser_id');

    this.outFax = new FormGroup({
      "fax_title":new FormControl(null,Validators.required),  
      "destination_number" : new FormControl(null,Validators.required),
      "retry" : new FormControl(null,Validators.required)
    }) 

    this.addDoc = new FormGroup({
      "name":new FormControl(null,Validators.required),
      "description": new FormControl(null,Validators.required),
      "type": new FormControl(null,Validators.required)
    })
  
    $('#add_docform').modal('hide');
    this.uadmin_id = localStorage.getItem('userId');

    this.getDocs();
  }

  getDocs(){
    let access_token: any=localStorage.getItem('access_token');
    let uadmin_id = localStorage.getItem('userId');
  
    let api_req:any = '{"operation":"fax", "moduleType":"fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_docid","user_id":"'+uadmin_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
      this.docs = response.result.data;    
      } else {
        iziToast.warning({
          message: "No Document Found. Please Add Document",
          position: 'topRight'
      });

      }
    }, 
    (error)=>{
        console.log(error);
    });
  }

  
  SendOutFax(){
    
      if(this.outFax.value.fax_title ==  null || this.outFax.value.fax_title ==  ''){
        iziToast.warning({
          message: "Please Enter the Title",
          position: 'topRight'
      });
      return false;
      }

      let assigned_doc_id: any= $('#Doc_id').val();
      console.log(assigned_doc_id);

       if(assigned_doc_id ==  0 || assigned_doc_id  ==  ''){
        iziToast.warning({
          message: "Please Select a Document ",
          position: 'topRight'
      });
      return false;
      }

      if(this.outFax.value.destination_number ==  null || this.outFax.value.destination_number ==  ''){
        iziToast.warning({
          message: "Please Enter Destination Number",
          position: 'topRight'
      });
      return false;
      }
     

  
    let destination_number: any= $('#destination_number').val();
     console.log(destination_number);


    let api_req:any = new Object();
    let test:any = new Object();
    api_req.operation="fax";
    api_req.moduleType="fax";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data=test;
     test.action="send_fax";
     test.title = this.outFax.value.fax_title;
     test.fax_user_id = this.faxuser_id;
     test.number= destination_number;
     test.try_allowed =this.outFax.value.retry;
     test.user_id = localStorage.getItem('userId');
     test.doc_id =assigned_doc_id;
    //  console.log(this.outFax.value.Doc_id);


      this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == "true") {
              iziToast.success({
                  message: "Fax Sended",
                  position: 'topRight'
              });
              this.router.navigate(['/fax']);

          }
      else{
          
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

  addDocumentfile()
    {
      let access_token: any=localStorage.getItem('access_token');
      let user_id: any =  localStorage.getItem('userId'); 
        var formData = new FormData();
        formData.append('operation', 'fax');
        formData.append('moduleType', 'fax');
        formData.append('api_type', 'web');
        formData.append('action', 'fax_upload');
        formData.append('access_token', access_token);
        formData.append('name', this.addDoc.value.name);
        formData.append('document_file', $('#document_file')[0].files[0]);
        formData.append('description', this.addDoc.value.description);
        formData.append('type', this.addDoc.value.type);
        formData.append('user_id', user_id);
        formData.append('fax_user_id', this.faxuser_id);

      $.ajax({  
        url:"https://omni.mconnectapps.com/api/v1.0/index_new.php",  
        type : 'POST',
        data : formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false, 
        success:function(data){ 
          this.parsed_data = JSON.parse(data);
          if(this.parsed_data.status == "true"){
            iziToast.success({
              message: "Data Uploaded Successfully",
              position: 'topRight'
          });
          $('#add_docform').modal('hide');
          $("#refresh_page").click(); 

          
          } else {
            iziToast.error({
              message: "Sorry, Some Error Occured",
              position: 'topRight'
          });
          }
        }  
    });  
    this.getDocs();
    
 }


 searchLK(phone){
  this.s_licence_key = phone;
  console.log(this.s_licence_key);
  this.isItemAvailable = false;
}

initializeItems(val){
  this.accessToken=localStorage.getItem('access_token');
  this.user_id=localStorage.getItem('userId');
  let phone_num: any= $('#destination_number').val();


  let api_req:any = new Object();
  let agents_req:any = new Object();
  agents_req.action="get_contacts";
  agents_req.user_id=localStorage.getItem('userId');
  agents_req.search_val = phone_num;
  api_req.operation="fax";
  api_req.moduleType="fax";
  api_req.api_type="web";
  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = agents_req;
  console.log(api_req);
      this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.status==true){

      this.items = response.result.data;
      this.isItemAvailable = true;
    } else {
      iziToast.warning({
        message: "No Records Found. Please try again",
        position: 'topRight'
    });
    }
  });
  }

  getItems(ev: any) {
    const val = ev.target.value;
    this.initializeItems(val);
  if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.isKeyAvail = false;
        this.items = this.items.filter((item) => {
        return item;
        }
   )}
  }

  addDocument(){
    $('#add_docform').modal('show');
  }

}
