import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerService } from '../services/server.service';
declare var $;
declare var iziToast;
@Component({
  selector: 'app-power-bi',
  templateUrl: './power-bi.component.html',
  styleUrls: ['./power-bi.component.css']
})
export class PowerBiComponent implements OnInit {
  fqdn_urls;
  disply_fqdn = false;
  error_msg = false;
  access_token;
  admin_id;
  power_pi_form : FormGroup;
  http: any;
  parsed_data: any;
  caldet_push_api;
  constructor(private serverService : ServerService) { }

  ngOnInit(): void {
    this.power_pi_form = new FormGroup({
      'push_url' : new FormControl(null),
      'fqdn_url' : new FormControl(null),
    })
    this.fqdn_urls = localStorage.getItem('pbx_url');
    //this.fqdn_urls = 'cal4caredemo.3cx.sg';
    this.access_token = localStorage.getItem('access_token');
    this.admin_id = localStorage.getItem('admin_id');
    this.get_power_data();
    this.get_fqdn_url();
  }
get_fqdn_url(){
 
  if(this.fqdn_urls != ''){
    this.disply_fqdn = true;
  }else{
    this.disply_fqdn = false;
  }
}
get_power_data(){
let api_req:any = '{"operation":"power_bi","moduleType":"power_bi","api_type":"web","element_data":{"action":"get_all_records","admin_id":"'+this.admin_id+'"}}';
this.serverService.sendServer(api_req).subscribe((responce:any)=>{
  console.log(api_req)
  if(responce.result.status==true){
    if(responce.result.data!=''){
    this.caldet_push_api = responce.result.data[0].caldet_push_api;
    }else{
      this.caldet_push_api = '';
    }
    console.log(this.caldet_push_api);
    console.log(responce.result.data)
  }
    },
    (error)=>{
      console.log(error)
    });
}
set_pow_pi(){
  var push_url = this.power_pi_form.value.push_url;
  if(push_url=='' || push_url == null || push_url =='null'){
    this.error_msg = true;
    return false;
  }else{
    this.error_msg = false;
  }
  if(this.fqdn_urls!=''){
    var pbx_url = this.fqdn_urls;
  }else{
    var pbx_url = this.power_pi_form.value.fqdn_url;
  }
//   var self = this;
//   let body = new FormData();
// body.append('action', 'pwrbiapiurl');
// body.append('calapiurl', 'https://api.powerbi.com/beta/3eda8495-cd20-4cf1-8d32-dc5ba0b065bd/datasets/e171b508-b50e-4dac-ae3d-cd451f60ce64/rows?key=qxfuwLqn12Ep8E5BBDhZcWi6%2Bn25M6blFhOkwtAeHVYfkrAIwaHz%2FbiCsnItzL2KO5B9EXyf3s1UbbkZTcR3xg%3D%3D');
// var datas = JSON.stringify(body);
// console.log(datas)
// $.ajax({  
  
//   url:"http://cal4caredemo.3cx.sg:4020/api/values",  
//   type : 'POST',
//   data : datas,
//   processData: false,  // tell jQuery not to process the data
//   contentType: false, 
//   success:function(data){ 
//     self.parsed_data = JSON.parse(data);
//     console.log(self.parsed_data)
//   }  
// }); 
//   return false;
  let api_req:any = '{"operation":"power_bi", "moduleType":"power_bi", "api_type": "web", "access_token":"'+this.access_token+'","element_data":{"action":"add_power_ip_settings","admin_id":"'+this.admin_id+'","pbx_url":"'+pbx_url+'","caldet_push_api":"'+push_url+'"}}';
  this.serverService.sendServer(api_req).subscribe((responce:any)=>{
if(responce.result.status==true){
  var get_json = JSON.parse(responce.result.data);
if(get_json.status == 200){
  iziToast.success({
    message: "Power Bi Uploaded Successfully",
    position: 'topRight'
});
this.get_power_data();
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
}
