import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';
// import * as moment from 'moment';
import * as moment from 'moment-timezone';
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-call-activity-report',
  templateUrl: './call-activity-report.component.html',
  styleUrls: ['./call-activity-report.component.css']
})
export class CallActivityReportComponent implements OnInit {
  call_history_list: any;
  offset_count = 0;
  pageLimit = 20;
  getRep: FormGroup;
  paginationData:any ={"info":"hide"};
  recordNotFound = false;
  uadmin_id: any;
  user_type: any;
  admin_permission: any;
  res: any;
  usersL: any;
  call_type: any;
  call_nature: any;
  browsertimezone: any;

  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit(): void {

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


    if(this.admin_permission =='1') 
    this.uadmin_id = localStorage.getItem('admin_id');

      this.browsertimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          
     this.getAuxCode();
     this.getUsers();
    this.reportList({});
  }


  reportList(data){

    var list_data= this.listDataInfo(data);
    let api_req:any = new Object();
    let report_list_req:any = new Object();
    api_req.operation="call";
    api_req.moduleType="call";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    report_list_req.action='call_activity_list';
    report_list_req.admin_id=localStorage.getItem('admin_id');
    report_list_req.user_id=this.uadmin_id;
    report_list_req.limit=list_data.limit;
    report_list_req.offset=list_data.offset;
    report_list_req.search_text=list_data.search_text;
    api_req.element_data = report_list_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response.result.data);

      this.call_history_list = response.result.data.list_data;
      // this.call_history_list = response.result.data;
      this.offset_count = response.result.data.list_info.offset;
      this.paginationData = this.serverService.pagination({'offset':response.result.data.list_info.offset, 'total':response.result.data.list_info.total, 'page_limit' :this.pageLimit });

      this.recordNotFound = this.call_history_list.length == 0 ? true : false;
  },
  (error) => {
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
  agents_req.action="generate_activity_report";
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
      if(response.result.data != []){
      this.res = response.result.data;

      // this.res =this.res.sort((a, b) => parseFloat(a.call_start) - parseFloat(b.call_start));
      // this.res = this.res.sort((a, b) => parseFloat(b.call_start) - parseFloat(a.call_start));

      var arrStr = encodeURIComponent(JSON.stringify(this.res));

      // var url = 'https://hp.mconnectapps.com/api/storage/call/call_report.php';
      // var form = $('<form target="_blank" action="' + url + '" method="post">' +
      // '<input type="text" name="res" value="' + arrStr + '" />' +
      // '</form>');
      // $('body').append(form);
      // form.submit();
   


      var heading = ['Created By', 'Call From', 'Call To','Direction','Duration','Phone Number','Actual Start','Actual End','Account Name','Account Org ID','Account ST ID','Account ST Name','Opportunity ID','Country'];

      // convert JSON to CSV
      // console.log(this.res[0]);
      const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
      const header2 = Object.keys(this.res[0]);
      const header = heading;
      // console.log(header);
      // console.log(header2);
      let csv = this.res.map(row => header2.map(fieldName =>
        JSON.stringify(row[fieldName], replacer)).join(','))
      csv.unshift(header.join(','))
      csv = csv.join('\r\n')

      // Create link and download
      var link = document.createElement('a');
      link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
      // link.setAttribute('download', filename);
      link.setAttribute('download', 'Broadcast Summary Report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


    
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



  getUsers(){
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="get_all_my_users";
    agents_req.user_id= this.uadmin_id;
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

   convertTZ(date) {
     console.log(this.browsertimezone);
     console.log(date);
     if(date != '0000-00-00 00:00:00'){
     var dates = date.split(" ");
     var onlydate = new Date(dates[0]);
     var onlytime = dates[1].split(":");

     var testyear = onlydate.getFullYear();
     var testmonth = onlydate.getMonth();
     var testdate = onlydate.getDate();
    //  var testhrs = onlytime.getHours();
    //  var testmin = date.getMinutes();
    //  var testsec = date.getSeconds();
     var testhrs = onlytime[0];
     var testmin = onlytime[1];
     var testsec = onlytime[2];
      // return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: this.browsertimezone}));   
      return  new Date(Date.UTC(testyear, testmonth, testdate, testhrs, testmin, testsec)).toLocaleString("en-US", {timeZone: this.browsertimezone});   
      // new Date(Date.UTC(year, month, day, hour, minute, second))
     }else{
       return date;
     }
  }

//    toTimeZone(time) {

//      var zone = this.browsertimezone;
//     // console.log(zone);
//     // console.log(time);
//     // var format = 'YYYY/MM/DD HH:mm:ss';
//     // return moment(time, format).tz(zone).format(format);

//     // var testDateUtc2= moment.tz(time, "M/D/YYYY h:mm a", "America/Los_Angeles")
//     // var testDateUtc2=  moment(time).local().toDate();
//     let global_timezone = localStorage.getItem('timezone_name');
//     if(time != '0000-00-00 00:00:00'){
//     var newYork    = moment.tz(time, global_timezone);
//     var losAngeles = newYork.clone().tz(zone).format("YYYY-MM-DD HH:mm:ss");
  
//     // var testDateUtc = moment.utc(time);
//     // var testData = testDateUtc.clone().tz(zone).format("YYYY-MM-DD HH:mm:ss");
//     // var localDate = moment(testDateUtc).local();
//     // console.log(localDate);
//     // console.log(testDateUtc);
//     // var s = localDate.format("YYYY-MM-DD HH:mm:ss");
//     return losAngeles;
//     }else{
//       return time;
//     }
// }


// toTimeZone(time) {

//   var zone = this.browsertimezone;

//  let global_timezone = localStorage.getItem('timezone_name');
//  if(time != '0000-00-00 00:00:00'){
//  var newYork    = moment.tz(time, global_timezone);
//  var losAngeles = newYork.clone().tz(zone).format("YYYY-MM-DD HH:mm:ss");
//  return losAngeles;
//  }else{
//    return time;
//  }
// }

}
