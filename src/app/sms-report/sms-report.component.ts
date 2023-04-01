import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-sms-report',
  templateUrl: './sms-report.component.html',
  styleUrls: ['./sms-report.component.css']
})
export class SmsReportComponent implements OnInit {
  res;
  getRep: FormGroup;
  usersL;
  selected_price : any;
  userData = {"licensce_key": ""};
  public isKeyAvail = false;
  public isItemAvailable = false;
  s_licence_key : any;
  items: any;
  accessToken:any;
  user_id:any;
  admin_id;callers;
  recordNotFound = false;
  offset_count = 0;call_history_list;tot_data;total_name;percent;
  price_sms;
  pageLimit = 10;
  paginationData:any ={"info":"hide"};


  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit(): void {
    this.price_sms = localStorage.getItem('price_sms');
    this.searchData({});
    this.getRep = new FormGroup({
      'rep_format' :new FormControl(null),
      'report_name' :new FormControl(null),
      'from_dt' :new FormControl(null),
      'to_dt' :new FormControl(null),
    });
  }
  listDataInfo(list_data){

    list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    //list_data.order_by_name = list_data.order_by_name == undefined ? "contact.contact_id" : list_data.order_by_name;
    //list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  searchData(data){
    var list_data= this.listDataInfo(data);
    let api_req:any = new Object();
    let history_req:any = new Object();
    history_req.action="sms_list";
    history_req.admin_id=localStorage.getItem('admin_id');
    history_req.limit=list_data.limit;
    history_req.offset=list_data.offset;
    history_req.search_text=list_data.search_text;

    api_req.operation="chat";
    api_req.moduleType="chat";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = history_req;
          this.serverService.sendServer(api_req).subscribe((response:any) => {
            if(response.status==true){
              this.call_history_list = response.result.data.list_data;
             this.price_sms = response.result.data.sms_bal;
            this.offset_count = list_data.offset;
             this.paginationData = this.serverService.pagination({'offset':response.result.data.list_info.offset, 'total':response.result.data.list_info.total, 'page_limit' :this.pageLimit });

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
    report_details.action="sms_report";
    report_details.admin_id = localStorage.getItem('admin_id');
    api_req.operation="sms";
    api_req.moduleType="sms";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = report_details;
    //console.log(api_req); return false;

    this.serverService.sendServer(api_req).subscribe((response:any) => {
      console.log(response);
      if(response.result.status==true){
      this.res = response;
      var arrStr = encodeURIComponent(JSON.stringify(this.res));
      // document.location.href = 'https://hp.mconnectapps.com/api/storage/contact/download.php?res='+arrStr;
      var url = 'https://'+window.location.hostname+':4003/api/storage/chat/Sms_Report.php';
      var form = $('<form action="' + url + '" method="post">' +
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
