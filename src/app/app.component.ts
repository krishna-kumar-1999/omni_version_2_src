import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'omni-channel';
    public file_path: string = "";
    templateAuthView = false;
    constructor(private router:Router) { }
    
ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
//     var s= this;
//     var OneSignal = window['OneSignal'] || [];
//      console.log("Init OneSignal");
//      OneSignal.push(["init", {
//         appId: "150fff9c-ee3c-40fd-bdd5-bd0eb2fe9cf9",
//        autoRegister: false,
//        allowLocalhostAsSecureOrigin: true,
//        notifyButton: {
//          enable: false
//        }
//      }]);
//      console.log('OneSignal Initialized');
//      OneSignal.push(function () {
//        console.log('Register For Push');
 
//        OneSignal.push(["registerForPushNotifications"])
//      });
//      OneSignal.push(function () {
//        // Occurs when the user's subscription changes to a new value.
//           OneSignal.on('subscriptionChange', function (isSubscribed) {
//           console.log("The user's subscription state is now:", isSubscribed);
//          OneSignal.getUserId().then(function (userId) {
//            console.log("User ID is", userId);
           
//            localStorage.setItem('token', userId);
//         //    $('#call_active').click();
//  // $('#call_active').click();
 
//          });
//        });
//      });
}

    onActivate(event) {
        this.file_path=this.router.url;
        console.log(this.router.url);
        if (localStorage.getItem('access_token')) {
            // if(localStorage.getItem('ext_num')==''){
            //     this.router.navigate(['/profile']);
            // }else{
                this.templateAuthView=false;
            // }
            
            } else if(this.router.url == '/forgot-pwd'){
                this.router.navigate(['/forgot-pwd']);
            }
        else{
            this.templateAuthView=true;
            this.router.navigate(['/login']);
        }
    }
}
