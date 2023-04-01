import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
declare var tinymce: any;

@Component({
  selector: 'app-view-call-tickets',
  templateUrl: './view-call-tickets.component.html',
  styleUrls: ['./view-call-tickets.component.css']
})
export class ViewCallTicketsComponent implements OnInit {
  offset_count;
  ticket_replies;
  pageLimit = 50;
  admin_id;
  ticket_t;
  ticket_id_orginal;
  access_token;
  userIds;
  tick_subject;
  ticket_status;
  closed = false;
  dept_list;
  department;
  status;
  ticket_status_sel;
  selectedDepart;
  constructor(private serverService: ServerService, private router: Router, private route: ActivatedRoute) { 

    this.ticket_t = this.route.snapshot.queryParamMap.get('ticket_id');
    this.ticket_t = atob(this.ticket_t);
    if(this.ticket_t)
    this.ticket_id_orginal=this.ticket_t;

  }

  ngOnInit(): void {
    this.access_token = localStorage.getItem('access_token');
    this.admin_id = localStorage.getItem('admin_id');
    this.userIds = localStorage.getItem('userId');
    this.viewTickets();
    this.initTiny();
  }

  initTiny() {
    var richTextArea_id = 'richTextAreaReply';
   tinymce.init({
     selector: '#richTextAreaReply',
     height: 500,
     plugins: 'advlist autolink textcolor formatpainter lists link  image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste  wordcount autolink lists media table',
     toolbar: 'undo redo |fullscreen|forecolor backcolor| formatselect | bold italic | \ undo redo | link image file| code | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | autoresize',
     paste_data_images: true,
     images_upload_url: 'upload.php',
     automatic_uploads: false,
     default_link_target:"_blank",
     extended_valid_elements : "a[href|target=_blank]",
     link_assume_external_targets: true,
     images_upload_handler: function (blobInfo, success, failure) {
       var xhr, formData;

       xhr = new XMLHttpRequest();
       xhr.withCredentials = false;
       xhr.open('POST', 'upload.php');

       xhr.onload = function () {
         var json;

         if (xhr.status != 200) {
           failure('HTTP Error: ' + xhr.status);
           return;
         }

         json = JSON.parse(xhr.responseText);

         if (!json || typeof json.file_path != 'string') {
           failure('Invalid JSON: ' + xhr.responseText);
           return;
         }

         success(json.file_path);
       };

       formData = new FormData();
       formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
      },
    });
if (tinymce.editors.length > 0) {
    //  tinymce.execCommand('mceFocus', true, richTextArea_id );       
     tinymce.execCommand('mceRemoveEditor',true, richTextArea_id);        
     tinymce.execCommand('mceAddEditor',true, richTextArea_id);
 }
  }

  viewTickets(){

    Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent'
		});


    this.offset_count = 0;
    let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + this.access_token + '", "element_data":{"action":"view_internal_call_ticket","ticket_id":"' + this.ticket_id_orginal + '","admin_id":"' + this.admin_id + '","limit":"' + this.pageLimit + '","offset":"' + this.offset_count + '"}}';
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      this.ticket_replies = response.tick_options;
      this.status = response.status_options.filter(t => t.status_id != '9' );
      this.dept_list = response.priority_options;
      this.tick_subject = response.tick_options[0].subject;
      this.ticket_status = response.tick_options[0].ticket_status;
      this.department = response.tick_options[0].priority;
      this.ticket_status_sel = response.tick_options[0].ticket_status_id;
      this.selectedDepart = response.tick_options[0].priority_id;
      console.log(this.ticket_replies[0].ticket_message);
    },
    (error) => {
      console.log(error);
    });

}

backtoPage() {
  this.router.navigate(['/call-tickets']);
}

toggleClassreplyall(id) {

  var x = document.getElementById("replyPanelall_" + id);
  $("#replyPanelall_" + id).show();

}

clickDiscard(id) {

  $('#replyPanelall_' + id).hide();
   tinymce.get('richTextAreaReply').setContent('');
   
}


