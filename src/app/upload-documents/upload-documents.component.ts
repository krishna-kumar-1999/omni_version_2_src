import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {
  param1: string;
  created_time;
  modified_time;
  parsed_data;
  editContact: FormGroup;
  mrvoip_main;
  mrvoip_lin;
  mrvoip_win;
  mrvoip_lin2;
  mrvoip_win2;
  agent_rating_main;
  ar_1;
  ar_2;
  prdic_dialer_main;
  pd_camp_1;
  pd_camp_2;
  pd_camp_3;
  pd_camp_4;
  mrvoip_lin_file;
  mrvoip_win_file;
  mrvoip_lin_file2;
  mrvoip_win_file2;
  pd_version;
  pro_main;
  pro_camp_1;
  bd_main;
  bd_camp_1;
  bd_camp_2;
  bds_main;
  bds_camp_1;
  bds_camp_2;
  bs_version
  bd_version
  pro_version
  constructor(private serverService: ServerService, public router:Router) { 
  }

  ngOnInit() {
    this.allDocuments()
  }


  allDocuments(){
    let access_token: any=localStorage.getItem('access_token');
    let user_id: any=localStorage.getItem('userId');
    let api_req:any = '{"operation":"predective_dialer_contact", "moduleType":"predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"upload_list"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.status == true){
        let data = response.result.data;
        this.mrvoip_main = data.mrvoip_data[0].main_document;
        this.mrvoip_lin = data.mrvoip_data[0].linux_document;
        this.mrvoip_win = data.mrvoip_data[0].windows_document;
        this.mrvoip_lin_file = data.mrvoip_data[0].linux_document_1;
        this.mrvoip_win_file  = data.mrvoip_data[0].windows_document_1;

        this.mrvoip_lin2 = data.mrvoip_data[0].linux2_doc;
        this.mrvoip_win2 = data.mrvoip_data[0].windows2_doc;
        this.mrvoip_lin_file2 = data.mrvoip_data[0].linux2_file;
        this.mrvoip_win_file2  = data.mrvoip_data[0].window_file;

        this.agent_rating_main = data.agentrating_data[0].agent_rating_main;
        this.ar_1 = data.agentrating_data[0].agent_rating_1;
        this.ar_2 = data.agentrating_data[0].agent_rating_2;
        this.prdic_dialer_main = data.pd_data[0].pd_main;
        this.pd_camp_1 = data.pd_data[0].camp_1;
        this.pd_camp_2 = data.pd_data[0].camp_2;
        this.pd_camp_3 = data.pd_data[0].camp_3;
        this.pd_camp_4 = data.pd_data[0].camp_4;
        this.pro_version = data.pro_data[0].pro_version;
        this.bd_version = data.bd_main[0].bd_version;
        this.pro_main = data.pro_data[0].pro_main;
        this.pro_camp_1 = data.pro_data[0].camp_1;
        this.bd_main = data.bd_data[0].bd_main;
        this.bd_camp_1 = data.bd_data[0].camp_1;
        this.bd_camp_2 = data.bd_data[0].camp_2;
        this.bds_main = data.broadcast_survey_dialler[0].bs_main;
        this.bds_camp_1 = data.broadcast_survey_dialler[0].camp_1;
        this.bds_camp_2 = data.broadcast_survey_dialler[0].camp_2;
        this.bs_version = data.broadcast_survey_dialler[0].bs_version;
        $('#mrvoip_version').val(data.mrvoip_data[0].mrvoip_version)
        $('#agent_rating_version').val(data.agentrating_data[0].agent_rating_version)
        $('#pd_version').val(data.pd_data[0].pd_version)
        $('#bro_pd_version').val(data.bd_data[0].bd_version)
        $('#pro_pd_version').val(data.pro_data[0].pro_version)
      }
    }, 
    (error)=>{
        console.log(error);
    });
  }




  uploadPredictive(){
    let access_token: any=localStorage.getItem('access_token');
    let user_id: any =  localStorage.getItem('userId'); 
    let default_pd = $('#default_pd').is(':checked');
    let toggle_pd = $('#toggle_pd').is(':checked');
      var formData = new FormData();
      formData.append('operation', 'mrvoip');
      formData.append('moduleType', 'mrvoip');
      formData.append('api_type', 'web');
      formData.append('action', 'predective_dialer_upload');
      formData.append('access_token', access_token);
      formData.append('pd_main', $('#pd_main')[0].files[0]);
      formData.append('camp_1', $('#camp_1')[0].files[0]);

      formData.append('pd_version', $('#pd_version').val());
      formData.append('user_id', user_id);
      // formData.append('makedefault', default_pd);
      // formData.append('d_toggle', toggle_pd);
    $.ajax({  
      url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
      type : 'POST',
      data : formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false, 
      success:function(data){ 
        this.parsed_data = JSON.parse(data);
        if(this.parsed_data.status == "true"){
          $('#reload').click();
          iziToast.success({
            message: "Predictive dialer Data Uploaded Successfully",
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







  uploadAgent(){
    let access_token: any=localStorage.getItem('access_token');
    let user_id: any =  localStorage.getItem('userId'); 
    let default_ar = $('#default_ar').is(':checked');
    let toggle_ar = $('#toggle_ar').is(':checked');
      var formData = new FormData();
      formData.append('operation', 'mrvoip');
      formData.append('moduleType', 'mrvoip');
      formData.append('api_type', 'web');
      formData.append('action', 'agent_rating_upload');
      formData.append('access_token', access_token);
      formData.append('agent_rating_main', $('#agent_rating_main')[0].files[0]);
      formData.append('agent_rating_1', $('#agent_rating_1')[0].files[0]);
      formData.append('agent_rating_2', $('#agent_rating_2')[0].files[0]);
      formData.append('agent_rating_version', $('#agent_rating_version').val());
      formData.append('user_id', user_id);
      // formData.append('makedefault', default_ar);
      // formData.append('d_toggle', toggle_ar);
    $.ajax({  
      url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
      type : 'POST',
      data : formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false, 
      success:function(data){ 
        this.parsed_data = JSON.parse(data);
        if(this.parsed_data.status == "true"){
          $('#reload').click();
          iziToast.success({
            message: "Agents Data Uploaded Successfully",
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
  uploadNRVOIP(){
    let access_token: any=localStorage.getItem('access_token');
    let user_id: any =  localStorage.getItem('userId'); 
    let mdf_mrvoip = $('#mdf_mrvoip').is(':checked');
    let d_toggle_mrvoip = $('#d_toggle_mrvoip').is(':checked');
      var formData = new FormData();
      formData.append('operation', 'mrvoip');
      formData.append('moduleType', 'mrvoip');
      formData.append('api_type', 'web');
      formData.append('action', 'mrvoip_upload');
      formData.append('access_token', access_token);
      formData.append('mrvoip_main', $('#mrvoip_main')[0].files[0]);
      formData.append('mrvoip_linux', $('#mrvoip_linux')[0].files[0]);
      formData.append('mrvoip_windows', $('#mrvoip_windows')[0].files[0]);
      formData.append('linux_document_1', $('#linux_document_1')[0].files[0]);
      formData.append('windows_document_1', $('#windows_document_1')[0].files[0]);
      // formData.append('mrvoip_version', $('#mrvoip_version').val());
      formData.append('sec_title', $('#mrvoip_version').val());
      formData.append('user_id', user_id);
// Files for Version 2
      formData.append('sec2_title', $('#mrvoip_version2').val());
// alert($('#mrvoip_version2').val());

      formData.append('linux2_doc', $('#linux2_doc')[0].files[0]);
      formData.append('windows2_doc', $('#windows2_doc')[0].files[0]);
      formData.append('linux2_file', $('#linux2_file')[0].files[0]);
      formData.append('window_file', $('#window_file')[0].files[0])

      // formData.append('makedefault', '"'+mdf_mrvoip+'"');
      // formData.append('d_toggle', '"'+d_toggle_mrvoip+'"');
      // formData.append('makedefault', mdf_mrvoip);
      // formData.append('d_toggle', d_toggle_mrvoip);
    $.ajax({  
      url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
      type : 'POST',
      data : formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false, 
      success:function(data){ 
        this.parsed_data = JSON.parse(data);
        if(this.parsed_data.status == "true"){
          $('#reload').click();
          iziToast.success({
            message: "Mr.voip Data Uploaded Successfully",
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
    

    deletedata(name){
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

    let api_req:any = '{"operation":"predective_dialer_contact", "moduleType": "predective_dialer_contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_mrvoip_upload","column_name":"'+name+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.data==1){
        Swal.fire(
          'Deleted!',
          'success'
        );
        this.allDocuments();
      } else {
        Swal.fire(
          'Some Error Occured!',
          'error'
        );
      }
  
    }, 
    (error)=>{
        console.log(error);
    });
        }
      })
    }




    uploadProacctive(){
      let access_token: any=localStorage.getItem('access_token');
      let user_id: any =  localStorage.getItem('userId'); 
      let default_pd = $('#default_pd').is(':checked');
      let toggle_pd = $('#toggle_pd').is(':checked');
        var formData = new FormData();
        formData.append('operation', 'mrvoip');
        formData.append('moduleType', 'mrvoip');
        formData.append('api_type', 'web');
        formData.append('action', 'proactive_dialer_upload');
        formData.append('access_token', access_token);
        formData.append('pro_main', $('#pro_pd_main')[0].files[0]);
        formData.append('camp_1', $('#pro_camp_1')[0].files[0]);
  
        formData.append('pro_version', $('#pro_pd_version').val());
        formData.append('user_id', user_id);
        // formData.append('makedefault', default_pd);
        // formData.append('d_toggle', toggle_pd);
      $.ajax({  
        url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
        type : 'POST',
        data : formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false, 
        success:function(data){ 
          this.parsed_data = JSON.parse(data);
          if(this.parsed_data.status == "true"){
            $('#reload').click();
            iziToast.success({
              message: "Proactive dialer Data Uploaded Successfully",
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

      uploadBroacctive(){
        let access_token: any=localStorage.getItem('access_token');
        let user_id: any =  localStorage.getItem('userId'); 
        let default_pd = $('#default_pd').is(':checked');
        let toggle_pd = $('#toggle_pd').is(':checked');
          var formData = new FormData();
          formData.append('operation', 'mrvoip');
          formData.append('moduleType', 'mrvoip');
          formData.append('api_type', 'web');
          formData.append('action', 'broadcast_dialler_upload');
          formData.append('access_token', access_token);
          formData.append('bd_main', $('#bro_pd_main')[0].files[0]);
          formData.append('camp_1', $('#bro_camp_1')[0].files[0]);
          formData.append('camp_2', $('#bro_camp_2')[0].files[0]);
          formData.append('bd_version', $('#bro_pd_version').val());
          formData.append('user_id', user_id);
          // formData.append('makedefault', default_pd);
          // formData.append('d_toggle', toggle_pd);
        $.ajax({  
          url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
          type : 'POST',
          data : formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false, 
          success:function(data){ 
            this.parsed_data = JSON.parse(data);
            if(this.parsed_data.status == "true"){
              $('#reload').click();
              iziToast.success({
                message: "Broadcast dialer Data Uploaded Successfully",
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

      uploadBroacctives(){
        let access_token: any=localStorage.getItem('access_token');
        let user_id: any =  localStorage.getItem('userId'); 
        let default_pd = $('#default_pd').is(':checked');
        let toggle_pd = $('#toggle_pd').is(':checked');
          var formData = new FormData();
          formData.append('operation', 'mrvoip');
          formData.append('moduleType', 'mrvoip');
          formData.append('api_type', 'web');
          formData.append('action', 'broadcast_survey_dialler_upload');
          formData.append('access_token', access_token);
          formData.append('bs_main', $('#bros_pd_main')[0].files[0]);
          formData.append('camp_1', $('#bros_camp_1')[0].files[0]);
          formData.append('camp_2', $('#bros_camp_2')[0].files[0]);
          formData.append('bs_version ', $('#bros_pd_version').val());
          formData.append('user_id', user_id);
          // formData.append('makedefault', default_pd);
          // formData.append('d_toggle', toggle_pd);
        $.ajax({  
          url:"https://"+window.location.hostname+":4003/api/v1.0/index_new.php",  
          type : 'POST',
          data : formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false, 
          success:function(data){ 
            this.parsed_data = JSON.parse(data);
            if(this.parsed_data.status == "true"){
              $('#reload').click();
              iziToast.success({
                message: " Data Uploaded Successfully",
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
