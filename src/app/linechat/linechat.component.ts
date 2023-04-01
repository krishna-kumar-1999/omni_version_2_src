import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscriber } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { throwIfEmpty } from 'rxjs/operators';
import { NUM_LOCK } from '@angular/cdk/keycodes';

declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-linechat',
  templateUrl: './linechat.component.html',
  styleUrls: ['./linechat.component.css']
})
export class LinechatComponent implements OnInit {
  @ViewChild('chat_message', {static: false}) chat_message : ElementRef;
	@ViewChild('chat_detail_id', {static: false}) chat_detail_id : ElementRef;
  @ViewChild('imgRenderer') imgRenderer: ElementRef;

 
  param1; 
  uadmin_id;
  loginUser;
  chat_panel_list;
	chat_panel_details;
	chat_panel_detail_type = "chat_screen";
  chat_detail_key;
  displayName;
  recipient_id;
  sender_id;
  profile_pic;
  temp_list;
  onclickmc;
  tag_name;
  tags_name;
  tags;
  update_names;
  str;
  addingtags;
  addtags;
  broadtags;
  tags_list;
  selected: any[] = [];
  tagnameform : any = FormGroup;
  updatenameform:any =FormGroup;
  toppss = new FormControl();
  topp = new FormControl();
  toppings = new FormControl();
  searching = new FormControl();
  formGroup: any;
  chat_id_data: any;
  id_data: any;
  phone: any;
  contact_id: any;
  ticket_mail: any;
  clipboardData: DataTransfer;
  submit_paste: boolean;
  search_text: any;
  search_tags_list: any;
  search_text_tag: any;
  chat_id;
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(private serverService: ServerService,private route: ActivatedRoute,private fb: FormBuilder,private router: Router) {
    this.param1 = this.route.snapshot.queryParamMap.get('c');
    this.onclickmc = this.route.snapshot.queryParamMap.get('l');
    
    // console.log(this.onclickmc);
    if(this.onclickmc !='' && this.onclickmc != undefined){
      var chat_id = atob(this.onclickmc);
      this.chatPanelView(chat_id);
    }
    this.serverService.changeDetectionEmitter.subscribe(
      ($event) => {
  
        let mData = JSON.parse($event);
        var pagefor = mData.pagefor;
        var pageid = mData.id;
         console.log(mData)
        if(pagefor == 'line_chat'){
          if(this.chat_id==pageid){
        this.chatPanelDetail2(pageid);			
          }else{
            this.chatPanelView2(pageid);
          }
          // this.chatPanelView2(pageid);
        // setTimeout(()=>{ 
        //   $(".card-body.chat-content").scrollTop($(".card-body.chat-content")[0].scrollHeight);
        //   }, 4000);
        }
        
      },
      (err) => {
      }
      );
      
    
   }
  ngOnInit(): void {
    this.uadmin_id = localStorage.getItem('admin_id');
    this.loginUser = localStorage.getItem('userId');
    this.chat_id_data = this.route.snapshot.queryParamMap.get('id');
    var idchat = atob(this.chat_id_data);
    if(this.param1){
      this.param1 = atob(this.param1);
      console.log(this.param1);
      this.chatPanelView(this.param1);  
			// this.chatPanelDetail(this.param1);
		  } else {
			this.chatPanelView("all");
		  }
      this.tagnameform =  new FormGroup({
        'broadtag' : new FormControl(null, Validators.required)
      });
      this.updatenameform = new FormGroup({
        'update_name' : new FormControl(null,Validators.required),
        'toppings' : new FormControl(null)
       });
this.get_temps();
this.display_tags_list();
    // this.chatPanelView("all");
  }
  sendChatMessageData(sender,receiver){
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
   
   if (chat_message.length > 0) {

  //  console.log(chat_message);
       let api_req:any = new Object();
      let chat_req:any = new Object();
      chat_req.action="reply_message";
      chat_req.user_id=this.loginUser;
      chat_req.admin_id=this.uadmin_id;
      chat_req.chat_id=this.chat_detail_id.nativeElement.value;
      chat_req.sender_id=sender;
      chat_req.recipient_id=receiver;
      chat_req.chat_message=chat_message;
      api_req.operation="chat_line";
      api_req.moduleType="chat_line";
      api_req.api_type="web";
      api_req.access_token=localStorage.getItem('access_token');
      api_req.element_data = chat_req;
      // console.log(api_req.element_data);
            this.serverService.sendServer(api_req).subscribe((response:any) => {
              Swal.close();
              if(response.status==true){

                 this.chatautoScroll();
                 this.chatPanelDetail(this.chat_detail_id.nativeElement.value);
                 $('#chat_msg').val('');
              }
                
            }, 
            (error)=>{
                console.log(error);
            });

   }
  

  }
  // search_tag(){
  //   this.search_text_tag = this.searching.value;
  //   // if(this.search_text_tag != '' && this.search_text_tag != undefined && this.search_text_tag != null ){
  //   //   var search = this.search_text_tag;
  //   // }
  //   let api_req:any = '{"operation": "tags","moduleType": "tags","api_type": "web","element_data": {"action": "tag_list","search_text":"'+this.search_text_tag+'"}}'
  //   this.serverService.sendServer(api_req).subscribe((response:any) => {
  //     // console.log(response);
  //     if(response.result.status==true){
       
