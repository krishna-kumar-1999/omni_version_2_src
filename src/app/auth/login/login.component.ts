import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../services/server.service';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormTemp = true;
  sendotp = false;
  sendotpmain = false;
  userIdle;
    login;
  domain: any;
  company_name: any;

    constructor(private serverService: ServerService, private router:Router,private route: ActivatedRoute) {
      this.login = this.route.snapshot.queryParamMap.get('login');
      if(this.login){

        this.msAuth(this.login);
      }
     }
    loginError = "";
    loginSuccess = "";
    tab: number = 1;

  ngOnInit() {
    this.get_company_name();

    this.loginForm = new FormGroup({
      'user_name': new FormControl(null, Validators.required),
      'company_name': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });

    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/']);
      return true;

    }
    const months = ["help_ticket_3.jpg","help_ticket-5.jpg","help_ticket_4.jpg","user_bg4.jpg","help_ticket.jpg","help_ticket_2.jpg"];

    const random = Math.floor(Math.random() * months.length);
    console.log(random, months[random]);

    $(".main-bg").css('background-image','url("/../assets/img/custom-images/'+months[random]+'")');
    //Start watching for user inactivity.
    // this.userIdle.startWatching();

    // Start watching when user idle is starting.
    // this.userIdle.onTimerStart().subscribe(count => console.log(count));

    // Start watch when time is up.
    // this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));
      }
      get_company_name(){
        let api_rew_c_name:any = '{"action":"company_name"}';
        this.serverService.updateAllFiles(api_rew_c_name).subscribe((res:any)=>{
          if(res.status==true){
            if(res.company_name!=''){
              this.loginForm.patchValue({
                'company_name' : res.company_name,
              })
            }
          }else{
      
          }
        })
      }

  msAuth(login){


    let loginReq:any =  '{"operation":"agents", "moduleType": "agents", "api_type": "web","element_data":{"action":"ms_sso_omni","login":"'+login+'"}}';
    // alert(login)
        this.serverService.sendServerOmniLogin(loginReq).subscribe((response:any) => {
          let api_req:any =  '{"operation":"login", "moduleType": "login", "api_type": "web","element_data":{"action":"login_validation","company_name":"'+response.company+'","password":"'+response.password+'","user_name":"'+response.username+'"}}';
// console.log(api_req);
// alert(response.username)
// localStorage.setItem('company_name',response.company.toLowerCase());
localStorage.setItem('company_name',response.company);
                this.serverService.sendServer(api_req).subscribe((response:any) => {
                    //return false;
                    if(response.data == 1 ){
                      this.sendotp = true;
                      this.loginFormTemp = false;
                      // this.loginSuccess = "Please Enter the OTP";
                      this.loginError="";
                        } else if(response.result.status==1){
                            localStorage.setItem('access_token', response.access_token);
                            localStorage.setItem('userId', response.result.data.user_id);
                            localStorage.setItem('user_name', response.result.data.user_name);
                            localStorage.setItem('user_type', response.result.data.userType);
                            localStorage.setItem('agent_name', response.result.data.agent_name);
                            localStorage.setItem('profile_image', response.result.data.profile_image);
                            localStorage.setItem('logo_image', response.result.data.logo_image);
                            localStorage.setItem('small_logo_image', response.result.data.small_logo_image);
                            localStorage.setItem('theme', response.result.data.theme);
                            localStorage.setItem('layout', response.result.data.layout);
                            localStorage.setItem('timezone_id', response.result.data.timezone_id);
                            localStorage.setItem('admin_id', response.result.data.admin_id);
                            localStorage.setItem('dsk_access', response.result.data.dsk_access);
                            localStorage.setItem('hardware_id', response.result.data.hardware_id);
                            localStorage.setItem('has_external_contact', response.result.data.has_external_contact);
                            localStorage.setItem('external_contact_url', response.result.data.external_contact_url);
                            localStorage.setItem('show_caller_id', response.result.data.show_caller_id);
                            localStorage.setItem('has_reports', response.result.data.reports);
                            localStorage.setItem('whatsapp_account', response.result.data.whatsapp_account);
                            localStorage.setItem('fb_account', response.result.data.facebook_account);
                            localStorage.setItem('predective_dialer_behave', response.result.data.predective_dialer_behave);
                            localStorage.setItem('crm_type', response.result.data.crm_type);
                            localStorage.setItem('price_sms', response.result.data.price_sms);
                            localStorage.setItem('has_line', response.result.data.has_fax);
                            localStorage.setItem('has_supervisor', response.result.data.has_supervisor);
                            localStorage.setItem('encAdmin', response.result.data.encAdmin);
                            localStorage.setItem('encUser', response.result.data.encUser);

                            // localStorage.setItem('has_tele', response.result.data.has_telegram);
                            localStorage.setItem('N_token','');
                            // localStorage.setItem('company_name',response.result.data.company_name);
                            localStorage.setItem('reseller', response.result.data.reseller);
                            localStorage.setItem('ext_int_status', response.result.data.ext_int_status);
                            this.loginError="";
                            this.loginSuccess = "You have successfully logged in";
                            // if (response.result.data.userType == 'Admin') {
                            //   this.router.navigate(['/custom-wall']);
                            // } else if (response.result.data.userType == 'Employee') {
                            //   this.router.navigate(['/custom-wall2']);
                            // } else{
                            //   this.router.navigate(['/mc']);
                            // }
                            this.router.navigate(['/profile']);

                        }
                        else{
                          this.loginSuccess = "";
                          this.loginError="Please enter the valid company name, username and password";
                        }

                    },
                    (error)=>{
                        console.log(error);
                    });


        },
        (error)=>{
            console.log(error);
        });
  }




  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }
  userLogin() {
    localStorage.setItem('company_name',this.loginForm.value.company_name);
    // alert('test')
    Swal.fire({
			html:
				'<div style="display: flex;justify-content: center;"><div class="pong-loader"></div></div>',
		showCloseButton: false,
			showCancelButton: false,
			showConfirmButton: false,
			focusConfirm: false,
			background: 'transparent',
		});
    let loginReq: any = this.loginForm.value;
    let api_req: any = new Object();
    loginReq.action = "login_validation";
    api_req.operation = "login";
    api_req.moduleType = "login";
    api_req.api_type = "web";
    api_req.element_data = loginReq;
    this.serverService.sendServer_login(api_req).subscribe((response: any) => {
Swal.close();
      // return false;
      if (response.data == 1) {
        this.sendotp = true;
        this.loginFormTemp = false;
        // this.loginSuccess = "Please Enter the OTP";
        this.loginError = "";
      } else if (response.result.status == 1) {

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('userId', response.result.data.user_id);
        localStorage.setItem('user_name', response.result.data.user_name);
        localStorage.setItem('agent_name', response.result.data.agent_name);
        localStorage.setItem('user_type', response.result.data.userType);
        localStorage.setItem('profile_image', response.result.data.profile_image);
        localStorage.setItem('logo_image', response.result.data.logo_image);
        localStorage.setItem('small_logo_image', response.result.data.small_logo_image);
        localStorage.setItem('theme', response.result.data.theme);
        localStorage.setItem('layout', response.result.data.layout);
        localStorage.setItem('timezone_id', response.result.data.timezone_id);
        localStorage.setItem('admin_id', response.result.data.admin_id);
        localStorage.setItem('dsk_access', response.result.data.dsk_access);
        localStorage.setItem('hardware_id', response.result.data.hardware_id);
        localStorage.setItem('has_external_contact', response.result.data.has_external_contact);
        localStorage.setItem('external_contact_url', response.result.data.external_contact_url);
        localStorage.setItem('show_caller_id', response.result.data.show_caller_id);
        localStorage.setItem('has_reports', response.result.data.reports);
        localStorage.setItem('whatsapp_account', response.result.data.whatsapp_account);
        localStorage.setItem('fb_account', response.result.data.facebook_account);
        localStorage.setItem('predective_dialer_behave', response.result.data.predective_dialer_behave);
        localStorage.setItem('crm_type', response.result.data.crm_type);
        localStorage.setItem('price_sms', response.result.data.price_sms);
        localStorage.setItem('has_line', response.result.data.has_fax);
        localStorage.setItem('has_supervisor', response.result.data.has_supervisor);
        localStorage.setItem('encAdmin', response.result.data.encAdmin);
        localStorage.setItem('encUser', response.result.data.encUser);

        // localStorage.setItem('has_tele', response.result.data.has_telegram);
        localStorage.setItem('N_token', '');


        localStorage.setItem('reseller', response.result.data.reseller);
        localStorage.setItem('ext_int_status', response.result.data.ext_int_status);
        this.loginError = "";
        this.loginSuccess = "You have successfully logged in";
        this.loginForm.reset();
        // return false;
        // this.router.navigate(['/mc']);


        // if (response.result.data.userType == 'Admin') {
        //   this.router.navigate(['/custom-wall']);
        // } else if (response.result.data.userType == 'Employee') {
        //   this.router.navigate(['/custom-wall2']);
        // } else{
        //   this.router.navigate(['/mc']);
        // }
        this.router.navigate(['/profile']);
      }
      else {
          this.loginSuccess = "";
          this.loginError="Please enter the valid company name, username and password";
      }

    },
      (error) => {
        console.log(error);
      });


  }







  loginVia(type) {
    let loginReq: any = this.loginForm.value;
    let api_req: any = new Object();
    loginReq.action = "send_otp";
    api_req.operation = "login";
    api_req.moduleType = "login";
    api_req.api_type = "web";
    api_req.element_data = loginReq;
    api_req.element_data.method = type;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.data == 1) {
        this.sendotp = false;
        this.sendotpmain = true;
        this.loginSuccess = "Please Enter the OTP";
        this.loginError = "";
      }
    },
      (error) => {
        console.log(error);
      });
  }


  sendOTPLogin() {
    var otp = $('#otp').val();
    let loginReq: any = this.loginForm.value;
    let api_req: any = new Object();
    loginReq.action = "check_otp";
    loginReq.otp = otp;
    api_req.operation = "login";
    api_req.moduleType = "login";
    api_req.api_type = "web";
    api_req.element_data = loginReq;
    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response.result.status == 1) {

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('userId', response.result.data.user_id);
        localStorage.setItem('user_name', response.result.data.user_name);
        localStorage.setItem('agent_name', response.result.data.agent_name);
        localStorage.setItem('user_type', response.result.data.userType);
        localStorage.setItem('profile_image', response.result.data.profile_image);
        localStorage.setItem('logo_image', response.result.data.logo_image);
        localStorage.setItem('small_logo_image', response.result.data.small_logo_image);
        localStorage.setItem('theme', response.result.data.theme);
        localStorage.setItem('layout', response.result.data.layout);
        localStorage.setItem('timezone_id', response.result.data.timezone_id);
        localStorage.setItem('admin_id', response.result.data.admin_id);
        localStorage.setItem('dsk_access', response.result.data.dsk_access);
        localStorage.setItem('hardware_id', response.result.data.hardware_id);
        localStorage.setItem('has_external_contact', response.result.data.has_external_contact);
        localStorage.setItem('external_contact_url', response.result.data.external_contact_url);
        localStorage.setItem('show_caller_id', response.result.data.show_caller_id);
        localStorage.setItem('has_reports', response.result.data.reports);
        localStorage.setItem('whatsapp_account', response.result.data.whatsapp_account);
        localStorage.setItem('predective_dialer_behave', response.result.data.predective_dialer_behave);
        localStorage.setItem('crm_type', response.result.data.crm_type);
        localStorage.setItem('price_sms', response.result.data.price_sms);
        // localStorage.setItem('company_name', response.result.data.company_name);

        localStorage.setItem('company_name',this.loginForm.value.company_name);
        localStorage.setItem('ext_int_status', response.result.data.ext_int_status);

        localStorage.setItem('N_token', '');
        this.loginError = "";
        this.loginSuccess = "You have successfully logged in successfully";
        this.loginForm.reset();
        this.router.navigate(['/profile']);

      }
      else {

        this.loginSuccess = "";
        this.loginError = "Please enter the valid otp";

      }

    },
      (error) => {
        console.log(error);
      });


  }


  backToLogin() {
    this.sendotp = false;
    this.loginFormTemp = true;
  }

  ssologin(){
    let loginReq:any = new Object();
let api_req:any = new Object();
loginReq.action="find_users_ref_team";

  loginReq.pbx_url=window.location.hostname;
  loginReq.license_key=localStorage.getItem('license_key');
  // loginReq.license_key="CF14-KY49-71AH-57PH-HZXW-33J4G-121212";

api_req.operation="agents";
api_req.moduleType="agents";
api_req.api_type="web";
api_req.element_data=loginReq;
var user_type = localStorage.getItem('user_type');

      this.serverService.sendServerOmniLogin(api_req).subscribe((response:any) => {

           this.company_name = response.result.data[0].company_name;
          // this.domain = response.result.data[0].domain;

           window.location.href="https://"+window.location.href+":4003/ms-sso/simplesamlphp/index_omni.php";
          //  window.location.href="https://updates.mconnectapps.com/"+this.company_name+"/ms-sso/simplesamlphp/index_omni.php";
         // return ("https://updates.mconnectapps.com/tesing_sso2/ms-sso/simplesamlphp/index_omni.php");
      });
  }
}
