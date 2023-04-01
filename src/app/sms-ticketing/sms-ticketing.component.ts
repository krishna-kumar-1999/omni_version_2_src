import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

declare var tinymce:any;

@Component({
  selector: 'app-sms-ticketing',
  templateUrl: './sms-ticketing.component.html',
  styleUrls: ['./sms-ticketing.component.css']
})
export class SmsTicketingComponent implements OnInit {
  richTextArea_id;
  admin_id;
  loginUser;
  chat_panel_details;
  customer_number;
  cus_name;

  constructor(private serverService: ServerService,private route: ActivatedRoute) { }


  ngOnInit(): void {
    var getChatId = this.route.snapshot.queryParamMap.get('ids');
    this.admin_id = localStorage.getItem('admin_id');
    this.loginUser = localStorage.getItem('userId');

    this.richTextArea_id='richTextArea';
    this.initTiny();

    this.selectSmsList(getChatId);
  }


  initTiny(){
    
    tinymce.init({
      selector : '.richTextArea',
      plugins : 'advlist autolink lists link  image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste help wordcount autolink lists media table',
      toolbar : 'undo redo | formatselect | bold italic | \ undo redo | link image file| code | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | help',
  
      images_upload_url : 'upload.php',
      automatic_uploads : false,
  
      images_upload_handler : function(blobInfo, success, failure) {
        var xhr, formData;
  
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', 'upload.php');
  
        xhr.onload = function() {
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
  }


  selectSmsList(chat_id){
    // {"operation":"chat","moduleType":"chat","api_type":"web","access_token":"","element_data":{"action":"chat_detail_list","chat_id":"71844","user_id":"64","admin_id":"64","limit":"5","offset":0}}
    let api_req:any = new Object();
    let chat_req:any = new Object();
    chat_req.action="chat_detail_list";
    chat_req.chat_id=chat_id;
    chat_req.user_id=this.loginUser;
    chat_req.admin_id=this.admin_id;
    // chat_req.chat_id='71844';
    // chat_req.user_id='64';
    // chat_req.admin_id='64';
    chat_req.limit="5";
    chat_req.offset= 0;
    api_req.operation="chat";
    api_req.moduleType="chat";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = chat_req;
    
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==1){
        this.chat_panel_details = response.result.data.chat_detail_list;
        this.customer_number = response.result.data.chat_detail_list[0].customer_name;
        this.cus_name = response.result.data.chat_detail_list[0].cus_name;
      }
            
    }, 
    (error)=>{
      console.log(error);
    });
  
  
  }

}