replyMessage(msg_id, to, extra) {

console.log(msg_id);


  let access_token: any = localStorage.getItem('access_token');
  let user_id: any = localStorage.getItem('userId');
  let api_req: any = new Object();
  let agent_req: any = new Object();
 
  var formData = new FormData();
  var id = msg_id;


  // msg_id = msg_id + extra;

  if ((<HTMLInputElement>document.getElementById('up_files')).value != null) {
    var totalfiles = (<HTMLInputElement>document.getElementById('up_files')).files.length;
    for (var index = 0; index < totalfiles; index++) {
      formData.append("up_files[]", (<HTMLInputElement>document.getElementById('up_files')).files[index]);
    }
  }

  let sign = $('#singature_id').val();


  var msg_id = tinymce.get('richTextAreaReply').getContent();

  if (msg_id == '' || msg_id == undefined) {
    iziToast.error({
      message: "Please Enter the Message",
      position: 'topRight'
    });
    return false;
  }



  formData.append('operation', 'ticket');
  formData.append('moduleType', 'ticket');
  formData.append('api_type', 'web');
  formData.append('access_token', access_token);
  formData.append('user_id', user_id);
  formData.append('action', 'reply_internal_call_ticket');
  formData.append('message', btoa(msg_id));
  formData.append('ticket_id', this.ticket_t);

  // formData.append('up_files', $('#reply_file')[0].files);
  var files = $('#up_files')[0].files;
  var totalSize = 0;



  for (var i = 0; i < files.length; i++) {
    totalSize += files[i].size;
  }
  // 10485760 =10MB
  // 20981110 = 20MB
  if (totalSize < 10485760) {
  }
  else {
    iziToast.warning({
      message: "Sorry, File size should be below 10MB",
      position: 'topRight'
    });
    // alert("File size is more than 5MB");
    event.preventDefault();
    return false;
  }
  //alert(files[0].size);
  //  return false;
  // alert(totalSize);

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


  $.ajax({
    url: "https://"+window.location.hostname+":4003/api/v1.0/index_new.php",
    type: 'POST',
    data: formData,
    processData: false,  // tell jQuery not to process the data
    contentType: false,
    success: function (data) {
      Swal.close();
      this.parsed_data = JSON.parse(data);
      console.log(this.parsed_data);
      if (this.parsed_data.status == 'true') {
        iziToast.success({
          message: "Replied Successfully",
          position: 'topRight'
        });
        $("#refresh_page_replies").click();
        $('#replyPanelall_' + id).hide();
        tinymce.get('richTextAreaReply').setContent('');
        $('#up_files').val('');
      } else {
        iziToast.error({
          message: "Sorry, Some Error Occured",
          position: 'topRight'
        });
      }
    }
  });

}

refresh() {
  //alert(this.ticket_t);
  // var t_id=this.ticket_t;
  this.ticket_id_orginal=this.ticket_t;
  this.viewTickets();

}



get_prority_ids(){

  console.log(this.selectedDepart);
  
    let api_req:any = '{"operation":"ticket", "moduleType":"ticket", "api_type":"web", "access_token":"'+this.access_token+'", "element_data":{"action":"internal_call_onchange_priority","ticket_id":"'+this.ticket_t +'","priority_id":"'+this.selectedDepart+'","admin_id":"'+this.admin_id+'"}}';
    
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      
      if(response.result.data == 1){
      console.log(response);
      iziToast.success({
        message: "Changed the Priority",
        position: 'topRight'
      });
  
    }
  }, 
  (error)=>{
      console.log(error);
  });
  

}

get_status_changed(){

  let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + this.access_token + '", "element_data":{"action":"internal_call_onchange_status","status_id":"' + status + '","ticket_id":"' + this.ticket_t + '","admin_id":"'+this.admin_id+'"}}';
  this.serverService.sendServer(api_req).subscribe((response: any) => {
    if(response.result.data == 1){
      console.log(response);
      iziToast.success({
        message: "Changed the Status",
        position: 'topRight'
      });
  
    }
  },
    (error) => {
      console.log(error);
    });

}



closedTicket() {

  Swal.fire({
  title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!',
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        html:
          '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
      showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        background: 'transparent',
  
  
      });

     // { "operation":"ticket", "moduleType": "ticket", "api_type": "web", "element_data": { "action":"internal_call_onclose", "ticket_id":"7","user_id":"3", "admin_id":"2" } }

let api_req:any = new Object;
let post_req:any = new Object();
api_req.operation="ticket";
api_req.moduleType="ticket";
api_req.api_type="web";
api_req.access_token=localStorage.getItem('access_token');
post_req.action = "internal_call_onclose";
post_req.ticket_id = this.ticket_t;
post_req.user_id = this.userIds;
post_req.admin_id = this.admin_id;
    api_req.element_data=post_req;     


      this.serverService.sendServer(api_req).subscribe((response: any) => {
        Swal.close();
        if (response.status == true) {
          Swal.fire(
            'Closed!',
            'success'
          );
          this.backtoPage();
        }
      },
        (error) => {
          console.log(error);
        });
    }
  })
}

}
