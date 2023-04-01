import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServerService } from '../services/server.service';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-spam-list',
  templateUrl: './spam-list.component.html',
  styleUrls: ['./spam-list.component.css']
})
export class SpamListComponent implements OnInit {
  uadmin_id;
  user_id;
  spamlist;
  addSpams: FormGroup;
  paginationData2:any ={"info":"hide"};
  paginationData:any ={"info":"hide"};
  emailList;
  showmore_button = false;
  user_type;
  pageLimit = 10;
  offset_count = 0;
  total_offet;
  department;
  filter_agents = 'All';
  new_queue_list;
  recordNotFound = false;
  recordNotFound2 =false;
  delete_queue_list
  offset_count2 = 0;
  admin_permission;
  constructor(private serverService: ServerService, private router: Router,) { }

  ngOnInit() {
    this.uadmin_id = localStorage.getItem('admin_id');
    this.user_id = localStorage.getItem('admin_id');
    this.user_type = localStorage.getItem('user_type');
    this.admin_permission = localStorage.getItem('admin_permision');

    this.addSpams = new FormGroup({
      'emailids': new FormControl(null, Validators.required),
      'status': new FormControl(null)
    });
    if (this.user_type == 'Super Admin') {
      this.user_type = 1;
    }
    else if (this.user_type == 'Admin' || this.admin_permission =='1') {
      this.user_type = 2;
    }
    else {
      this.user_type = 3;//This is page can see if agent have admin_permission
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have no access view that page!',
      });
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
      return false;
    }
    this.getspamlist();
    this.my_spamtickets({});
    // this.my_deletedtickets({});
  }


  getspamlist() {
    let access_token: any = localStorage.getItem('access_token');

    // {"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"", "element_data":{"action":"getIncomingEmailIds","admin_id":"1203"}}

    let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"getIncomingEmailIds","admin_id":"' + this.uadmin_id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        this.spamlist = response.result.spamLists;
        this.emailList = response.result.data;
      } else {
        this.recordNotFound == true;
      }
    },
      (error) => {
        console.log(error);
      });

  }

  addSpam() {
    $('#add_spamform').modal('show');
  }

  changespamStatus(words, events, email_id) {
    let spam_status = '';
    let black_status = '';

    if (events.target.checked == true) {
      spam_status = '1';
      black_status = '0';
    } else {
      spam_status = '0';
      black_status = '0';
    }



    let access_token: any = localStorage.getItem('access_token');
    let user_id = localStorage.getItem('admin_id');
    // {"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"", "element_data":{"action":"blockEmailIds","admin_id":"1203","user_id":"1253","email_id":"Cal4Care | MR < mr@cal4care.com >","spam_status":"0","blacklist_status":"1"}}

    let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"blockEmailIds","admin_id":"' + this.uadmin_id + '","user_id":"' + user_id + '","email_id":"' + email_id + '","spam_status":"' + spam_status + '","blacklist_status":"' + black_status + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        var messages = '';
        messages = "Spam Updated Successfully";

        iziToast.success({
          message: messages,
          position: 'topRight'
        });

        if (events.target.checked == false) {
          this.router.navigate(['/ticketing-system-new']);
        } else {
          this.getspamlist();
          this.my_spamtickets({});
        }
      } else {
        iziToast.error({
          message: "Spam Updated Failed",
          position: 'topRight'
        });

      }
    },
      (error) => {
        console.log(error);
      });

  }


  changeblackStatus(words, events, email_id) {
    let spam_status = '';
    let black_status = '';

    if (events.target.checked == true) {
      spam_status = '0';
      black_status = '1';
    } else {
      spam_status = '0';
      black_status = '0';
    }


    let access_token: any = localStorage.getItem('access_token');
    let user_id = localStorage.getItem('admin_id');
    // {"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"", "element_data":{"action":"blockEmailIds","admin_id":"1203","user_id":"1253","email_id":"Cal4Care | MR < mr@cal4care.com >","spam_status":"0","blacklist_status":"1"}}

    let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"blockEmailIds","admin_id":"' + this.uadmin_id + '","user_id":"' + user_id + '","email_id":"' + email_id + '","spam_status":"' + spam_status + '","blacklist_status":"' + black_status + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        var messages = '';
        messages = "Blacklist Updated Successfully";

        iziToast.success({
          message: messages,
          position: 'topRight'
        });
        this.getspamlist();
        this.my_spamtickets({});

      } else {

        iziToast.error({
          message: "BlackList Updated Failed",
          position: 'topRight'
        });

      }
    },
      (error) => {
        console.log(error);
      });

  }

  deletespam(email) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Would you like to delete this Email from spam list!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        let access_token: any = localStorage.getItem('access_token');
        // {"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"s", "element_data":{"action":"delSpamEmail","admin_id":"1203","email":"Cal4Care | RT < rt@cal4care.com >"}}
        let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"delSpamEmail","admin_id":"' + this.uadmin_id + '","email":"' + email + '"}}';

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.result.status == true) {
            iziToast.success({
              message: "Spam Delete Successfully",
              position: 'topRight'
            });
            this.getspamlist();


          } else {
            iziToast.error({
              message: "Failed to Delete",
              position: 'topRight'
            });
          }

        },
          (error) => {
            console.log(error);
          });

      }

    })


  }


  createSpamList() {

    let access_token: any = localStorage.getItem('access_token');
    let user_id = localStorage.getItem('admin_id');
    let agent_values: any = this.addSpams.value;
    let spam_status = '';
    let black_status = '';
    if (agent_values.status == 'spam') {
      spam_status = '1';
      black_status = '0';
    } else if (agent_values.status == 'black') {
      spam_status = '0';
      black_status = '1';
    }else{
      iziToast.warning({
        message:"Please Choose the spam Type",
        postion:"topRight"
      });
      return false;
    }

    // {"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"", "element_data":{"action":"blockEmailIds","admin_id":"1203","user_id":"1253","email_id":"Cal4Care | MR < mr@cal4care.com >","spam_status":"0","blacklist_status":"1"}}

    let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"blockEmailIds","admin_id":"' + this.uadmin_id + '","user_id":"' + user_id + '","email_id":"' + agent_values.emailids + '","spam_status":"' + spam_status + '","blacklist_status":"' + black_status + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.result.status == true) {
        var messages = '';
        messages = "Spam Updated Successfully";
        $('#add_spamform').modal('hide');
        iziToast.success({
          message: messages,
          position: 'topRight'
        });
        this.getspamlist();
        this.my_spamtickets({})

      } else {
        iziToast.error({
          message: "Spam Updated Failed",
          position: 'topRight'
        });

      }

    },
      (error) => {
        console.log(error);
      });
  }



  // ================================== TICKET LIST FUNCTIONS================================


  my_spamtickets(data) {

    Swal.fire({
      html:
        '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      background: 'transparent',


    });
    let access_token: any = localStorage.getItem('access_token');
    let user_id = localStorage.getItem('admin_id');
    // let api_req2: any = '{"operation":"getmyExternalTicket", "moduleType":"ticket", 
    // "api_type": "web", "access_token":"' + access_token + '",
    //  "element_data":{"action":"my_externaltickets",
    //  "user_type":"' + this.user_type + '","user_id":"' + user_id + '",
    //  "admin_id":"' + this.uadmin_id + '","ticket_status":"All","limit":"100","offset":"0",
    //  "ticket_department":"All","is_spam":"1"}}';
   
   
    var list_data= this.listDataInfo(data);
    let api_req:any = new Object();
    let agents_req:any = new Object();
    // agents_req.action="my_externaltickets";
    agents_req.action="spam_getmyExternalTicket";
    agents_req.user_type=this.user_type;
    agents_req.admin_id=this.uadmin_id;
    agents_req.user_id=user_id;
    agents_req.is_spam='1';
    agents_req.ticket_status='All';
    agents_req.ticket_department='All';
    agents_req.search_text=list_data.search_text;
    // agents_req.order_by_name=list_data.order_by_name;
    // agents_req.order_by_type=list_data.order_by_type;
    agents_req.limit=list_data.limit;
    agents_req.offset=list_data.offset;
    // api_req.operation="getmyExternalTicket";
    api_req.operation="spam_getmyExternalTicket";
    api_req.moduleType="ticket";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    // this.serverService.sendServer(api_req).subscribe((response:any) => {
      
   
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      if (response.status == "true") {
        this.new_queue_list = response.ticket_options;
        this.department = response.department_options;
        this.offset_count = list_data.offset;
        this.paginationData = this.serverService.pagination({'offset':response.list_info.offset, 'total':response.list_info.total, 'page_limit' :this.pageLimit });
        this.recordNotFound = this.new_queue_list == null ? true : false;
      }
    },
      (error) => {
        console.log(error);
      });
  }
  listDataInfo(list_data){

    list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;    
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  viewMyTicket(ticket_id) {
    ticket_id = btoa(ticket_id);

    this.router.navigate(['/ticket-view-thread'], { queryParams: { ticket_id: ticket_id } });

  }

  callFunction(tic) {
    $('#ticket_' + tic).unbind('click');
  }
  // showmore() {
  // 	// $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  // 	// $('.ticketing-system-panel').scrollTop($('.ticketing-system-panel')[0].scrollHeight);
  // 	let admin_id = localStorage.getItem('admin_id');

  // 	Swal.fire({
  // 		html:
  // 			'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
  // 	showCloseButton: false,
  // 		showCancelButton: false,
  // 		showConfirmButton: false,
  // 		focusConfirm: false,
  // 		background: 'transparent',


  // 	});

  //   let access_token: any = localStorage.getItem('access_token');
  //   let user_id = localStorage.getItem('userId');
  // 	this.showmore_button = true;
  // 	this.offset_count = this.offset_count + 10;
  // 	// alert(this.offset_count);
  // 	// this.offset_count = this.offset_count -this.total_offet;
  // 	var offset = this.offset_count;
  // 	if (this.total_offet >= offset + 10) {
  // 		if (this.offset_count >= this.total_offet) {
  // 			this.offset_count = this.total_offet;
  // 			this.showmore_button = false;
  // 		}
  // 	} else {
  // 		// alert('dasds');
  // 		this.showmore_button = false;
  // 	}
  // 	if (this.filter_agents != 'All') {
  // 		this.user_type = '3';
  // 		this.user_id = this.filter_agents;
  // 	}

  // 	let api_req: any = '{"operation":"getmyExternalTicket", "moduleType":"ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"my_externaltickets","user_type":"' + this.user_type + '","user_id":"' + user_id + '","admin_id":"' + admin_id + '","ticket_status":"All","is_spam":"0","limit":"' + this.pageLimit + '","offset":"' + this.offset_count + '","ticket_department":"All"}}';
  // 	this.serverService.sendServer(api_req).subscribe((response: any) => {

  // 		Swal.close();
  // 		if (response.status == "true") {
  // 			// this.queue_list = response.ticket_options;
  // 			// this.queue_list_all = response.ticket_options;

  // 			var mydatas = [];
  // 			mydatas = response.ticket_options;
  // 			// alert(mydatas.length);		
  // 			// this.queue_list = this.queue_list_all.push(mydatas); 
  // 			for (let index = 0; index < mydatas.length; index++) {
  // 				var data = mydatas[index];
  // 				this.queue_list.push(data);
  // 			}

  // 		}
  // 	},
  // 		(error) => {
  // 			console.log(error);
  // 		});
  // }



  // slectunique() {
  //   $("#selectAllQ").prop("checked", false);
  // }




  changeMyDepartment(ticket_id, department) {
    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"onchange_department","department_id":"' + department + '","ticket_id":"' + ticket_id + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        // this.my_externaltickets();

        if (this.filter_agents != 'All') {
          // this.filterByAgent(this.filter_agents, this.select_agent);
        } else {
          this.my_spamtickets({});
        }

      }
    },
      (error) => {
        console.log(error);
      });

  }



  changeMyPriority(ticket_id, priority) {

    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"onchange_priority","priority_id":"' + priority + '","ticket_id":"' + ticket_id + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        // this.my_externaltickets();

        if (this.filter_agents != 'All') {
          // this.filterByAgent(this.filter_agents, this.select_agent);
        } else {
          this.my_spamtickets({});
        }

      }
    },
      (error) => {
        console.log(error);
      });

  }

  changeMyStatus(ticket_id, status) {

    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"onchange_status","status_id":"' + status + '","ticket_id":"' + ticket_id + '","user_id":"' + this.user_id + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        // this.my_externaltickets();
        if (this.filter_agents != 'All') {
          // this.filterByAgent(this.filter_agents, this.select_agent);
        } else {
          this.my_spamtickets({});
        }

      }
    },
      (error) => {
        console.log(error);
      });

  }
  my_deletedtickets(data) {
   
    Swal.fire({
      html:
        '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      background: 'transparent',


    });
    let access_token: any = localStorage.getItem('access_token');
    let user_id = localStorage.getItem('admin_id');
    // let api_req2: any = '{"operation":"getmyExternalTicket", "moduleType":"ticket", 
    // "api_type": "web", "access_token":"' + access_token + '",
    //  "element_data":{"action":"my_externaltickets",
    //  "user_type":"' + this.user_type + '","user_id":"' + user_id + '",
    //  "admin_id":"' + this.uadmin_id + '","ticket_status":"All","limit":"100","offset":"0",
    //  "ticket_department":"All","is_spam":"1"}}';
   
   
    var list_data= this.listDataInfo(data);
    let api_req:any = new Object();
    let agents_req:any = new Object();
    agents_req.action="get_deleted_tickets";
    agents_req.user_type=this.user_type;
    agents_req.admin_id=this.uadmin_id;
    agents_req.user_id=user_id;
    agents_req.search_text=list_data.search_text;
    // agents_req.order_by_name=list_data.order_by_name;
    // agents_req.order_by_type=list_data.order_by_type;
    agents_req.limit=list_data.limit;
    agents_req.offset=list_data.offset;
    api_req.operation="get_deleted_tickets";
    api_req.moduleType="ticket";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = agents_req;
    // this.serverService.sendServer(api_req).subscribe((response:any) => {
   
   
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      if (response.status == "true") {
        this.delete_queue_list = response.ticket_options;
      
        this.offset_count2 = list_data.offset;
        this.paginationData2 = this.serverService.pagination({'offset':response.list_info.offset, 'total':response.list_info.total, 'page_limit' :this.pageLimit });
        this.recordNotFound2 = this.delete_queue_list == null ? true : false;
        // $("html, body").animate({ scrollTop: 0 }, "slow");
     
      }
    },
      (error) => {
        console.log(error);
      });
  }
  deletepermenent(){
		var i = 0;
		var invalidContacts = [];
		$('.emailtickets2:checked').each(function () {
		  invalidContacts[i++] = $(this).val();
		}); 
		
	  if(invalidContacts.length==0){
		iziToast.warning({
		  message: "Please Choose a Ticket",
		  position: 'topRight'
	  });
	  return false;
	  }
	  
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to restore this Ticket!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
		  let access_token: any=localStorage.getItem('access_token');
		
		//   let api_req:any = '{"operation":"predective_dialer_contact", "moduleType":"predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_contact","user_id":"'+this.user_id+'","contact_id":"'+invalidContacts+'"}}';
		  let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"delete_ticket","value":"' + invalidContacts + '","admin_id":"' + this.uadmin_id + '"}}';
		
		  this.serverService.sendServer(api_req).subscribe((response:any) => {
	  
			if(response.result.data==true){
			  iziToast.success({
				message: "Ticket deleted successfully",
				position: 'topRight'
			});
			this.my_deletedtickets({});
      $("#selectAllDel").prop("checked", false);   
			} else {
			  iziToast.warning({
				message: "Contact not deleted, Please try again!",
				position: 'topRight'
			});
			}
		  }, 
		  (error)=>{
			  console.log(error);
		  });
		
	  }  
	  })
	  }
    deleteSpampermenent(){
		var i = 0;
		var invalidContacts = [];
		$('.emailtickets:checked').each(function () {
		  invalidContacts[i++] = $(this).val();
		}); 
		
	  if(invalidContacts.length==0){
		iziToast.warning({
		  message: "Please Choose a Ticket",
		  position: 'topRight'
	  });
	  return false;
	  }
	  
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to restore this Ticket!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
		  let access_token: any=localStorage.getItem('access_token');
		
		//   let api_req:any = '{"operation":"predective_dialer_contact", "moduleType":"predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_contact","user_id":"'+this.user_id+'","contact_id":"'+invalidContacts+'"}}';
		  let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"delete_ticket","value":"' + invalidContacts + '","admin_id":"' + this.uadmin_id + '"}}';
		
		  this.serverService.sendServer(api_req).subscribe((response:any) => {
	  
			if(response.result.data==true){
			  iziToast.success({
				message: "Ticket deleted successfully",
				position: 'topRight'
			});
			this.my_spamtickets({});
      $("#selectAllSpam").prop("checked", false);   
			} else {
			  iziToast.warning({
				message: "Contact not deleted, Please try again!",
				position: 'topRight'
			});
			}
		  }, 
		  (error)=>{
			  console.log(error);
		  });
		
	  }  
	  })
	  }
    my_deletedtickets2(data) {
      if ($('#collapseOne2.card-body.collapse.show').length) {
        return false;
            }
      if(this.delete_queue_list !='null' &&this.delete_queue_list !='' &&this.delete_queue_list !=null){
        return false;
      }
      Swal.fire({
        html:
          '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        background: 'transparent',
  
  
      });
      let access_token: any = localStorage.getItem('access_token');
      let user_id = localStorage.getItem('admin_id');
      // let api_req2: any = '{"operation":"getmyExternalTicket", "moduleType":"ticket", 
      // "api_type": "web", "access_token":"' + access_token + '",
      //  "element_data":{"action":"my_externaltickets",
      //  "user_type":"' + this.user_type + '","user_id":"' + user_id + '",
      //  "admin_id":"' + this.uadmin_id + '","ticket_status":"All","limit":"100","offset":"0",
      //  "ticket_department":"All","is_spam":"1"}}';
     
     
      var list_data= this.listDataInfo(data);
      let api_req:any = new Object();
      let agents_req:any = new Object();
      agents_req.action="get_deleted_tickets";
      agents_req.user_type=this.user_type;
      agents_req.admin_id=this.uadmin_id;
      agents_req.user_id=user_id;
      // agents_req.search_text=list_data.search_text;
      // agents_req.order_by_name=list_data.order_by_name;
      // agents_req.order_by_type=list_data.order_by_type;
      agents_req.limit=list_data.limit;
      agents_req.offset=list_data.offset;
      api_req.operation="get_deleted_tickets";
      api_req.moduleType="ticket";
      api_req.api_type="web";
      api_req.access_token=localStorage.getItem('access_token');
      api_req.element_data = agents_req;
      // this.serverService.sendServer(api_req).subscribe((response:any) => {
     
     
      this.serverService.sendServer(api_req).subscribe((response: any) => {
        Swal.close();
        if (response.status == "true") {
          this.delete_queue_list = response.ticket_options;
        
          this.offset_count2 = list_data.offset;
          this.paginationData2 = this.serverService.pagination({'offset':response.list_info.offset, 'total':response.list_info.total, 'page_limit' :this.pageLimit });
          this.recordNotFound2 = this.delete_queue_list == null ? true : false;
          $("html, body").animate({
            scrollTop: $(
              'html, body').get(0).scrollHeight
        }, 1000);    
        }
      },
        (error) => {
          console.log(error);
        });
    }
    // Algorithm for Checkboxes
    slectAllSpam() {
      if ($("#selectAllSpam").prop("checked")) {
        $(".emailtickets").prop("checked", true);
      } else {
        $(".emailtickets").prop("checked", false);
      }
    }
    slectuniqueSpam() {
      $("#selectAllSpam").prop("checked", false);         
    }

    selectAllDel() {
      if ($("#selectAllDel").prop("checked")) {
        $(".emailtickets2").prop("checked", true);
      } else {
        $(".emailtickets2").prop("checked", false);
      }
    }
    selectuniqueDel() {
      $("#selectAllDel").prop("checked", false);         
    }
}
