import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-log-report',
  templateUrl: './log-report.component.html',
  styleUrls: ['./log-report.component.css']
})
export class LogReportComponent implements OnInit {
  call_history_list;
  recordNotFound = false;
  pageLimit = 20;
  paginationData:any ={"info":"hide"};
  offset_count = 0;
  getRep: FormGroup;
  auxcodes;
  uadmin_id;
  res;
  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit() {
    this.callHistoryList({});
    this.getRep = new FormGroup({
      'type' :new FormControl(null),
      'rep_format' :new FormControl(null),
      'report_name' :new FormControl(null),
      'from_dt' :new FormControl(null),
      'to_dt' :new FormControl(null),
    });
  }
  

  listDataInfo(list_data){

		list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
		list_data.order_by_name = list_data.order_by_name == undefined ? "history.report_details_id" : list_data.order_by_name;
		list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
		list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
		list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
		return list_data;
	}



     callHistoryList(data){

			var list_data= this.listDataInfo(data);
			let api_req:any = new Object();
			let history_req:any = new Object();
			history_req.action="report_list";
			history_req.search_text=list_data.search_text;
			history_req.order_by_name=list_data.order_by_name;
			history_req.order_by_type=list_data.order_by_type;
			history_req.limit=list_data.limit;
			history_req.offset=list_data.offset;
			history_req.user_id=localStorage.getItem('userId');
			api_req.operation="report";
			api_req.moduleType="report";
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
	  



    genReport(){
      let access_token: any=localStorage.getItem('access_token');
      let report_details:any = this.getRep.value;



			let api_req:any = new Object();
			report_details.action="gen_log_report";
			report_details.admin_id = localStorage.getItem('admin_id');
			api_req.operation="report";
			api_req.moduleType="report";
			api_req.api_type="web";
			api_req.access_token=localStorage.getItem('access_token');
			api_req.element_data = report_details;

      this.serverService.sendServer(api_req).subscribe((response:any) => {
        if(response.result.data == 1){
          iziToast.success({
            message: "Report Generated successfully",
            position: 'topRight'
        });
          this.callHistoryList({});
        } else {
          iziToast.error({
            message: "Some Error occured",
            position: 'topRight'
        });
        }
      }, 
      (error)=>{
          console.log(error);
      });
    }



}
