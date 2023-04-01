import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { ServerService } from '../../services/server.service';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// import Swal from  sweetalert2;
import Swal from 'sweetalert2'

declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {
  @ViewChild('chat_message', {static: false}) chat_message : ElementRef;
	@ViewChild('chat_detail_id', {static: false}) chat_detail_id : ElementRef;
	chat_panel_list;
	chat_panel_details;
	chat_panel_detail_type = "chat_screen";
	loginUser;
	chat_detail_key;
	customer_number;
	cus_name;
	socketData;
	websocket;
	phone_num;
	uadmin_id;
	admin_id;
	departments;
	myImgUrl:string='assets/images/user.jpg';
	param1;
	temp_list;
	sum = 100;
	throttle = 300;
	scrollDistance = 1;
	scrollUpDistance = 2;
	offset_count = 0;
	offset_count_msg = 0;
	direction = "";
	chat_ids;
	doc_link;
	show_sett=false;
	user_type;
	admin_permission;
	admin_type;
	sendersId_list;
	limit_count;
  constructor(private serverService: ServerService,private route: ActivatedRoute) { 
	this.param1 = this.route.snapshot.queryParamMap.get('c');
	this.serverService.changeDetectionEmitter.subscribe(
		($event) => {
	
		  let mData = JSON.parse($event);
		  var pagefor = mData.pagefor;
		  var pageid = mData.id;
		   
	
		  if(pagefor == 'SMS'){
			// this.chatPanelDetail(pageid);			
		    this.chatPanelView2("all");
			// setTimeout(()=>{ 
			//   $(".card-body.chat-content").scrollTop($(".card-body.chat-content")[0].scrollHeight);
			//   }, 4000);
		  }
		  
		},
		(err) => {
		}
	  );

  }

  ngOnInit() {
	
	this.uadmin_id = localStorage.getItem('userId');
	this.admin_id = localStorage.getItem('admin_id');
    this.loginUser = localStorage.getItem('userId');
	this.user_type = localStorage.getItem('user_type');
		// this.admin_type = localStorage.getItem('user_type');
		this.admin_permission = localStorage.getItem('admin_permision');

		if (this.user_type == 'Super Admin') {
			this.user_type = 1;
			this.admin_type='Admin';
		}
		else if (this.user_type == 'Admin' || this.admin_permission =='1') {
			this.user_type = 2;
			this.admin_type='Admin';
		}
		else {
			this.user_type = 3;
			this.admin_type='';

		}		



if(this.param1){
		this.param1 = atob(this.param1);
	    this.chatPanelDetail(this.param1);
		this.chatPanelView2("all");
	}
	else{
		this.chatPanelView("all");
    	}
  		// this.chatPanelView("all");


  		    
    this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");

    this.websocket.onopen = function(event) { 
        console.log('socket chat connected');
        
    }

    this.websocket.onmessage = function(event) {


      this.socketData = JSON.parse(event.data);

      if(this.socketData.message_type == "chat"){
      

		if(this.socketData.message_info.chat_id == $('#chat_detail_id').val()){

			//this.chatPanelDetail(this.socketData.message_info.chat_id);
			$('#open_chat_detail_id').val(this.socketData.message_info.chat_id);
			$('#open_chat_detail_id').click();
			
		}

      }
    
    }
    this.websocket.onerror = function(event){
      console.log('error');
    }
    this.websocket.onclose = function(event){
      console.log('close');
    } 
	this.getDepartments();
this.get_temps();

  }

    ngAfterViewInit() {
   this.chatautoScroll();
}
wordCount(){
    $("#wordCount").text($('#chat_msg').val().length );
}
chatautoScroll(){
	 
 
	// if($(".card-body.chat-content").length > 0){

	setTimeout(()=>{ 
	 $(".card-body.chat-content").scrollTop($(".card-body.chat-content")[0].scrollHeight);

	 }, 10);
	// }
// 
  }
  
  scrollSmoothToBottom (id) {

	$('#' + id).scrollTop(1000000);
	// alert($(".card-body.chat-content").length);
	// var div = document.getElementById(id);
	// $('#' + id).animate({
	//    scrollTop: div.scrollHeight - div.clientHeight
	// }, 500);
 }


  chatSearch(chatSearch){
  console.log(chatSearch);

  }

  sendChatMessageData(){
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

  	var chat_message=  this.chat_message.nativeElement.value;
	  chat_message = chat_message.trim();
    //   alert(this.chat_detail_id.nativeElement.value);
	  $('#chat_msg').val();
 	if (chat_message.length > 0) {

 	  	let api_req:any = new Object();
			let chat_req:any = new Object();
			chat_req.action="send_chat_message";
			chat_req.chat_id=this.chat_detail_id.nativeElement.value;
			chat_req.user_id=this.loginUser;
			chat_req.timezone_id=localStorage.getItem('timezone_id');
			chat_req.chat_message=chat_message;
			api_req.operation="chat";
			api_req.moduleType="chat";
			api_req.api_type="web";
			api_req.access_token=localStorage.getItem('access_token');
			api_req.element_data = chat_req;
			
            this.serverService.sendServer(api_req).subscribe((response:any) => {
  Swal.close();
	            if(response.result.data==1){

	            var chat_msg= response.result.data;

	           var socket_message  =  '{"message_type":"chat","message_status":"existing","message_info" : {"chat_id" : "'+chat_msg.chat_id+'","msg_user_id" : "'+chat_msg.msg_user_id+'","msg_user_type" : "2","msg_type":"text","message" : "'+chat_msg.chat_msg+'","queue_id":"1"}}';

	           this.websocket.send(socket_message);

	           				
                 this.chat_panel_details.push(chat_msg);
                 
                 this.chatautoScroll();
                 this.chatPanelDetail2(this.chat_detail_id.nativeElement.value)
	           		$('#chat_msg').val('');
	            } else  if(response.result.data==2){
					iziToast.warning({
					  message: "Contry Code Not Matched",
					  position: 'topRight'
				  });
				  } else  if(response.result.data==3){
					iziToast.warning({
					  message: "Insufficient balance",
					  position: 'topRight'
				  });
				  } else  if(response.result.data==4){
					iziToast.warning({
					  message: "No Tariff for this country..Please contact Admin",
					  position: 'topRight'
				  });
				  }else {
					iziToast.warning({
					  message: "Some error occured. Please try again",
					  position: 'topRight'
				  });
				  }
                
            }, 
            (error)=>{
                console.log(error);
            });

 	}

  }

  onMessageSend($event){

  if($event.keyCode == 13&& !$event.shiftKey){


  this.sendChatMessageData();
          $event.stopPropagation();
        return false;
        }


  }

  chatPanelView(chat_id){


  			let api_req:any = new Object();
			let chat_req:any = new Object();
			chat_req.action="chat_message_panel";
			chat_req.chat_id=chat_id;
			chat_req.user_id=this.loginUser;
			chat_req.admin_id=this.admin_id;
			chat_req.limit=10;
			chat_req.offset=this.offset_count;
			api_req.operation="chat";
			api_req.moduleType="chat";
			api_req.api_type="web";
			api_req.access_token=localStorage.getItem('access_token');
			api_req.element_data = chat_req;
			
            this.serverService.sendServer(api_req).subscribe((response:any) => {
	            if(response.result.status==1){
	           			
	           			this.chat_panel_list = response.result.data.chat_list;

	           			if(chat_id == "all" || chat_id == "" || chat_id == 0){
	           				this.chat_panel_detail_type = "chat_screen";
	           			}
	           			else{
	           				this.chat_panel_details = response.result.data.chat_detail_list;
	           				this.chat_panel_detail_type = "chat_detail";
	           			}

	           			
	           			this.chatautoScroll();
	           			this.chat_detail_key = chat_id;
	            }
                
            }, 
            (error)=>{
                console.log(error);
            });


  }

  chatPanelView2(chat_id){


	let api_req:any = new Object();
  let chat_req:any = new Object();
  chat_req.action="chat_message_panel";
  chat_req.chat_id=chat_id;
  chat_req.user_id=this.loginUser;
  chat_req.admin_id=this.admin_id;
  chat_req.limit=10;
  chat_req.offset=this.offset_count;
  api_req.operation="chat";
  api_req.moduleType="chat";
  api_req.api_type="web";
  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = chat_req;
  
  this.serverService.sendServer(api_req).subscribe((response:any) => {
	  if(response.result.status==1){
				 
				 this.chat_panel_list = response.result.data.chat_list;

				//  if(chat_id == "all" || chat_id == "" || chat_id == 0){
				// 	 //this.chat_panel_detail_type = "chat_screen";
				//  }
				//  else{
				// 	 this.chat_panel_details = response.result.data.chat_detail_list;
				// 	 this.chat_panel_detail_type = "chat_detail";
				//  }

				 
				//  this.chatautoScroll();
				//  this.chat_detail_key = chat_id;
	  }
	  
  }, 
  (error)=>{
	  console.log(error);
  });


}

   chatPanelList(search_text){

	Swal.fire({
		title: 'Searching',
		allowEscapeKey: true,
		allowOutsideClick: true,
	  //  background: '#19191a',
		showConfirmButton: false,
		onOpen: ()=>{
			Swal.showLoading();
		}
	  });

    		let api_req:any = new Object();
			let chat_req:any = new Object();
			chat_req.action="chat_message_panel";
			chat_req.search_text=search_text;
			chat_req.user_id=this.loginUser;
			chat_req.chat_id="all";
			chat_req.admin_id=this.admin_id;
			chat_req.limit="10";
			chat_req.offset=0;
			api_req.operation="chat";
			api_req.moduleType="chat";
			api_req.api_type="web";
			api_req.access_token=localStorage.getItem('access_token');
			api_req.element_data = chat_req;
			
            this.serverService.sendServer(api_req).subscribe((response:any) => {
				Swal.close();

	            if(response.result.status==1){
	           			this.chat_panel_list = response.result.data.chat_list;
	         
	            }
                
            }, 
            (error)=>{
            	Swal.close();

                console.log(error);
            });


  }
 
  chatPanelDetail(chat_id){

	  
	this.chat_ids = chat_id;
		$('#chat_msg').val('');
				let api_req:any = new Object();
				let chat_req:any = new Object();
				chat_req.action="chat_detail_list";
				chat_req.chat_id=chat_id;
				chat_req.user_id=this.loginUser;
				chat_req.admin_id=this.admin_id;
				chat_req.limit="5";
				chat_req.offset= 0;
				api_req.operation="chat";
				api_req.moduleType="chat";
				api_req.api_type="web";
				api_req.access_token=localStorage.getItem('access_token');
				api_req.element_data = chat_req;
				
				this.serverService.sendServer(api_req).subscribe((response:any) => {
					if(response.result.status==1){
							
							this.chat_panel_detail_type = "chat_detail";
							this.chat_panel_details = response.result.data.chat_detail_list;
							this.customer_number = response.result.data.chat_detail_list[0].customer_name;
							this.cus_name = response.result.data.chat_detail_list[0].cus_name;
							this.chatPanelView2('all');
							//    alert(this.cus_name);
							$('#id_'+chat_id).attr('style','display:none');
							this.chatautoScroll(); 
							//this.scrollSmoothToBottom ('infscrollUp');
							this.chat_detail_key = chat_id;
							console.log(this.chat_panel_list);
							this.chat_panel_list=this.chat_panel_list;
							this.offset_count_msg = 0;
					}
					
				}, 
				(error)=>{
					console.log(error);
				});


  }



  chatPanelDetail2(chat_id){

	  
	this.chat_ids = chat_id;
		$('#chat_msg').val('');
				let api_req:any = new Object();
				let chat_req:any = new Object();
				chat_req.action="chat_detail_list";
				chat_req.chat_id=chat_id;
				chat_req.user_id=this.loginUser;
				chat_req.admin_id=this.admin_id;
				chat_req.limit="5";
				chat_req.offset= 0;
				api_req.operation="chat";
				api_req.moduleType="chat";
				api_req.api_type="web";
				api_req.access_token=localStorage.getItem('access_token');
				api_req.element_data = chat_req;
				
				this.serverService.sendServer(api_req).subscribe((response:any) => {
					if(response.result.status==1){
							
							this.chat_panel_detail_type = "chat_detail";
							this.chat_panel_details = response.result.data.chat_detail_list;
							this.customer_number = response.result.data.chat_detail_list[0].customer_name;
							this.cus_name = response.result.data.chat_detail_list[0].cus_name;
							// this.chatPanelView2('all');
							//    alert(this.cus_name);
							$('#id_'+chat_id).attr('style','display:none');
							this.chatautoScroll(); 
							//this.scrollSmoothToBottom ('infscrollUp');
							this.chat_detail_key = chat_id;
							console.log(this.chat_panel_list);
							this.chat_panel_list=this.chat_panel_list;
							this.offset_count_msg = 0;
					}
					
				}, 
				(error)=>{
					console.log(error);
				});


  }





  genTicket(phone_num){ 
	this.phone_num = phone_num; 
	this.getDepartments();
	  $('#assign_ticket').modal('show');
  }
  


  assignTicket(phone_num){  

	let assigned_department_id: any= $('#departments').val();
		if(assigned_department_id == '0'){
			iziToast.warning({
			message: "Please select department",
			position: 'topRight'
		});
		return false;
		}
  
	  let access_token: any=localStorage.getItem('access_token');
	  let api_req:any = '{"operation":"ticket", "moduleType":"ticket", "api_type":"web", "access_token":"'+access_token+'", "element_data":{"action":"generate_sms_ticket","user_id":"'+this.uadmin_id+'","department_id":"'+assigned_department_id+'","phone_num":"'+phone_num+'"}}';
		  this.serverService.sendServer(api_req).subscribe((response: any) => {
		  if (response.result.status == 1) {
				  iziToast.success({
					  message: "Ticket Assigned Successfully",
					  position: 'topRight'
				  });
				  $('#assign_ticket').modal('hide');
			  } else {
			  
				  iziToast.warning({
					  message: "Ticket Not Assigned. Please try again",
					  position: 'topRight'
				  });
			  
		  }
	
	  },
	  (error) => {
		   iziToast.error({
			  message: "Sorry, some server issue occur. Please contact admin",
			  position: 'topRight'
		  });
		  console.log(error);
	  });
  }



  get_temps(){
	let access_token: any=localStorage.getItem('access_token');
  
	let api_req:any = '{"operation":"template", "moduleType":"template", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"listTemplateByUSer","admin_id":"'+this.admin_id+'","user_id":"'+this.uadmin_id+'"}}';
  
	this.serverService.sendServer(api_req).subscribe((response:any) => {
	  if(response.result.status==true){
	   
		this.temp_list = response.result.data;
		console.log(this.temp_list);
	  } 
	}, 
	(error)=>{
		console.log(error);
	});
  }

  getDepartments(){
	let access_token: any=localStorage.getItem('access_token');
  
	// let api_req:any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_dept_settings","user_id":"'+this.uadmin_id+'"}}';
	let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"sms_dept_dropdown","admin_id":"'+this.admin_id+'"}}';
  
	this.serverService.sendServer(api_req).subscribe((response:any) => {
	  if(response.result.status==true){
		this.departments = response.result.data;
		console.log(this.departments);

	  } else {
	  }
	}, 
	(error)=>{
		console.log(error);
	});
  }
