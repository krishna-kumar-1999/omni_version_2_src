import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2'
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {
  queue_list;
  recordNotFound = false;
  uadmin_id;
  constructor(public router:Router,private _ngZone: NgZone,private serverService: ServerService) {}
  
  ngOnInit() {

    this.uadmin_id = localStorage.getItem('admin_id');
  }








 buyDemo(wall){
        Swal.fire({
            title: 'Confirm Demo',
            text: "Are you sure, you want to buy demo of this wallboard",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Not now',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
                this.buyDemoMain(wall);
            }
          }) 
  }

  buyDemoMain(wall){

    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"agents", "moduleType": "agents", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"choose_marketplace","wallboard_id":"'+wall+'","admin_id":"'+this.uadmin_id+'"}}';
  
        this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.result.data == 1) {
                $('#edit_deptform').modal('hide');
                iziToast.success({
                    message: "Demo Added successfully",
                    position: 'topRight'
                });
            } else {
            
                iziToast.warning({
                    message: "Demo not updated. Please try again",
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



  openSMSPanel(){
    $('#addSMSForm').modal('show');
  }


  AddToCartSMS(show){

    let access_token: any=localStorage.getItem('access_token');
    var sms_balance = $('#sms_balance').val();
    let api_req:any = '{"operation":"billing", "moduleType": "billing", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"add_to_cart","item_name":"SMS Purchase","admin_id":"'+this.uadmin_id+'","price":"'+sms_balance+'","quantity":"1","tot_amt":"'+sms_balance+'"}}';
  
        this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.result.data == 1) {


          if(show =='1'){
            $('#addSMSForm').modal('hide');
            iziToast.success({
                message: "Item Added To Cart",
                position: 'topRight'
            });
          } else {
              $('#addSMSForm').modal('hide');
              iziToast.success({
                  message: "Item Added To Cart",
                  position: 'topRight'
              });
              this.router.navigate(['/add-to-cart']);
            }
            
            } else {
            
                iziToast.warning({
                    message: "Please try again",
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







}
