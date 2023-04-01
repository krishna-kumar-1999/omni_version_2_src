import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-call-report',
  templateUrl: './call-report.component.html',
  styleUrls: ['./call-report.component.css']
})
export class CallReportComponent implements OnInit {

  call_history_list;
  recordNotFound = false;
  pageLimit = 20;
  paginationData:any ={"info":"hide"};
  offset_count = 0;
  getRep: FormGroup;
  auxcodes;
  uadmin_id;
  res;
  call_type;
  call_nature;
  agent_name;
  usersL;
  user_type;
  admin_permission;
  constructor(private serverService: ServerService) { }

   ngOnInit() {
     
     this.getRep = new FormGroup({
     'extension' :new FormControl(null),
     'call_type' :new FormControl(null),
     'call_nature' :new FormControl(null),
     'from_dt' :new FormControl(null),
     'to_dt' :new FormControl(null),
     });
     this.uadmin_id = localStorage.getItem('userId');
    this.user_type=localStorage.getItem('user_type');
    this.admin_permission = localStorage.getItem('admin_permision');

    if (this.user_type == 'Super Admin') {
			this.user_type = 1;
		}
		else if (this.user_type == 'Admin' || this.admin_permission =='1') {
			this.user_type = 2;
		}
		else {
			this.user_type = 3;
		}
		if(this.admin_permission =='1') 
		   this.uadmin_id = localStorage.getItem('admin_id');

    
     this.getAuxCode();
     this.getUsers();
     this.callHistoryList({});

   }
   getAuxCode(){
   let access_token: any=localStorage.getItem('access_token');
   
   let api_req:any = '{"operation":"call", "moduleType":"call", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"call_details_dropdown"}}';
   
   this.serverService.sendServer(api_req).subscribe((response:any) => {
     if(response.result.status==true){
     this.call_nature = response.result.data.call_nature;
     this.call_type = response.result.data.call_type;
     } else {
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

 getUsers(){
  let api_req:any = new Object();
  let agents_req:any = new Object();
  agents_req.action="get_all_my_users";
  agents_req.user_id=localStorage.getItem('userId');
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

    callHistoryList(data){
// alert(this.uadmin_id);
     var list_data= this.listDataInfo(data);
     let api_req:any = new Object();
     let history_req:any = new Object();
     history_req.action="call_list";
     history_req.search_text=list_data.search_text;
     history_req.order_by_name=list_data.order_by_name;
     history_req.order_by_type=list_data.order_by_type;
     history_req.limit=list_data.limit;
     history_req.offset=list_data.offset;
     history_req.admin_id=localStorage.getItem('admin_id');
     history_req.user_id=this.uadmin_id;
     api_req.operation="call";
     api_req.moduleType="call";
     api_req.api_type="web";
     api_req.access_token=localStorage.getItem('access_token');
     api_req.element_data = history_req;
           this.serverService.sendServer(api_req).subscribe((response:any) => {
           
             if(response.result.status==1){
            
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
   let fromDate: any= $('#from_dt').val();
   let to_dt: any= $('#to_dt').val();

   if(this.getRep.value.extension == null || this.getRep.value.extension== '' || this.getRep.value.extension.join() == 'null'){
    iziToast.warning({
    message: "Please Select Agent Extension",
    position: 'topRight'
  });
  return false;
  }


   if(this.getRep.value.call_type == null || this.getRep.value.call_type== '' || this.getRep.value.call_type.join() == 'null'){
    iziToast.warning({
    message: "Please Select Call Type",
    position: 'topRight'
  });
  return false;
  }


  if(this.getRep.value.call_nature == null || this.getRep.value.call_nature == '' || this.getRep.value.call_nature.join() == 'null'){
    iziToast.warning({
    message: "Please Select Call Nature",
    position: 'topRight'
  });
  return false;
  }





  if(fromDate == null || fromDate == ''){
    iziToast.warning({
    message: "Please Select From Date",
    position: 'topRight'
  });
  return false;
  }
  if(to_dt == null || to_dt == ''){
    iziToast.warning({
    message: "Please Select To Date",
    position: 'topRight'
  });
  return false;
  }
  

   console.log(this.getRep.value);
   let api_req:any = new Object();
   let agents_req:any = new Object();
   agents_req.action="call_report";
   agents_req.admin_id=localStorage.getItem('admin_id');
   agents_req.user_id=this.uadmin_id;
   agents_req.call_type = this.getRep.value.call_type.join();
   agents_req.call_nature = this.getRep.value.call_nature.join();
   agents_req.extension = this.getRep.value.extension.join();;
   agents_req.from_dt = this.getRep.value.from_dt;
   agents_req.to_dt = this.getRep.value.to_dt;
   api_req.operation="call";
   api_req.moduleType="call";
   api_req.api_type="web";
   api_req.access_token=localStorage.getItem('access_token');
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
     console.log(response);
     Swal.close();
       if(response.result.status==true){
       this.res = response;
       var arrStr = encodeURIComponent(JSON.stringify(this.res));

       var url = 'https://'+window.location.hostname+':4003/api/storage/call/call_report.php';
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
 


playAudio(){
  $('#play-audio').modal('show');
}

changeDrap(ids){

  // var rangePercent = $('[type="range"]').val();
  var rangePercent = $('#ranges_'+ids).val();

        rangePercent = $('#ranges_'+ids).val();
        $('#counts_'+ids).html(rangePercent+'<span></span>');
        $('#ranges_'+ids+','+'h4>span').css('filter', 'hue-rotate(-' + rangePercent + 'deg)');
        $('#counts_'+ids).css({ 'left': rangePercent+'%'});
  
}

updaterating(ids,index){

  let rate = $("#ranges_"+index).val();

 let api_req:any = new Object();
  let history_req:any = new Object();
  history_req.action="updateAgentRatings";
  history_req.admin_id=localStorage.getItem('admin_id');
  history_req.id=ids;
  history_req.ratings=rate;
  history_req.user_id=localStorage.getItem('userId');
  api_req.operation="call";
  api_req.moduleType="call";
  api_req.api_type="web";
  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = history_req;
        this.serverService.sendServer(api_req).subscribe((response:any) => {
        
          if(response.result.data == true){
            this.callHistoryList({});
            iziToast.success({
              message: "Updated the rating",
              position: 'topRight'
          });

          }
           
        }, 
        (error)=>{
            console.log(error);
        });

}

}
