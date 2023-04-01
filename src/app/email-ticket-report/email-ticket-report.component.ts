import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-email-ticket-report',
  templateUrl: './email-ticket-report.component.html',
  styleUrls: ['./email-ticket-report.component.css']
})
export class EmailTicketReportComponent implements OnInit {
  recordNotFound = false; 
  admin_id;   
  chat_panel_list
  loginUser;
  res;
  pageLimit = 20;
  paginationData:any ={"info":"hide"};
  offset_count = 0;
  Agent_options;
  Queue_options;
  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.admin_id = localStorage.getItem('admin_id');
    this.loginUser = localStorage.getItem('userId');     
    // this.searchData({});
    this.getUsers();
    this.getQueue();
   }
   getUsers(){
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="get_all_my_users";
    agents_req.user_id=this.admin_id;
    api_req.operation="contact";
    api_req.moduleType="contact";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    console.log(api_req);
        this.serverService.sendServer(api_req).subscribe((response:any) => {
         
          if(response.result.status==true){
            this.Agent_options = response.result.data;
          }
        }, 
        (error)=>{
            console.log(error);
        });
  }
   getQueue(){
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="get_hasemail_department";
    agents_req.admin_id=this.admin_id;
    api_req.operation="ticket";
    api_req.moduleType="ticket";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;    
        this.serverService.sendServer(api_req).subscribe((response:any) => {         
          if(response.result.status==true){
            this.Queue_options = response.result.data;
          }
        }, 
        (error)=>{
            console.log(error);
        });
  }
  getdeptUser(id){
    this.Agent_options='';
    if(id==''||id==null||id=='null'){
      this.getUsers();
      return false;
    }
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="get_department";
    agents_req.user_id=this.admin_id;
    agents_req.dept_id=id;
    api_req.operation="ticket";
    api_req.moduleType="ticket";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    console.log(api_req);
        this.serverService.sendServer(api_req).subscribe((response:any) => {
         
          if(response.result.status==true){
            this.Agent_options = response.result.data.active;
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

  searchData(data){
			// var list_data= this.listDataInfo(data);
      let from_date = $('#from_date').val();
      let to_date = $('#to_date').val();     
      let agent_id = $('#agent_id').val();
      // if(agent_id)
      // agent_id = $('#agent_id').val().join();
      let dept_id = $('#queue_id').val();
      let ticket_no = $('#ticket_no').val();
   
        if(from_date == null ||from_date == ''){
          iziToast.warning({
            message: "Please fill From Date",
            position: 'topRight'
        });
        return false;
        }
        if(to_date == null ||to_date == ''){
          iziToast.warning({
            message: "Please fill To Date",
            position: 'topRight'
        });
        return false;
        }
  var list_data= this.listDataInfo(data);
  let api_req:any = new Object();
  let history_req:any = new Object();
  history_req.action="email_queue_report";
  history_req.from_dt=from_date;
  history_req.to_dt=to_date;
  history_req.agent_id=agent_id;
  history_req.dept_id=dept_id;
  history_req.ticket_no=ticket_no;
  history_req.search_text=list_data.search_text;
  history_req.limit=list_data.limit;
  history_req.offset=list_data.offset;
  history_req.admin_id=localStorage.getItem('admin_id');
  api_req.operation="ticket";
  api_req.moduleType="ticket";
  api_req.api_type="web";
  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = history_req;
  Swal.fire({
    html:
      '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
  showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    background: 'transparent'
  });
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    Swal.close();
    if(response.result.status==true){     
      this.chat_panel_list = response.result.data.list_data;
      this.offset_count = list_data.offset;
      this.paginationData = this.serverService.pagination({'offset':response.result.data.list_info.offset, 'total':response.result.data.list_info.total, 'page_limit' :this.pageLimit });
      this.recordNotFound = this.chat_panel_list.length == 0 ? true : false;
    } else {
      this.recordNotFound = true;
    }
  }, 
  (error)=>{
      console.log(error);
  });
}
exportcsv(){
let from_date = $('#from_date').val();
let to_date = $('#to_date').val();
let agent_id = $('#agent_id').val();
let dept_id = $('#queue_id').val();
  if(from_date == null ||from_date == ''){
    iziToast.warning({
      message: "Please fill From Date",
      position: 'topRight'
  });
  return false;
  }
  if(to_date == null ||to_date == ''){
    iziToast.warning({
      message: "Please fill To Date",
      position: 'topRight'
  });
  return false;
  }
  Swal.fire({
    html:
      '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
  showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    background: 'transparent'
  });
  let access_token: any=localStorage.getItem('access_token');   
 
  let api_req:any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"email_queue_report_export","admin_id":"'+this.admin_id+'","from_dt":"'+from_date+'","to_dt":"'+to_date+'","agent_id":"'+agent_id+'","dept_id":"'+dept_id+'"}}';
  

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    console.log(response);
    Swal.close();
    if(response.status==true){
    this.res = response;
    var arrStr = encodeURIComponent(JSON.stringify(this.res));
    // document.location.href = 'https://omni.mconnectapps.com/api/storage/contact/download.php?res='+arrStr;
    var url = 'https://uatassaabloyccapi.mconnectapps.com/api/storage/email/email_report.php';
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
