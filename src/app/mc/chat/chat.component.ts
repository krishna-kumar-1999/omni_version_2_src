import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { truncate } from 'fs';
declare var $: any;
declare var iziToast: any;
@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
	@ViewChild('chat_message', { static: false }) chat_message: ElementRef;
	@ViewChild('chat_detail_id', { static: false }) chat_detail_id: ElementRef;
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
	param1
	c_status;
	botlisting;
	public is_chat_closed = false;
	widget_name = 'OmniChat';
	temp_list;
	adminid;
	doc_link;
	data_view = '';
	search_text = '';
	//NB COde....
	select_agents: any;
	select_department: any;
	agent_options;
	email_dept;
	transfer_id;
	current_chat_id=0;
	transfer_notification: any;
		//NB COde END....
	constructor(public serverService: ServerService, private _ngZone: NgZone, private route: ActivatedRoute) {

		this.param1 = this.route.snapshot.queryParamMap.get('c');
		this.serverService.changeDetectionEmitter.subscribe(
			($event) => {

				let mData = JSON.parse($event);
				var pagefor = mData.pagefor;
				var pageid = mData.id;

				// if (pagefor == 'chat') {
				// 	// this.chatPanelDetail(pageid);			
				// 	// this.chatPanelView(pageid);
				// 	this.chatPanelView2("all");
				// 	// setTimeout(()=>{ 
				// 	//   $(".card-body.chat-content").scrollTop($(".card-body.chat-content")[0].scrollHeight);
				// 	//   }, 4000);
				// 	// alert('asas')
				// }
				if (pagefor == 'webchat') {
					
					if(atob(pageid) == this.chat_detail_key){
						
					this.chatPanelDetail(atob(pageid),this.c_status);			

					}
					// this.chatPanelDetail(pageid);			
					// this.chatPanelView(pageid);
					this.chatPanelView2("all");
					// setTimeout(()=>{ 
					//   $(".card-body.chat-content").scrollTop($(".card-body.chat-content")[0].scrollHeight);
					//   }, 4000);
					// alert('asas')
				}

			},
			(err) => {
			}
		);
	}

	ngOnInit() {
		this.loginUser = localStorage.getItem('userId');
		this.adminid = localStorage.getItem('admin_id');
		if (this.param1) {
			var param2 = atob(this.param1);
		    var param_id = atob(param2)
			this.chatPanelView(param_id);
			this.chatPanelDetail(param_id,this.c_status)
		} else {
			this.chatPanelView("all");
			// alert('asass12345678')
		}
this.ChatSocket();
		//this.websocket = new WebSocket("wss://cal4care.info:8089/"); 
	
		this.get_temps();
//NB code
		this.deptList();

	}
