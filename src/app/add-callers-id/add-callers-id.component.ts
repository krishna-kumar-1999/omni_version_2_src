import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-add-callers-id',
  templateUrl: './add-callers-id.component.html',
  styleUrls: ['./add-callers-id.component.css']
})
export class AddCallersIdComponent implements OnInit {
  caller_num:any;
  callerList:any;
  caller_num_update:any;
  edit_id_caller:any;
  recordNotFound = false;
  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.callerIDList();
  }

  addCallerId(){
    $('#add_callerform').modal('show');
  }
  

  addCallerNum(){

    // {"operation":"call","moduleType":"call","api_type":"web","access_token":"","element_data":{"action":"addcallerid","admin_id":"1359","caller_num":"12324"}}

    let api_req:any = new Object();
    let agents_req:any = new Object();
    
    api_req.operation="call";
    api_req.moduleType="call";
    api_req.api_type="web";

    agents_req.action="addcallerid";
    agents_req.admin_id=localStorage.getItem('admin_id');
    agents_req.caller_num=this.caller_num;
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    this.serverService.sendServer(api_req).subscribe((response:any) => {
    
        if(response.result.data==1){
          this.caller_num='';
          $('#add_callerform').modal('hide');
          this.callerIDList();
          iziToast.success({
              message: "Caller ID Added successfully",
              position: 'topRight'
          });

      } else {
      
          iziToast.warning({
              message: " Caller ID already Exist",
              position: 'topRight'
          });

        }
        

    }, 
    (error)=>{
        console.log(error);
    });

}


callerIDList(){
  // {"operation":"call","moduleType":"call","api_type":"web","access_token":"","element_data":{"action":"getcaller_list","admin_id":"1359"}}

    let api_req:any = new Object();
    let agents_req:any = new Object();
    
    api_req.operation="call";
    api_req.moduleType="call";
    api_req.api_type="web";

    agents_req.action="getcaller_list";
    agents_req.admin_id=localStorage.getItem('admin_id');

    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status == true){
        
        this.callerList = response.result.data;
        console.log(this.callerList);
        this.recordNotFound = this.callerList.length == 0 ? true : false;
      } else {
      
          iziToast.warning({
              message: " No data found",
              position: 'topRight'
          });

        }
        

    }, 
    (error)=>{
        console.log(error);
    });

}


editCaller(ids){
  $('#update_callerform').modal('show');
  const result = this.callerList.filter(word => word.id == ids);

  this.caller_num_update = result[0].caller_num;
  this.edit_id_caller = result[0].id;
  console.log(this.caller_num_update);

}

updateCaller(){               
 
  let api_req:any = new Object();
  let agents_req:any = new Object();
  
  api_req.operation="call";
  api_req.moduleType="call";
  api_req.api_type="web";

  agents_req.action="update_callerid";
  agents_req.admin_id=localStorage.getItem('admin_id');
  agents_req.id=this.edit_id_caller;
  agents_req.caller_num=this.caller_num_update;

  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = agents_req;
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.status == true){
      
      $('#update_callerform').modal('hide');
          this.callerIDList();
          iziToast.success({
              message: "Caller ID Updated successfully",
              position: 'topRight'
          });

    } else {
    
        iziToast.warning({
            message: "Updated Failed",
            position: 'topRight'
        });

      }
      

  }, 
  (error)=>{
      console.log(error);
  });


}


deleteCaller(ids){
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
      let api_req:any = new Object();
      let agents_req:any = new Object();
      
      api_req.operation="call";
      api_req.moduleType="call";
      api_req.api_type="web";
    
      agents_req.action="delete_callerid";
      agents_req.admin_id=localStorage.getItem('admin_id');
      agents_req.id=ids;
      api_req.access_token=localStorage.getItem('access_token');
      api_req.element_data = agents_req;
      this.serverService.sendServer(api_req).subscribe((response:any) => {
        if(response.result.status == true){
        
              this.callerIDList();
              iziToast.success({
                  message: "Caller ID Delete successfully",
                  position: 'topRight'
              });
    
        } else {
        
            iziToast.warning({
                message: "Deletion failed",
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



}
