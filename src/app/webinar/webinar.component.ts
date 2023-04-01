import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
import { DateTime } from 'actions-on-google';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.css']
})
export class WebinarComponent implements OnInit {
  queue_list;
  recordNotFound = false; 
  addDept: FormGroup;
  editDept: FormGroup;
  adddata:FormGroup;
  editdata:FormGroup;
  old_sip_url;
  uadmin_id;
  pbx_count;
  dep_status; 
  dep_id;
  pageLimit = 20;
  agents_list;
  userchecked;
  Mqueue_list;
  participants_list;
  meet_id;
  res;
  id;
  meetingid;
  dateTime: any;
  page_image;
  descriptions: any;
  globalid;
  constructor(private serverService: ServerService) { }


  ngOnInit() {
    this.uadmin_id = localStorage.getItem('admin_id');
    this.addDept = new FormGroup({
     'template' : new FormControl(null,Validators.required),
    });
 
     this.editDept = new FormGroup({
      'template' : new FormControl(null,Validators.required),
    });
   
    this.editdata = new FormGroup({
      'dateTime': new FormControl(null,Validators.required),
      'durations': new FormControl(null,Validators.required),
      'subject': new FormControl(null,Validators.required),
      'descriptions': new FormControl(null),
      'page_image': new FormControl(null),
      'extension': new FormControl(null,Validators.required),     
      'image_position': new FormControl(null,Validators.required)
   });
    this.webinarList();
    
   }


webinarList(){
    let api_req:any = new Object();
    let queue_req:any = new Object();
    queue_req.action="get_meeting_list";
    queue_req.admin_id=localStorage.getItem('admin_id');
    api_req.operation="webinar_configuration";
    api_req.moduleType="webinar_configuration";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = queue_req;
          this.serverService.sendServer(api_req).subscribe((response:any) => {
            if(response.status=="true"){
           
              this.Mqueue_list= response.List_options;
              
            }
              

          }, 
          (error)=>{
              console.log(error);
          });

}

createwebinar(){
  $('#add_deptform').modal('show');
}




  timestampToDatetimeInputString(timestamp) {
    const date = new Date((timestamp + this.getTimeZoneOffsetInMs()));
    // slice(0, 19) includes seconds
    return date.toISOString().slice(0, 19);
  }
  
  getTimeZoneOffsetInMs() {
    return new Date().getTimezoneOffset() * -60 * 1000;
  }


  viewwebinar(id){
    this.meet_id=id;
    let api_req:any = new Object();
    let queue_req:any = new Object();
    queue_req.action="list_meeting_participants";
    queue_req.admin_id=localStorage.getItem('admin_id');
    queue_req.meetingid=id;
    api_req.operation="list_meeting_participants";
    api_req.moduleType="webinar_configuration";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = queue_req;
          this.serverService.sendServer(api_req).subscribe((response:any) => {
            if(response.status==true){
              $('#viewParticipans').modal('show');
              this.participants_list= response.result.data;
              
            }
              

          }, 
          (error)=>{
              console.log(error);
          });

}






editWebinar(){

  let user_id: any =  localStorage.getItem('userId'); 
  let admin_id: any =  localStorage.getItem('admin_id'); 

  

  if($('#u_webinar_title').val() == '' || $('#u_webinar_title').val() == undefined){
    iziToast.error({
      message: "Please Enter the valid title",
      position: 'topRight'
  });
  return false
  }

  if($('#u_from_date').val() == '' || $('#u_from_date').val() == undefined){
    iziToast.error({
      message: "Please Enter the schedule date",
      position: 'topRight'
  });
  return false
  }
  if($('#u_duration').val() == '' || $('#u_duration').val() == undefined){
    iziToast.error({
      message: "Please Enter the valid duration",
      position: 'topRight'
  });
  return false
  }



    var formData = new FormData();
    formData.append('id', $('#u_id').val());
    formData.append('title', $('#u_webinar_title').val());
    formData.append('meeting_date', $('#u_from_date').val());
    formData.append('minutes', $('#u_duration').val());
    formData.append('content', $('#u_webinar_description').val());
    formData.append('img_user_id', user_id);
    formData.append('timezone_id', localStorage.getItem('timezone_id'));
    formData.append('logo_image', $('#u_webinar_logo')[0].files[0]);
    formData.append('content_image', $('#u_webinar_descriptionImage')[0].files[0]);
    formData.append('action', 'update_webinar_meeting');
    formData.append('user_id', user_id);
    formData.append('admin_id', admin_id);
    console.log(formData);
  
  $.ajax({  
    url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
    type : 'POST',
    data : formData,
    processData: false,  // tell jQuery not to process the data
    contentType: false, 
    success:function(data){ 
      this.parsed_data = JSON.parse(data);
      console.log(this.parsed_data );
      if(this.parsed_data.status == 'true'){    
        iziToast.success({
          message: "Webinar Updated Successfully",
          position: 'topRight'
      });
      $('#loadList').click();
      $('#edit_deptform').modal('hide');
      //location.reload();
      } else {
        iziToast.error({
          message: "Sorry, Some Error Occured",
          position: 'topRight'
      });
      // history.go(-1);
      //location.reload();
      }
    }  
});  

  }


