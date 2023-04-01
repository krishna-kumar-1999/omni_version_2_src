import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { ActivatedRoute } from '@angular/router';

import { NgZone } from '@angular/core';
declare var $: any;
declare var iziToast: any;


@Component({
  selector: 'app-internal-chat',
  templateUrl: './internal-chat.component.html',
  styleUrls: ['./internal-chat.component.css']
})
export class InternalChatComponent implements OnInit {
  @ViewChild('chat_message', {static: false}) chat_message : ElementRef;
	@ViewChild('chat_detail_id', {static: false}) chat_detail_id : ElementRef;
	chat_panel_list;
	chat_panel_details;
	chat_panel_detail_type = "chat_screen";
	loginUser;
	chat_detail_key;
	customer_name;
	socketData;
	websocket;
	profile_image;
	chat_id;
	chat_status_detail_id;
	param1;
	agent_list
	a_profile_image;
	admin_list
	public is_chat_closed = false;
	doc_link;
	socketParam: any;

	constructor(public serverService: ServerService, private _ngZone: NgZone, private route: ActivatedRoute) {

	this.param1 = this.route.snapshot.queryParamMap.get('c');
	this.serverService.internal_chat_reload.subscribe((val:any)=>{
		console.log(val)
		var update = JSON.parse(val);
		if (update.action == "reload_api") {
  if(update.unique_id==this.socketParam){
this.chatPanelDetail(this.socketParam)
  }
		 
		}
	})

   }

	ngOnInit() {

		var self = this;
		this.loginUser = localStorage.getItem('userId');
		if (this.param1) {
			this.param1 = atob(this.param1);
			this.chatPanelView(this.param1);
			this.chatPanelDetail(this.param1);
		  } else {
			this.chatPanelView("all");
		  }
  		this.getAgentsList();
	//this.websocket = new WebSocket("wss://cal4care.info:8089/"); 
	// this.websocket = new WebSocket("wss://myscoket.mconnectapps.com:4004"); 
	this.websocket = new WebSocket("wss://"+window.location.hostname+":4011"); 
	// this.websocket = new WebSocket("wss://c4cteams.my3cx.sg:4011"); 


    this.websocket.onopen = function(event) { 
        console.log('socket chat connected');
        
    }

    this.websocket.onmessage = function(event) {


	  this.socketData = JSON.parse(event.data);

			if (this.socketData.message_type == "chat") {

				if (this.socketData.message_status == "app_msg_existing") {

					if (this.socketData.message_info.chat_sender_id == localStorage.getItem('userId')) {
						// console.log(self.socketParam);
						// console.log(this.socketData.message_info.chat_receiver_id);
						if (this.socketData.message_info.chat_receiver_id == self.socketParam) {
							// console.log('hello_app')
							self.chat_panel_details.push(this.socketData.message_info);
							self.chatautoScroll();
						}
					}
				}


				if (this.socketData.message_status == "existing") {
					if (this.socketData.message_info.chat_receiver_id == localStorage.getItem('userId')) {
						// console.log(self.socketParam);
						// console.log(this.socketData.message_info.chat_sender_id);
						if (this.socketData.message_info.chat_sender_id == self.socketParam) {
							// console.log($('#chat_detail_id').val());
							// console.log('get the recevier data');
							//this.chatPanelDetail(this.socketData.message_info.chat_id);
							console.log(this.socketData.message_info);
							// $('#open_chat_detail_id').val(this.socketData.message_info.chat_sender_id);
							// $('#open_chat_detail_id').click();

							self.chat_panel_details.push(this.socketData.message_info);
							self.chatautoScroll();
						}
					}
				}

      } 
    
    }
    this.websocket.onerror = function(event){
      console.log('error');
    }
    this.websocket.onclose = function(event){
      console.log('close');
    } 


  }




