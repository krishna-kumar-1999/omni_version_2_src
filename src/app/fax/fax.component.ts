import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-fax',
  templateUrl: './fax.component.html',
  styleUrls: ['./fax.component.css']
})
export class FaxComponent implements OnInit {
  addDoc: FormGroup;
  editDoc: FormGroup;
  assignDidForm:FormGroup;

  public isKeyAvail = false;
  public isItemAvailable = false;
  s_licence_key : any;
  items: any;
  docs:any;
  s_fax:any;
  edit_id;
  accessToken:any;
  user_id:any;
  time;
  uadmin_id;
  user_dids;
  faxuser_id;
  did_id;
  title;
  oper_did_id;
  omni_id;
  receive_faxs;
  // editData:any;

  constructor(private serverService:ServerService, private router:Router) { }

  ngOnInit() {
    this.uadmin_id = localStorage.getItem('userId');
    this.faxuser_id = localStorage.getItem('faxuser_id');
    
    this.addDoc = new FormGroup({
      "name":new FormControl(Validators.required),
      "description": new FormControl(),
      "type": new FormControl()
    }); 

 this.editDoc= new FormGroup({
  "name":new FormControl(null,Validators.required),
  "description": new FormControl(null,Validators.required),
  "type": new FormControl(null,Validators.required)
 });
 this.assignDidForm=new FormGroup({
  "did_number" : new FormControl(null,Validators.required),
  // "title" : new FormControl(null,Validators.required),
  "did_email" : new FormControl(null,Validators.required)

});
    $('#add_docform').modal('hide');
    $('#edit_docform').modal('hide');
    //this.faxState();
    this.getsendFax();
    this.ReceiveFax();
    this.getDocs();
    this.getDID();
  }

getsendFax(){

    let access_token: any=localStorage.getItem('access_token');
    // let uadmin_id = localStorage.getItem('userId');
  
    let api_req:any = '{"operation":"fax", "moduleType":"fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"sent_fax_list","user_id":"'+this.uadmin_id+'","fax_user_id":"'+this.faxuser_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status == true){
         this.s_fax = response.result.data;  

         let last = this.s_fax[this.s_fax.length-1];
           console.log(last.status);
                 this.faxState();

          //  if(last.status == 'processing'){
          //   this.getsendFax();     
          // }  
          // if(last.status == 'failed' || last.status == 'completed'){
          //       return  false; 
          // }  
           
      }
      
