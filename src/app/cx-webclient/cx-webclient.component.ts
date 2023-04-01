import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $: any;

@Component({
  selector: 'app-cx-webclient',
  templateUrl: './cx-webclient.component.html',
  styleUrls: ['./cx-webclient.component.css']
})
export class CxWebclientComponent implements OnInit {
oncall=false;
frameURL;
urlparams;
  constructor(private serverService: ServerService, private router: Router, private route: ActivatedRoute) {

    // this.route.params.subscribe(params => {
    //   this.urlparams = params['urldata'];
    // });

    this.urlparams = this.route.snapshot.queryParamMap.get('queue');
    console.log(this.urlparams);

    if(this.urlparams == 'notify_chat'){
      setTimeout(() => {
      this.frameURL="https://"+localStorage.getItem('pbx_url')+":5001/webclient/#/chat/";
      $('#frameid')[0].setAttribute("src", this.frameURL);
      console.log(this.frameURL);
    }, 2000);
    }

    this.serverService.editContact.subscribe((val: any) => {

      var dpContent = JSON.parse(val);
      // console.log(dpContent);
      if (dpContent.type == "close_webclient") {
      this.deactivateIfram();
      }

    });
    this.serverService.EmailNotify.subscribe( (val:any) => 
    {
    
     var dpContent = JSON.parse(val);
     console.log(dpContent);   
     
     if(dpContent.pagefor == "3cxchat"){ 
       
       setTimeout(() => {
       this.frameURL="https://"+localStorage.getItem('pbx_url')+":5001/webclient/#/chat/"+atob(atob(dpContent.id));
         $('#frameid')[0].setAttribute("src", this.frameURL);
       }, 4000);
      // alert('called')
     }
    });
   }

  ngOnInit(): void {  
    this.frameURL="https://"+localStorage.getItem('pbx_url')+":5001/webclient/#";
    // alert(this.frameURL)
    $('#frameid')[0].setAttribute("src", this.frameURL);
    // alert(this.frameURL);
// this.frameURL=localStorage.getItem('pbx_url');
$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
  }
  deactivateIfram(){
   this.oncall=true;
    // $('#iframe').html("")
    // document.getElementById("iframe").remove();
    var frame = document.getElementById("frameid");
 frame.parentNode.removeChild(frame);
    

// $('#iframe',window.parent.document).attr('src',$('#dailyfIframes',window.parent.document).attr('src'));
  }
  Activateiframe(){
   var  g = document.createElement('div');
g.setAttribute("id", "iframe");
   this.oncall=false;

    // $('#iframe').html('<iframe id="frameid"  src="https://hpgasales.my3cx.sg/webclient/" style="width: 100%; height: 85vh; border: none;">');
    $('#iframe').html('<iframe id="frameid"  style="width: 100%; height: 79vh;border: none;border-radius: 5px;background: #353c48;">');
    $('#frameid')[0].setAttribute("src", this.frameURL);
  }
}
