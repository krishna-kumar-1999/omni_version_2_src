import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerService } from '../services/server.service';
declare var iziToast;
@Component({
  selector: 'app-mrvoip-api',
  templateUrl: './mrvoip-api.component.html',
  styleUrls: ['./mrvoip-api.component.css']
})
export class MrvoipApiComponent implements OnInit {
  
  call_make;
  call_pickup;
  vm_divert;
  call_divert;
  call_listen;
  call_whisper;
  call_bargein;
  options;
  api_title;
  option_checked :any = [] ;
  k;
  update = false;
  reportsvalue = [];
  mr_voip_api : FormGroup;
  constructor(private serverService : ServerService) { }

  ngOnInit(): void {
    this.mr_voip_api = new FormGroup({
      'call_make' : new FormControl(null),
    })
    // var options = '[{"name":"Make Call","value":"call_make"},{"name":"Pickup Call","value":"call_pickup"},{"name":"Divert Call","value":"call_divert"},{"name":"Divert Voicemail","value":"vm_divert"},{"name":"Listen","value":"call_listen"},{"name":"Whisper","value":"call_whisper"},{"name":"Bargein","value":"call_bargein"},{"name":"Start Call Record","value":"record_start"},{"name":"Stop Call Record","value":"record_stop"},{"name":"Join Call","value":"call_join"}]';
    var options = '[{"name":"Make Call","value":"call_make"},{"name":"Pickup Call","value":"call_pickup"},{"name":"Divert Call","value":"call_divert"},{"name":"Divert Voicemail","value":"vm_divert"},{"name":"Listen","value":"call_listen"},{"name":"Whisper","value":"call_whisper"},{"name":"Bargein","value":"call_bargein"},{"name":"Start Call Record","value":"record_start"},{"name":"Stop Call Record","value":"record_stop"},{"name":"Join Call","value":"call_join"},{"name":"Transfer call","value":"call_transfer"},{"name":"Drop Call","value":"call_drop"},{"name":"Add Agent","value":"add_agent"},{"name":"Update Agent","value":"update_agent"},{"name":"Delete Agent","value":"delete_agent"},{"name":"Query Extension","value":"query_extension"},{"name":"Hotel Module","value":"hm_update_extension"}]';
    this.options = JSON.parse(options)
    console.log()
    this.get_api_values();
  }
  GetStats(email:string, isChecked: boolean) {
    console.log(email);
    console.log(isChecked);
    //var order = new Array();
    this.update = false;
      if(isChecked) {
      this.reportsvalue.push(email);
        
    } else {
      // let index = this.reportsvalue.findIndex(x => x.value == email);
      // // let index = this.reportsvalue.indexof(x => x.value == email);
      // console.log(index);
      // this.reportsvalue.splice(index,1);

      const index = this.reportsvalue.findIndex(el => el === email)
      if (index > -1) {
        this.reportsvalue.splice(index, 1);
      }

    }

    console.log(this.reportsvalue);
}
submit_data(){
  let api_req:any = '{"operation":"power_bi","moduleType":"power_bi","api_type":"web","access_token":"'+localStorage.getItem('access_token')+'","element_data":{"action":"add_mrvoip_api_data","pur_api":"'+this.reportsvalue+'","admin_id":"'+localStorage.getItem('admin_id')+'","pbx_url":"'+localStorage.getItem('pbx_url')+'"}}';
  console.log(api_req)
  this.serverService.sendServer(api_req).subscribe((responce:any)=>{
    if(responce.result.status==true){
    if(responce.result.data == 1){
      iziToast.success({
        message: "MrVoIp API Uploaded Successfully",
        position: 'topRight'
    });
    
    this.get_api_values();
    }else{
      iziToast.error({
        message: "Sorry, Some Error Occured",
        position: 'topRight'
    });
    }
    }
      },
      (error)=>{
        console.log(error)
      });
}

get_api_values(){
  let api_req:any = '{"operation":"power_bi", "moduleType":"power_bi", "api_type": "web", "access_token":"'+localStorage.getItem('access_token')+'","element_data":{"action":"get_mrvoip_api_data","admin_id":"'+localStorage.getItem('admin_id')+'"}}';
  this.serverService.sendServer(api_req).subscribe((responce:any)=>{
    if(responce.result.status==true){
      console.log()
      if(responce.result.data!=''){
        this.reportsvalue = responce.result.data.split(',');
          this.update = true;
        console.log(this.reportsvalue)
        this.checked(this.option_checked);
        //console.log(mr_data)
       //console.log(this.option_checked)
      //  for(var i = 0; i<mr_data.length; i++){
      //     for(var j=0;j<this.options.length;j++){
      //       if(mr_data[i] == this.options[j].name){
      //         this.option_checked = this.options[j].name;
      //       }
      //     }
      //   //   mr_data[i].forEach(function (value) {
      //   //     if(value == this.options.name){
      //   //       console.log(this.options.name);
      //   //     }
      //   //     console.log(value);
           
      //   // });
      //     //this.api_title = mr_data[i];
      //     //this.api_title = mr_data[i].filter(mr_data => mr_data == this.options.name);
      //     //console.log(this.api_title)
      //   }
      }
    
    }
      },
      (error)=>{
        console.log(error)
      });
}

checked(item:any){
  //console.log(item)
  if(this.reportsvalue.indexOf(item) != -1){
    return true;
  }
}
}





