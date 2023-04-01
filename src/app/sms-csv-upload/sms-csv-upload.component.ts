import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-sms-csv-upload',
  templateUrl: './sms-csv-upload.component.html',
  styleUrls: ['./sms-csv-upload.component.css']
})
export class SmsCsvUploadComponent implements OnInit {
  param1: string;
  created_time;
  modified_time;
  contact_id;
  parsed_data;
  uadmin_id;
  queue_list;
  editContact: FormGroup;
  constructor(private serverService: ServerService, public router:Router) { 
  }


  ngOnInit() {
    this.uadmin_id = localStorage.getItem('admin_id');
    this.dept_settings();
    
  }

  dept_settings(){
    let access_token: any=localStorage.getItem('access_token');
  
    let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"list_smsgroup","admin_id":"'+this.uadmin_id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.status==true){
       
        this.queue_list = response.result.data;
        console.log(this.queue_list);
      } 
    }, 
    (error)=>{
        console.log(error);
    });
  }
upload(){

  let access_token: any=localStorage.getItem('access_token');
  let user_id: any =  localStorage.getItem('userId'); 

    var formData = new FormData();
   
    let group_name: any= $('#group_name').val();
    console.log(group_name);


        if($('#file').val() == ''){
          iziToast.error({
            message: "Please select the CSV file to Upload",
            position: 'topRight'
        });
        return false;
        }

    formData.append('operation', 'contact');
    formData.append('moduleType', 'contact');
    formData.append('api_type', 'web');
    formData.append('action', 'group_csv_upload');
    formData.append('group_name', group_name);
    formData.append('access_token', access_token);
    formData.append('file', $('#file')[0].files[0]);
    formData.append('user_id', user_id);
  
  
  $.ajax({  
    url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
    type : 'POST',
    data : formData,
    processData: false,  // tell jQuery not to process the data
    contentType: false, 
    success:function(data){ 
      this.parsed_data = JSON.parse(data);
      if(this.parsed_data.result.status == true){
        iziToast.success({
          message: "Data Uploaded Successfully",
          position: 'topRight'
      });
      history.go(-1);
      } else {
        iziToast.error({
          message: "Sorry, Some Error Occured",
          position: 'topRight'
      });
      history.go(-1);
      }
    }  
});  

  }



  



}
