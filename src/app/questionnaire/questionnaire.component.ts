import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  queue_list;
  recordNotFound = false;
  addDept: FormGroup;
  editDept: FormGroup;
  old_sip_url;
  uadmin_id;
  pbx_count;
  dep_status; 
  ques_id;
  question_list;
  userchecked;

  constructor(private serverService: ServerService) { }


  ngOnInit() {
    this.uadmin_id = localStorage.getItem('userId');
    this.addDept = new FormGroup({
     'question_name' : new FormControl(null,Validators.required),
     'status' : new FormControl(null)
    });
 
     this.editDept = new FormGroup({
      'question_name' : new FormControl(null,Validators.required),
      'status' : new FormControl(null)
    });
    this.question_lists();
    this.user_lists();
   }

question_lists(){
  let access_token: any=localStorage.getItem('access_token');
  let api_req:any = '{"operation":"questionaire", "moduleType":"questionaire", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"question_list","admin_id":"'+this.uadmin_id+'"}}';
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.status==true){
      this.question_list = response.result.data;
      console.log(this.queue_list);
    } else {
      this.recordNotFound = true;
    }
  }, 
  (error)=>{
      console.log(error);
  });
}


user_lists(){
  let access_token: any=localStorage.getItem('access_token');
  let api_req:any = '{"operation":"getQueue", "moduleType":"questionaire", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_queue","admin_id":"'+this.uadmin_id+'"}}';
  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.status==true){
      this.queue_list = response.result.data;
      console.log(this.queue_list);
    } else {
      this.recordNotFound = true;
    }
  }, 
  (error)=>{
      console.log(error);
  });
}



editQuestionSettings(id){
  let access_token: any=localStorage.getItem('access_token');
  let api_req:any = '{"operation":"questionaire", "moduleType": "questionaire", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"edit_question","question_id":"'+id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.status=="true"){
      var agent_data = response;
      this.editDept.setValue({
         'question_name' : agent_data.question,
         'status' : agent_data.status,
     });
     this.ques_id = response.question_id;
     this.userchecked = agent_data.department_id.split(",");
     console.log(this.userchecked)
     if(agent_data.status == 1){
      $('#status').prop('checked', true);
     } else {
      $('#status').prop('checked', false);
     }

     $('#edit_deptform').modal('show');
     this.question_lists();
    }   else{
            
      iziToast.warning({
          message: "Questioncount not retrive. Please try again",
          position: 'topRight'
      });
  
}
  }, 
  (error)=>{
      console.log(error);
  });
}

addQuestion(){
  $('#add_deptform').modal('show');
}


editQuestion(id){
  var question_queuess = $('.ads_Checkbox:checked').map(function(){
    return this.value;
}).get();
var question_queues = question_queuess.join();
console.log(question_queues);
  let agent_req:any = this.editDept.value;
  let access_token: any=localStorage.getItem('access_token');
  if(agent_req.status == true){  this.dep_status = 1 } else { this.dep_status  = 0 }
  let api_req:any = '{"operation":"questionaire", "moduleType": "questionaire", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"update_question","question":"'+agent_req.question_name+'","department_id":"'+question_queues+'","status":"'+this.dep_status +'","question_id":"'+id+'","admin_id":"'+this.uadmin_id+'"}}';

      this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.result.data == 1) {
              $('#edit_deptform').modal('hide');
              this.question_lists();
              iziToast.success({
                  message: "Question updated successfully",
                  position: 'topRight'
              });
          } else {
          
              iziToast.warning({
                  message: "Question not updated. Please try again",
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



addQuestData(){
var question_queues = $('.add_Checkbox:checked').map(function(){
    return this.value;
}).get();

var question_queues = question_queues.join();

let agent_req:any = this.addDept.value;
if(agent_req.status == true){  this.dep_status = 1 } else { this.dep_status  = 0 }
    let access_token: any=localStorage.getItem('access_token');
  
    let api_req:any = '{"operation":"insertQuestion", "moduleType": "questionaire", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"insert_question","question":"'+agent_req.question_name+'","department_id":"'+question_queues+'","status":"'+this.dep_status +'","admin_id":"'+this.uadmin_id+'"}}';
  
        this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.result.data == 1) {
                $('#add_deptform').modal('hide');
                iziToast.success({
                    message: "Question added successfully",
                    position: 'topRight'
                });
                this.question_lists();
            }
          
        else{
            
                iziToast.error({
                    message: "Question not added. Please try again",
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
  let api_req:any = '{"operation":"questionaire", "moduleType": "questionaire", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"delete_question","id":"'+id+'","admin_id":"'+admin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.data==1){
      Swal.fire(
        'Deleted!',
        'success'
      );
      this.question_lists();
    }

  }, 
  (error)=>{
      console.log(error);
  });
      }
    })
  }



}
