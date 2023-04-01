import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-call-queue-management',
  templateUrl: './call-queue-management.component.html',
  styleUrls: ['./call-queue-management.component.css']
})
export class CallQueueManagementComponent implements OnInit { 
  param;
  dep_id;
  userchecked;
  agents_list;
  admin_id;
  wrapup_time;
  max_callers;
  priority;
  sla_sec;
  queue_name;
  queue_number;
  queue_status;
  loginUser
  user_type
  websocket
  hardware_id
  constructor(private serverService: ServerService,private router:Router,private route: ActivatedRoute ) {

    this.param = this.route.snapshot.queryParamMap.get('queue');
   }

  ngOnInit() {
    var id = this.param;
    this.editQueueSettings(id);
    this.admin_id = localStorage.getItem('admin_id');
    this.hardware_id =localStorage.getItem('hardware_id');

   this.initsocket();  
  }


  initsocket(){
    this.loginUser = localStorage.getItem('admin_id');
    this.admin_id = localStorage.getItem('admin_id');
  
    this.user_type = localStorage.getItem('user_type');
    
      this.websocket = new WebSocket("wss://"+window.location.hostname+":4010"); 
   
    this.websocket.onopen = function(event) { 
      // $('#sendonload').click();
      // console.log('agent socket connected');
    }
  
    this.websocket.onmessage = function(event) {
      var result_message = JSON.parse(event.data);
      // console.log(result_message);

      this.hardware_id = localStorage.getItem('hardware_id');
      if(result_message[0].cust_id == this.hardware_id){
        // console.log('matched');
      } else {
        console.log('not matched');
        return false;
      }
  
      if(result_message[0].data[0].status=="true"){
        $('#datagetsucced').click();
      } else if(result_message[0].data[0].status=="false"){
        $('#datagetsfailed').click();
      }
       else if(result_message[0].data[0].Name=="AddedQueue"){
        // $('#addinQueuser').val(result_message[0].data[0].inUser); 
        // $('#addnotinQueuser').val(result_message[0].data[0].notInuser); 
        // $('#addinQueuser').click();
      } 
      else if(result_message[0].data[0].Name=="UpdatedQueue" && result_message[0].data[0].from_omni!="from_omni"){
        // console.log(result_message[0].data[0].Name);
        // console.log(result_message);
      //  alert('test'+result_message[0].data[0].from_omni);
        $('#editinQueuser').val(result_message[0].data[0].inUser); 
        $('#editnotinQueuser').val(result_message[0].data[0].notInuser); 
        $('#editinQueuser').click();
      } 
    }
    this.websocket.onerror = function(event){
      console.log('error');
    }
    this.websocket.onclose = function(event){
      console.log('close');
    } 
  }
 