template(){
	var options = {};
        $.map(this.temp_list,
            function(o) {
                options[o.template_message] = o.template_name;
			});
			console.log(options);
			console.log(this.temp_list);
	const fruit =   Swal.fire({
		title: 'Select Template',
		input: 'select',
		inputOptions:options,
		inputPlaceholder: 'Select a Template',
		
		confirmButtonText: 'Pick out',
		showCancelButton: true,
	  }).then(function (inputValue) {
		if (inputValue) {
			console.log(inputValue.value);
			console.log(fruit);
			$('#chat_msg').val(inputValue.value);
		}
	});
	  
	 
}
onScrollDown(){	
	alert('scrolled');
  }
//   onUp(){
// 	alert('scrolled');
//   }

  onScroll() {

	var off = this.offset_count +  10;
	this.offset_count = off;
	var chat_id ='all';
		let api_req:any = new Object();
	  let chat_req:any = new Object();
	  chat_req.action="chat_message_panel";
	  chat_req.chat_id=chat_id;
	  chat_req.user_id=this.loginUser;
	  chat_req.admin_id=this.admin_id;
	  chat_req.limit="10";
	  chat_req.offset=off;
	  api_req.operation="chat";
	  api_req.moduleType="chat";
	  api_req.api_type="web";
	  api_req.access_token=localStorage.getItem('access_token');
	  api_req.element_data = chat_req;
	  
	  this.serverService.sendServer(api_req).subscribe((response:any) => {
		  if(response.result.status==1){
					 
					// this.chat_panel_list = response.result.data.chat_list;
			$('#infinitescrool').val();
			var mydatas= [];
			mydatas =  response.result.data.chat_list;


			for (let index = 0; index < mydatas.length; index++) { 
				var data = mydatas[index];
				this.chat_panel_list.push(data); 
			 }

		  }
		  
	  }, 
	  (error)=>{
		  console.log(error);
	  });


  }





  onUp(){
		$('#chat_msg').val('');
				let api_req:any = new Object();
				let chat_req:any = new Object();
				var off = this.offset_count_msg +  5;
				this.offset_count_msg = off;
				chat_req.action="chat_detail_list";
				chat_req.chat_id=this.chat_ids;
				chat_req.user_id=this.loginUser;
				chat_req.admin_id=this.admin_id;
				chat_req.limit="5";
				chat_req.offset= this.offset_count_msg;
				api_req.operation="chat";
				api_req.moduleType="chat";
				api_req.api_type="web";
				api_req.access_token=localStorage.getItem('access_token');
				api_req.element_data = chat_req;
				
				this.serverService.sendServer(api_req).subscribe((response:any) => {
					if(response.result.status==1){
							
							// this.chat_panel_detail_type = "chat_detail";
							// this.chat_panel_details = response.result.data.chat_detail_list;
							// this.customer_number = response.result.data.chat_detail_list[0].customer_name;
							// this.cus_name = response.result.data.chat_detail_list[0].cus_name;
							// //    alert(this.cus_name);
							// $('#id_'+chat_id).attr('style','display:none');
							// //this.chatautoScroll(); 
							// this.scrollSmoothToBottom ('infscrollUp');
							// this.chat_detail_key = chat_id;
							// console.log(this.chat_panel_list);
							// this.chat_panel_list=this.chat_panel_list;

							var mydatas= [];
							mydatas =  response.result.data.chat_detail_list;
				
							mydatas.reverse();
							for (let index = 0; index < mydatas.length; index++) { 
								var data = mydatas[index];
								this.chat_panel_details.unshift(data); 
							 }

							console.log(this.chat_panel_details);
					}
					
				}, 
				(error)=>{
					console.log(error);
				});


  }
  
  showdoc(link){   
    //   this.doc_link=link;
    //  $("#document_model").modal('show');   
    var url= link.split('/');
    // alert(url)
    this.doc_link="https://www.youtube.com/embed/"+url[3];
    // alert(this.doc_link)
  
    $("#video_play").modal('show');
  
   }
   stop(){
	var el_src = $('.myvideo').attr("src");
		  $('.myvideo').attr("src",el_src);
	}

	changeMylayout() {
		if (this.show_sett == false) {
			$('#show_setting').show();		
			this.show_sett=true;
			this.scroltomessage();
			this.sendersID();
		}
		else {
			$('#show_setting').hide();		
			this.show_sett=false;
			$("html, body").animate({ scrollTop: 5 }, "slow");

		}

	}
	scroltomessage(){
 document.getElementById('show_setting').scrollIntoView({
   behavior: 'smooth'
 });

}
sendersID(){
    let access_token: any=localStorage.getItem('access_token');
    let user_id: any=localStorage.getItem('userId');
    let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_senderid","admin_id":"'+this.admin_id +'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      this.sendersId_list = response.result.data.sender_id;
    }, 
    (error)=>{
        console.log(error);
    });
  }
  addSender(){
	let access_token: any=localStorage.getItem('access_token');
  let senderid = $('#senderid').val();
  let dept_id = $('#sender_dept_id').val();
	let api_req:any = '{"operation":"contact", "moduleType": "contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"add_senderid","senderid":"'+senderid+'","dept_id":"'+dept_id+'","admin_id":"'+this.uadmin_id+'"}}';
  
		this.serverService.sendServer(api_req).subscribe((response: any) => {
		if (response.result.data == 1) {
				$('#add_sender_id').modal('hide');
				iziToast.success({
					message: "Sender ID added successfully",
					position: 'topRight'
				});
				this.sendersID();
			}
			else if (response.result.data == 2) {
			  iziToast.warning({
				  message: "Sender ID already inserted",
				  position: 'topRight'
			  });
		  }
		else{
			
				iziToast.error({
					message: "Sender ID not added. Please try again",
					position: 'topRight'
				});
			
		}
  
	},
	(error) => {
		 iziToast.error({
			message: "Sorry, some server issue occur. Please contact admin",
			position: 'topRight'
		});
		console.log(error);
	});
  }
  robin_update() {
    var rob = '0';
    var limit='0';
    var text="Would you Need to Assign incoming SMS to all agents in the department?";
      if($('#round_rob_set').prop('checked')){ rob = '1'; limit=this.limit_count; text="Do you want to change, and be assigned a round-robin system for incoming SMS to Department agents?"; }
    // let rob=$('#round_rob_set').val();

// return false;
    Swal.fire({
      title: 'Are you sure?',
      text: text ,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.value) {
        let api_req: any = new Object();
        let chat_req: any = new Object();
        chat_req.action = "sms_round_robin";
        chat_req.admin_id = this.admin_id;
        chat_req.value = rob;
        chat_req.limit = limit;
        api_req.operation = "ticket";
        api_req.moduleType = "ticket";
        api_req.api_type = "web";
        api_req.access_token = localStorage.getItem('access_token');
        api_req.element_data = chat_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.result.status == true) {
            iziToast.success({
              message: "Changed Incomming SMS strategy successfully",
              position: 'topRight'
            });

          } else {
            iziToast.error({
              message: "Sorry,some error occured",
              position: 'topRight'
            });
          }


        },
          (error) => {
            console.log(error);
          });

      }
else{
//   this.getalldeptList();
}
    });

  }
  deletedata(id){
	Swal.fire({
	  title: 'Are you sure?',
	  text: "You won't be able to revert this!",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
	  if (result.value) {
		let access_token: any=localStorage.getItem('access_token');
		let admin_id: any=localStorage.getItem('admin_id');
  let api_req:any = '{"operation":"contact", "moduleType": "contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_senderid","id":"'+id+'","admin_id":"'+admin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
	if(response.result.data==1){
	  Swal.fire(
		'Deleted!',
		'success'
	  );
	  this.sendersID();
	}

  }, 
  (error)=>{
	  console.log(error);
  });
	  }
	})
  }

}
	
