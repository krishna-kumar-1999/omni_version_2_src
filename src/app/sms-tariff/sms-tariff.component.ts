import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-sms-tariff',
  templateUrl: './sms-tariff.component.html',
  styleUrls: ['./sms-tariff.component.css']
})
export class SmsTariffComponent implements OnInit {
  res;
  getRep: FormGroup;
  usersL;
  selected_price : any;
  userData = {"licensce_key": ""};
  public isKeyAvail = false;
  public isItemAvailable = false;
  s_licence_key : any;
  items: any;
  accessToken:any;
  user_id:any;
  admin_id;callers;
  recordNotFound = false;
  offset_count = 0;call_history_list;tot_data;total_name;percent;
  country ;
 id;
 sms_tarrif;
 smsTariffs;
 planID;
  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit(): void {

    this.getTariffsList()
  }
  searchData(){

    let api_req:any = new Object();
    let history_req:any = new Object();
    history_req.action="getsms_tarrif";
    history_req.admin_id=localStorage.getItem('admin_id');
    api_req.operation="wpchat";
    api_req.moduleType="wpchat";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = history_req;
          this.serverService.sendServer(api_req).subscribe((response:any) => {
            if(response.status==true){
              this.call_history_list = response.result.data.def_plan;
            } 

             
          }, 
          (error)=>{
              console.log(error);
          });

  }

  openUpdateTariff(id,country,tarrif){

  this.country = country;
  this.sms_tarrif = tarrif;
  this.id = id;
  $('#add_deptform').modal('show')
  }
  
  
  insertTariff(Tid){

      let api_req:any = new Object();
      let history_req:any = new Object();
      history_req.action="insert_sms_tarrif";
      history_req.id=Tid;
      history_req.price=$('#sms_cost').val();
      history_req.plan_id=this.planID;
      history_req.admin_id=localStorage.getItem('admin_id');
      api_req.operation="wpchat";
      api_req.moduleType="wpchat";
      api_req.api_type="web";
      api_req.access_token=localStorage.getItem('access_token');
      api_req.element_data = history_req;
            this.serverService.sendServer(api_req).subscribe((response:any) => {
              if(response.status==true){
                $('#add_deptform').modal('hide');
                this.getSingleTariffs(this.planID);
              } 
  
               
            }, 
            (error)=>{
                console.log(error);
            });
  
    }


  getTariffsList(){
   let access_token: any=localStorage.getItem('access_token');
   let api_req:any = '{"operation":"wpchat", "moduleType":"wpchat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"view_tarrif"}}';
   this.serverService.sendServer(api_req).subscribe((response:any) => {
     if(response.status == true){
     this.smsTariffs = response.result.data.plans;
     this.call_history_list = response.result.data.def_plan;
     this.planID = response.result.data.plans[0].id;
     } else {
     }
   }, 
   (error)=>{
     console.log(error);
   });
   }


   getSingleTariffs(id){
    this.planID = id;
    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"wpchat", "moduleType":"wpchat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_sel_tarrif","id":"'+this.planID+'"}}';
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.status == true){
      this.call_history_list = response.result.data;
      } else {
      }
    }, 
    (error)=>{
      console.log(error);
    });
   }





   addChatWidget(){
    let access_token: any=localStorage.getItem('access_token');
    let user_id: any=localStorage.getItem('userId');
    let widget_name: any =$('#widget_name').val() ;
    let api_req:any = '{"operation":"wpchat", "moduleType":"wpchat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"add_new_tarrif","tarrif_name":"'+widget_name+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.status==true){
        iziToast.success({
          message: "Data Added Successfully",
          position: 'topRight'
        });
        this.planID = response.result.data;
        this.getTariffsList2(this.planID);
        
        
        $('#widget_name').val('');
        $('#createNewWidget').modal('hide');

       } else {
         iziToast.error({
           message: "Some Error Occured.",
           position: 'topRight'
       });
       }
    }, 
    (error)=>{
        console.log(error);
    });
  }

  getTariffsList2(Pid){
    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"wpchat", "moduleType":"wpchat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"view_tarrif"}}';
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.status == true){
        this.smsTariffs = response.result.data.plans;
        $("#MPlanName option:selected").val(Pid);
        this.getSingleTariffs(Pid);
      } else {
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
    let api_req:any = '{"operation":"wpchat", "moduleType": "wpchat", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"del_tarrif","tarrif_name":"'+id+'"}}';
  
    this.serverService.sendServer(api_req).subscribe((response:any) => {
      if(response.result.data==1){
        Swal.fire(
          'Deleted!',
          'success'
        );
        this.getTariffsList();
      }
  
    }, 
    (error)=>{
        console.log(error);
    });
        }
      })
    }


}
