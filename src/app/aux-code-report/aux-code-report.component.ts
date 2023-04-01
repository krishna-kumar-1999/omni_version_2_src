import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2'
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-aux-code-report',
  templateUrl: './aux-code-report.component.html',
  styleUrls: ['./aux-code-report.component.css']
})
export class AuxCodeReportComponent implements OnInit {

  call_history_list;
  recordNotFound = false;
  pageLimit = 20;
  paginationData:any ={"info":"hide"};
  offset_count = 0;
  getRep: FormGroup;
  auxcodes;
  uadmin_id;
  usersL;
  res;
  agent_name;
  user_name;
  constructor(private serverService: ServerService) { }

   ngOnInit() {
     this.callHistoryList({});
     this.getRep = new FormGroup({
     'auxcode_name' :new FormControl(null),
     'aget_ids':new FormControl(null),
     'from_date' :new FormControl(null),
     'to_date' :new FormControl(null),
     'que_status' :new FormControl(null),
     });
     this.uadmin_id = localStorage.getItem('admin_id');
     this.agent_name = localStorage.getItem('agent_name');
     this.user_name = localStorage.getItem('user_name');
     this.getAuxCode();
     this.getUsers();
  

   }




   getUsers(){
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="get_all_my_users";
    agents_req.user_id=localStorage.getItem('admin_id');
    api_req.operation="contact";
    api_req.moduleType="contact";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    console.log(api_req);
        this.serverService.sendServer(api_req).subscribe((response:any) => {
          console.log(response.result.data);
          if(response.result.status==true){
            this.usersL = response.result.data;
          }
        }, 
        (error)=>{
            console.log(error);
        });
  }
   getAuxCode(){
    $('#auxcode_name').val('0').prop('selected', true);
    let access_token: any=localStorage.getItem('access_token');
  
    let api_req:any = '{"operation":"auxcode", "moduleType":"auxcode", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_auxcode","admin_id":"'+this.uadmin_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
       
        this.auxcodes = response.result.data;
      } 
    }, 
    (error)=>{
        console.log(error);
    });
  }








 listDataInfo(list_data){

   list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
   list_data.order_by_name = list_data.order_by_name == undefined ? "history.callid" : list_data.order_by_name;
   list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
   list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
   list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
   return list_data;
 }



    callHistoryList(data){

     var list_data= this.listDataInfo(data);
     let api_req:any = new Object();
     let history_req:any = new Object();
     history_req.action="login_list";
     history_req.search_text=list_data.search_text;
   // history_req.order_by_name=list_data.order_by_name;
    history_req.order_by_type=list_data.order_by_type;
    history_req.limit=list_data.limit;
    history_req.offset=list_data.offset;
     history_req.admin_id=localStorage.getItem('admin_id');
     api_req.operation="call";
     api_req.moduleType="call";
     api_req.api_type="web";
     api_req.access_token=localStorage.getItem('access_token');
     api_req.element_data = history_req;
           this.serverService.sendServer(api_req).subscribe((response:any) => {
           
             if(response.result.status==true){
            
               
               this.call_history_list=response.result.data.list_data;
               this.offset_count = list_data.offset;
               this.paginationData = this.serverService.pagination({'offset':response.result.data.list_info.offset, 'total':response.result.data.list_info.total, 'page_limit' :this.pageLimit });
               this.recordNotFound = this.call_history_list.length == 0 ? true : false;
             }
              
           }, 
           (error)=>{
               console.log(error);
           });

   }
   







   getReports(){



   let auxcode_name: any= $('#auxcode_name').val();
   let que_status: any= $('#que_status').val();
   let fromDate: any= $('#from_date').val();
   let to_date: any= $('#to_date').val();
   if(fromDate == null || fromDate == ''){
     iziToast.warning({
     message: "Please Select From Date",
     position: 'topRight'
   });
   return false;
   }
   if(to_date == null || to_date == ''){
     iziToast.warning({
     message: "Please Select To Date",
     position: 'topRight'
   });
   return false;
   }
   
   if(auxcode_name == null){
     iziToast.warning({
     message: "Please Select Aux code",
     position: 'topRight'
   });
   return false;
   }

   if(que_status == null){
     iziToast.warning({
     message: "Please Select Queue Status",
     position: 'topRight'
   });
   return false;
   }
   


   console.log(this.getRep.value);


   let api_req:any = new Object();
   let agents_req:any = new Object();
   agents_req.action="login_logout_report";
   var agents = this.getRep.value.aget_ids.join();
   //agents_req.agent_id = localStorage.getItem('userId');
   agents_req.reason = this.getRep.value.auxcode_name;
   agents_req.agents = agents;
   agents_req.from_date = this.getRep.value.from_date;
   agents_req.to_date = this.getRep.value.to_date;
   agents_req.status = this.getRep.value.que_status;
   api_req.operation="call";
   api_req.moduleType="call";
   api_req.api_type="web";
   api_req.access_token = localStorage.getItem('access_token');
   agents_req.agent_id = localStorage.getItem('userId');
   api_req.element_data = agents_req;
   console.log(api_req);
   Swal.fire({
    html:
      '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
  showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    background: 'transparent',
  });
     this.serverService.sendServer(api_req).subscribe((response:any) => {
       Swal.close();
     console.log(response);
       if(response.result.status==true){
       this.res = response;
       var arrStr = encodeURIComponent(JSON.stringify(this.res));
       // document.location.href = 'https://hp.mconnectapps.com/api/storage/contact/download.php?res='+arrStr;
       var url = 'https://'+window.location.hostname+':4003/api/storage/call/que_login_logout_report.php';
       var form = $('<form target="_blank" action="' + url + '" method="post">' +
       '<input type="text" name="res" value="' + arrStr + '" />' +
       '</form>');
       $('body').append(form);
       form.submit();
     
     } else {
       iziToast.warning({
       message: "No Records Found. Please try again",
       position: 'topRight'
     });
     }
     }, 
   (error)=>{
     console.log(error);
   });
   }
 







}