  getAgentsList(){
    let admin_id: any=localStorage.getItem('admin_id');
    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"chatinternal", "moduleType":"chatinternal", "api_type": "web", "access_token":"'+access_token+'","element_data":{"action":"dept_agent_list","admin_id":"'+admin_id+'","user_id":"'+this.loginUser+'"}}';
    this.serverService.sendServer_login(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        this.agent_list = response.result.data.agent_list;
       this.admin_list = response.result.data.admin_list;
      } else {
       
      }
    }, 
    (error)=>{
        console.log(error);
    });
  }



  setDefaultPic() {
	console.log("assets/images/my-image.png")
  }





ngAfterViewInit() {
   this.chatautoScroll();
}

chatautoScroll(){

		// if ($(".card-body.chat-content").length > 0) {	
		setTimeout(() => {
			$(".card-body.chat-content").scrollTop($(".card-body.chat-content")[0].scrollHeight);

		}, 10);
		// }

  }


  chatSearch(chatSearch){
  console.log(chatSearch);

  }

	// sendChatMessageData() {

	// 	this.profile_image = localStorage.getItem('profile_image');


	// 	if (this.profile_image == null || this.profile_image == 'null' || this.profile_image == 'undefined') {
	// 		this.profile_image = 'https://ticketing.mconnectapps.com/api/v1.0/profile_image/user.jpg';
	// 	} else {
	// 		this.profile_image = localStorage.getItem('profile_image');
	// 	}
	// 	var chat_message = $('#chat_msg').val();



	// 	chat_message = chat_message.trim();
	// 	if (chat_message.length > 0) {



	// 		let api_req: any = new Object();
	// 		let chat_req: any = new Object();
	// 		chat_req.action = "send_internal_chat_message";
	// 		chat_req.chat_type = "webchat";
	// 		chat_req.chat_receiver_id = this.chat_detail_key;
	// 		chat_req.chat_sender_id = this.loginUser;
	// 		chat_req.chat_msg = chat_message;
	// 		api_req.operation = "chatinternal";
	// 		api_req.moduleType = "chatinternal";
	// 		api_req.api_type = "web";
	// 		chat_req.admin_id = localStorage.getItem('admin_id');
	// 		api_req.timezone_id = localStorage.getItem('timezone_id');
	// 		api_req.access_token = localStorage.getItem('access_token');
	// 		api_req.element_data = chat_req;

	// 		this.serverService.sendServer(api_req).subscribe((response: any) => {

	// 			if (response.result.status == true || response.result.status == 'true') {

	// 				var chat_msg = response.result.data;
	// 				let agent_name = localStorage.getItem('user_name');



	// 				var socket_message = '{"message_type":"chat","message_status":"existing","message_info" : {"chat_id" : "' + chat_msg.chat_id + '","msg_user_id" : "' + chat_msg.msg_user_id + '","msg_user_type" : "2","msg_type":"text","chat_msg" : "' + chat_msg.chat_msg + '","queue_id":"1","agent_aviator":"' + this.profile_image + '","agent_name":"' + agent_name + '","chat_receiver_id":"' + chat_msg.msg_receiver_id + '","chat_sender_id":"' + this.loginUser + '","sender_name":"' + agent_name + '","profile_image":"' + chat_msg.profile_image + '","chat_dt":"' +chat_msg.chat_dt+ '","chat_time":"' +chat_msg.chat_time+ '","img_url":"'+chat_msg.img_url+'","img_type":"'+chat_msg.img_type+'"}}';

	// 				var socket_message2 = '{"message_type":"chat","message_status":"web_msg_existing","message_info" : {"chat_id" : "' + chat_msg.chat_id + '","msg_user_id" : "' + chat_msg.msg_user_id + '","msg_user_type" : "2","msg_type":"text","chat_msg" : "' + chat_msg.chat_msg + '","queue_id":"1","agent_aviator":"' + this.profile_image + '","agent_name":"' + agent_name + '","msg_sender_id":"' + chat_msg.msg_sender_id + '","chat_receiver_id":"' + chat_msg.msg_receiver_id + '","chat_sender_id":"' + this.loginUser + '","sender_name":"' + agent_name + '","profile_image":"' + chat_msg.profile_image + '","chat_dt":"' +chat_msg.chat_dt+ '","chat_time":"' +chat_msg.chat_time+ '","img_url":"'+chat_msg.img_url+'","img_type":"'+chat_msg.img_type+'"}}';


	// 				this.websocket.send(socket_message);
	// 				this.websocket.send(socket_message2);
	// 				this.chat_panel_details.push(chat_msg);
	// 				this.chatautoScroll();
	// 				$('#chat_msg').val('');
	// 			}

	// 		},
	// 			(error) => {
	// 				console.log(error);
	// 			});

	// 	}

	// }



	sendChatMessageData() {


		this.profile_image = localStorage.getItem('profile_image');


		if (this.profile_image == null || this.profile_image == 'null' || this.profile_image == 'undefined') {
			this.profile_image = 'https://'+window.location.hostname+':4003/api/v1.0/profile_image/user.jpg';
		} else {
			this.profile_image = localStorage.getItem('profile_image');
		}
		var chat_message = $('#chat_msg').val();

		$("#createNewWidget").modal('hide');
		var formData = new FormData();
		formData.append('operation', 'chatinternal');
		formData.append('moduleType', 'chatinternal');
		formData.append('api_type', 'web');
		formData.append('action', 'send_internal_chat_message');
		formData.append('chat_type', "webchat");
		formData.append('chat_receiver_id', this.chat_detail_key);
		formData.append('chat_sender_id', this.loginUser);
		formData.append('chat_msg', chat_message);
		formData.append('admin_id', localStorage.getItem('admin_id'));
		formData.append('timezone_id', localStorage.getItem('timezone_id'));
		formData.append('access_token', localStorage.getItem('access_token'));
		if ((<HTMLInputElement>document.getElementById('chat_media')).value != null) {
			// var ins = (<HTMLInputElement>document.getElementById('chat_media')).files.length;
			// for (var x = 0; x < ins; x++) {
			//   formData.append("image_file[]", (<HTMLInputElement>document.getElementById('chat_media')).files[x]);
			// }
			formData.append("image_file", (<HTMLInputElement>document.getElementById('chat_media')).files[0]);

		}
		var self = this;
		$.ajax({
			// url: 'https://'+window.location.hostname+':4003/api/v1.0/index_new.php',
			url: 'https://'+window.location.hostname+':4003/api/v1.0/index_new.php',
			// url: "https://updates.mconnectapps.com/krishna_test/api/v1.0/index_new.php",
			type: 'POST',
			data: formData,
			processData: false,  // tell jQuery not to process the data
			contentType: false,
			success: function (data) {
				var response = JSON.parse(data);
				console.log(response);
				
				if (response.result.status == true || response.result.status == 'true') {

					var chat_msg = response.result.data;
					let agent_name = localStorage.getItem('user_name');
					self.chatPanelDetail(chat_msg.msg_receiver_id);


					var socket_message = '{"message_type":"chat","message_status":"existing","message_info" : {"chat_id" : "' + chat_msg.chat_id + '","msg_user_id" : "' + chat_msg.msg_user_id + '","msg_user_type" : "2","msg_type":"text","chat_msg" : "' + chat_msg.chat_msg + '","queue_id":"1","agent_aviator":"' + self.profile_image + '","agent_name":"' + agent_name + '","chat_receiver_id":"' + chat_msg.msg_receiver_id + '","chat_sender_id":"' + self.loginUser + '","sender_name":"' + agent_name + '","profile_image":"' + chat_msg.profile_image + '","chat_dt":"' + chat_msg.chat_dt + '","chat_time":"' + chat_msg.chat_time + '","img_url":"' + chat_msg.img_url + '","img_type":"' + chat_msg.img_type + '" }}';

					var socket_message2 = '{"message_type":"chat","message_status":"web_msg_existing","message_info" : {"chat_id" : "' + chat_msg.chat_id + '","msg_user_id" : "' + chat_msg.msg_user_id + '","msg_user_type" : "2","msg_type":"text","chat_msg" : "' + chat_msg.chat_msg + '","queue_id":"1","agent_aviator":"' + self.profile_image + '","agent_name":"' + agent_name + '","msg_sender_id":"' + chat_msg.msg_sender_id + '","chat_receiver_id":"' + chat_msg.msg_receiver_id + '","chat_sender_id":"' + self.loginUser + '","sender_name":"' + agent_name + '","profile_image":"' + chat_msg.profile_image + '","chat_dt":"' + chat_msg.chat_dt + '","chat_time":"' + chat_msg.chat_time + '","img_url":"' + chat_msg.img_url + '","img_type":"' + chat_msg.img_type + '"}}';
console.log(socket_message2)
console.log(socket_message)
					self.websocket.send(socket_message);
					self.websocket.send(socket_message2);
					self.chat_panel_details.push(chat_msg);
					$("#chat_media").val("");
					$('#chat_msg').val('');
				}
				
			}
	
		});

		this.chatautoScroll();
	}


  onMessageSend($event){
  if($event.keyCode == 13){
  this.sendChatMessageData();
          $event.stopPropagation();
          return false;
        }


  }

  chatPanelView(chat_id){


  			let api_req:any = new Object();
			let chat_req:any = new Object();
			chat_req.action="chat_message_panel";
			chat_req.chat_type="webchat";
			chat_req.chat_id=chat_id;
			chat_req.user_id=this.loginUser;
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
							   this.chatPanelDetail(chat_id);
	           			}

	           			
	           			this.chatautoScroll();
	           			this.chat_detail_key = chat_id;
	            }
                
            }, 
            (error)=>{
                console.log(error);
            });


  }



   chatPanelList(search_text){
    		let api_req:any = new Object();
			let chat_req:any = new Object();
			chat_req.action="get_queue_chat_list";
			chat_req.chat_type="webchat";
			chat_req.search_text=search_text;
			chat_req.user_id=this.loginUser;
			api_req.operation="chat";
			api_req.moduleType="chat";
			api_req.api_type="web";
			api_req.access_token=localStorage.getItem('access_token');
			api_req.element_data = chat_req;
			
            this.serverService.sendServer(api_req).subscribe((response:any) => {
            	
			if(response.result.status==1){
					this.chat_panel_list = response.result.data.chat_list;
			}
            }, 
            (error)=>{
                console.log(error);
            });


  }

	chatPanelDetail(agent_id) {
		this.socketParam = agent_id;
		let api_req: any = new Object();
		let chat_req: any = new Object();
		chat_req.action = "get_by_id";
		chat_req.chat_type = "webchat";
		chat_req.agent_id = agent_id;
		chat_req.admin_id = localStorage.getItem('admin_id');
		chat_req.user_id = this.loginUser;
		api_req.operation = "chatinternal";
		api_req.moduleType = "chatinternal";
		api_req.api_type = "web";
		api_req.access_token = localStorage.getItem('access_token');
		api_req.element_data = chat_req;
		this.chat_detail_key = agent_id;
		this.serverService.sendServer(api_req).subscribe((response: any) => {
			if (response.result.status == true) {

					// if(c_status == '2'){
					// 	this.chat_status_detail_id = 'closed';
					// 	this.is_chat_closed = true;
					// } else {
					// 	this.is_chat_closed = false;
					// }
	           			
	           			this.chat_panel_detail_type = "chat_detail";
	           			this.chat_panel_details = response.result.data.chat_detail_list;
						   this.customer_name = response.result.data.agent_name;
						   this.a_profile_image = response.result.data.agent_profile_image;

						   
						   this.chatautoScroll(); 
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
  
   } stop(){
	var el_src = $('.myvideo').attr("src");
		  $('.myvideo').attr("src",el_src);
	}

}

