import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2'

declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-compose-sms',
  templateUrl: './compose-sms.component.html',
  styleUrls: ['./compose-sms.component.css']
})
export class ComposeSmsComponent implements OnInit {
  compSMS: FormGroup;
  compGroupSMS: FormGroup;
  senders_list;
  admin_id;
  uadmin_id;
  show_sender = false;
  singleSMS = true;
  bulkSMS = false;
  groups_list;
  price_sms
  constructor(private serverService: ServerService, private router:Router) { 
    this.compSMS = new FormGroup({
      'mobile_num' :new FormControl(null,Validators.required),
      'country_code':new FormControl(null,Validators.required),
      'message' :new FormControl(null,Validators.required)
    });
    this.compGroupSMS = new FormGroup({
      'group' :new FormControl(null),
      'message' :new FormControl(null,Validators.required)
    });
  }

  ngOnInit() {
    this.admin_id = localStorage.getItem('admin_id');
    this.uadmin_id = localStorage.getItem('userId');
    this.price_sms = localStorage.getItem('price_sms');
    if(this.price_sms=='undefined')
          this.price_sms='--:--';
    
    if(this.admin_id == 47){
      this.show_sender = false;
    } else {
      this.show_sender = true;
    }
    this.senders();
    this.smsGroups();
  }




  senders(){
    let access_token: any=localStorage.getItem('access_token');
    let user_id: any=localStorage.getItem('userId');
    let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_senderid","admin_id":"'+this.admin_id +'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      this.senders_list = response.result.data.sender_id;
      this.price_sms = response.result.data.sms_price;
      if(this.price_sms=='undefined'){
              this.price_sms='--:--';
        }

    }, 
    (error)=>{
        console.log(error);
    });
  }



  sendSMS(){
    console.log(this.compSMS.value);

    if(this.compSMS.value.country_code == null){
      iziToast.error({
        message: "Please enter the Country code",
        position: 'topRight'
      });
      return false;
    }

    if(this.compSMS.value.mobile_num == null){
      iziToast.error({
        message: "Please enter the number",
        position: 'topRight'
      });
      return false;
    }

    

    if(this.compSMS.value.message == null){
      iziToast.error({
        message: "Please enter the message",
        position: 'topRight'
      });
      return false;
    }

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

    let api_req:any = new Object();
    let chat_req:any = new Object();
    chat_req.action="compose_sms";
    chat_req.phone_num=this.compSMS.value.mobile_num;
    chat_req.country_code=this.compSMS.value.country_code;
    chat_req.user_id=localStorage.getItem('userId');
    chat_req.timezone_id=localStorage.getItem('timezone_id');
    chat_req.sender_id=$('#sender').val();
    chat_req.chat_message=this.compSMS.value.message;
    api_req.operation="chat";
    api_req.moduleType="chat";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = chat_req;
    
          this.serverService.sendServer(api_req).subscribe((response:any) => {
        Swal.close();


            if(response.result.data==1){
              iziToast.success({
                message: "SMS sent successfully",
                position: 'topRight'
              });
              this.router.navigate(['../mc']);
        // Swal.close();

            } else  if(response.result.data==2){
              iziToast.warning({
                message: "Contry Code Not Matched",
                position: 'topRight'
            });
            } else  if(response.result.data==3){
              iziToast.warning({
                message: "Insufficient balance",
                position: 'topRight'
            });
            } else {
              iziToast.warning({
                message: "Some error occured. Please try again",
                position: 'topRight'
            });
            }
                    
            }, 
            (error)=>{
                console.log(error);
            });
  }




  wordCount(){
    $("#wordCount").text($('#message').val().length );
}

smsTab(tab){
if(tab == 'bulk'){
  this.singleSMS = false;
  this.bulkSMS = true;
} else {
  this.singleSMS = true;
  this.bulkSMS = false;
}
}
smsGroups(){
  let access_token: any=localStorage.getItem('access_token');

  let api_req:any = '{"operation":"contact", "moduleType":"contact", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"list_smsgroup","admin_id":"'+this.uadmin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.status==true){
     
      this.groups_list = response.result.data;
      console.log(this.groups_list);
    } 
  }, 
  (error)=>{
      console.log(error);
  });
}







sendGroupSMS(){
  console.log(this.compGroupSMS.value);


if(this.compGroupSMS.value.group == null){
  iziToast.error({
    message: "Please Select The Group",
    position: 'topRight'
  });
  return false;
}


if(this.compGroupSMS.value.message == null){
  iziToast.error({
    message: "Please enter the message",
    position: 'topRight'
  });
  return false;
}
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

  let api_req:any = new Object();
  let chat_req:any = new Object();
  chat_req.action="compose_bulk_sms";
  chat_req.group=this.compGroupSMS.value.group;
  chat_req.user_id=localStorage.getItem('userId');
  chat_req.admin_id=localStorage.getItem('admin_id');
  chat_req.timezone_id=localStorage.getItem('timezone_id');
  chat_req.sender_id=$('#sender').val();
  chat_req.chat_message=this.compGroupSMS.value.message;
  api_req.operation="chat";
  api_req.moduleType="chat";
  api_req.api_type="web";
  api_req.access_token=localStorage.getItem('access_token');
  api_req.element_data = chat_req;
  

  
        this.serverService.sendServer(api_req).subscribe((response:any) => {
Swal.close();
          if(response.result.status==1){
            iziToast.success({
              message: "SMS sent successfully",
              position: 'topRight'
            });
            this.router.navigate(['/sms']); 
          } else {
            iziToast.warning({
              message: "Some error occured. Please try again",
              position: 'topRight'
          });
          }
                  
          }, 
          (error)=>{
              console.log(error);
          });
}


}