  user_lists(){
var uadmin_id = localStorage.getItem('admin_id'); 
    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"user_list","user_id":"'+uadmin_id+'","search_text":"","order_by_name":"user.user_id","order_by_type":"desc","limit":100,"offset":0}}';

                  this.serverService.sendServer(api_req).subscribe((response:any) => {
                      if(response.result.status==true){
                        this.agents_list=response.result.data.list_data;
                        console.log(this.agents_list);
      //  alert(this.userchecked.indexOf(this.agents_list.sip_login));

                      }
                  }, 
                  (error)=>{
                      console.log(error);
                  });
}



  editQueueSettings(id){
    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"queue", "moduleType": "queue", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"edit_queue","id":"'+id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.status==true){
        this.user_lists();

        var agent_data = response.result.data;
       
       this.dep_id = id;

       this.queue_name =  agent_data.queue_name;
       this.queue_number =  agent_data.queue_number;
       this.queue_status =  agent_data.queue_status;
       this.userchecked = agent_data.queue_users.split(",");
      //  alert('user'+this.userchecked)
       this.wrapup_time = agent_data.wrapup_time;
       this.max_callers = agent_data.max_callers;
       this.priority = agent_data.priority;
       this.sla_sec = agent_data.sla_sec;
       if(agent_data.priority == 1){
        $('#priority').prop('checked', true);
       } else {
        $('#priority').prop('checked', false);
       }

      }   else{
              
        iziToast.warning({
            message: "Queue count not retrive. Please try again",
            position: 'topRight'
        });
    
  }
    }, 
    (error)=>{
        console.log(error);
    });
  }
  




  editAgentsInQueues(id){ 
    
    var wrapup_time = $('#wrapup_time').val();
    var max_callers = $('#max_callers').val();
    var priority = $("#priority").prop("checked") ? '1' : '0';
    var sla_sec = $('#sla_sec').val();

  //   var department_users = $('.ads_Checkbox:checked').map(function(){
  //     return this.value;
  // }).get();
  Swal.fire({
    html:
      '<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
  showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    background: 'transparent',


  });
   var department_users = $('#editinQueuser').val();
    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"queue", "moduleType": "queue", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"update_queue","queue_users":"'+department_users+'","queue_name":"'+this.queue_name+'","queue_number":"'+this.queue_number+'","queue_status":"'+this.queue_status+'","wrapup_time":"'+wrapup_time+'","max_callers":"'+max_callers+'","priority":"'+priority+'","sla_sec":"'+sla_sec+'","id":"'+id+'"}}';
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          Swal.close();
        if (response.result.status == 1) {
                // iziToast.success({
                //     message: "Queue updated successfully",
                //     position: 'topRight'
                // });
                var id = this.param;
                this.editQueueSettings(id);
                $('#addAgent').modal('hide');
            } else {
            
                iziToast.warning({
                    message: "Queue not updated. Please try again",
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






  editQueues(id){
    var wrapup_time = $('#wrapup_time').val();
    var max_callers = $('#max_callers').val();
    var priority = $("#priority").prop("checked") ? '1' : '0';
    var sla_sec = $('#sla_sec').val();
    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"queue", "moduleType": "queue", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"update_queue","queue_users":"'+this.userchecked+'","queue_name":"'+this.queue_name+'","queue_number":"'+this.queue_number+'","queue_status":"'+this.queue_status+'","wrapup_time":"'+wrapup_time+'","max_callers":"'+max_callers+'","priority":"'+priority+'","sla_sec":"'+sla_sec+'","id":"'+id+'"}}';
        this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.result.status == 1) {
                iziToast.success({
                    message: "Queue updated successfully",
                    position: 'topRight'
                });
                var id = this.param;
                this.editQueueSettings(id);
                this.getMainQueuesEdit(this.userchecked);
            } else {
            
                iziToast.warning({
                    message: "Queue not updated. Please try again",
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



  datagetsucced(){
    // iziToast.success({
    //   message: "Data Retrived Successfully",
    //   position: 'topRight'
    // });
  }
  
  
  datagetsfailed(){
    // iziToast.success({
    //   message: "Sorry Some Error Occur",
    //   position: 'topRight'
    // });
  }
  

  updateQueueUsers(users){
    var department_users = $('.ads_Checkbox:checked').map(function(){
      return this.value;
  }).get();
    department_users = department_users.join();

    var has_hard_id = localStorage.getItem('hardware_id');
    var mainAgents = '[{"cust_id":"'+has_hard_id+'","data":[{"Name":"UpdateQueueData","queueno":"'+this.queue_number+'","queuename":"'+this.queue_name+'","agents":"'+department_users+'","from_omni":"from_omni"}]}]';
    this.websocket.send(mainAgents);
  }





  getMainQueuesEdit(users){

    var wrapup_time = $('#wrapup_time').val();
    var max_callers = $('#max_callers').val();
    var priority = $("#priority").prop("checked") ? '1' : '0';
    var sla_sec = $('#sla_sec').val();

    var has_hard_id = localStorage.getItem('hardware_id');
    var mainAgents = '[{"cust_id":"'+has_hard_id+'","data":[{"Name":"UpdateQueueAllData","queueno":"'+this.queue_number+'","queuename":"'+this.queue_name+'","agents":"'+users+'","wrapup_time":"'+wrapup_time+'","max_callers":"'+max_callers+'","priority":"'+priority+'","sla_sec":"'+sla_sec+'"}]}]';
    this.websocket.send(mainAgents);
  }
  
  retriveFrom3cx(){
    if(this.hardware_id !=''){
      var socket_message  =  '[{"cust_id":"'+this.hardware_id+'","data":[{"Name":"getqueuedet"}]}]';
      this.websocket.send(socket_message);
    }
}







deleteDoc(queue_users){
    
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
       let uadmin_id = localStorage.getItem('admin_id');
    
      let api_req:any = '{"operation":"queue", "moduleType":"queue", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"update_queue_usr","admin_id":"'+this.admin_id+'","queue_users":"'+queue_users+'","queue_number":"'+this.param+'"}}';
    
      this.serverService.sendServer(api_req).subscribe((response:any) => {

        console.log(response);
        if(response.status== true){
          iziToast.success({
            message: "Data deleted successfully",
            position: 'topRight'
        });

        this.editQueueSettings(this.param);
        this.deleAgentsFromQueue(queue_users);
        } else {
          iziToast.warning({
            message: "Data not deleted, Please try again!",
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

deleAgentsFromQueue(agent){
  if(this.hardware_id !=''){
    var socket_message  =  '[{"cust_id":"'+this.hardware_id+'","data":[{"Name":"DeleteQueueUser","deletUser":"'+agent+'","queueNo":"'+this.queue_number+'"}]}]';
    this.websocket.send(socket_message);
  }
}


}