  //     this.search_tags_list = response.result.data;
  //     // alert(this.search_tags_list);
  //     } 
  //   }, 
  //   (error)=>{
  //     console.log(error);
  //   });
  // }
  display_tags_list(){
    this.search_text_tag = this.searching.value;
    if(this.search_text_tag == null){
      this.search_text_tag = "";
    }
    let api_req:any = '{"operation": "tags","moduleType": "tags","api_type": "web","element_data": {"action": "tag_list","search_text":"'+this.search_text_tag+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any) => {
    
      // console.log(response);
      if(response.result.status==true){
       
      this.tags_list = response.result.data;
      console.log(this.temp_list);
      } 
    }, 
  
  
    (error)=>{
      console.log(error);
    });
  }
  getValues(event: {
     
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        var arr = this.toppings.value;
      } else {
        console.log(event.source.value)
        var arr = this.toppings.value;
      }
    }
  }

  editname(){
    // this.updatenameform.controls['toppings'].setValue(null);
    this.selected = [];
    var tag_name = this.tag_name;
    console.log(tag_name);
   if(tag_name != '' && tag_name != null && tag_name != undefined){
    var tagsname = tag_name.split(',');
      let location = tag_name.split(',');
      for(var i=0;i<location.length;i++)
      {
        // console.log(location[i]);
       this.selected.push(location[i]);
      } 
     this.toppings.setValue(this.selected); //This will update your UI
    this.updatenameform.setValue({
      //  'template' : agent_data.template_message,
       'update_name' : this.displayName,
       'toppings' : tagsname
   });
  }else{
    this.updatenameform.reset();
    this.update_names = this.displayName
 }
    $('#add_nameform').modal('show');
    
  }

  
  update_name(){
    // let api_req:any = new Object();
    // let api:any = new Object();
    // api_req.operation="chat_line";
    // api_req.moduleType="chat_line";
    // api_req.api_type="web";
    // api.displayName = this.updatenameform.value.update_name;
    // api.sender_id= this.sender_id;
    // api_req.action="update_display_name";
    // api_req.element_data=api;

    // console.log(this.toppings.value);
    var tags_names;
    var toppings = this.toppings.value;
        tags_names= toppings.join();
    let api_req: any = new Object();
    let add_agent_req: any = new Object();
    add_agent_req.action = 'profile_update';
    add_agent_req.displayName = this.updatenameform.value.update_name;
    add_agent_req.sender_id =this.sender_id;
    add_agent_req.tag_name =tags_names;
    api_req.operation = "chat_line";
    api_req.moduleType = "chat_line";
    api_req.api_type = "web";
    api_req.access_token = localStorage.getItem('access_token');
    api_req.element_data = add_agent_req;


  this.serverService.sendServer(api_req).subscribe((response: any) => {
    console.log(api_req)
    if (response.result.status == true) {
      var chat_id = response.result.chat_id;
      // var chatid = atob(chat_id);
      $('#add_nameform').modal('hide');
      // alert(display_name);
      if(chat_id == "all" || chat_id == "" || chat_id == 0){
        this.chat_panel_detail_type = "chat_screen";
      }
      else{
        this.chat_panel_details = response.result.data.chat_detail_list;
        this.chat_panel_detail_type = "chat_detail";
        
      }
      this.chatPanelView2(chat_id);
      this.chatPanelDetail(chat_id);
            iziToast.success({
                message: "Updated successfully",
                position: 'topRight'
                
            });
        } else {
            iziToast.warning({
                message: "Please try again later",
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
  chatPanelView(chat_id){
  
  let api_req:any = new Object();
  let chat_req:any = new Object();
  chat_req.action="line_message_panel";
  
  chat_req.user_id=this.loginUser;
  api_req.operation="chat_line";
  api_req.moduleType="chat_line";
  api_req.api_type="web";
  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = chat_req;
  
        this.serverService.sendServer(api_req).subscribe((response:any) => {
          console.log(response);
          if(response.status == true){
               
               this.chat_panel_list = response.result.data;

              //  if(chat_id == this.chat_detail_key){
              
              //   this.chat_panel_details = response.result.data.chat_detail_list;
              //   this.chat_panel_detail_type = "chat_detail";
              //   this.chatPanelDetail(chat_id);
              // }
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
  chatPanelDetail(chat_id){
    // var chatid = btoa(chat_id);
    // console.log(chat_id)
    // this.router.navigate(['/chatline'],{ queryParams: {id: chatid} });
    this.chat_id = chat_id;
    Swal.fire({
      html:
        '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
    showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      background: 'transparent',


    });
    $('#chat_msg').val('');
    let api_req:any = new Object();
  let chat_req:any = new Object();
  chat_req.action="chat_detail_list";
  chat_req.chat_id=chat_id;
  chat_req.user_id=this.loginUser;
  api_req.operation="chat_line";
  api_req.moduleType="chat_line";
  api_req.api_type="web";
  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = chat_req;
  
        this.serverService.sendServer(api_req).subscribe((response:any) => {
          Swal.close();
          if(response.status == true){
               this.chat_panel_detail_type = "chat_detail";
               this.chat_panel_details = response.result.data.chat_detail_list;
               this.displayName = response.result.data.chat_detail_list[0].displayName;
               this.recipient_id = response.result.data.chat_detail_list[0].recipient_id;
               this.sender_id = response.result.data.chat_detail_list[0].sender_id;
               this.profile_pic= response.result.data.chat_detail_list[0].profile_picture;
               this.tag_name= response.result.data.chat_detail_list[0].tag_name;
               this.contact_id= response.result.data.chat_detail_list[0].contact_id;
               this.phone= response.result.data.chat_detail_list[0].phone;
               this.chatautoScroll(); 
               this.chat_detail_key = chat_id;
              //  this.contactlistid(this.chat_detail_key);
          }
            
        }, 
        (error)=>{
            console.log(error);
        });
  
  
  }

  chatPanelDetail2(chat_id){
  
    $('#chat_msg').val('');
    let api_req:any = new Object();
  let chat_req:any = new Object();
  chat_req.action="chat_detail_list";
  chat_req.chat_id=chat_id;
  chat_req.user_id=this.loginUser;
  api_req.operation="chat_line";
  api_req.moduleType="chat_line";
  api_req.api_type="web";
  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = chat_req;
  
        this.serverService.sendServer(api_req).subscribe((response:any) => {
          if(response.status == true){
               this.chat_panel_detail_type = "chat_detail";
               this.chat_panel_details = response.result.data.chat_detail_list;
               this.displayName = response.result.data.chat_detail_list[0].displayName;
               this.recipient_id = response.result.data.chat_detail_list[0].recipient_id;
               this.sender_id = response.result.data.chat_detail_list[0].sender_id;
               this.profile_pic= response.result.data.chat_detail_list[0].profile_picture;
               this.chat_detail_key = chat_id;
               this.contact_id = response.result.data.chat_detail_list[0].contact_id;
               this.chatautoScroll(); 
          }
            
        }, 
        (error)=>{
            console.log(error);
        });
  
  
  }


  chatautoScroll(){   
    setTimeout(()=>{ 
      $(".card-body.chat-content").scrollTop($(".card-body.chat-content")[0].scrollHeight);
   
      }, 10);
    }

    onMessageSend($event,recpid,senderid){

      if($event.keyCode == 13){
    
    // alert('1212')
      this.sendChatMessageData(recpid,senderid);
              $event.stopPropagation();
            return false;
            }
    
    
      }
      onimageSend($event,recpid,senderid){

        if($event.keyCode == 13){
      
      // alert('1212')
        this.addWhatsappMedia(recpid,senderid);
                $event.stopPropagation();
              return false;
              }
      
      
        }
        onbroadcast($event,recpid,senderid){
          if($event.keyCode == 13){
      
            // alert('1212')
              this.addWhatsappMedia(recpid,senderid);
                      $event.stopPropagation();
                    return false;
                    }
        }
      get_temps(){
        let access_token: any=localStorage.getItem('access_token');
        
        let api_req:any = '{"operation":"template", "moduleType":"template", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"listTemplateByUSer","admin_id":"'+this.uadmin_id+'","user_id":"'+this.loginUser+'"}}';
        
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
      
      template(){
        var options = {};
        
              $.map(this.temp_list,
                  function(o) {
                      options[o.template_message] = o.template_name;
            });
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
      addWhatsappMedia(sender,receiver){ 
        $('#createNewWidget').modal('hide');
      
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
        let access_token: any=localStorage.getItem('access_token');
        // let chat_id: any=this.chat_detail_id.nativeElement.value;
          var formData = new FormData();
          formData.append('operation', 'chat_line');
          formData.append('moduleType', 'chat_line');
          formData.append('api_type', 'web');
          // formData.append('api_type', 'web');
          formData.append('action', 'line_reply_media_upload');
          formData.append('access_token', access_token);
          formData.append('attachment', $('#line_media')[0].files[0]);
          formData.append('user_id', this.loginUser);
          formData.append('chat_id', this.chat_detail_id.nativeElement.value);
          formData.append('admin_id',this.uadmin_id);
          formData.append('sender_id', sender);
          formData.append('recipient_id',receiver);
          console.log(formData);
          var self=this;
        $.ajax({  
          url:"https://ticketing.mconnectapps.com/apiDoc/v1.0/index_new.php",  
          type : 'POST',
          data : formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false, 
          success:function(data){ 
            Swal.close();
            this.parsed_data = JSON.parse(data);
            console.log(this.parsed_data );
            if(this.parsed_data.data.output == 1){  
              $('#line_media').val('');
              self.chatPanelDetail(self.chat_detail_id.nativeElement.value);
              iziToast.success({
                message:'Your document is send successful',
                position:'topRight'
              });
            } else {
              iziToast.warning({
                message:'Your document is not send',
                position:'topRight'
               });
              $('#createNewWidget').modal('hide');
      
            }
          }  
      });  
      
        }
        chatPanelView2(chat_id){
  
          let api_req:any = new Object();
          let chat_req:any = new Object();
          chat_req.action="line_message_panel";
          
          chat_req.user_id=this.loginUser;
          api_req.operation="chat_line";
          api_req.moduleType="chat_line";
          api_req.api_type="web";
          api_req.access_token=localStorage.getItem('access_token');
          api_req.element_data = chat_req;
          
                this.serverService.sendServer(api_req).subscribe((response:any) => {
                  console.log(response);
                  if(response.status == true){
                       
                       this.chat_panel_list = response.result.data;
                       var chatid = atob(chat_id);
                       if(chatid == this.chat_detail_key){
                        this.chat_panel_details = response.result.data.chat_detail_list;
                        this.chat_panel_detail_type = "chat_detail";
                        this.chatPanelDetail(chatid);
                      }
                      //  if(chat_id == "all" || chat_id == "" || chat_id == 0){
                      //    this.chat_panel_detail_type = "chat_screen";
                      //  }
                      //  else{
                      //    this.chat_panel_details = response.result.data.chat_detail_list;
                      //    this.chat_panel_detail_type = "chat_detail";
                      //    this.chatPanelDetail(chat_id);
                      //  }
        
                       
                       this.chatautoScroll();
                       this.chat_detail_key = chat_id;
                  }
                    
                }, 
                (error)=>{
                    console.log(error);
                });
        
        
          }
          broadtag(){
            $('#displaytagform').modal('show');
          }
          getValues1(event: {
     
            isUserInput: any;
            source: { value: any; selected: any };
          }) {
            if (event.isUserInput) {
              if (event.source.selected === true) {
                var arr1 = this.topp.value;
              } else {
                console.log(event.source.value)
                var arr1 = this.topp.value;
            }
          }
}
broadcasttag(){
  var topp = this.topp.value;
  var arr1 = topp.join();
  var tag_message = this.tagnameform.value.broadtag;
  let api_req: any = '{"operation": "chat_line","moduleType": "chat_line","api_type": "web","element_data": {"action": "broadcast_msg","admin_id": "'+this.uadmin_id+'","recipient_id":"'+this.recipient_id+'","chat_message":"'+tag_message+'","tag_name":"'+arr1+'"}}'
   
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    console.log(response)
    if(response.result.status==true){
      iziToast.success({
        message:'Broadcast message is send successful',
        position:'topRight'
      });
    }else{
      iziToast.warning({
        message:'Message is not send',
        position:'topRight'
       });
    } 
    $('#displaytagform').modal('hide');
    $('#tagsdata').val('');
    $('#textmessage').val('');
  }, 
  (error)=>{
    console.log(error);
  });
}
addcontact(displayName,chat_id){
  var name = btoa(displayName);
  var chatid = btoa(chat_id)
  this.router.navigate(['/add-contacts'],{ queryParams: { name:  name,id: chatid} });
}
// contactlistid(chat_id){
  
//   let access_token: any=localStorage.getItem('access_token');
//   let api_req:any = '{"operation":"chat_line","moduleType":"chat_line","api_type":"web","access_token":"'+access_token+'","element_data":{"action":"chat_id_list","chat_id":"'+chat_id+'"}}';
//   this.serverService.sendServer(api_req).subscribe((response:any) => {
//     if(response.result.status==true){
//       this.id_data = response.result.data;
//       this.contact_id = response.result.data.contact_id;
//       this.phone = response.result.data.phone;
//     } 
//   }, 
//   (error)=>{
//     console.log(error);
//   });
// }
viewcontact(id,phone){
  var chatid = btoa(id);
  var phone_no = btoa(phone);
  this.router.navigate(['/edit-contacts-dup'],{ queryParams: {id: chatid , phone : phone_no } });
}
generateticket(chat_id){
  let api_req:any = '{"operation": "chat_line","moduleType": "chat_line","api_type": "web","element_data": {"action": "generate_ticket","chat_id": "'+chat_id+'"}}';
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.status==true){
     
    this.ticket_mail = response.result.data;
    var email = btoa(this.ticket_mail);
    this.router.navigate(['/ticket-create-new'],{ queryParams: {id: email } });
    } 
  }, 
  (error)=>{
    console.log(error);
  });
}

onPaste(event,sender,receiver) {
  this.submit_paste=false;
  const dT = (event.clipboardData || event.originalEvent.clipboardData).items;
  let blob = null;
	var form = new FormData();
  console.log(form);
  console.log(dT)
  console.log(blob)
  for (const item of dT) {
    if (item.type.indexOf('image') === 0) {
      blob = item.getAsFile();
      console.log(blob);
      if(blob !='' && blob!=null){
      $('#PasteImage').modal({"backdrop": "static"});
   
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        console.log(evt.target.result); // data url!
        this.imgRenderer.nativeElement.src = evt.target.result;
      };
      reader.readAsDataURL(blob);
      }        
    }
    }
    var promise = new Promise(function(resolve, reject) { 			
		
      document.getElementById("get_card").addEventListener("click", () => {
       resolve('');
      })
      document.getElementById("dis_card").addEventListener("click", () => {		
            reject();

         event.clipboardData.clearData();			

      })
     }); 
     promise.then(() => { 
			$('#PasteImage').modal('hide');
			var self = this;
			Swal.fire({
				html:
					'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
			  showCloseButton: false,
				showCancelButton: false,
				showConfirmButton: false,
				focusConfirm: false,
				background: 'transparent',
			});
			let access_token: any=localStorage.getItem('access_token');
        // let chat_id: any=this.chat_detail_id.nativeElement.value;
          var formData = new FormData();
          formData.append('operation', 'chat_line');
          formData.append('moduleType', 'chat_line');
          formData.append('api_type', 'web');
          // formData.append('api_type', 'web');
          formData.append('action', 'line_reply_media_upload');
          formData.append('access_token', access_token);
          formData.append('attachment', blob);
          formData.append('user_id', this.loginUser);
          formData.append('chat_id', this.chat_detail_id.nativeElement.value);
          formData.append('admin_id',this.uadmin_id);
          formData.append('sender_id', sender);
          formData.append('recipient_id',receiver);
          console.log(formData);
          var self=this;
        $.ajax({  
          url:"https://ticketing.mconnectapps.com/apiDoc/v1.0/index_new.php",  
          type : 'POST',
          data : formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false, 
          success:function(data){ 
            Swal.close();
            this.parsed_data = JSON.parse(data);
            console.log(this.parsed_data );
            if(this.parsed_data.data.output == 1){  
              $('#line_media').val('');
              self.chatPanelDetail(self.chat_detail_id.nativeElement.value);
              iziToast.success({
                message:'Your document is send successful',
                position:'topRight'
              });
            } else {
              iziToast.warning({
                message:'Your document is not send',
                position:'topRight'
               });
              $('#createNewWidget').modal('hide');
      
            }
          }  
      });  

			
			   }) 
  // const dT = event.clipboardData || window.ClipboardEvent;
  // const file = dT.files[ 0 ];
  // console.log(file);
  // console.log(dT)
  // if(file !='' || file != undefined){
  //   $('#PasteImage').modal({"backdrop": "static"});
    
  // }
}
search(){
  let access_token: any=localStorage.getItem('access_token');
  var search_text = document.getElementById('search');
  let api_req:any = '{"operation":"tags","moduleType":"tags","api_type":"web","access_token":"'+access_token+'","element_data":{"action":"search","search":"'+search_text+'"}}';
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.status==true){
    } 
  }, 
  (error)=>{
    console.log(error);
  });
}
}