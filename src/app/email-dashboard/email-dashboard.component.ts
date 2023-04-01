import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { Observable } from 'rxjs';

declare var $:any;
import Swal from 'sweetalert2'
declare var iziToast:any;
@Component({
  selector: 'app-email-dashboard',
  templateUrl: './email-dashboard.component.html',
  styleUrls: ['./email-dashboard.component.css']
})

export class EmailDashboardComponent implements OnInit {

  constructor(private serverService: ServerService,public router: Router) { }
  user_id;
  admin_id;
  queue_list_all;
  admin_permission;
  access_token;
  user_type;
  admin_type;
  show_admin_set=false;
  filterON=false;
  view_name="Standard View";
  overall_count;
  emptydata;
  has_robin;
  show_caller_id='1';
  ngOnInit(): void {
    this.user_id = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');
    this.admin_permission = localStorage.getItem('admin_permision');
    this.access_token = localStorage.getItem('access_token');
		this.user_type = localStorage.getItem('user_type');
		this.has_robin = localStorage.getItem('round_robin');
		this.show_caller_id = localStorage.getItem('show_caller_id');


    	if (this.user_type == 'Super Admin') {
			this.user_type = 1;
           this.show_admin_set=true;
  
		}
		else if (this.user_type == 'Admin' || this.admin_permission =='1') {
			this.user_type = 2;
			this.admin_type='Admin';
             this.show_admin_set=true;

		}
		else {
			this.user_type = 3;
			this.admin_type='';
            this.show_admin_set=false;
		}
//Added default today date for assabloyc filter issue 
this.my_externaltickets();
  }
  
//   my_externaltickets() {
// 		// this.inputName.nativeElement.value = ' ';
// 		let admin_id = localStorage.getItem('admin_id');
// 		Swal.fire({
// 			html:
// 				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
// 		    showCloseButton: false,
// 			showCancelButton: false,
// 			showConfirmButton: false,
// 			focusConfirm: false,
// 			background: 'transparent',
// 		});

// 		let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + this.access_token + '", "element_data":{"action":"ticket_dashboard","user_type":"' + this.user_type + '","user_id":"' + this.user_id + '","admin_id":"' + admin_id + '"}}';
// 		this.serverService.sendServer(api_req).subscribe((response: any) => {
// 			Swal.close();
// 				this.queue_list_all = response.user_options;
// 				//console.log(this.queue_list_all)
// 				this.filterON=false;
// 			//	this.queue_list_all = this.removeDuplicates(this.queue_list_all, "user_id");	
// 				//console.log(this.queue_list_all)

// 				this.emptydata=this.queue_list_all==null?true:this.queue_list_all==''?true:false;
// 		},
// 			(error) => {
// 				console.log(error);
// 			});
// 	}

toJSONLocal(date) {
	var local = new Date(date);
	local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return local.toJSON().slice(0, 10);
  }
//     dateToYMD(date) {
//     var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     var d = date.getDate();
//     var m = strArray[date.getMonth()];
//     var y = date.getFullYear();
//     return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
// }
	my_externaltickets() { 
		console.log(new Date())
		console.log(new Date().toLocaleString());
		console.log(new Date().toISOString());
		var date = new Date();
	    let dateLocal =this.toJSONLocal(date);
console.log(dateLocal)
	 //Added default today date for assabloyc filter issue 
	 $('#from_date').val(dateLocal);
     $('#to_date').val(dateLocal);
	 
	 let from= $('#from_date').val();
	 let to= $('#to_date').val();
		if(from=='' || to==''){
			iziToast.warning({
				message:"Please Select Date Fields",
				position:"topRight"
			});
			return false;
		}
		if (from > to) {    			  
			iziToast.warning({
				message:"Date One is greater than Date Two.",
				position:"topRight"
			});
			return false;
		} 
		let admin_id = localStorage.getItem('admin_id');
		Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		    showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent',


	   });

		let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + this.access_token + '", "element_data":{"action":"ticket_dashboard_dateFilter","user_type":"' + this.user_type + '","user_id":"' + this.user_id + '","admin_id":"' + admin_id + '","from_date":"' + from + '","to_date":"' + to + '"}}';
		this.serverService.sendServer(api_req).subscribe((response: any) => {
			Swal.close();	 
				this.queue_list_all = response.user_options;
				this.filterON=false;
				 this.queue_list_all = this.removeDuplicates(this.queue_list_all, "user_id");
		},
			(error) => {
				console.log(error);
			});
	}
	
	 removeDuplicates(originalArray, prop) {
		 var newArray = [];
		 var lookupObject  = {};
	
		 for(var i in originalArray) {
			lookupObject[originalArray[i][prop]] = originalArray[i];
		 }
	
		 for(i in lookupObject) {
			 newArray.push(lookupObject[i]);
		 }
		  return newArray;
	 }
	
	
	searchFromTo(){
		let from= $('#from_date').val();
		let to= $('#to_date').val();
		if(from=='' || to==''){
			iziToast.warning({
				message:"Please Select Date Fields",
				position:"topRight"
			});
			return false;
		}
		if (from > to) {    			  
			iziToast.warning({
				message:"Date One is greater than Date Two.",
				position:"topRight"
			});
			return false;
		} 
		let admin_id = localStorage.getItem('admin_id');
		Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		    showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent',


		});

		let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + this.access_token + '", "element_data":{"action":"ticket_dashboard_dateFilter","user_type":"' + this.user_type + '","user_id":"' + this.user_id + '","admin_id":"' + admin_id + '","from_date":"' + from + '","to_date":"' + to + '"}}';
		this.serverService.sendServer(api_req).subscribe((response: any) => {
			Swal.close();
			$('#generalFilter').removeClass('show');				
			$('#from_date').val('');
			$('#to_date').val('');
				this.queue_list_all = response.user_options;
				this.filterON=true;
				this.queue_list_all = this.removeDuplicates(this.queue_list_all, "user_id");
		},
			(error) => {
				console.log(error);
			});
	}
	CustomFromTo(){
		let from= $('#custome_filter').val();
		
		if(from==''){
			iziToast.warning({
				message:"Please Select filter",
				position:"topRight"
			});
			return false;
		}
		let admin_id = localStorage.getItem('admin_id');
		Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		    showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent',


		});

		let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + this.access_token + '", "element_data":{"action":"ticket_dashboard_customFilter","user_type":"' + this.user_type + '","user_id":"' + this.user_id + '","admin_id":"' + admin_id + '","custom_value":"' + from + '"}}';
		this.serverService.sendServer(api_req).subscribe((response: any) => {
			Swal.close();
			$('#generalFilter').removeClass('show');				
			$('#from_date').val('');
			$('#to_date').val('');
				this.queue_list_all = response.user_options;
				this.filterON=true;
				//this.queue_list_all = this.removeDuplicates(this.queue_list_all, "user_id");
			
		},
			(error) => {
				console.log(error);
			});
	}
	changeMylayout(theme) {
		if (theme == 'view1') {
			$('#Dash-view-1').show();
			$('#Dash-view-2').hide();		
			this.view_name = 'Standard View';
		}
		else {
			$('#Dash-view-1').hide();
			$('#Dash-view-2').show();			
			this.view_name = 'Card View';
		}

	}
	ClearAll(){
		
	  
		Swal.fire({
		  title: 'Are you sure?',
		  text: "This will remove all Data. You won't able to revert this",
		  icon: 'error',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
		  let access_token: any=localStorage.getItem('access_token');
		 
	
		//   let api_req:any = '{"operation":"predective_dialer_contact", "moduleType":"predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_contact","user_id":"'+this.user_id+'","contact_id":"'+invalidContacts+'"}}';
		  let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"ClearAllTicktets","admin_id":"' + this.admin_id + '"}}';
		
		  this.serverService.sendServer(api_req).subscribe((response:any) => {
		
		  if(response.result.data==true){
			Swal.fire("Cleared","You won't able to revert this","success");	
			setTimeout(() => {
			  this.my_externaltickets();	
				
			  }, 2000);
		  }
		  }, 
		  (error)=>{
			console.log(error);
		  });
		
		}  
		})
		}
	

		clictToCall(to){
			// if(to == 'phone'){  this.to_num = $('#phone').val(); } else {  this.to_num = $('#mobile').val(); }
			 if(to == ''){
				 iziToast.warning({
				   message: "No Number To Call",
				   position: 'topRight'
				 });
			 } else {
	
				Swal.fire({
					title: 'Confirm for Call',
					text:' Call to '+ to+'',
					icon: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Confirm!'
				  }).then((result) => {
					if (result.value) {
						var extention = localStorage.getItem('ext_int_status');
						// alert(extention);
						 if(extention == '2'){
						  let api_reqs:any = '{"type": "makecall", "number": "'+to+'","show_caller_id":"'+this.show_caller_id+'"}';
						  this.serverService.show.next(api_reqs);
						 } else {
						  let api_reqs:any = '{"type": "makecallauto", "number": "'+to+'"}';
						  this.serverService.show.next(api_reqs);
						 }
					}
				  });	   
			 }
		   }
	
}