  exportcsv(){
    
    let report_details:any =  new Object();
    let api_req:any = new Object();

    report_details.action="list_meeting_participants_report";
    report_details.meetingid = this.meet_id;
    api_req.operation="list_meeting_participants";
    api_req.moduleType="webinar_configuration";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = report_details;
    

    this.serverService.sendServer(api_req).subscribe((response:any) => {
      console.log(response);
      if(response.status==true){
      this.res = response;
      var arrStr = encodeURIComponent(JSON.stringify(this.res));
      // document.location.href = 'https://'+window.location.hostname+':4003/api/storage/contact/download.php?res='+arrStr;
      var url = 'https://'+window.location.hostname+':4003/api/storage/chat/webinar_participants.php';
      var form = $('<form action="' + url + '" method="post">' +
      '<input type="text" name="res" value="' + arrStr + '" />' +
      '</form>');
      $('body').append(form);
      form.submit();
    
    } else {
      iziToast.warning({
      message: "No Records Found. Please try again",
      position: 'topRight'
    });
    }
    }, 
    (error)=>{
        console.log(error);
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
        // let api_req:any = '{"operation":"contact", "moduleType": "contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_auxcode","id":"'+id+'","admin_id":"'+admin_id+'"}}';
        let api_req:any = '{"operation":"delete_meeting", "moduleType": "webinar_configuration", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_meeting","meetingid":"'+id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.data==1){
      this.webinarList();
      Swal.fire(
        'Deleted!',
        'success'
      );
    }

  }, 
  (error)=>{
      console.log(error);
  });
      }
    })
  }
  add_data(){
    $('#adddata').modal('show');
  }
  add_webinar(){
    console.log($('#dateTime').val())
    console.log($('#duration').val())
    console.log($('#descriptions').val())
     var date =$('#dateTime').val();
     alert(date)
if($('#dateTime').val() == '' || $('#dateTime').val() == undefined){
     
      iziToast.error({
        message: "Please Enter the DateTime ",
        position: 'topRight'
    });
    return false;
    }
     var varDate = new Date(date); //dd-mm-YYYY
     var today = new Date();
    

     if(varDate <= today) {
     
      iziToast.error({
        
        message: "Please Enter valid the DateTime",
        position: 'topRight'
    });
    return false;
  }  
 
    
    if($('#durations').val() == '' || $('#durations').val() == undefined){
     
      iziToast.error({
        message: "Please Enter the valid duration",
        position: 'topRight'
    });
    return false;
    }
    if($('#subject').val() == '' || $('#subject').val() == undefined){
      iziToast.error({
        message: "Please Enter the valid Subject",
        position: 'topRight'
    });
    return false;
   }
  
    if($('#descriptions').val() == '' || $('#descriptions').val() == undefined){
      iziToast.error({
        message: "Please Enter the valid Description",
        position: 'topRight'
    });
    return false;
    }
    if($('#extension').val() == '' || $('#extension').val() == undefined){
     
      iziToast.error({
        message: "Please Enter the valid extension",
        position: 'topRight'
    });
    return false;
    }

   // return false;
    
  
    var form = new FormData();
  form.append("operation","webinar_meeting_new");
  form.append("action","add_webinar");
  form.append("dateTime",$('#dateTime').val());
  form.append("duration",$('#durations').val());
  //alert($('#duration').val())
  form.append("subject",$('#subject').val());
  form.append("description",$('#descriptions').val());
  form.append("extension", $('#extension').val());
  form.append("admin_id",this.uadmin_id);
  form.append("page_image",$('#page_image')[0].files[0]);
  form.append("image_position",$('#image_position').val());
  var self=this;
  var settings = {
    "url": "https://"+window.location.hostname+":4003/api/v1.0/index_new.php",
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };
 
//   $('#dateTime').val('');
// $('#durations').val('');
// //alert($('#duration').val())
// $('#subject').val('');
// $('#descriptions').val('');
// $('#extension').val('');
// $('#page_image')[0].files[0];
// $('#image_position').val('');
  $.ajax(settings).done(function (response) {
    console.log(response);
    var response = JSON.parse(response);
    console.log(response);
   
  // alert(response.status)  
    // alert("add_webinar added successfully");
    if(response.status==true){
     
      $('#adddata').modal('hide');
      $('#dateTime').val('');
$('#durations').val('');
//alert($('#duration').val())
$('#subject').val('');
$('#descriptions').val('');
$('#extension').val('');
$('#page_image')[0].files[''];
$('#image_position').val('');
      
      var meetingid=response.result.meetingid;
      meetingid= 'https://'+window.location.hostname+':4003/webinar-template/3cx-webinors/?meeting='+meetingid;
  
      Swal.fire({
        title: '<strong>Created Succesfully</u></strong>',
        icon: 'info',
        html:
          'Click, ' +
          '<a STYLE="color:green" href="'+meetingid+' " target="_blank">here</a> ' +
          'to add participants',
          
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
       
        confirmButtonAriaLabel: 'Ok',
      
        cancelButtonAriaLabel: 'Cancel'
      })
      
      self.webinarList();
     
      
    }
    else{
      alert("add_webinar not added successfully");
    }
   
  });
  
  
  }
  // toJSONLocal(date) {
  //   var local = new Date(date);
  //   local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  //   return local.toJSON();
  //   }
 editForm(id){
    this.globalid = id;
    let access_token: any=localStorage.getItem('access_token');
    let user_id: any=localStorage.getItem('userId');
    let api_req:any = '{"operation":"webinar_meeting_new", "moduleType": "webinar_meeting_new", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"edit_webinar","meetingid":"'+id+'","admin_id":"'+user_id+'"}}';
    
    this.serverService.sendServer(api_req).subscribe((response:any) => {

      if(response.result.status==true){
  
        $('#edit_data').modal('show');
        var data=response.result.data[0];
        console.log(data)
      var date=data.meeting_date;
      var duration=data.duration;
      var datas=data.page_image
      console.log(datas);
      this.page_image=datas;
     
      var ext=333;
        this.editdata.setValue({
         
       'dateTime': date,
       'durations' : duration,
       'subject' : data.title,
       'descriptions':data.descr,
      'page_image' : datas,
       'extension' : ext,       
       'image_position' : data.image_position
       });    
      
      }   else{
              
        iziToast.warning({
            message: "Please try again",
            position: 'topRight'
        });
    
  }
    }, 
    (error)=>{
        console.log(error);
    });
  }
  
  // updateform(id){
  //   let userId: any=localStorage.getItem('userId');
  //   let access_token: any=localStorage.getItem('access_token');
   
  //   let meetingid=id;
  //   console.log(meetingid)
  //   let descr=$('#descriptions').val();
  //   console.log(descr)
  //   let api_req:any = '{"operation":"webinar_meeting_new", "moduleType":"webinar_meeting_new", "api_type":"web", "access_token":"'+access_token+'", "element_data":{"action":"update_webinar","description":"'+descr+'","meetingid":"'+meetingid+'"}}';
  
  //   this.serverService.sendServer(api_req).subscribe((response:any) => {
  //     if(response.result.status==true){
  //       iziToast.success({
  //         message: "Please try again",
  //         position: 'topRight'
  //     });
        
  //     } else {
  //       this.recordNotFound = true;
  //     }
  //   }, 
  //   (error)=>{
  //       console.log(error);
  //   });
  // }
  updateform(){
    let data:any = this.editdata.value;
    console.log(data)
    let access_token: any=localStorage.getItem('access_token');
     let user_id: any =  localStorage.getItem('userId'); 
   
   
     
     var formData = new FormData();
     formData.append('operation', 'webinar_meeting_new');
        formData.append('moduleType', 'webinar_meeting_new');
        formData.append('api_type', 'web');
        formData.append('action', 'update_webinar');
        formData.append('access_token', access_token);
        formData.append('meetingid', this.globalid);
        formData.append("description",$('#dup_descriptions').val());
        formData.append('page_image', $('#dup_page_image')[0].files[0]);
        formData.append("dateTime",$('#dup_dateTime').val());
       
       $.ajax({  
      url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
      type : 'POST',
      data : formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false, 
      success:function(data){ 
        this.parsed_data = JSON.parse(data);
        if(this.parsed_data.status == "true"){
         
          $('#edit_data').modal('hide');
                // this.editDept.reset();
               
                iziToast.success({
                    message: "Data updated successfully",
                    position: 'topRight'
                });
        } else {
          iziToast.error({
            message: "Sorry, Some Error Occured",
            position: 'topRight'
        });
        }
      }  
  });  
}

}


