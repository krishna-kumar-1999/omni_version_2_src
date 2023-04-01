import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
import Swal from 'sweetalert2'

declare var iziToast:any;

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.css']
})
export class SurveyReportComponent implements OnInit {
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
  pageLimit = 20;
  paginationData:any ={"info":"hide"};
  offset_count = 0;call_history_list;
  admin_permission;
  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit() {
    this.admin_id=localStorage.getItem('admin_id');
    this.user_id = localStorage.getItem('userId');
		this.admin_permission = localStorage.getItem('admin_permision');

    if(this.admin_permission =='1') 
    this.user_id = localStorage.getItem('admin_id');
    this.getRep = new FormGroup({
      'aget_ids' :new FormControl(null),
      'caller_ids' :new FormControl(null),
      'from_date' :new FormControl(null),
      'to_date' :new FormControl(null),
    });
    this.getUsers();
    this.getCallers();
    this.searchData({});
    
  }
  getUsers(){
    let access_token: any=localStorage.getItem('access_token');
  
    let api_req:any = '{"operation":"survey", "moduleType": "survey", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_survey_agents","admin_id":"'+this.admin_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        this.usersL = response.result.data;
      } else {
        this.recordNotFound = true;
      }
    }, 
    (error)=>{
        console.log(error);
    });
  }
  getCallers(){
    let access_token: any=localStorage.getItem('access_token');
  
    let api_req:any = '{"operation":"survey", "moduleType": "survey", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_survey_callers","admin_id":"'+this.admin_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        this.callers = response.result.data;
      } else {
        this.recordNotFound = true;
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

			var list_data= this.listDataInfo(data);
			let api_req:any = new Object();
			let history_req:any = new Object();
			history_req.action="survey_list";
			history_req.search_text=list_data.search_text;
			history_req.limit=list_data.limit;
      history_req.offset=list_data.offset;
      history_req.from_dt = "";
      history_req.to_dt = "";
      history_req.agent_name = "";
      history_req.call_id = "";
			history_req.admin_id=localStorage.getItem('admin_id');
			api_req.operation="survey";
			api_req.moduleType="survey";
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
    
    


    searchDatalist(data){

      var list_data= this.listDataInfo(data);
      //alert(this.getRep.value.from_date);
      if(this.getRep.value.from_date == null||this.getRep.value.to_date ==null){
        iziToast.warning({
          message: "Please fill From/To Date",
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
        onOpen: ()=>{
            Swal.showLoading();
        }
      });
			let api_req:any = new Object();
			let history_req:any = new Object();
			history_req.action="survey_list";
			history_req.limit=list_data.limit;
      history_req.offset=list_data.offset;
			//history_req.search_text=list_data.search_text;
      history_req.from_dt = this.getRep.value.from_date;
      history_req.to_dt = this.getRep.value.to_date;
      // history_req.agent_name = this.getRep.value.aget_ids.join();
      // history_req.call_id = this.getRep.value.caller_ids.join();

      if(this.getRep.value.aget_ids != null&&this.getRep.value.aget_ids!='')
      history_req.agent_name = this.getRep.value.aget_ids.join();
      if(this.getRep.value.caller_ids != null && this.getRep.value.caller_ids != '')
      history_req.call_id = this.getRep.value.caller_ids.join();

			history_req.admin_id=localStorage.getItem('admin_id');
			api_req.operation="survey";
			api_req.moduleType="survey";
			api_req.api_type="web";
			api_req.access_token=localStorage.getItem('access_token');
			api_req.element_data = history_req;
            this.serverService.sendServer(api_req).subscribe((response:any) => {
            Swal.close();
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
    console.log(this.getRep.value);
    if(this.getRep.value.aget_ids != null&&this.getRep.value.aget_ids!='')
    var agents = this.getRep.value.aget_ids.join();
    if(this.getRep.value.from_date == null||this.getRep.value.to_date ==null){
      iziToast.warning({
        message: "Please Select From/To Date",
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
      onOpen: ()=>{
          Swal.showLoading();
      }
    });
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="survey_rep";
   
    agents_req.user_id=this.user_id;
    agents_req.admin_id=localStorage.getItem('admin_id');
    agents_req.agents = agents;
    agents_req.from_dt = this.getRep.value.from_date;
    agents_req.to_dt = this.getRep.value.to_date;
    if(this.getRep.value.aget_ids != null&&this.getRep.value.aget_ids!='')
    agents_req.agent_name = this.getRep.value.aget_ids.join();
    if(this.getRep.value.caller_ids != null && this.getRep.value.caller_ids != '')
    agents_req.call_id = this.getRep.value.caller_ids.join();
    // agents_req.agent_name = this.getRep.value.aget_ids.join();
    // agents_req.call_id = this.getRep.value.caller_ids.join();
    api_req.operation="survey";
    api_req.moduleType="survey";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    console.log(api_req);
        this.serverService.sendServer(api_req).subscribe((response:any) => {
        console.log(response);

            Swal.close();
  
          if(response.result.status==true){
          this.res = response;
          var arrStr = encodeURIComponent(JSON.stringify(this.res));
          // document.location.href = 'https://hp.mconnectapps.com/api/storage/contact/download.php?res='+arrStr;
       
        
          var url = 'https://'+window.location.hostname+':4003/api/storage/call/survey_report.php';
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








  searchLK(key, phone){
    this.s_licence_key = phone;
    this.isItemAvailable = false;
  }

  initializeItems(val){
    this.accessToken=localStorage.getItem('access_token');
    // this.user_id=localStorage.getItem('userId');
    let phone_num: any= $('#phone_num').val();


    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="contacts_number_list";
    agents_req.user_id=this.user_id;
    agents_req.phone_num = phone_num;
    api_req.operation="contact";
    api_req.moduleType="contact";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    console.log(api_req);
        this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){

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
     )}
    }

    pickcaller(cID){
    
     if(this.getRep.value.from_date == null){
      this.getRep.value.from_date ='';
     }
     if(this.getRep.value.to_date == null){
      this.getRep.value.to_date ='';
     }
      let access_token: any=localStorage.getItem('access_token');
  
      let api_req:any = '{"operation":"survey", "moduleType": "survey", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_survey_callers_bydt","admin_id":"'+this.admin_id+'","from_dt":"'+this.getRep.value.from_date+'","to_dt":"'+this.getRep.value.to_date+'","ag_id":"'+cID+'"}}';
    
      this.serverService.sendServer(api_req).subscribe((response:any) => {
        if(response.result.status==true){
          this.callers = response.result.data;
        } else {
          this.recordNotFound = true;
        }
      }, 
      (error)=>{
          console.log(error);
      });
    }

}

