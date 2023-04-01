import { Injectable } from '@angular/core';
import {  EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Subject } from 'rxjs';
// import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router';
import {  NgZone } from '@angular/core';
import * as moment from 'moment-timezone';
declare var iziToast: any;
@Injectable({
    providedIn: 'root'
})
export class ServerService {
    public UserList3CX: any;
    // public socket_data: any;
    
    browsertimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    show: Subject<any> = new Subject();
    qLogin: Subject<any> = new Subject();
    profile: Subject<any> = new Subject();
    minimize: Subject<any> = new Subject();
    showChat: Subject<any> = new Subject();
    showvedioDialer: Subject<any> = new Subject();
    editContact:Subject<any> = new Subject();
     EmailNotify:Subject<any> = new Subject();
     internal_chat_reload:Subject<any> = new Subject();
    currentMessage = new BehaviorSubject(null);
    changeDetectionEmitter: EventEmitter<any> = new EventEmitter<any>();
    constructor(private http: HttpClient, public router: Router,private zone: NgZone) {
        // this.afMessaging.messaging.subscribe(
        //     (_messaging) => {
        //         _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        //         _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);

        //     }
        // )


    }
    admin_id;

    sendServer(postData: any[]) {
          let company=  localStorage.getItem('company_name');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

         company=  localStorage.getItem('company_name');
        this.admin_id = localStorage.getItem('admin_id');
        //   if(this.admin_id == "64")
        //         return this.http.post("https://updates.mconnectapps.com/"+localStorage.getItem('company_name')+"/v1.0/index.php", postData,httpOptions);
        //   else
        // return this.http.post("https://updates.mconnectapps.com/"+localStorage.getItem('company_name')+"/v1.0/index.php", postData, httpOptions);
// return this.http.post("https://c4cteams.my3cx.sg:4003/api/v1.0/index.php", postData, httpOptions);
// return this.http.post("https://"+window.location.hostname+":4003/api/v1.0/index.php", postData, httpOptions);
        return this.http.post("https://" + window.location.hostname + ":4003/api/v1.0/index.php", postData,httpOptions);


    }
    sendServer_login(postData: any[]) {
          let company=  localStorage.getItem('company_name');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

         company=  localStorage.getItem('company_name');
        this.admin_id = localStorage.getItem('admin_id');
        //   if(this.admin_id == "64")
        //         return this.http.post("https://updates.mconnectapps.com/"+localStorage.getItem('company_name')+"/v1.0/index.php", postData,httpOptions);
        //   else
        // return this.http.post("https://updates.mconnectapps.com/"+localStorage.getItem('company_name')+"/v1.0/index.php", postData, httpOptions);
return this.http.post("https://updates.mconnectapps.com/"+company+"/api/v1.0/index.php", postData, httpOptions);
        // return this.http.post("https://" + window.location.hostname + "/api/v1.0/index.php", postData,httpOptions);


    }