ChatSocket(){
	var self=this;
	 
	this.websocket = new WebSocket("wss://"+window.location.hostname+":4010");
	// this.websocket = new WebSocket("wss://myscoket.mconnectapps.com:4010");


	this.websocket.onopen = function (event) {
		console.log('socket chat connected');

	}

	this.websocket.onmessage = function (event) {


		this.socketData = JSON.parse(event.data);
console.log(this.socketData);
		if (this.socketData.message_type == "chat") {

// alert('1')
			if (this.socketData.message_status == "end") {
				if (this.socketData.message_info.chat_id == $('#chat_detail_id').val()) {
					let chatToClose = 'chat_' + this.socketData.message_info.chat_id;

					// iziToast.error({
					// 	message: "Sorry, Chat has been closed by customer",
					// 	position: 'topRight'
					// });
					console.log('end')
					$('#chatPanelView').click();
					return false;
				}
			}

			if (this.socketData.message_info.chat_id == $('#chat_detail_id').val()) {
// alert('2')

				//this.chatPanelDetail(this.socketData.message_info.chat_id);
				$('#open_chat_detail_id').val(this.socketData.message_info.chat_id);
				$('#open_chat_detail_id').click();

			} else {
// alert('3')

				$('#chatPanelView').click();
			}

		}

	}
	this.websocket.onerror = function (event) {
		console.log('error');
	}
	this.websocket.onclose = function (event) {
		console.log('close');
		self.ChatSocket();
	}
}
	ngAfterViewInit() {
		this.chatautoScroll();
	}

	chatautoScroll() {

		// if ($(".card-body.chat-content").length > 0) {
		setTimeout(() => {
			$(".card-body.chat-content").scrollTop($(".card-body.chat-content")[0].scrollHeight);

		}, 10);
		// }

	}


	chatSearch(chatSearch) {

	}

	sendChatMessageData() {
		this.profile_image = localStorage.getItem('profile_image');


		if (this.profile_image == null || this.profile_image == 'null' || this.profile_image == 'undefined') {
			this.profile_image = 'https://'+window.location.hostname+':4003/api/v1.0/profile_image/user.jpg';
		} else {
			this.profile_image = localStorage.getItem('profile_image');
		}
		var chat_message = this.chat_message.nativeElement.value;
		chat_message = chat_message.trim();
		if (chat_message.length > 0) {



			let api_req: any = new Object();
			let chat_req: any = new Object();
			chat_req.action = "send_chat_message";
			chat_req.chat_type = "webchat";
			chat_req.chat_id = this.chat_detail_id.nativeElement.value;
			chat_req.user_id = this.loginUser;
			chat_req.chat_message = chat_message;
			api_req.operation = "chat";
			api_req.moduleType = "chat";
			api_req.api_type = "web";
			api_req.access_token = localStorage.getItem('access_token');
			api_req.element_data = chat_req;

			this.serverService.sendServer(api_req).subscribe((response: any) => {

				if (response.result.status == 1) {

					var chat_msg = response.result.data;
					let agent_name = localStorage.getItem('user_name');
					var socket_message = '{"message_type":"chat","message_status":"existing","message_info" : {"chat_id" : "' + chat_msg.chat_id + '","msg_user_id" : "' + chat_msg.msg_user_id + '","msg_user_type" : "2","msg_type":"text","message" : "' + chat_msg.chat_msg + '","queue_id":"1","agent_aviator":"' + this.profile_image + '","agent_name":"' + agent_name + '"}}';

					this.websocket.send(socket_message);


					this.chat_panel_details.push(chat_msg);
					this.chatautoScroll();
					
					$('#chat_msg_panal').val('');
				}

			},
				(error) => {
					console.log(error);
				});

		}

	}


	// readFile(fileEvent: any) {
	// 	const file = fileEvent.target.files[0];
	// 	if (file.type ==)

	// 	console.log('size', file.size);
	// 	console.log('type', file.type);
	//  }


	textUrl(text) {
		var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
		//var urlRegex = /(https?:\/\/[^\s]+)/g;
		var html = text.replace(urlRegex, function (url, b, c) {
			var url2 = (c == 'www.') ? 'http://' + url : url;
			return '<a class="hyperlink-text" href="' + url2 + '" target="_blank">' + url + '</a>';
		})
		console.log(html);
		return html
	}



	sendImage() {
		var chat_message = this.chat_message.nativeElement.value;

		var new_chat_msg = this.textUrl(chat_message);
		new_chat_msg=new_chat_msg.replace(/["']/g, "");

		$("#createNewWidget").modal('hide');


	
		this.profile_image = localStorage.getItem('profile_image');


		if (this.profile_image == null || this.profile_image == 'null' || this.profile_image == 'undefined') {
			this.profile_image = 'https://'+window.location.hostname+':4003/api/v1.0/profile_image/user.jpg';
		} else {
			this.profile_image = localStorage.getItem('profile_image');
		}

		// var chat_message = this.chat_message.nativeElement.value;
		// chat_message = chat_message.trim();
		// if (chat_message.length > 0) {
		
			if(((<HTMLInputElement>document.getElementById('chat_media')).value == null || (<HTMLInputElement>document.getElementById('chat_media')).value == '') &&( new_chat_msg=='' || new_chat_msg==null)){
				iziToast.warning({
					message:"No input found",
					position:"topRight"
				});
				return false;
			}
			Swal.fire({
				title: 'Please Wait',
				allowEscapeKey: false,
				allowOutsideClick: false,
				//  background: '#19191a',
				showConfirmButton: false,
				onOpen: () => {
					Swal.showLoading();
				}
			});
		var chats_ids = this.chat_detail_id.nativeElement.value;
		var loginUser = this.loginUser;

		var form = new FormData();
		var self = this;
		if ((<HTMLInputElement>document.getElementById('chat_media')).value != null) {
			// 	var totalfiles = (<HTMLInputElement>document.getElementById('chat_media')).files.length;
			// 	for (var index = 0; index < totalfiles; index++) {
			// 		form.append("up_files[]", (<HTMLInputElement>document.getElementById('chat_media')).files[index]);
			// 	}
			form.append("up_files", (<HTMLInputElement>document.getElementById('chat_media')).files[0]);
		}

		form.append("chat_id", chats_ids);
		form.append("chat_type", "webchat");
		form.append("user_id", loginUser);
		form.append("chat_message", new_chat_msg);
		form.append("chat_msg", new_chat_msg);
		form.append("timezone_id", "1");
		form.append("action", "send_chat_message");
		form.append("access_token", localStorage.getItem('access_token'));
		// form.append("up_files", fileInput.files[0], "/C:/Users/mdras/Desktop/ddd.png");
		// form.append("up_files", fileInput.files[0], "/C:/Users/mdras/Desktop/download.jfif");
		// form.append("up_files", fileInput.files[0], "/C:/Users/mdras/Desktop/matrix-failed.png");

		var settings = {
			"url": "https://"+window.location.hostname+":4003/api/v1.0/index_new.php",
			"method": "POST",
			"timeout": 0,
			"headers": {
				"Authorization": "Basic TWVyY2hhbnQuVEVTVDEwMDAwMDI0NTA0OjQ1NjVhOTI4NGQ0ZjFkMjE3YzI5OTY5ZGUxNTc1YzM2"
			},
			"processData": false,
			"mimeType": "multipart/form-data",
			"contentType": false,
			"data": form
		};
		// 		setTimeout(() => {
		// Swal.close();

		// 		}, 2000);
		$.ajax(settings).done(function (response) {
			Swal.close();
			var newone = JSON.parse(response);
			console.log(newone.data);
			if (newone.status == 'true') {
				self.clearFileUploadingField();
				var chat_msg = newone.data;
				var chat_msg_id = newone.data.chat_id;
				console.log(self.chat_panel_details);
				//let agent_name = localStorage.getItem('user_name');
				var str = chat_msg.agent_name;
				var agent_name = str.split(" ");
				//  var conversion_url =window.btoa(chat_msg.chat_msg);
				//....
				self.chatautoScroll();
				console.log(chat_msg_id);
				self.chatPanelDetail(chat_msg_id, this.c_status);
				$('#chat_msg_panal').val('');
				var conversion_url = btoa(unescape(encodeURIComponent(chat_msg.chat_msg)));
				var socket_message = '{"message_type":"chat","message_status":"existing","message_info" : {"chat_id" : "' + chat_msg.chat_id + '","msg_user_id" : "' + chat_msg.msg_user_id + '","msg_user_type" : "2","msg_type":"text","message" : "' + conversion_url + '","queue_id":"1","agent_aviator":"' + self.profile_image + '","agent_name":"' + agent_name[0] + '","chat_images":"' + chat_msg.chat_images + '", "extension":"' + chat_msg.extension + '"}}';
				
				self.websocket.send(socket_message);

				self.chat_panel_details.push(chat_msg);

				// self.chatautoScroll();
				// console.log(chat_msg_id);
				// self.chatPanelDetail(chat_msg_id, this.c_status);
				// $('#chat_msg_panal').val('');
			} else {
				iziToast.error({
					message: "Sorry, The message is Delivered",
					position: 'topRight'
				});
			}

		});

		// }

	}


	clearFileUploadingField() {
		var input = $("#chat_media");
		input.replaceWith(input.val('').clone(true));
	}

	onMessageSend($event) {

		if ($event.keyCode == 13) {


			// this.sendChatMessageData();
			this.sendImage();
			$event.stopPropagation();
			return false;
		}


	}

	chatPanelView(chat_id) {
		// {"action":"chat_message_panel","chat_type":"webchat","chat_id":"all","user_id":"1203","status":"2"}}

		let api_req: any = new Object();
		let chat_req: any = new Object();
		chat_req.action = "chat_message_panel";
		chat_req.chat_type = "webchat";
		chat_req.chat_id = chat_id;
		chat_req.user_id = this.loginUser;
		if ($('#voice_3cx').prop('checked') == true) {
			// $('#voice_3cx').prop('checked', true);
			// alert()
			chat_req.status = '2';
			this.is_chat_closed = true;

		} else {
			// alert('not check')
			chat_req.status = '5';
			this.is_chat_closed = false;

		}
		if (this.data_view == 'missed') {
			chat_req.status = '6';
			this.is_chat_closed = true;
		}
		api_req.operation = "chat";
		api_req.moduleType = "chat";
		api_req.api_type = "web";
		api_req.access_token = localStorage.getItem('access_token');
		api_req.element_data = chat_req;

		this.serverService.sendServer(api_req).subscribe((response: any) => {
			if (response.result.status == 1) {

				this.chat_panel_list = response.result.data.chat_list;
				if(this.chat_panel_list.length)
				this.c_status = response.result.data.chat_list[0].chat_status;

				if (chat_id == "all" || chat_id == "" || chat_id == 0) {
					this.chat_panel_detail_type = "chat_screen";
				}
				else {
					this.chat_panel_details = response.result.data.chat_detail_list;
					this.chat_panel_detail_type = "chat_detail";
					this.chatPanelDetail(chat_id, this.c_status)
				}


				// this.chatautoScroll();
				this.chat_detail_key = chat_id;
			}

		},
			(error) => {
				console.log(error);
			});


	}
	tabsection(click_type) {
		if (click_type == 'active') {
			this.data_view = '';
			$('#voice_3cx').prop('checked', false)
			$('#sect2').removeClass('tab-active');
			$('#sect3').removeClass('tab-active');
			$('#sect1').addClass('tab-active');
			this.chatPanelView('all');
		} else if (click_type == 'close') {
			this.data_view = '';
			$('#voice_3cx').prop('checked', true)
			$('#sect1').removeClass('tab-active');
			$('#sect3').removeClass('tab-active');
			$('#sect2').addClass('tab-active');
			this.chatPanelView('all');
		}
		else if (click_type == 'missed') {
			this.data_view = 'missed';
			$('#sect1').removeClass('tab-active');
			$('#sect2').removeClass('tab-active');
			$('#sect3').addClass('tab-active');
			this.chatPanelView('all');


		}
	}
	chatPanelView2(chat_id) {
		// {"action":"chat_message_panel","chat_type":"webchat","chat_id":"all","user_id":"1203","status":"2"}}

		let api_req: any = new Object();
		let chat_req: any = new Object();
		chat_req.action = "chat_message_panel";
		chat_req.chat_type = "webchat";
		chat_req.chat_id = chat_id;
		chat_req.user_id = this.loginUser;

		if (this.search_text != '' && this.search_text != null && this.search_text != undefined)
			chat_req.search_text = this.search_text;

		if ($('#voice_3cx').prop('checked') == true) {
			// $('#voice_3cx').prop('checked', true);
			// alert('1')
			chat_req.status = '2';
			this.is_chat_closed = true;

		} else {
			// alert('2')
			chat_req.status = '5';
			this.is_chat_closed = false;

		}

		if (this.data_view == 'missed') {
			chat_req.status = '6';
			this.is_chat_closed = true;

		}
		api_req.operation = "chat";
		api_req.moduleType = "chat";
		api_req.api_type = "web";
		api_req.access_token = localStorage.getItem('access_token');
		api_req.element_data = chat_req;

		this.serverService.sendServer(api_req).subscribe((response: any) => {
			if (response.result.status == 1) {

				this.chat_panel_list = response.result.data.chat_list;
				this.c_status = response.result.data.chat_list[0].chat_status;

				// if (chat_id == "all" || chat_id == "" || chat_id == 0) {
				// 	this.chat_panel_detail_type = "chat_screen";
				// }
				// else {
				// 	this.chat_panel_details = response.result.data.chat_detail_list;
				// 	this.chat_panel_detail_type = "chat_detail";
				// 	this.chatPanelDetail(chat_id, this.c_status)
				// }


				// this.chatautoScroll();
				// this.chat_detail_key = chat_id;
			}

		},
			(error) => {
				console.log(error);
			});


	}

	chatPanelList(search_text) {
		this.search_text = search_text;
		let api_req: any = new Object();
		let chat_req: any = new Object();
		chat_req.action = "chat_message_panel";
		chat_req.chat_type = "webchat";
		chat_req.chat_id = 'all';
		chat_req.user_id = this.loginUser;
		chat_req.search_text = search_text;
		if ($('#voice_3cx').prop('checked') == true) {
			// $('#voice_3cx').prop('checked', true);
			// alert()
			chat_req.status = '2';

		} else {
			// alert('not check')
			chat_req.status = '5';

		}
		if (this.data_view == 'missed') {
			chat_req.status = '6';

		}
		api_req.operation = "chat";
		api_req.moduleType = "chat";
		api_req.api_type = "web";
		api_req.access_token = localStorage.getItem('access_token');
		api_req.element_data = chat_req;


		// {"operation":"chat","moduleType":"chat","api_type":"web","access_token":"","element_data":{"action":"chat_message_panel","chat_type":"webchat","chat_id":"all","user_id":"","search_text":"","status":""}}

		this.serverService.sendServer(api_req).subscribe((response: any) => {

			if (response.result.status == 1) {
				this.chat_panel_list = response.result.data.chat_list;
			}
		},
			(error) => {
				console.log(error);
			});


	}

	chatPanelDetail(chat_id, c_status) {
		$('#chat_msg').val('');
		let api_req: any = new Object();
		let chat_req: any = new Object();
		chat_req.action = "chat_detail_list";
		chat_req.chat_type = "webchat";
		chat_req.chat_id = chat_id;
		chat_req.user_id = this.loginUser;
		api_req.operation = "chat";
		api_req.moduleType = "chat";
		api_req.api_type = "web";
		api_req.access_token = localStorage.getItem('access_token');
		api_req.element_data = chat_req;

		this.serverService.sendServer(api_req).subscribe((response: any) => {
			if (response.result.status == 1) {

				if (c_status == '2') {
					this.chat_status_detail_id = 'closed';
					this.is_chat_closed = true;
				} else {
					this.is_chat_closed = false;
				}

				this.chat_panel_detail_type = "chat_detail";
				this.chat_panel_details = response.result.data.chat_detail_list;
				this.customer_name = response.result.data.chat_detail_list[0].customer_name;
				this.widget_name = response.result.data.chat_detail_list[0].widget_name;
				this.current_chat_id=response.result.data.chat_detail_list[0].chat_id;
				var testdata = response.result.data.chat_detail_list[0].chat_msg;
				var user_type = [];
				this.chat_panel_details.forEach(element => {
					user_type.push(element.user_type);
				});
				console.log(user_type);
				console.log(this.chat_panel_details);
				this.botlisting = testdata.split('||');

				this.chatautoScroll();
				this.trandser_notyfied(chat_id);
				this.chat_detail_key = chat_id;
				this.chatPanelView2('all');
			}

		},
			(error) => {
				console.log(error);
			});


	}



	deletedata(id) {

		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'END Chat!'
		}).then((result) => {
			if (result.value) {
				// new code 11-07-2021
				let agent_name = localStorage.getItem('user_name');
				var socket_message = '{"message_type":"chat","message_status":"existing","message_info" : {"chat_id" : "' + id + '","msg_user_id" : "' + this.loginUser + '","msg_user_type" : "3","msg_type":"text","message" : "closed","queue_id":"1","agent_aviator":"' + this.profile_image + '","agent_name":"' + agent_name + '"}}';

				this.websocket.send(socket_message);
				let access_token: any = localStorage.getItem('access_token');
				let admin_id: any = localStorage.getItem('admin_id');
				// let api_req: any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"chat_details","chat_id":"' + id + '","user_id":"' + admin_id + '","widget_name":"' + this.widget_name + '"}}';


				let api_req: any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"chat_closedby_user","chat_id":"' + id + '","user_id":"' + admin_id + '","widget_name":"' + this.widget_name + '"}}';


				this.serverService.sendServer(api_req).subscribe((response: any) => {
					if (response.status == true) {
						Swal.fire(
							'Closed!',
							'success'
						);
						this.chatPanelView("all");
						setTimeout(() => {
							this.chat_panel_detail_type = "chat_screen";
						}, 2000);
					}

				},
					(error) => {
						console.log(error);
					});
			}
		})
	}

	get_temps() {
		let access_token: any = localStorage.getItem('access_token');

		let api_req: any = '{"operation":"template", "moduleType":"template", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"listTemplateByUSer","admin_id":"' + this.adminid + '","user_id":"' + this.loginUser + '"}}';

		this.serverService.sendServer(api_req).subscribe((response: any) => {
			if (response.result.status == true) {

				this.temp_list = response.result.data;
				//   console.log(this.temp_list);
			}
		},
			(error) => {
				console.log(error);
			});
	}



	template() {
		var options = {};
		$.map(this.temp_list,
			function (o) {
				options[o.template_message] = o.template_name;
			});

		const fruit = Swal.fire({
			title: 'Select Template',
			input: 'select',
			inputOptions: options,
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

	showdoc(link) {
		//   this.doc_link=link;
		//  $("#document_model").modal('show');   
		var url = link.split('/');
		// alert(url)
		this.doc_link = "https://www.youtube.com/embed/" + url[3];
		// alert(this.doc_link)

		$("#video_play").modal('show');

	} stop() {
		var el_src = $('.myvideo').attr("src");
		$('.myvideo').attr("src", el_src);
	}



	// =================================== CHAT TRANSFER =============================================

	transferpopup(ids) {
		$('#chatTransfer').modal('show');
		this.transfer_id = ids;
	}

	TransferChatAgent(agent, dept) {

		console.log(agent, dept);

		// chatTransfer -> user_id & chat_id
		let access_token: any = localStorage.getItem('access_token');

		let api_req: any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"chatTransfer","chat_id":"' + this.transfer_id + '","user_id":"' + agent + '","department":"'+dept+'"}}';


		this.serverService.sendServer(api_req).subscribe((response: any) => {
			$('#chatTransfer').modal('hide');
			if (response.status == true) {
				iziToast.success({
					message: "Transferred successfully!",
					position: 'topRight'
				});
				this.chatPanelView("all");
				let transfer_to=this.getAgentName(agent);
				let agent_name = localStorage.getItem('agent_name');
				var transfer_text=""+agent_name+" Transferred the chat to "+transfer_to+"";
				// transfer_text=window.btoa(transfer_text);
				transfer_text = btoa(unescape(encodeURIComponent(transfer_text)));

				var socket_message = '{"message_type":"chat","message_status":"transfer_existing","message_info" : {"chat_id" : "' + this.current_chat_id + '","admin_id" : "' + this.adminid + '","msg_type":"text","message" : "' + transfer_text + '"}}';
				this.websocket.send(socket_message);
			}else{
					iziToast.error({
					message: "Transferred Failed!",
					position: 'topRight'
				});
			}

		},
			(error) => {
				console.log(error);
			});

	}



	deptList() {
		// {"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"", "element_data":{"action":"get_dept_settings","user_id":"1203"}}

		let api_req: any = new Object();
		let chat_req: any = new Object();
		chat_req.action = "get_dept_settings";
		chat_req.user_id = this.adminid;
		api_req.operation = "ticket";
		api_req.moduleType = "ticket";
		api_req.api_type = "web";
		api_req.access_token = localStorage.getItem('access_token');
		api_req.element_data = chat_req;
		this.serverService.sendServer(api_req).subscribe((response: any) => {
			console.log(response);
			if (response.result.status == true) {
				const arr1 = response.result.data;

				this.email_dept = arr1.filter(d => d.has_chat == 1);

			}
		},
			(error) => {
				console.log(error);
			});

	}

	get_agents_by_department(dept_ids) {
		var data = dept_ids;
		// alert(data)

		let access_token: any = localStorage.getItem('access_token');

		let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"get_agents_by_department","admin_id":"' + this.adminid + '","dept_id":"' + data + '"}}';
		this.serverService.sendServer(api_req).subscribe((response: any) => {
			if (response.status == true) {
				this.agent_options = response.result.data;
				// this.getTicketDetails(this.ticket_t);

			}
		},
			(error) => {
				console.log(error);
			});
	}

	revokechat(chat_ids) {


		// revokeTransfer -> user_id & chat_id

		let access_token: any = localStorage.getItem('access_token');

		let api_req: any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"chatTransfer","chat_id":"' + chat_ids + '","user_id":"' + this.loginUser + '"}}';


		this.serverService.sendServer(api_req).subscribe((response: any) => {
			if (response.status == true) {
				iziToast.success({
					message: "Revoked successfully!",
					position: 'topRight'
				});
				this.chatPanelView("all");
			}else{
				iziToast.error({
					message: "Revoked successfully!",
					position: 'topRight'
				});
			}

		},
			(error) => {
				console.log(error);
			});
		}
			trandser_notyfied(chat_id){
				let access_token: any = localStorage.getItem('access_token');
				let api_req: any = '{"operation":"chat", "moduleType": "chat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"chatTransfer_notify","chat_id":"'+chat_id+'"}}';
				this.serverService.sendServer(api_req).subscribe((response: any) => {
					if (response.status == true) {
						this.transfer_notification = response.result.data;
					}else{
						
					}
		
				},
					(error) => {
						console.log(error);
					});
		
	}
getAgentName(id){
	 
	let AgentName=this.agent_options.filter(t=>t.user_id==id);
	console.log(AgentName)
	return AgentName[0].agent_name;
}
DecryptText(text){
	// console.log(text)

	 if(this.isBase64(text)){
		 return atob(text)
	 }else
	 return  text;
}
 isBase64(str) {
    if (str ==='' || str.trim() ===''){console.log('0'); return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

}
