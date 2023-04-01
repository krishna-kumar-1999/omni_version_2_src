import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EditContactsComponent } from '../edit-contacts/edit-contacts.component';

@Component({
  selector: 'app-call-tickets',
  templateUrl: './call-tickets.component.html',
  styleUrls: ['./call-tickets.component.css']
})
export class CallTicketsComponent implements OnInit {
  
  user_type;
  callticketList;
  recordNotFound = false;
  user_id;
  access_token;
  admin_id;
  limit = 10;
  offset = 0;
  ticket_user;
  showtickets;
  emptyticket;
  priority;
  status;
  constructor(private serverService: ServerService, private router:Router, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');
    this.access_token = localStorage.getItem('access_token');

    this.listCallTicket();
  }




  listCallTicket(){


  // {
  //   "operation":"ticket",
  //   "moduleType": "ticket",
  //   "api_type": "web",
  //   "element_data":
  //   {
  //   "action":"list_internal_call_tickets",
  //   "user_id":"2",
  //   "user_type":"2",
  //   "limit":"10","offset":"1",
  //   "ticket_user":"3","admin_id":"2"
  //   }
  //   }


    let access_token: any=localStorage.getItem('access_token');
    this.user_type = localStorage.getItem('user_type');
    if(this.user_type == 'Super Admin'){
      this.user_type = 1;
    }
    else if(this.user_type == 'Admin'){
      this.user_type = 2;
    }
    else {
      this.user_type = 3;
    }

    let api_req:any = '{"operation":"ticket", "moduleType":"ticket", "api_type":"web", "access_token":"'+access_token+'", "element_data":{"action":"list_internal_call_tickets","user_type":"'+this.user_type +'","user_id":"'+this.user_id+'","limit":"'+this.limit+'","offset":"'+this.offset+'","ticket_user":"'+this.user_id+'","admin_id":"'+this.admin_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      console.log(response);
      console.log(response.status);
      if(response.status == 'true'){

        this.callticketList = response.ticket_options;
        this.priority = response.priority_options;
        this.status = response.status_options.filter(t => t.status_id != '9' );
        this.emptyticket = false;
        this.showtickets = true;
        console.log(this.callticketList)
      } else {
        this.emptyticket = true;
        this.showtickets = false;

      }
    }, 
    (error)=>{
        console.log(error);
    });
  }

  hellotesting(){
    const modalRef = this.modalService.open(EditContactsComponent);
  }


  viewMyTicket(tick_num){
    tick_num = btoa(tick_num);

		this.router.navigate(['/view-call-tickets'], { queryParams: { ticket_id: tick_num } });
  }


//   .........API to Change priority.........
// { "operation":"ticket", "moduleType": "ticket", "api_type": "web", "element_data": { "action":"internal_call_onchange_priority", "ticket_id":"7","priority_id":"3", "admin_id":"2" } }
// .......API to Change Status
// { "operation":"ticket", "moduleType": "ticket", "api_type": "web", "element_data": { "action":"internal_call_onchange_status", "ticket_id":"7","status_id":"3", "admin_id":"2" } }

changeMyPriority(ticket,ticket_no,id,name){
  console.log(ticket);
  console.log(ticket_no);
  console.log(id);
  console.log(name);

  let api_req:any = '{"operation":"ticket", "moduleType":"ticket", "api_type":"web", "access_token":"'+this.access_token+'", "element_data":{"action":"internal_call_onchange_priority","ticket_id":"'+ticket_no +'","priority_id":"'+id+'","admin_id":"'+this.admin_id+'"}}';
  
  this.serverService.sendServer(api_req).subscribe((response:any) => {

  ticket.priority=name;

}, 
(error)=>{
    console.log(error);
});
}


changeMyStatus(ticket,ticket_id, status,name) {

  // .......API to Change Status
// { "operation":"ticket", "moduleType": "ticket", "api_type": "web", "element_data": { "action":"internal_call_onchange_status", "ticket_id":"7","status_id":"3", "admin_id":"2" } }

  let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + this.access_token + '", "element_data":{"action":"internal_call_onchange_status","status_id":"' + status + '","ticket_id":"' + ticket_id + '","admin_id":"'+this.admin_id+'"}}';
  this.serverService.sendServer(api_req).subscribe((response: any) => {
    if (response.status == true) {
      
      if(response.result.data == 2){

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'This User Already have limited NEW Ticket!',
          });

      }else{
        ticket.ticket_status=name;
      }


    }
  },
    (error) => {
      console.log(error);
    });

}

callFunction(tic) {
  $('#ticket_' + tic).unbind('click');
}




}