      else {
        iziToast.warning({
          message: "Fax not found",
          position: 'topRight'
      });

      }
    }, 
    (error)=>{
        console.log(error);
    });
  }




  getsendFaxs(){
        let access_token: any=localStorage.getItem('access_token');
        // let uadmin_id = localStorage.getItem('userId');
      
        let api_req:any = '{"operation":"fax", "moduleType":"fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"sent_fax_list","user_id":"'+this.uadmin_id+'"}}';
      
        this.serverService.sendServer(api_req).subscribe((response:any) => {
          if(response.result.status == true){
             this.s_fax = response.result.data;  
    
             let last = this.s_fax[this.s_fax.length-1];
               console.log(last.status);        
          }
          
          else {
            iziToast.warning({
              message: "Fax not found",
              position: 'topRight'
          });
    
          }
        }, 
        (error)=>{
            console.log(error);
        });
      }




  faxState(){
    let access_token: any=localStorage.getItem('access_token');
      // let uadmin_id = localStorage.getItem('userId');

      let api_req:any = '{"operation":"fax", "moduleType":"fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_fax_stat" }}';
    
      this.serverService.sendServer(api_req).subscribe((response:any) => {
        if(response.status == true){
        if(response.result.data == "false"){
          console.log("function called");
          var time = setTimeout(() => {
                this.getsendFax();
            }, 6000);
            }
            else {
            console.log("checked true");
             this.getsendFaxs();
          return false;
         }
        } 
      }, 
      (error)=>{
          console.log(error);
      });
    }



  getDocs(){
    let access_token: any=localStorage.getItem('access_token');
    let uadmin_id = localStorage.getItem('userId');
  
    let api_req:any = '{"operation":"fax", "moduleType":"fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_docid","user_id":"'+this.uadmin_id+'","fax_user_id":"'+this.faxuser_id+'"}}';
  
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
        url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
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

  editDocumentfile(id)
  {

    let access_token: any=localStorage.getItem('access_token');
    let user_id: any =  localStorage.getItem('userId'); 
    let api_req:any = '{"operation":"fax", "moduleType":"fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_by_id","user_id":"'+this.uadmin_id+'","fax_user_id":"'+this.faxuser_id+'","doc_id":"'+id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.status== true){
      var editData = response.result.data; 
      console.log(editData);
      this.editDoc.setValue({
        "name" : editData.name,
        "description" : editData.description,
        "type" :editData.type
      });
      $('#edit_docform').modal('show');
      this.edit_id=editData.doc_id;
      // this.getDocs();
      } else {
        iziToast.warning({
          message: "Sorry some error occured",
          position: 'topRight'
      });

      }
    }, 
    (error)=>{
        console.log(error);
    });
  }

    updateDoc(id)
    {
      let access_token: any=localStorage.getItem('access_token');
      let user_id: any =  localStorage.getItem('userId'); 
      var formData = new FormData();
      formData.append('operation', 'fax');
      formData.append('moduleType', 'fax');
      formData.append('api_type', 'web');
      formData.append('action', 'edit_fax_upload');
      formData.append('user_id', user_id);
      formData.append('name', this.editDoc.value.name);
      formData.append('doc_id',id);
      formData.append('file', $('#file')[0].files[0]);
      formData.append('description', this.editDoc.value.description);
      formData.append('type', this.editDoc.value.type);
      formData.append('fax_user_id', this.faxuser_id);
      formData.append('access_token', access_token);
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
            message: "Data Updated Successfully",
            position: 'topRight'
        });
        $('#edit_docform').modal('hide');
        $("#refresh_page").click(); 

        
        } else
         {
          iziToast.error({
            message: "Sorry, Some Error Occured",
            position: 'topRight'
        });
        }
      }  
  });  
  
}


  deleteDoc(id){
    
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
         let uadmin_id = localStorage.getItem('userId');
      
        let api_req:any = '{"operation":"fax", "moduleType":"fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_fax_document", "doc_id": "'+id+'","user_id":"'+this.uadmin_id+'","fax_user_id":"'+this.faxuser_id+'"}}';
      
        this.serverService.sendServer(api_req).subscribe((response:any) => {
  
          console.log(response);
          if(response.status== "true"){
            iziToast.success({
              message: "Data deleted successfully",
              position: 'topRight'
          });
          this.getDocs();
          } else {
            iziToast.warning({
              message: "Data not deleted, Please try again!",
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

outboundfax(){
  this.router.navigate(['outbound-fax']);
  
}

getDID(){
  let access_token: any=localStorage.getItem('access_token');
  // let uadmin_id = localStorage.getItem('userId');

  let api_req:any = '{"operation":"fax", "moduleType":"fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_admin_didnumbers","user_id":"'+this.uadmin_id+'","fax_user_id":"'+this.faxuser_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.status == "true"){
      console.log(response);
      this.user_dids=response.didnumber_options;
    
    }
    
    else {
    //   iziToast.warning({
    //     message: "DID not found",
    //     position: 'topRight'
    // });

    }
  }, 
  (error)=>{
      console.log(error);
  });
}

editDID(id){
           
  let access_token: any=localStorage.getItem('access_token');
  let api_req:any = '{"operation":"fax", "moduleType": "fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"edit_didnumber","didid": "'+id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.status == true){
      var agent_data = response.result.data;
  

     $('#did-assign').modal('show');
     
     this.assignDidForm.setValue({
        'did_number' : agent_data.didnumber,
         'did_email'  : agent_data.email,
        // 'title':agent_data.title
         });
 
      this.oper_did_id = agent_data.did_id;
      this.title = agent_data.title;
      console.log(this.oper_did_id);
      // this.omni_id = response.result.data.id;


    }  
     else{
            
      iziToast.warning({
          message: "DID's count not retrive. Please try again",
          position: 'topRight'
      });
  
}
  }, 
  (error)=>{
      console.log(error);
  });

}

assignOpDID(d_id,title){

  let agent_req:any = this.assignDidForm.value;
  let email:any= $('#did_email').val();
  let access_token: any=localStorage.getItem('access_token');
  let api_req:any = '{"operation":"fax", "moduleType": "fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"assign_email_didnumber","didid": "'+d_id+'","username":"'+agent_req.did_number+'","email":"'+email+'","first_name":"'+title+'","phone":"'+agent_req.did_number+'","user_id":"'+this.uadmin_id+'","fax_user_id":"'+this.faxuser_id+'"}}';

      this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.data == 1) {
               $('#did-assign').modal('hide');
               this.getDID();
              iziToast.success({
                  message: "Fax to Email successfully Activated",
                  position: 'topRight'
              });
          } else {
          
              iziToast.warning({
                  message: "Sorry not updated. Please try again",
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

ReceiveFax(){

  let access_token: any=localStorage.getItem('access_token');
  // let uadmin_id = localStorage.getItem('userId');
  let api_req:any = '{"operation":"fax", "moduleType":"fax", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"receive_fax_list","user_id":"'+this.uadmin_id+'","fax_user_id":"'+this.faxuser_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    // alert("response");
    console.log(response);

    if(response.status == true){
      // console.log(response);
      // alert(response);
      // this.receive_faxs=response.fax_options;
      this.receive_faxs=response.result.data;
    }
    
    else {
      iziToast.warning({
        message: "No faxes recieved",
        position: 'topRight'
    });

    }
  }, 
  (error)=>{
      console.log(error);
  });
}



}