    sendServer2(postData: any[]) {
        let company=  localStorage.getItem('company_name');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
return this.http.post("https://updates.mconnectapps.com/"+company+"/api/v1.0/index.php", postData, httpOptions);
    }
    MDy_Contacts_API(postData: any[]) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post("https://omnitest.umbrellapro.xyz/microsoftDynamicsDialer/get_contacts.php", postData, httpOptions);
    }
    //    MDy_GetActivity(postData:any[]) {    
    //     const httpOptions = {
    //       headers: new HttpHeaders({
    //         'Content-Type':  'application/json'
    //       })
    //     };  
    //     return this.http.post("https://hp.mconnectapps.com/microsoftDynamicsDialer/get_contacts.php", postData,httpOptions);
    //    } 
    //    MDy_GetAcsessToken(postData:any[]) {    
    //     const httpOptions = {
    //       headers: new HttpHeaders({
    //         'Content-Type':  'application/json'
    //       })
    //     };  
    //     return this.http.post("https://hp.mconnectapps.com/microsoftDynamicsDialer/get_contacts.php", postData,httpOptions);
    
    //    } 
    // requestPermission() {
    //     this.afMessaging.requestPermission
    //         .pipe(mergeMapTo(this.afMessaging.tokenChanges))
    //         .subscribe(
    //             (token) => {
    //                 let access_token: any = localStorage.getItem('access_token');
    //                 let user_id: any = localStorage.getItem('userId');
    //                 localStorage.setItem('N_token', token);
    //                 let api_req: any = '{"operation":"agents", "moduleType":"agents", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"notification_code","user_id":"' + user_id + '","notification_code":"' + token + '"}}';
    //                 this.sendServer(api_req).subscribe((response: any) => {
    //                     this.receiveMessage()
    //                 });
    //                 console.log('Permission granted! Save to the server!', token);
    //             },
    //             (error) => { console.error(error); },
    //         );
    // }

    receiveMessage() {
        //    alert('1'); 

        // this.afMessaging.messages.subscribe(
        //     (payload: any) => {
        //         let audioPlayer = <HTMLVideoElement>document.getElementById('beepaud');
        //         audioPlayer.play();
        //         var notification_for = payload.data["gcm.notification.notification_for"];
        //         var unique_id = payload.data["gcm.notification.unique_id"];
        //         var wp_id = payload.data["gcm.notification.wp_id"];

        //         let Edata: any = '{"pagefor":"' + notification_for + '","id":"' + unique_id + '","wp_id":"' + wp_id + '"}';
        //         this.changeDetectionEmitter.emit(Edata);

        //         // alert(notification_for);
        //         unique_id = btoa(unique_id);
        //         // wp_id = btoa(wp_id); // Base64 encode the String
        //         // var decodedString = atob(encodedString);
        //         // alert('emailed');


        //         console.log(Edata);
        //         if (notification_for != "chat" && notification_for != "Call") {
        //             iziToast.show({
        //                 theme: 'dark',
        //                 title: 'Hi',
        //                 image: payload.notification.icon,
        //                 imageWidth: 100,
        //                 timeout: 10000,
        //                 closeOnEscape: false,
        //                 closeOnClick: true,

        //                 message: payload.notification.title,
        //                 position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        //                 progressBarColor: 'rgb(0, 255, 184)',
        //                 buttons: [
        //                     ['<button onclick="openUrl()";>Open ' + notification_for + '</button>', function (instance, toast) {
        //                         iziToast.destroy();
        //                         // if(notification_for =='Call') {
        //                         if (notification_for == 'email_ticketing') {
        //                             var url = 'https://' + window.location.hostname + '/#/ticketing-system-new';
        //                         }
        //                         else if (notification_for == 'whatsapp_unoff') {
        //                             var url = 'https://' + window.location.hostname + '/#/wp-unoff?c=' + unique_id + '&wp_id=' + wp_id;
        //                         }
        //                         else if (notification_for == 'whatsapp') {
        //                             var url = 'https://' + window.location.hostname + '/#/wp-chat?c=' + unique_id;
        //                         } else if (notification_for == 'chat') {
        //                             var url = 'https://' + window.location.hostname + '/#/chat?c=' + unique_id;
        //                         } else if (notification_for == 'int_chat') {
        //                             var url = 'https://' + window.location.hostname + '/#/internal-chat?c=' + unique_id;
        //                         } else if (notification_for == 'fb') {
        //                             var url = 'https://' + window.location.hostname + '/#/fb-chat?c=' + unique_id;
        //                         } else if (notification_for == 'SMS') {
        //                             var url = 'https://' + window.location.hostname + '/#/sms?c=' + unique_id;
        //                         } else if (notification_for == 'line') {
        //                             var url = 'https://' + window.location.hostname + '/#/line-chat?l=' + unique_id;
        //                         } else if (notification_for == 'telegram') {
        //                             var url = 'https://' + window.location.hostname + '/#/tele-chat?c=' + unique_id;
        //                         }

        //                         window.location.replace(url);
        //                     }, true], // true to focus
        //                     ['<button>Close</button>', function (instance, toast) {
        //                         instance.hide({
        //                             transitionOut: 'fadeOutUp',
        //                             onClosing: function (instance, toast, closedBy) {
        //                                 console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
        //                             }
        //                         }, toast, 'buttonName');
        //                     }]
        //                 ],
        //                 onOpening: function (instance, toast) {
        //                     console.info('callback abriu!');
        //                 },
        //                 onClosing: function (instance, toast, closedBy) {
        //                     console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
        //                 }
        //             });
        //         }

        //         this.currentMessage.next(payload);
        //     })
    }




    receivePopup(Edata) {
               
        console.log(Edata);
        let audioPlayer = <HTMLVideoElement>document.getElementById('beepaud');
        // audioPlayer.play();
           // var fb_id = Edata.unique_id;
            var unique_id = btoa(Edata.unique_id);
             //alert(unique_id)
            var  wp_id1 = Edata.wp_id; 
            var  wp_id = btoa(Edata.wp_id); // Base64 encode the String
                // var decodedString = atob(encodedString);
                // alert('emailed');
                let Edatas: any = '{"pagefor":"'+Edata.notification_for+'","id":"'+Edata.unique_id+'","wp_id":"'+Edata.wp_id+'"}';
                this.changeDetectionEmitter.emit(Edatas);
            var imgs;
            var heading;


                if (Edata.notification_for == 'email_ticketing') {
                     imgs = 'assets/img/mc-dashboard/tickets.png';
                     heading = 'Email Ticketing';
                }
                else if (Edata.notification_for == 'whatsapp_unoff') {
                      imgs = 'assets/img/mc-dashboard/whatsapp.webp';
                     heading = 'WhatsApp';
                    }
                else if (Edata.notification_for == 'whatsapp') {
                     imgs = 'assets/img/mc-dashboard/whatsapp.webp';
                     heading = 'WhatsApp';
                } else if (Edata.notification_for == 'chat') {
                     imgs = 'assets/img/mc-dashboard/chat.png';
                     heading = 'Chat';
                }
                else if (Edata.notification_for == 'webchat') {
                    imgs = 'assets/img/mc-dashboard/chat.png';
                    heading = 'webChat';
               } else if (Edata.notification_for == 'int_chat') {
                     imgs = 'assets/img/mc-dashboard/internal-chat.png';
                     heading = 'Internal Chat';
                } else if (Edata.notification_for == 'fb') {
                     imgs = 'assets/img/mc-dashboard/facebook.png';
                     heading = 'Facebook';
                } else if (Edata.notification_for == 'SMS') {
                     imgs = 'assets/img/mc-dashboard/sms.png';
                     heading = 'SMS';
                } else if (Edata.notification_for == 'line_chat') {
                    imgs = 'assets/img/mc-dashboard/line.png';
                    heading = 'Line';
                } 
                else if (Edata.notification_for == '3cxchat') {
                    imgs = 'assets/img/mc-dashboard/chat.png';
                    heading = '3CX Chat';
                   }
                  //  let Edatas: any = '{"pagefor":"'+Edata.notification_for+'","id":"'+Edata.unique_id+'","wp_id":"'+Edata.wp_id+'"}';
                    //this.changeDetectionEmitter.emit(Edatas);
                    
                    // let Mdata: any = '{"pagefor":"' + Edata.notification_for + '","id":"' + unique_id + '"}';
                    // this.changeDetectionEmitter.emit(Mdata);
    
var self=this;

                if (Edata.notification_for != "chat" && Edata.notification_for != "Call") {
                    iziToast.show({
                        theme: 'dark',
                        title: 'Hi',
                        image: imgs,
                        imageWidth: 45,
                        timeout: 10000,
                        closeOnEscape: false,
                        closeOnClick: true,

                        message: Edata.title,
                        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                        progressBarColor: 'rgb(0, 255, 184)',
                        buttons: [
                            ['<button onclick="openUrl()";>Open</button>', function (instance, toast) {
                                iziToast.destroy();
                                // if(Edata.notification_for =='Call') {
                                if (Edata.notification_for == 'email_ticketing') {
                                    var url = 'https://' + window.location.hostname+':'+window.location.port + '/#/ticket-view-thread?ticket_id='+unique_id;
                                    // var url = 'http://localhost:4200/#/ticket-view-thread?ticket_id='+unique_id;
                                    let Edatas: any = '{"pagefor":"email_ticketing","id":"'+unique_id+'"}';
                                    self.EmailNotify.next(Edatas);
                                }
                                else if (Edata.notification_for == 'whatsapp_unoff') {
                                 //   var url = 'https://' + window.location.hostname + '/#/wp-unoff?c=' + unique_id ;
                                    var url = 'https://'+ window.location.hostname+':'+window.location.port +'/#/wp-unoff?c='+unique_id+'&wp_id='+wp_id1;
                                    // var url = 'http://localhost:4200/#/wp-unoff?c='+unique_id+'&wp_id='+wp_id1;

                                }
                                else if (Edata.notification_for == 'whatsapp') {
                                    var url = 'https://' + window.location.hostname+':'+window.location.port + '/#/wp-chat?c=' + unique_id;
                                } else if (Edata.notification_for == 'chat') {
                                    var url = 'https://' + window.location.hostname+':'+window.location.port + '/#/chat?c=' + unique_id;
                                }else if (Edata.notification_for == 'webchat') {
                                    var url = 'https://' + window.location.hostname+':'+window.location.port + '/#/chat?c=' + unique_id;
                                } else if (Edata.notification_for == 'int_chat') {
                                    var url = 'http://' + window.location.hostname+':'+window.location.port + '/#/internal-chat?c=' + unique_id;
                                } else if (Edata.notification_for == 'fb') {
                                    var url = 'https://' + window.location.hostname+':'+window.location.port + '/#/fb-chat?c=' + unique_id;
                                } else if (Edata.notification_for == 'SMS') {
                                    var url = 'https://' + window.location.hostname+':'+window.location.port + '/#/sms?c=' + unique_id;
                                } else if (Edata.notification_for == 'line_chat') {
                                    var url = 'https://' + window.location.hostname+':'+window.location.port + '/#/line-chat?c=' + unique_id;
                                } else if (Edata.notification_for == 'telegram') {
                                    var url = 'https://' + window.location.hostname+':'+window.location.port + '/#/tele-chat?c=' + unique_id;
                                }
                                else if (Edata.notification_for == '3cxchat') {
                                    var url = 'https://' + window.location.hostname+':'+window.location.port + '/omnichannel/#/cx-webclient';
                                   // var url = 'http://localhost:4200/#/cx-webclient';
                                    let Edatas: any = '{"pagefor":"3cxchat","id":"'+unique_id+'"}';
                                    self.EmailNotify.next(Edatas);
                                }

                                window.location.replace(url);
                            }, true], // true to focus
                            ['<button>Close</button>', function (instance, toast) {
                                instance.hide({
                                    transitionOut: 'fadeOutUp',
                                    onClosing: function (instance, toast, closedBy) {
                                        console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
                                    }
                                }, toast, 'buttonName');
                            }]
                        ],
                        onOpening: function (instance, toast) {
                            console.info('callback abriu!');
                        },
                        onClosing: function (instance, toast, closedBy) {
                            console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
                        }
                    });
                }

    }







    pagination(list_info) {
        var start, eu, next, back, limit, total_count, offset, last_val, last_final_val, current, pagination, btn_length;
        limit = list_info.page_limit;
        total_count = list_info.total;
        offset = list_info.offset;
        start = 0 + offset;
        eu = start - 0;
        if (total_count < start + 1 && total_count > 1) {

            eu = start - limit;
            start = eu;
        }
        current = eu + limit;
        back = eu - limit;
        next = eu + limit;
        last_val = Math.ceil(total_count / limit);
        last_final_val = (last_val - 1) * limit;
        pagination = { "info": "hide" };
        if (total_count > limit) {
            pagination.info = "show";
            pagination.start = 0;

            if (back >= 0) {
                pagination.back = back;
                pagination.backtab = "show";
            }
            else {
                pagination.backtab = "hide";
            }

            btn_length = 1;
            pagination.data = []
            for (var offset_count = 0; offset_count < total_count; offset_count = offset_count + limit) {

                if ((offset_count <= eu + (2 * limit)) && (offset_count >= eu - (2 * limit))) {

                    if (offset_count != eu) {
                        pagination.data.push({ "btn_length": btn_length, "offset_count": offset_count, "load": true });
                    }
                    else {
                        pagination.data.push({ "btn_length": btn_length, "offset_count": offset_count, "load": false });
                    }

                }
                btn_length = btn_length + 1;

            }
            if (current < total_count) {
                pagination.next = next;
                pagination.nexttab = "show";
            }
            else {
                pagination.nexttab = "hide";
            }
            pagination.end = last_final_val;

        }

        return pagination;
    }


    sendNotifications(postData: any) {

        console.log(postData);
        

        let notify = postData.notification_for;
        let Body = postData.title;
        let clicks = postData.click_action;
      //  {badge: "1",click_action: "",host_name: "https://hp.mconnectapps.com",notification_for: "incomming_call",sound: "default",text: "Incomming call from 1001",title: "Incomming Call",unique_id: "",user_id: "1298"}

        // {
        //   badge: "1"
        //   click_action: "https://assaabloyccuat.mconnectapps.com/#/ticketing-system-new"
        //   host_name: "https://assaabloyccuat.mconnectapps.com"
        //   notification_for: "email_ticketing"
        //   sound: "default"
        //   text: null
        //   title: "Cal4Care | MR < mr@cal4care.com > Has Replied the Ticket test email 8.51 [##757]"
        //   unique_id: "757"
        //   user_id: "1203"
        // }


        let imgs;
        let heading;

        if (notify == 'email_ticketing') {
             imgs = '../../assets/img/mc-dashboard/tickets.png';
             heading = 'Email Ticketing';
            //  clicks = 'https://' + window.location.hostname + '/#/ticket-view-thread?ticket_id='+ID;
   
        }
        else if (notify == 'whatsapp_unoff') {
             imgs = '../../assets/img/mc-dashboard/whatsapp.webp';
             heading = 'Whatsapp';
        }
        else if (notify == 'whatsapp') {
             imgs = '../../assets/img/mc-dashboard/whatsapp.webp';
             heading = 'WhatsApp';
        } else if (notify == 'chat') {
             imgs = '../../assets/img/mc-dashboard/chat.png';
             heading = 'Chat';
        }else if (notify == 'webchat') {
            imgs = '../../assets/img/mc-dashboard/chat.png';
            heading = 'webChat';
       } else if (notify == 'int_chat') {
             imgs = '../../assets/img/mc-dashboard/internal-chat.png';
             heading = 'Internal Chat';
        } else if (notify == 'fb') {
             imgs = '../../assets/img/mc-dashboard/facebook.png';
             heading = 'Facebook';
        } else if (notify == 'SMS') {
             imgs = '../../assets/img/mc-dashboard/sms.png';
             heading = 'SMS';
            // imgs = '../../assets/img/mc-dashboard/internal-chat.png';
        } else if (notify == 'line_chat') {
            imgs = '../../assets/img/mc-dashboard/line.png';
             heading = 'Line';
        } else if (notify == 'telegram') {
            imgs = '../../assets/img/mc-dashboard/tele.png';
             heading = 'Telegram';
            //  clicks='https://' + window.location.hostname + '/#/tele-chat?c=' + ID;
        }
        else if (notify == 'incomming_call') {
            imgs = '../../assets/img/mc-dashboard/call.png';
             heading = 'Incomming Call';
        }
        else if (notify == '3cxchat') {
            imgs = '../../assets/img/mc-dashboard/chat.png';
             heading = '3CX Chat';
        }
    
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        else {
            // console.log(imgs);
            // alert('send Noti');
            var notification = new Notification(heading, {
                body:Body,
                icon: imgs,
                badge: '../../assets/images/icons/appicon72x72.png',
            });
            // notification.onclick = function () {
            //     window.open(clicks);
            // };
            notification.onclick = () => {
                if(notify == 'incomming_call') {     
                   window.focus();                
                }else{                    
                    window.open(clicks); 
                }
                // this.zone.run(() => {
                //     console.log('onclick');
                //     this.router.navigate(['']);
                // });
            };

        }

    }


    toTimeZone(time) {

        var zone = this.browsertimezone;
      
       let global_timezone = localStorage.getItem('timezone_name');
       if(time != '0000-00-00 00:00:00'){
       var newYork    = moment.tz(time, global_timezone);
       var losAngeles = newYork.clone().tz(zone).format("MM/DD/YYYY hh:mm A");
       return losAngeles;
       }else{
         return time;
       }
      }






      updateAllFiles(postData:any[]) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
        // const url = localStorage.getItem('pbx_url');
        // const url = window.location.hostname;
        // const url = 'omnidemo.3cx.asia';
        const url = window.location.hostname+':'+window.location.port;
        // const url = 'jascomm01.my3cx.ca:4001';
        return this.http.post("https://"+url+"/update-server.php", postData,httpOptions);
    }

    update_mrvoip_api(postData:any[]){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
          const url = window.location.hostname+':'+window.location.port ; 
          //const url = "c4cteams.my3cx.sg:4001";
          return this.http.post("https://"+url+"/update-mrvoipapi.php", postData,httpOptions);
    }

get_serves_status(postData:any[]){
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
          const url = window.location.hostname+':'+window.location.port;
      return this.http.post("https://"+url+"/update-server.php", postData,httpOptions);
    //   return this.http.post("https://developtesting.my3cx.sg:4001/update-server.php", postData,httpOptions);
}
      updateAllMrvoip(postData:any[]) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
      // const url = localStorage.getItem('pbx_url');
    //   const url = window.location.hostname;
            // const url = localStorage.getItem('pbx_url');
            const url = window.location.hostname+':'+window.location.port ; 
    // const url = 'omnidemo.3cx.asia';

        return this.http.post("https://"+url+"/update-mrvoip.php", postData,httpOptions);
    }
    updateAllwebRTC(postData: any[]) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        
         const url = window.location.hostname + ':4001';


        return this.http.post("https://" + url + "/update-webrtc.php", postData, httpOptions);
    }


    sendServerOmniLogin(postData:any[]) {    
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };  
        return this.http.post("https://omni.mconnectapps.com/api/v1.0/index.php", postData,httpOptions);
       }
}