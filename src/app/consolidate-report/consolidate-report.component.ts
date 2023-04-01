
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2'


@Component({
  selector: 'app-consolidate-report',
  templateUrl: './consolidate-report.component.html',
  styleUrls: ['./consolidate-report.component.css']
})
export class ConsolidateReportComponent implements OnInit {
  res;
  getRep: FormGroup;
  usersL;
  selected_price: any;
  userData = { "licensce_key": "" };
  public isKeyAvail = false;
  public isItemAvailable = false;
  s_licence_key: any;
  items: any;
  accessToken: any;
  user_id: any;
  admin_id; callers;
  character:any = [];
  recordNotFound = false;
  offset_count = 0; call_history_list; tot_data; total_name; percent
  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit() {
    this.admin_id = localStorage.getItem('admin_id');
    this.getRep = new FormGroup({
      'from_date': new FormControl(null)     
    });
    // this.searchData();
  
    this.character = ['a','b','c','d','e','f','g','h','i'];

  }



  searchData() {
  

    let api_req: any = new Object();
    let history_req: any = new Object();
    history_req.action = "survey_summary";
    history_req.from_dt = this.getRep.value.from_date;
    history_req.to_dt = this.getRep.value.to_date;
    history_req.admin_id = localStorage.getItem('admin_id');
    api_req.operation = "survey";
    api_req.moduleType = "survey";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = history_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);
      this.call_history_list = response.list_data;
      this.tot_data = response.nos;
      this.total_name = response.total;
      this.percent = response.percentage;

    },
      (error) => {
        console.log(error);
      });

  }

  searchData1() {

    if (this.getRep.value.from_date == null || this.getRep.value.to_date == null) {
      iziToast.warning({
        message: "Please Select from to Date to do search",
        position: 'topRight'
      });
      return false;
    }
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: false,
      background: '#19191a',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
      }
    });
    let api_req: any = new Object();
    let history_req: any = new Object();
    history_req.action = "survey_summary";
    history_req.from_dt = this.getRep.value.from_date;
    history_req.to_dt = this.getRep.value.to_date;
    history_req.admin_id = localStorage.getItem('admin_id');
    api_req.operation = "survey";
    api_req.moduleType = "survey";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = history_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      this.call_history_list = response.list_data;
      this.tot_data = response.nos;
      this.total_name = response.total;
      this.percent = response.percentage;

    },
      (error) => {
        console.log(error);
      });

  }






  getReports() {   
  //  var url= 'https://uatassaabloyccapi.mconnectapps.com/api/data-dumps/createRec.php?rec_date='+this.getRep.value.from_date;   
    var url = "https://"+window.location.hostname+":4003/api/data-dumps/createRec.php?rec_date="+this.getRep.value.from_date;   
   if(this.getRep.value.from_date==''||this.getRep.value.from_date==undefined||this.getRep.value.from_date==null||this.getRep.value.from_date=="null"){
    iziToast.warning({
    message: "Please choose the Date",
    position: 'topRight'
  });
   return false;
   }
    window.open(url, "_blank");
  }








  searchLK(key, phone) {
    this.s_licence_key = phone;
    this.isItemAvailable = false;
  }

  initializeItems(val) {
    this.accessToken = localStorage.getItem('access_token');
    this.user_id = localStorage.getItem('userId');
    let phone_num: any = $('#phone_num').val();


    let api_req: any = new Object();
    let agents_req: any = new Object();
    agents_req.action = "contacts_number_list";
    agents_req.user_id = localStorage.getItem('userId');
    agents_req.phone_num = phone_num;
    api_req.operation = "contact";
    api_req.moduleType = "contact";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    console.log(api_req);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {

        this.items = response.result.data;
        this.isItemAvailable = true;
      } else {
        iziToast.warning({
          message: "No Records Found. Please try again",
          position: 'topRight'
        });
      }
    });
  }

  getItems(ev: any) {
    const val = ev.target.value;
    this.initializeItems(val);
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.isKeyAvail = false;
      this.items = this.items.filter((item) => {
        return item;
      }
      )
    }
  }


}
