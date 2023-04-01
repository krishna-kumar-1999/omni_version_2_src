import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-sms-templates',
  templateUrl: './sms-templates.component.html',
  styleUrls: ['./sms-templates.component.css']
})
export class SmsTemplatesComponent implements OnInit {
  queue_list;
  recordNotFound = false; 
  addDept: FormGroup;
  editDept: FormGroup;
  old_sip_url;
  uadmin_id;
  pbx_count;
  dep_status; 
  dep_id;
  pageLimit = 20;
  agents_list;
  userchecked;
  Mqueue_list;
  constructor(private serverService: ServerService) { }


  ngOnInit() {
    this.uadmin_id = localStorage.getItem('admin_id');
    this.addDept = new FormGroup({
     'template' : new FormControl(null,Validators.required),
    });
 
     this.editDept = new FormGroup({
      'template' : new FormControl(null,Validators.required),
    });
    this.dept_settings();
    this.queueList({});
   }

dept_settings(){
  let access_token: any=localStorage.getItem('access_token');

  let api_req:any = '{"operation":"template", "moduleType":"template", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_template","admin_id":"'+this.uadmin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.status==true){
     
      this.queue_list = response.result.data;
      console.log(this.queue_list);
    } else {
      this.recordNotFound = true;
    }
  }, 
  (error)=>{
      console.log(error);
  });
}




listDataInfo(list_data){

  list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
  list_data.order_by_name = list_data.order_by_name == undefined ? "queue.queue_id" : list_data.order_by_name;
  list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
  list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
  list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
  return list_data;
}


  queueList(data){
    var list_data= this.listDataInfo(data);
    let api_req:any = new Object();
    let queue_req:any = new Object();
    queue_req.action="list_queue";
    queue_req.admin_id=localStorage.getItem('admin_id');
    queue_req.search_text=list_data.search_text;
    queue_req.order_by_name=list_data.order_by_name;
    queue_req.order_by_type=list_data.order_by_type;
    queue_req.limit=list_data.limit;
    queue_req.offset=list_data.offset;
    api_req.operation="queue";
    api_req.moduleType="queue";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = queue_req;
          this.serverService.sendServer(api_req).subscribe((response:any) => {
            if(response.result.status==1){
           
              this.Mqueue_list=response.result.data.list_data;
              
            }
              

          }, 
          (error)=>{
              console.log(error);
          });

}




editDepartmentSettings(id){
  let access_token: any=localStorage.getItem('access_token');
  let api_req:any = '{"operation":"template", "moduleType": "template", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"edit_template","template_id":"'+id+'","admin_id":"'+this.uadmin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.status==true){
      var agent_data = response.result.data;
      this.editDept.setValue({
         'template' : agent_data.template_message,
     });
     this.dep_id = response.result.data.template_id;

     $('#Upd_queue_no').val(agent_data.queue_no).prop('selected', true);

     $('#edit_deptform').modal('show');
     this.dept_settings();
    }   else{
            
      iziToast.warning({
          message: "Wrap Up codes not retrive. Please try again",
          position: 'topRight'
      });
  
}
  }, 
  (error)=>{
      console.log(error);
  });
}

addDepartment(){
  $('#add_deptform').modal('show');
}


editDepartment(id){


  let agent_req:any = this.editDept.value;
  let access_token: any=localStorage.getItem('access_token');

  let queue_no: any= $('#Upd_queue_no').val();
 
  if(agent_req.status == true){  this.dep_status = 1 } else { this.dep_status  = 0 }
  let api_req:any = '{"operation":"template", "moduleType": "template", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"update_template","template_message":"'+agent_req.template+'","queue_no":"'+queue_no+'","template_id":"'+id+'","admin_id":"'+this.uadmin_id+'"}}';

      this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == 1) {
              $('#edit_deptform').modal('hide');
              this.dept_settings();
              iziToast.success({
                  message: "Template updated successfully",
                  position: 'topRight'
              });
          } else {
          
              iziToast.warning({
                  message: "Template not updated. Please try again",
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



addDeptData(){


let agent_req:any = this.addDept.value;
let queue_no: any= $('#queue_no').val();

    let access_token: any=localStorage.getItem('access_token');
  
    let api_req:any = '{"operation":"template", "moduleType": "template", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"add_template","template_message":"'+agent_req.template+'","queue_no":"'+queue_no +'","admin_id":"'+this.uadmin_id+'"}}';
  
        this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.result.data == 1) {
                $('#add_deptform').modal('hide');
                iziToast.success({
                    message: "Template added successfully",
                    position: 'topRight'
                });
                this.dept_settings();
            }
            else if (response.result.data == 2) {
              iziToast.warning({
                  message: "Template name already inserted",
                  position: 'topRight'
              });
          }
        else{
            
                iziToast.error({
                    message: "Template not added. Please try again",
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
        // let api_req:any = '{"operation":"contact", "moduleType": "contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_auxcode","id":"'+id+'","admin_id":"'+admin_id+'"}}';
        let api_req:any = '{"operation":"template", "moduleType": "template", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_template","template_id":"'+id+'","admin_id":"'+admin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.data==1){
      Swal.fire(
        'Deleted!',
        'success'
      );
      this.dept_settings();
    }

  }, 
  (error)=>{
      console.log(error);
  });
      }
    })
  }



}

