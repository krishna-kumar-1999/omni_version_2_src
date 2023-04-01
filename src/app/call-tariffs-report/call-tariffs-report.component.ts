import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-call-tariffs-report',
  templateUrl: './call-tariffs-report.component.html',
  styleUrls: ['./call-tariffs-report.component.css']
})
export class CallTariffsReportComponent implements OnInit {
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
  price_sms
  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit(): void {
    this.price_sms = localStorage.getItem('price_sms');
    this.searchData();
    this.getRep = new FormGroup({
      'rep_format' :new FormControl(null),
      'report_name' :new FormControl(null),
      'from_dt' :new FormControl(null),
      'to_dt' :new FormControl(null),
    });
  }
  searchData(){


    var from_no = $('#from_no').val();
    var to_no = $('#to_no').val();
    var from_dt = $('#from_dt').val();
    var to_dt = $('#to_dt').val();

    let api_req:any = new Object();
    let history_req:any = new Object();
    history_req.action="list_call_cost";
    history_req.from_no=from_no;
    history_req.to_no=to_no;
    history_req.from_dt=from_dt;
    history_req.to_dt=to_dt;
    history_req.admin_id=localStorage.getItem('admin_id');
    api_req.operation="call_tarrif";
    api_req.moduleType="call_tarrif";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = history_req;
          this.serverService.sendServer(api_req).subscribe((response:any) => {
            if(response.status=='true'){
              this.call_history_list = response.call_det;
              console.log(this.call_history_list);
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

