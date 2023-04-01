import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ActivatedRoute,Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-sms-ticketing-list',
  templateUrl: './sms-ticketing-list.component.html',
  styleUrls: ['./sms-ticketing-list.component.css']
})
export class SmsTicketingListComponent implements OnInit {
sms_list;
  admin_id;
  loginUser;
  constructor(private router: Router,private serverService: ServerService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    	this.admin_id = localStorage.getItem('admin_id');
	this.loginUser = localStorage.getItem('userId');
      this.smsList();
  }

  smsList(){
    // {"operation":"chat","moduleType":"chat","api_type":"web","access_token":"","element_data":{"action":"chat_message_panel","chat_id":"all","user_id":"64","admin_id":"64","limit":10,"offset":0}}
  
    let api_req:any = new Object();
        let chat_req:any = new Object();
        chat_req.action="chat_message_panel";
        chat_req.chat_id='all';
        chat_req.user_id=this.loginUser;
        chat_req.admin_id=this.admin_id;
        chat_req.limit= '10';
        chat_req.offset= '0';
        api_req.operation="chat";
        api_req.moduleType="chat";
        api_req.api_type="web";
        api_req.access_token=localStorage.getItem('access_token');
        api_req.element_data = chat_req;
        
              this.serverService.sendServer(api_req).subscribe((response:any) => {
                if(response.result.status== true){
                     this.sms_list = response.result.data.chat_list;
                }
                  
              }, 
              (error)=>{
                  console.log(error);
              });
  
  }

  redirectView(chat_ids){
this.router.navigate(['\sms-ticket'],{queryParams:{ids:chat_ids}});
  }

}
