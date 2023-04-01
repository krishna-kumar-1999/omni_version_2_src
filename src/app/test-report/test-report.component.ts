import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.css']
  
})
export class TestReportComponent implements OnInit {
  getRep: FormGroup;
  fromDate:any=[];
  arr: any;
  res: any;
  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.getRep = new FormGroup({
      'from_dt' :new FormControl(null),
      'sec' :new FormControl(null),
      });
  }

  getReports(){
   console.log(this.getRep.value);
   let api_req:any = new Object();
   let agents_req:any = new Object();
   agents_req.action="reportlist";
   this.fromDate = $('#from_dt').val();
   this.arr=this.fromDate.split('-');
   var year =this.arr[0];
   var month =this.arr[1]
   console.log(this.arr);
   console.log(year);
   console.log(month);
   agents_req.month = month;
   agents_req.year = year;
   agents_req.sec = this.getRep.value.sec;
   api_req.operation="month_report";
   api_req.moduleType="month_report";
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
// console.log(arrStr)
       var url = 'https://'+window.location.hostname+':4003/api/storage/call/call_monthly_report.php?sec='+this.getRep.value.sec;
      //  console.log(url);
      //  return false
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
