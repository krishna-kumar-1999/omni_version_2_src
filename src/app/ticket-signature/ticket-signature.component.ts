import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
// import { EditorModule } from "@tinymce/tinymce-angular";
import Swal from 'sweetalert2'
import { Location } from '@angular/common';


declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
@Component({
  selector: 'app-ticket-signature',
  templateUrl: './ticket-signature.component.html',
  styleUrls: ['./ticket-signature.component.css']
})
export class TicketSignatureComponent implements OnInit {

  admin_id;
  user_id;
  user_type_;
  user_type;
  agents_options;
  department_options;
  priority_options;
  status_options;
  richTextArea_id;
  queue_list;
  edit_sign;
  update_sign_id;
  queue_list_user;
  isDisabled =false;
  recordNotFound;
  admin_permission;
  NotEdit =false;
  constructor(private serverService: ServerService, private location: Location) { }
  userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });
  ngOnInit() {
    this.user_type_ = localStorage.getItem('user_type');
		this.admin_permission = localStorage.getItem('admin_permision');
    this.admin_id = localStorage.getItem('admin_id');
    this.user_id = localStorage.getItem('userId');
    if (this.user_type_ == 'Employee')
      this.user_type = 3;
    if (this.user_type_ == 'Admin' || this.admin_permission =='1'){
      this.user_type = 2;
    this.user_id = localStorage.getItem('admin_id');
    }

 
    this.richTextArea_id = 'richTextArea';

    this.initTiny();
    // this.initTiny();

    this.get_mails();
  }
  Goback(){
    this.location.back();
  }
  get_mails() {
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

    let api_req: any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"viewTicketSignature","admin_id":"' + this.admin_id + '","user_id":"' + this.user_id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close()
      if (response.status == true) {

        this.queue_list = response.result.data;
        // this.queue_list_user = response.result.data.user_sig;

        // console.log(this.queue_list);
      } else {
        this.recordNotFound = true;
      }
    },
      (error) => {
        console.log(error);
      });
  }


  initTiny() {

    tinymce.init({
      selector: '#richTextArea',
      height: 500,
      plugins: 'advlist textcolor formatpainter  autolink lists link  image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste wordcount autolink lists media table',
      toolbar: 'undo redo |fullscreen|forecolor backcolor| formatselect | bold italic | \ undo redo | link image file| code | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent ',
      paste_data_images: true,
      images_upload_url: 'upload.php',
      automatic_uploads: false,
      textcolor_rows: "4",
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
      // tinymce.execCommand('mceFocus', true, this.richTextArea_id );       
      tinymce.execCommand('mceRemoveEditor',true, this.richTextArea_id);        
      tinymce.execCommand('mceAddEditor',true, this.richTextArea_id);
  }
  }
  createNewTicket() {


    let agent_req: any = new Object();
    let access_token: any = localStorage.getItem('access_token');
    var subject = $('#subject').val();
    var description = tinymce.activeEditor.getContent();
    console.log(tinymce.activeEditor.getContent());
    // var default=0;
    var def_check = '0'; if ($('#default_check').prop('checked')) { def_check = '1'; }
    if (subject == "") {
      iziToast.error({
        message: "Please add Signature Title",
        position: 'topRight'
      });
      return false;
    }
    if (description == "") {
      iziToast.error({
        message: "Please add Signature in Text Area",
        position: 'topRight'
      });
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
    //  description= tinymce.get('richTextArea').getContent();
    // agent_req.action='createTicketSignature';
    // agent_req.sig_title=subject;
    // agent_req.sig_content=description;
    // agent_req.is_default=description;
    // agent_req.admin_id=this.admin_id;

    var formData = new FormData();

    var json_arr = JSON.stringify(agent_req);
    formData.append('operation', 'ticket');
    formData.append('moduleType', 'ticket');
    formData.append('api_type', 'web');
    formData.append('action', 'createTicketSignature');
    formData.append('sig_title', subject);
    formData.append('sig_content', description);
    formData.append('is_default', def_check);
    formData.append('admin_id', this.admin_id);
    formData.append('user_id', this.user_id);

    // formData.append('logo_image', $('#logo_image')[0].files[0]);
    // formData.append('small_logo_image', $('#small_logo_image')[0].files[0]);
    // formData.append('user_id', user_id);
    // formData.append('element_data', json_arr);

    var self =this;
    console.log(formData);
    $.ajax({
      // url: "https://uatassaabloyccapi.mconnectapps.com/api/v1.0/index_new.php",
      url: "https://"+window.location.hostname+":4003/api/v1.0/index_new.php",
      type: 'POST',
      data: formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,
      success: function (data) {
        this.parsed_data = JSON.parse(data);
        console.log(this.parsed_data);
        Swal.close();

        // if(this.parsed_data.result.status == "Message has been sent successfully"){   
        if (this.parsed_data.status == "true") {
          self.NotEdit=false;
          iziToast.success({
            message: "Signature Added Successfully",
            position: 'topRight'
          });
          // this.router.navigate(['/ticketing-system-new']);
          $("#refresh_profile").click();
           tinymce.get('richTextArea').setContent('');
           $('#subject').val('');
        }
        else {
          iziToast.error({
            message: "Sorry, Some Error Occured,Please contact Admin",
            position: 'topRight'
          });

        }
      }
    });

  }

  NavigateFunc() {
    this.get_mails();
  }

  editDepartmentSettings(id) {
    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"get_agents_by_department","dept_id":"' + id + '","admin_id":"' + this.admin_id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        // console.log(response);
        this.agents_options = response.result.data;
      }
    },
      (error) => {
        console.log(error);
      });
  }

  changedefault(id) {
    let status;
    if ($('#singature_' + id).is(':checked')) {
      status = 1;
    } else {
      status = 0;
    }
    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"makeSignatureDefault","admin_id":"' + this.admin_id + '","user_id":"' + this.user_id + '","is_default":"' + status + '","signature_id":"' + id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.status == true) {
        iziToast.success({
          message: "Signature Updated Successfully",
          position: 'topRight'
        });
        this.get_mails();

      }
    },
      (error) => {
        console.log(error);
      });
  }


  editsignpopup(id) {

    // {"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"", "element_data":{"action":"editTicketSignature","admin_id":"1203","sig_id":"19"}}

    Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent',


		});

      // $([document.documentElement, document.body]).animate({
      //     scrollTop: $("#elementtoScrollToID").offset().top
      // }, 2000);
      // $(".section-body").scrollTop($(".section-body")[0].scrollHeight);
    let access_token: any = localStorage.getItem('access_token');
    let api_req: any = '{"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"editTicketSignature","admin_id":"' + this.admin_id + '","sig_id":"' + id + '"}}';

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      if (response.result.status == true) {
        // $('#add_deptform').modal('show');
        this.isDisabled = false;
        $("html, body").animate({ scrollTop: 0 }, "slow");

        this.edit_sign = response.result.data[0];

        this.update_sign_id = this.edit_sign.sig_id;

        if (this.edit_sign.is_default == '1') {
          // $("#edit_default_check").prop("checked", true);
          $("#default_check").prop("checked", true);
        }else{
          $("#default_check").prop("checked", false);
        }
        this.NotEdit=true;
        tinymce.get('richTextArea').setContent('');
        $('#subject').val(this.edit_sign.sig_title);
        tinymce.activeEditor.setContent(this.edit_sign.sig_content);
      }else{
        iziToast.error({
          message: "Sorry, Some Error Occured,Please contact Admin",
          position: 'topRight'
        });
      }
    },
      (error) => {
        console.log(error);
      });

  }


  UpdateSignature() {

    this.isDisabled = true;
   
var self =this;
    let access_token: any = localStorage.getItem('access_token');
    var subject = $('#subject').val();
    var description = tinymce.activeEditor.getContent();
    if (subject == "") {
      iziToast.error({
        message: "Please add Signature Title",
        position: 'topRight'
      });
      return false;
    }
    if (description == "") {
      iziToast.error({
        message: "Please add Signature in Text Area",
        position: 'topRight'
      });
      return false;
    }    // var default=0;
    Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent',


		});
    var def_check = '0'; if ($('#default_check').prop('checked')) { def_check = '1'; }
    var form = new FormData();
    form.append("admin_id", this.admin_id);
    form.append("is_default", def_check);
    form.append("sig_title", subject);
    form.append("sig_content", description);
    form.append("sig_id", this.update_sign_id);
    form.append("action", "updateTicketSignature");

    var settings = {
      // "url": "https://uatassaabloyccapi.mconnectapps.com/api/v1.0/index_new.php",
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
    
    $.ajax(settings).done(function (response) {
      // console.log(response); 
     Swal.close();
      var result = JSON.parse(response);
      // if(this.parsed_data.result.status == "Message has been sent successfully"){   
      if (result.data == "1") {
        // $('#add_deptform').modal('hide');
        iziToast.success({
          message: "Signature Update Successfully",
          position: 'topRight'
        });
        self.get_mails();
        self.NotEdit=false;
        tinymce.get('richTextArea').setContent('');
        $('#subject').val('');
      }else{
        self.isDisabled = false;
        iziToast.error({
          message: "Sorry, Updated Signature Failed",
          position: 'topRight'
        });
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
  
  //   let api_req:any = '{"operation":"predective_dialer_contact", "moduleType":"predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_contact","user_id":"'+this.user_id+'","contact_id":"'+invalidContacts+'"}}';
   
    let api_req: any = '{"operation":"ticket", "moduleType": "ticket", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"deleteSignature","admin_id":"' + this.admin_id + '","sig_id":"' + id + '"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
  
    console.log(response);
    if(response.result.data==true){
      iziToast.success({
      message: "Signature deleted successfully",
      position: 'topRight'
    });
    this.get_mails();
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
ClearText(){
  tinymce.get('richTextArea').setContent('');
}
}

