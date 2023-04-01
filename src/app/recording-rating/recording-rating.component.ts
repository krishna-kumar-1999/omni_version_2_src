import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
import Swal from 'sweetalert2'

declare var iziToast:any;

@Component({
  selector: 'app-recording-rating',
  templateUrl: './recording-rating.component.html',
  styleUrls: ['./recording-rating.component.css']
})
export class RecordingRatingComponent implements OnInit {
  agentRatingList;
  recordNotFound = false;
  from_dates;
  to_date;
  getRep: FormGroup;
  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit(): void {
    this.getRep = new FormGroup({
      'from_date' :new FormControl(null),
      'to_date' :new FormControl(null),
      });

    this.ratingList();

  }


 ratingList() {
  Swal.fire({
    title: 'Please Wait',
    allowEscapeKey: false,
    allowOutsideClick: false,
  //  background: '#19191a',
    showConfirmButton: false,
    onOpen: ()=>{
      Swal.showLoading();
    }
  });
    let api_req: any = new Object();
    let history_req: any = new Object();
    history_req.action = "getAgentRecordingReport";
     history_req.user_id = localStorage.getItem('userId');
     history_req.admin_id = localStorage.getItem('admin_id');
    api_req.operation = "call";
    api_req.moduleType = "call";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = history_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      this.agentRatingList = response.result.data.report_data;
      console.log(this.agentRatingList);
    },
      (error) => {
        console.log(error);
      });

  }

  

 searchDates() {

  if(this.getRep.value.from_date != null && this.getRep.value.to_date != null && this.getRep.value.from_date != undefined && this.getRep.value.to_date != undefined){

  Swal.fire({
    title: 'Please Wait',
    allowEscapeKey: false,
    allowOutsideClick: false,
  //  background: '#19191a',
    showConfirmButton: false,
    onOpen: ()=>{
      Swal.showLoading();
    }
  });
    let api_req: any = new Object();
    let history_req: any = new Object();
    history_req.action = "getAgentRecordingReport";
     history_req.user_id = localStorage.getItem('userId');
     history_req.admin_id = localStorage.getItem('admin_id');
     history_req.fromDate = this.getRep.value.from_date;
     history_req.toDate = this.getRep.value.to_date;
    api_req.operation = "call";
    api_req.moduleType = "call";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = history_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      this.agentRatingList = response.result.data.report_data;
      console.log(this.agentRatingList);
    },
      (error) => {
        console.log(error);
      });

     }else{
        iziToast.warning({
          message: "Please select From Date and To Date",
          position: 'topRight'
        });
      }

  }

 getReports() {

  if(this.getRep.value.from_date != null && this.getRep.value.to_date != null && this.getRep.value.from_date != undefined && this.getRep.value.to_date != undefined){

  Swal.fire({
    title: 'Please Wait',
    allowEscapeKey: false,
    allowOutsideClick: false,
  //  background: '#19191a',
    showConfirmButton: false,
    onOpen: ()=>{
      Swal.showLoading();
    }
  });
    let api_req: any = new Object();
    let history_req: any = new Object();
    history_req.action = "getAgentRecordingReport";
     history_req.user_id = localStorage.getItem('userId');
     history_req.admin_id = localStorage.getItem('admin_id');
     history_req.fromDate = this.getRep.value.from_date;
     history_req.toDate = this.getRep.value.to_date;
    api_req.operation = "call";
    api_req.moduleType = "call";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = history_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      this.agentRatingList = response.result.data.report_data;
      console.log(this.agentRatingList);


      var arrStr = encodeURIComponent(JSON.stringify(this.agentRatingList));

      var heading = ['Agent Name', 'No of Records', 'Percentage %'];

      // convert JSON to CSV
      // console.log(this.res[0]);
      const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
      const header2 = Object.keys(this.agentRatingList[0]);
      const header = heading;
      // console.log(header);
      // console.log(header2);
      let csv = this.agentRatingList.map(row => header2.map(fieldName =>
        JSON.stringify(row[fieldName], replacer)).join(','))
      csv.unshift(header.join(','))
      csv = csv.join('\r\n')

      // Create link and download
      var link = document.createElement('a');
      link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
      // link.setAttribute('download', filename);
      link.setAttribute('download', 'Agent Call Survey Report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);




    },
      (error) => {
        console.log(error);
      });

    }else{
      iziToast.warning({
        message: "Please select From Date and To Date",
        position: 'topRight'
      });
    }
  }


}
