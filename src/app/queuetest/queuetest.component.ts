import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-queuetest',
  templateUrl: './queuetest.component.html',
  styleUrls: ['./queuetest.component.css']
})
export class QueuetestComponent implements OnInit {

  call_history_list;
  recordNotFound = false;
  pageLimit = 10;
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
  queuelistdata: any;
  list_data;
  constructor(public router: Router,private serverService: ServerService) { }

   ngOnInit() {
     
     this.getRep = new FormGroup({
     'from_dt' :new FormControl(null),
     'to_dt' :new FormControl(null),
     });
     this.uadmin_id = localStorage.getItem('userId');
    this.user_type=localStorage.getItem('user_type');
    this.admin_permission = localStorage.getItem('admin_permision');
     this.listdata({});
    }
    // listdata(){
    //   let data:any = new Object();
    //   let datas:any = new Object();
    //   data.operation = ""
    // }

    callHistoryList(data){
// alert(this.uadmin_id);
     let api_req:any = new Object();
     let history_req:any = new Object();
     history_req.action="call_limit";
    //  history_req.search_text=list_data.search_text;
    //  history_req.order_by_name=list_data.order_by_name;
    //  history_req.order_by_type=list_data.order_by_type;
    //  history_req.limit=list_data.limit;
    //  history_req.offset=list_data.offset;
    //  history_req.admin_id=localStorage.getItem('admin_id');
    //  history_req.user_id=this.uadmin_id;
     api_req.operation="cust_report";
     api_req.moduleType="cust_report";
     api_req.api_type="web";
     api_req.access_token=localStorage.getItem('access_token');
     api_req.element_data = history_req;
           this.serverService.sendServer(api_req).subscribe((response:any) => {
           
            //  if(response.result.status==1){
            
               this.call_history_list=response.list_data;
              //  this.offset_count = list_data.offset;
               this.paginationData = this.serverService.pagination({'offset':response.list_info.offset, 'total':response.list_info.total, 'page_limit' :this.pageLimit });
               this.recordNotFound = this.call_history_list.length == 0 ? true : false;
            //  }
              
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

   listDataInfo1(){
var list_data:any =[];
list_data =  '[{"limit":"","offset":""}]';
console.log(JSON.parse(list_data))
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "history.callid" : list_data.order_by_name;
    // list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data[0].limit = list_data[0].limit == undefined ? this.pageLimit : list_data[0].limit;
    list_data[0].offset = list_data[0].offset == undefined ? 0 : list_data[0].offset;
    return list_data;
  }





  listdata(data){
    this.list_data= this.listDataInfo(data);
    console.log(this.list_data)
    let api_req:any = new Object();
   let agents_req:any = new Object();
   agents_req.action="call_limit";
   agents_req.from_dt = this.getRep.value.from_dt;
   agents_req.to_dt = this.getRep.value.to_dt;
   agents_req.limit = this.list_data.limit;
   console.log(agents_req.limit);
   agents_req.offset = this.list_data.offset;
   api_req.operation="cust_report";
   api_req.moduleType="cust_report";
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
        this.queuelistdata = response.result.data.list_data;
        console.log(this.queuelistdata)
        this.offset_count = response.result.data.list_info.offset;
        console.log("list data",this.offset_count);
        $('#total').val(response.result.q_total_calls);
        this.paginationData = this.serverService.pagination({'offset':response.result.data.list_info.offset, 'total':response.result.data.list_info.total, 'page_limit' :this.pageLimit });
         this.recordNotFound = this.queuelistdata.length == 0 ? true : false;
           
     
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

   getReports(){
    console.log(this.queuelistdata);
   let fromDate: any= $('#from_dt').val();
   let to_dt: any= $('#to_dt').val();
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
   agents_req.action="call_list";
   agents_req.from_dt = this.getRep.value.from_dt;
   agents_req.to_dt = this.getRep.value.to_dt;
   api_req.operation="cust_report";
   api_req.moduleType="cust_report";
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
       if(response.result.data!=''){
        this.res = response;
        // this.res = response.result.data.list_data;
        console.log("test",this.res);
       var arrStr = encodeURIComponent(JSON.stringify(this.res));
console.log(arrStr)
       var url = 'https://'+window.location.hostname+':4003/api/storage/call/call_report_new.php';
       var form = $('<form target="_blank" action="' + url + '" method="post">' +
       '<input type="text" name="res" value="' + arrStr + '" />' +
       '</form>');
       $('body').append(form);
       form.submit();
       this.listdata({});
     
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
