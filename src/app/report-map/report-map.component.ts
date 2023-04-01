import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
declare var $: any;
declare var am5:any;
declare var am5xy:any;


@Component({
  selector: 'app-report-map',
  templateUrl: './report-map.component.html',
  styleUrls: ['./report-map.component.css']
})

export class ReportMapComponent implements OnInit {

  constructor(private serverService: ServerService,private datePipe: DatePipe) { 

    
  }
  num:any;
  country_list :any;
  datatable =false;
  toDisplay = false;
  countValues :any;
  dateValues :any;
  call_count :any;
  date_time :any;
  barColors:any;
  from_date:any;
  to_date:any;
  day1:any;
  day2:any;
  day3:any;
  day4:any;
  day5:any;
  day6:any;
  day7:any;

  report_date: FormGroup;
  ngOnInit(): void {

    this.report_date = new FormGroup({
			from_datee: new FormControl(null),

		});
   

  }
  test(){
    
    this.toDisplay =! this.toDisplay;
    var date_from = $('#from_datee').val();
    localStorage.setItem('from_datee',date_from);
  
    this.heat_data();

  }

heat_data(){

  this.from_date = localStorage.getItem('from_datee');

  console.log(this.from_date);
  const date = new Date(this.from_date);
  date.setDate(date.getDate() + 6);

  console.log(this.datePipe.transform(date,"yyyy-MM-dd")); 
  this.to_date = this.datePipe.transform(date,"yyyy-MM-dd");

  let access_token: any = localStorage.getItem('access_token');
  let license_key: any = localStorage.getItem('license_key');
  let agents_req: any = new Object();
  agents_req.action = "heat_data_details";
  agents_req.license_key = license_key;
  agents_req.fromDate = this.from_date;
  agents_req.toDate = this.to_date;
  let api_req: any = new Object();
  api_req.operation = "heat_data";
  api_req.moduleType = "heat_data";
  api_req.api_type = "web";
  api_req.access_token = access_token;
  api_req.element_data = agents_req;

    this.hm_data(api_req);  
  
} 
// b_data(api_req){
//   this.serverService.sendServerOmniLogin(api_req).subscribe((response: any) => {
//     this.countValues = response.map(value => value.active_call_count);
//     this.date_time = response.map(value => value.date_time);
//     console.log("DDDDDAAAATTTTEEE     ::::::::",this.date_time);    
//     console.log("HELLO VALUES   :::::",this.countValues);
//     // alert(this.date_time);
//     var yValues = this.countValues;
//     const canvas = document.getElementById('myChartee') as HTMLCanvasElement;
//     const bar_ctx = canvas.getContext('2d');

//     var purple_orange_gradient = bar_ctx.createLinearGradient(600, 0, 0, 0);
//     purple_orange_gradient.addColorStop(0, 'red');
//     purple_orange_gradient.addColorStop(1, 'orange');
//     new Chart('myChartee', {
      
//       type: "bar",
//       data: {
//         labels: this.date_time,
//         datasets: [{
//           label: 'Report',
//           data: yValues,
//           backgroundColor: purple_orange_gradient,
//           hoverBackgroundColor: purple_orange_gradient,
//           hoverBorderColor: 'purple',
          
//         }]
//       },
//       options: {
//         indexAxis :'y',
//         scales: {
//           x: {
//             ticks: {
//                 stepSize: 5,
//             }
//           }
//         },
//         // Elements options apply to all of the options unless overridden in a dataset
//         // In this case, we are setting the border of each horizontal bar to be 2px wide
//         elements: {
//           bar: {
//             borderWidth: 1,
//           }
          
//         }
//       }
//     });
    
//   },
//   (error) => {
//     console.log(error);
//   });

// }
hm_data(api_req){
  // this.toDisplay =true;
  // this.datatable =true;
  this.serverService.sendServer(api_req).subscribe((response: any) => {
    // var value_heat = response.result.data;
    // console.log("DATA VALUESSS:::",value_heat);
    // console.log("DATA VALUESSS:::",value_heat[1][23]);
    // console.log("DATA VALUESSS:::",value_heat[1][47]);
    // console.log("DATA VALUESSS:::",value_heat[1][98]);
    // this.countValues = value_heat[1].map(value => value.active_call_count);
    // console.log("DATAS :",this.countValues);
    // value_heat.forEach(element => {
    //   var data_heat = element;
    //   console.log("value_heat_data",data_heat);
    // });
    

    console.log(response)
    this.date_time = response.map(value => value.date_time);
    let call_count = response.map(value => value);
    console.log(this.date_time)
    // console.log(Number(call_count[0][0]['active_call_count']));
    if(call_count[0][23]){
      d1t0 = call_count[0][0]['active_call_count'];
      d1t1 = call_count[0][1]['active_call_count'];
      d1t2 = call_count[0][2]['active_call_count'];
      d1t3 = call_count[0][3]['active_call_count'];
      d1t4 = call_count[0][4]['active_call_count'];
      d1t5 = call_count[0][5]['active_call_count'];
      d1t6 = call_count[0][6]['active_call_count'];
      d1t7 = call_count[0][7]['active_call_count'];
      d1t8 = call_count[0][8]['active_call_count'];
      d1t9 = call_count[0][9]['active_call_count'];
      d1t10 = call_count[0][10]['active_call_count'];
      d1t11 = call_count[0][11]['active_call_count'];
      d1t12 = call_count[0][12]['active_call_count'];
      d1t13 = call_count[0][13]['active_call_count'];
      d1t14 = call_count[0][14]['active_call_count'];
      d1t15 = call_count[0][15]['active_call_count'];
      d1t16 = call_count[0][16]['active_call_count'];
      d1t17 = call_count[0][17]['active_call_count'];
      d1t18 = call_count[0][18]['active_call_count'];
      d1t19 = call_count[0][19]['active_call_count'];
      d1t20 = call_count[0][20]['active_call_count'];
      d1t21 = call_count[0][21]['active_call_count'];
      d1t22 = call_count[0][22]['active_call_count'];
      d1t23 = call_count[0][23]['active_call_count'];
    }
    else{
      var d1t0 = ''
      var d1t1 = ''
      var d1t2 = ''
      var d1t3 = ''
      var d1t4 = ''
      var d1t5 = ''
      var d1t6 = ''
      var d1t7 = ''
      var d1t8 = ''
      var d1t9 = ''
      var d1t10 = ''
      var d1t11 = ''
      var d1t12 = ''
      var d1t13 = ''
      var d1t14 = ''
      var d1t15 = ''
      var d1t16 = ''
      var d1t17 = ''
      var d1t18 = ''
      var d1t19 = ''
      var d1t20 = ''
      var d1t21 = ''
      var d1t22 = ''
      var d1t23 = ''
    }
    if(call_count[1][23]){
      d2t0 = call_count[1][0]['active_call_count'];
      d2t1 = call_count[1][1]['active_call_count'];
      d2t2 = call_count[1][2]['active_call_count'];
      d2t3 = call_count[1][3]['active_call_count'];
      d2t4 = call_count[1][4]['active_call_count'];
      d2t5 = call_count[1][5]['active_call_count'];
      d2t6 = call_count[1][6]['active_call_count'];
      d2t7 = call_count[1][7]['active_call_count'];
      d2t8 = call_count[1][8]['active_call_count'];
      d2t9 = call_count[1][9]['active_call_count'];
      d2t10 = call_count[1][10]['active_call_count'];
      d2t11 = call_count[1][11]['active_call_count'];
      d2t12 = call_count[1][12]['active_call_count'];
      d2t13 = call_count[1][13]['active_call_count'];
      d2t14 = call_count[1][14]['active_call_count'];
      d2t15 = call_count[1][15]['active_call_count'];
      d2t16 = call_count[1][16]['active_call_count'];
      d2t17 = call_count[1][17]['active_call_count'];
      d2t18 = call_count[1][18]['active_call_count'];
      d2t19 = call_count[1][19]['active_call_count'];
      d2t20 = call_count[1][20]['active_call_count'];
      d2t21 = call_count[1][21]['active_call_count'];
      d2t22 = call_count[1][22]['active_call_count'];
      d2t23 = call_count[1][23]['active_call_count'];
    }
    else{
      var d2t0 = ''
      var d2t1 = ''
      var d2t2 = ''
      var d2t3 = ''
      var d2t4 = ''
      var d2t5 = ''
      var d2t6 = ''
      var d2t7 = ''
      var d2t8 = ''
      var d2t9 = ''
      var d2t10 = ''
      var d2t11 = ''
      var d2t12 = ''
      var d2t13 = ''
      var d2t14 = ''
      var d2t15 = ''
      var d2t16 = ''
      var d2t17 = ''
      var d2t18 = ''
      var d2t19 = ''
      var d2t20 = ''
      var d2t21 = ''
      var d2t22 = ''
      var d2t23 = ''
    }
    if(call_count[2][23]){
      d3t0 = call_count[2][0]['active_call_count'];
      d3t1 = call_count[2][1]['active_call_count'];
      d3t2 = call_count[2][2]['active_call_count'];
      d3t3 = call_count[2][3]['active_call_count'];
      d3t4 = call_count[2][4]['active_call_count'];
      d3t5 = call_count[2][5]['active_call_count'];
      d3t6 = call_count[2][6]['active_call_count'];
      d3t7 = call_count[2][7]['active_call_count'];
      d3t8 = call_count[2][8]['active_call_count'];
      d3t9 = call_count[2][9]['active_call_count'];
      d3t10 = call_count[2][10]['active_call_count'];
      d3t11 = call_count[2][11]['active_call_count'];
      d3t12 = call_count[2][12]['active_call_count'];
      d3t13 = call_count[2][13]['active_call_count'];
      d3t14 = call_count[2][14]['active_call_count'];
      d3t15 = call_count[2][15]['active_call_count'];
      d3t16 = call_count[2][16]['active_call_count'];
      d3t17 = call_count[2][17]['active_call_count'];
      d3t18 = call_count[2][18]['active_call_count'];
      d3t19 = call_count[2][19]['active_call_count'];
      d3t20 = call_count[2][20]['active_call_count'];
      d3t21 = call_count[2][21]['active_call_count'];
      d3t22 = call_count[2][22]['active_call_count'];
      d3t23 = call_count[2][23]['active_call_count'];
    }
    else{
      var d3t0 = ''
      var d3t1 = ''
      var d3t2 = ''
      var d3t3 = ''
      var d3t4 = ''
      var d3t5 = ''
      var d3t6 = ''
      var d3t7 = ''
      var d3t8 = ''
      var d3t9 = ''
      var d3t10 = ''
      var d3t11 = ''
      var d3t12 = ''
      var d3t13 = ''
      var d3t14 = ''
      var d3t15 = ''
      var d3t16 = ''
      var d3t17 = ''
      var d3t18 = ''
      var d3t19 = ''
      var d3t20 = ''
      var d3t21 = ''
      var d3t22 = ''
      var d3t23 = '' 
    }
    if(call_count[3][23]){
      d4t0 = call_count[3][0]['active_call_count'];
      d4t1 = call_count[3][1]['active_call_count'];
      d4t2 = call_count[3][2]['active_call_count'];
      d4t3 = call_count[3][3]['active_call_count'];
      d4t4 = call_count[3][4]['active_call_count'];
      d4t5 = call_count[3][5]['active_call_count'];
      d4t6 = call_count[3][6]['active_call_count'];
      d4t7 = call_count[3][7]['active_call_count'];
      d4t8 = call_count[3][8]['active_call_count'];
      d4t9 = call_count[3][9]['active_call_count'];
      d4t10 = call_count[3][10]['active_call_count'];
      d4t11 = call_count[3][11]['active_call_count'];
      d4t12 = call_count[3][12]['active_call_count'];
      d4t13 = call_count[3][13]['active_call_count'];
      d4t14 = call_count[3][14]['active_call_count'];
      d4t15 = call_count[3][15]['active_call_count'];
      d4t16 = call_count[3][16]['active_call_count'];
      d4t17 = call_count[3][17]['active_call_count'];
      d4t18 = call_count[3][18]['active_call_count'];
      d4t19 = call_count[3][19]['active_call_count'];
      d4t20 = call_count[3][20]['active_call_count'];
      d4t21 = call_count[3][21]['active_call_count'];
      d4t22 = call_count[3][22]['active_call_count'];
      d4t23 = call_count[3][23]['active_call_count'];
    
    }
    else{
      var d4t0 = ''
      var d4t1 = ''
      var d4t2 = ''
      var d4t3 = ''
      var d4t4 = ''
      var d4t5 = ''
      var d4t6 = ''
      var d4t7 = ''
      var d4t8 = ''
      var d4t9 = ''
      var d4t10 = ''
      var d4t11 = ''
      var d4t12 = ''
      var d4t13 = ''
      var d4t14 = ''
      var d4t15 = ''
      var d4t16 = ''
      var d4t17 = ''
      var d4t18 = ''
      var d4t19 = ''
      var d4t20 = ''
      var d4t21 = ''
      var d4t22 = ''
      var d4t23 = ''
    }
    if(call_count[4][23]){
      d5t0 = call_count[4][0]['active_call_count'];
      d5t1 = call_count[4][1]['active_call_count'];
      d5t2 = call_count[4][2]['active_call_count'];
      d5t3 = call_count[4][3]['active_call_count'];
      d5t4 = call_count[4][4]['active_call_count'];
      d5t5 = call_count[4][5]['active_call_count'];
      d5t6 = call_count[4][6]['active_call_count'];
      d5t7 = call_count[4][7]['active_call_count'];
      d5t8 = call_count[4][8]['active_call_count'];
      d5t9 = call_count[4][9]['active_call_count'];
      d5t10 = call_count[4][10]['active_call_count'];
      d5t11 = call_count[4][11]['active_call_count'];
      d5t12 = call_count[4][12]['active_call_count'];
      d5t13 = call_count[4][13]['active_call_count'];
      d5t14 = call_count[4][14]['active_call_count'];
      d5t15 = call_count[4][15]['active_call_count'];
      d5t16 = call_count[4][16]['active_call_count'];
      d5t17 = call_count[4][17]['active_call_count'];
      d5t18 = call_count[4][18]['active_call_count'];
      d5t19 = call_count[4][19]['active_call_count'];
      d5t20 = call_count[4][20]['active_call_count'];
      d5t21 = call_count[4][21]['active_call_count'];
      d5t22 = call_count[4][22]['active_call_count'];
      d5t23 = call_count[4][23]['active_call_count'];
    }
    else{
      var d5t0 = ''
      var d5t1 = ''
      var d5t2 = ''
      var d5t3 = ''
      var d5t4 = ''
      var d5t5 = ''
      var d5t6 = ''
      var d5t7 = ''
      var d5t8 = ''
      var d5t9 = ''
      var d5t10 = ''
      var d5t11 = ''
      var d5t12 = ''
      var d5t13 = ''
      var d5t14 = ''
      var d5t15 = ''
      var d5t16 = ''
      var d5t17 = ''
      var d5t18 = ''
      var d5t19 = ''
      var d5t20 = ''
      var d5t21 = ''
      var d5t22 = ''
      var d5t23 = ''
    }
    if(call_count[5][23]){
      d6t0 = call_count[5][0]['active_call_count'];
      d6t1 = call_count[5][1]['active_call_count'];
      d6t2 = call_count[5][2]['active_call_count'];
      d6t3 = call_count[5][3]['active_call_count'];
      d6t4 = call_count[5][4]['active_call_count'];
      d6t5 = call_count[5][5]['active_call_count'];
      d6t6 = call_count[5][6]['active_call_count'];
      d6t7 = call_count[5][7]['active_call_count'];
      d6t8 = call_count[5][8]['active_call_count'];
      d6t9 = call_count[5][9]['active_call_count'];
      d6t10 = call_count[5][10]['active_call_count'];
      d6t11 = call_count[5][11]['active_call_count'];
      d6t12 = call_count[5][12]['active_call_count'];
      d6t13 = call_count[5][13]['active_call_count'];
      d6t14 = call_count[5][14]['active_call_count'];
      d6t15 = call_count[5][15]['active_call_count'];
      d6t16 = call_count[5][16]['active_call_count'];
      d6t17 = call_count[5][17]['active_call_count'];
      d6t18 = call_count[5][18]['active_call_count'];
      d6t19 = call_count[5][19]['active_call_count'];
      d6t20 = call_count[5][20]['active_call_count'];
      d6t21 = call_count[5][21]['active_call_count'];
      d6t22 = call_count[5][22]['active_call_count'];
      d6t23 = call_count[5][23]['active_call_count']; 
    }
    else{
      var d6t0 = ''
      var d6t1 = ''
      var d6t2 = ''
      var d6t3 = ''
      var d6t4 = ''
      var d6t5 = ''
      var d6t6 = ''
      var d6t7 = ''
      var d6t8 = ''
      var d6t9 = ''
      var d6t10 = ''
      var d6t11 = ''
      var d6t12 = ''
      var d6t13 = ''
      var d6t14 = ''
      var d6t15 = ''
      var d6t16 = ''
      var d6t17 = ''
      var d6t18 = ''
      var d6t19 = ''
      var d6t20 = ''
      var d6t21 = ''
      var d6t22 = ''
      var d6t23 = ''
    }
    if(call_count[6][23]){
      d7t0 = call_count[6][0]['active_call_count'];
      d7t1 = call_count[6][1]['active_call_count'];
      d7t2 = call_count[6][2]['active_call_count'];
      d7t3 = call_count[6][3]['active_call_count'];
      d7t4 = call_count[6][4]['active_call_count'];
      d7t5 = call_count[6][5]['active_call_count'];
      d7t6 = call_count[6][6]['active_call_count'];
      d7t7 = call_count[6][7]['active_call_count'];
      d7t8 = call_count[6][8]['active_call_count'];
      d7t9 = call_count[6][9]['active_call_count'];
      d7t10 = call_count[6][10]['active_call_count'];
      d7t11 = call_count[6][11]['active_call_count'];
      d7t12 = call_count[6][12]['active_call_count'];
      d7t13 = call_count[6][13]['active_call_count'];
      d7t14 = call_count[6][14]['active_call_count'];
      d7t15 = call_count[6][15]['active_call_count'];
      d7t16 = call_count[6][16]['active_call_count'];
      d7t17 = call_count[6][17]['active_call_count'];
      d7t18 = call_count[6][18]['active_call_count'];
      d7t19 = call_count[6][19]['active_call_count'];
      d7t20 = call_count[6][20]['active_call_count'];
      d7t21 = call_count[6][21]['active_call_count'];
      d7t22 = call_count[6][22]['active_call_count'];
      d7t23 = call_count[6][23]['active_call_count'];
    }
    else{
      var d7t0 = ''
      var d7t1 = ''
      var d7t2 = ''
      var d7t3 = ''
      var d7t4 = ''
      var d7t5 = ''
      var d7t6 = ''
      var d7t7 = ''
      var d7t8 = ''
      var d7t9 = ''
      var d7t10 = ''
      var d7t11 = ''
      var d7t12 = ''
      var d7t13 = ''
      var d7t14 = ''
      var d7t15 = ''
      var d7t16 = ''
      var d7t17 = ''
      var d7t18 = ''
      var d7t19 = ''
      var d7t20 = ''
      var d7t21 = ''
      var d7t22 = ''
      var d7t23 = ''
    }
    // if(call_count[0] == ''){
    //   var d1t0 = ''
    //   var d1t1 = ''
    //   var d1t2 = ''
    //   var d1t3 = ''
    //   var d1t4 = ''
    //   var d1t5 = ''
    //   var d1t6 = ''
    //   var d1t7 = ''
    //   var d1t8 = ''
    //   var d1t9 = ''
    //   var d1t10 = ''
    //   var d1t11 = ''
    //   var d1t12 = ''
    //   var d1t13 = ''
    //   var d1t14 = ''
    //   var d1t15 = ''
    //   var d1t16 = ''
    //   var d1t17 = ''
    //   var d1t18 = ''
    //   var d1t19 = ''
    //   var d1t20 = ''
    //   var d1t21 = ''
    //   var d1t22 = ''
    //   var d1t23 = ''
    // }
    // else{
    //   d1t0 = call_count[0][0]['active_call_count'];
    //   d1t1 = call_count[0][1]['active_call_count'];
    //   d1t2 = call_count[0][2]['active_call_count'];
    //   d1t3 = call_count[0][3]['active_call_count'];
    //   d1t4 = call_count[0][4]['active_call_count'];
    //   d1t5 = call_count[0][5]['active_call_count'];
    //   d1t6 = call_count[0][6]['active_call_count'];
    //   d1t7 = call_count[0][7]['active_call_count'];
    //   d1t8 = call_count[0][8]['active_call_count'];
    //   d1t9 = call_count[0][9]['active_call_count'];
    //   d1t10 = call_count[0][10]['active_call_count'];
    //   d1t11 = call_count[0][11]['active_call_count'];
    //   d1t12 = call_count[0][12]['active_call_count'];
    //   d1t13 = call_count[0][13]['active_call_count'];
    //   d1t14 = call_count[0][14]['active_call_count'];
    //   d1t15 = call_count[0][15]['active_call_count'];
    //   d1t16 = call_count[0][16]['active_call_count'];
    //   d1t17 = call_count[0][17]['active_call_count'];
    //   d1t18 = call_count[0][18]['active_call_count'];
    //   d1t19 = call_count[0][19]['active_call_count'];
    //   d1t20 = call_count[0][20]['active_call_count'];
    //   d1t21 = call_count[0][21]['active_call_count'];
    //   d1t22 = call_count[0][22]['active_call_count'];
    //   d1t23 = call_count[0][23]['active_call_count'];
    // }
    // if(call_count[1] == ''){
    //   var d2t0 = ''
    //   var d2t1 = ''
    //   var d2t2 = ''
    //   var d2t3 = ''
    //   var d2t4 = ''
    //   var d2t5 = ''
    //   var d2t6 = ''
    //   var d2t7 = ''
    //   var d2t8 = ''
    //   var d2t9 = ''
    //   var d2t10 = ''
    //   var d2t11 = ''
    //   var d2t12 = ''
    //   var d2t13 = ''
    //   var d2t14 = ''
    //   var d2t15 = ''
    //   var d2t16 = ''
    //   var d2t17 = ''
    //   var d2t18 = ''
    //   var d2t19 = ''
    //   var d2t20 = ''
    //   var d2t21 = ''
    //   var d2t22 = ''
    //   var d2t23 = ''
    // }
    // else{
    //   d2t0 = call_count[1][0]['active_call_count'];
    //   d2t1 = call_count[1][1]['active_call_count'];
    //   d2t2 = call_count[1][2]['active_call_count'];
    //   d2t3 = call_count[1][3]['active_call_count'];
    //   d2t4 = call_count[1][4]['active_call_count'];
    //   d2t5 = call_count[1][5]['active_call_count'];
    //   d2t6 = call_count[1][6]['active_call_count'];
    //   d2t7 = call_count[1][7]['active_call_count'];
    //   d2t8 = call_count[1][8]['active_call_count'];
    //   d2t9 = call_count[1][9]['active_call_count'];
    //   d2t10 = call_count[1][10]['active_call_count'];
    //   d2t11 = call_count[1][11]['active_call_count'];
    //   d2t12 = call_count[1][12]['active_call_count'];
    //   d2t13 = call_count[1][13]['active_call_count'];
    //   d2t14 = call_count[1][14]['active_call_count'];
    //   d2t15 = call_count[1][15]['active_call_count'];
    //   d2t16 = call_count[1][16]['active_call_count'];
    //   d2t17 = call_count[1][17]['active_call_count'];
    //   d2t18 = call_count[1][18]['active_call_count'];
    //   d2t19 = call_count[1][19]['active_call_count'];
    //   d2t20 = call_count[1][20]['active_call_count'];
    //   d2t21 = call_count[1][21]['active_call_count'];
    //   d2t22 = call_count[1][22]['active_call_count'];
    //   d2t23 = call_count[1][23]['active_call_count'];
    // }
    // if(call_count[2] == ''){
    //   var d3t0 = ''
    //   var d3t1 = ''
    //   var d3t2 = ''
    //   var d3t3 = ''
    //   var d3t4 = ''
    //   var d3t5 = ''
    //   var d3t6 = ''
    //   var d3t7 = ''
    //   var d3t8 = ''
    //   var d3t9 = ''
    //   var d3t10 = ''
    //   var d3t11 = ''
    //   var d3t12 = ''
    //   var d3t13 = ''
    //   var d3t14 = ''
    //   var d3t15 = ''
    //   var d3t16 = ''
    //   var d3t17 = ''
    //   var d3t18 = ''
    //   var d3t19 = ''
    //   var d3t20 = ''
    //   var d3t21 = ''
    //   var d3t22 = ''
    //   var d3t23 = ''
    // }
    // else{
    //   d3t0 = call_count[2][0]['active_call_count'];
    //   d3t1 = call_count[2][1]['active_call_count'];
    //   d3t2 = call_count[2][2]['active_call_count'];
    //   d3t3 = call_count[2][3]['active_call_count'];
    //   d3t4 = call_count[2][4]['active_call_count'];
    //   d3t5 = call_count[2][5]['active_call_count'];
    //   d3t6 = call_count[2][6]['active_call_count'];
    //   d3t7 = call_count[2][7]['active_call_count'];
    //   d3t8 = call_count[2][8]['active_call_count'];
    //   d3t9 = call_count[2][9]['active_call_count'];
    //   d3t10 = call_count[2][10]['active_call_count'];
    //   d3t11 = call_count[2][11]['active_call_count'];
    //   d3t12 = call_count[2][12]['active_call_count'];
    //   d3t13 = call_count[2][13]['active_call_count'];
    //   d3t14 = call_count[2][14]['active_call_count'];
    //   d3t15 = call_count[2][15]['active_call_count'];
    //   d3t16 = call_count[2][16]['active_call_count'];
    //   d3t17 = call_count[2][17]['active_call_count'];
    //   d3t18 = call_count[2][18]['active_call_count'];
    //   d3t19 = call_count[2][19]['active_call_count'];
    //   d3t20 = call_count[2][20]['active_call_count'];
    //   d3t21 = call_count[2][21]['active_call_count'];
    //   d3t22 = call_count[2][22]['active_call_count'];
    //   d3t23 = call_count[2][23]['active_call_count'];
    // }
    // if(call_count[3] == ''){
    //   var d4t0 = ''
    //   var d4t1 = ''
    //   var d4t2 = ''
    //   var d4t3 = ''
    //   var d4t4 = ''
    //   var d4t5 = ''
    //   var d4t6 = ''
    //   var d4t7 = ''
    //   var d4t8 = ''
    //   var d4t9 = ''
    //   var d4t10 = ''
    //   var d4t11 = ''
    //   var d4t12 = ''
    //   var d4t13 = ''
    //   var d4t14 = ''
    //   var d4t15 = ''
    //   var d4t16 = ''
    //   var d4t17 = ''
    //   var d4t18 = ''
    //   var d4t19 = ''
    //   var d4t20 = ''
    //   var d4t21 = ''
    //   var d4t22 = ''
    //   var d4t23 = ''
    // }
    // else{
    //   d4t0 = call_count[3][0]['active_call_count'];
    //   d4t1 = call_count[3][1]['active_call_count'];
    //   d4t2 = call_count[3][2]['active_call_count'];
    //   d4t3 = call_count[3][3]['active_call_count'];
    //   d4t4 = call_count[3][4]['active_call_count'];
    //   d4t5 = call_count[3][5]['active_call_count'];
    //   d4t6 = call_count[3][6]['active_call_count'];
    //   d4t7 = call_count[3][7]['active_call_count'];
    //   d4t8 = call_count[3][8]['active_call_count'];
    //   d4t9 = call_count[3][9]['active_call_count'];
    //   d4t10 = call_count[3][10]['active_call_count'];
    //   d4t11 = call_count[3][11]['active_call_count'];
    //   d4t12 = call_count[3][12]['active_call_count'];
    //   d4t13 = call_count[3][13]['active_call_count'];
    //   d4t14 = call_count[3][14]['active_call_count'];
    //   d4t15 = call_count[3][15]['active_call_count'];
    //   d4t16 = call_count[3][16]['active_call_count'];
    //   d4t17 = call_count[3][17]['active_call_count'];
    //   d4t18 = call_count[3][18]['active_call_count'];
    //   d4t19 = call_count[3][19]['active_call_count'];
    //   d4t20 = call_count[3][20]['active_call_count'];
    //   d4t21 = call_count[3][21]['active_call_count'];
    //   d4t22 = call_count[3][22]['active_call_count'];
    //   d4t23 = call_count[3][23]['active_call_count'];
    // }
    // if(call_count[4] == ''){
    //   var d5t0 = ''
    //   var d5t1 = ''
    //   var d5t2 = ''
    //   var d5t3 = ''
    //   var d5t4 = ''
    //   var d5t5 = ''
    //   var d5t6 = ''
    //   var d5t7 = ''
    //   var d5t8 = ''
    //   var d5t9 = ''
    //   var d5t10 = ''
    //   var d5t11 = ''
    //   var d5t12 = ''
    //   var d5t13 = ''
    //   var d5t14 = ''
    //   var d5t15 = ''
    //   var d5t16 = ''
    //   var d5t17 = ''
    //   var d5t18 = ''
    //   var d5t19 = ''
    //   var d5t20 = ''
    //   var d5t21 = ''
    //   var d5t22 = ''
    //   var d5t23 = ''
    // }
    // else{
    //   d5t0 = call_count[4][0]['active_call_count'];
    //   d5t1 = call_count[4][1]['active_call_count'];
    //   d5t2 = call_count[4][2]['active_call_count'];
    //   d5t3 = call_count[4][3]['active_call_count'];
    //   d5t4 = call_count[4][4]['active_call_count'];
    //   d5t5 = call_count[4][5]['active_call_count'];
    //   d5t6 = call_count[4][6]['active_call_count'];
    //   d5t7 = call_count[4][7]['active_call_count'];
    //   d5t8 = call_count[4][8]['active_call_count'];
    //   d5t9 = call_count[4][9]['active_call_count'];
    //   d5t10 = call_count[4][10]['active_call_count'];
    //   d5t11 = call_count[4][11]['active_call_count'];
    //   d5t12 = call_count[4][12]['active_call_count'];
    //   d5t13 = call_count[4][13]['active_call_count'];
    //   d5t14 = call_count[4][14]['active_call_count'];
    //   d5t15 = call_count[4][15]['active_call_count'];
    //   d5t16 = call_count[4][16]['active_call_count'];
    //   d5t17 = call_count[4][17]['active_call_count'];
    //   d5t18 = call_count[4][18]['active_call_count'];
    //   d5t19 = call_count[4][19]['active_call_count'];
    //   d5t20 = call_count[4][20]['active_call_count'];
    //   d5t21 = call_count[4][21]['active_call_count'];
    //   d5t22 = call_count[4][22]['active_call_count'];
    //   d5t23 = call_count[4][23]['active_call_count'];
    // }
    // if(call_count[5] == ''){
    //   var d6t0 = ''
    //   var d6t1 = ''
    //   var d6t2 = ''
    //   var d6t3 = ''
    //   var d6t4 = ''
    //   var d6t5 = ''
    //   var d6t6 = ''
    //   var d6t7 = ''
    //   var d6t8 = ''
    //   var d6t9 = ''
    //   var d6t10 = ''
    //   var d6t11 = ''
    //   var d6t12 = ''
    //   var d6t13 = ''
    //   var d6t14 = ''
    //   var d6t15 = ''
    //   var d6t16 = ''
    //   var d6t17 = ''
    //   var d6t18 = ''
    //   var d6t19 = ''
    //   var d6t20 = ''
    //   var d6t21 = ''
    //   var d6t22 = ''
    //   var d6t23 = ''
    // }
    // else{
    //   d6t0 = call_count[5][0]['active_call_count'];
    //   d6t1 = call_count[5][1]['active_call_count'];
    //   d6t2 = call_count[5][2]['active_call_count'];
    //   d6t3 = call_count[5][3]['active_call_count'];
    //   d6t4 = call_count[5][4]['active_call_count'];
    //   d6t5 = call_count[5][5]['active_call_count'];
    //   d6t6 = call_count[5][6]['active_call_count'];
    //   d6t7 = call_count[5][7]['active_call_count'];
    //   d6t8 = call_count[5][8]['active_call_count'];
    //   d6t9 = call_count[5][9]['active_call_count'];
    //   d6t10 = call_count[5][10]['active_call_count'];
    //   d6t11 = call_count[5][11]['active_call_count'];
    //   d6t12 = call_count[5][12]['active_call_count'];
    //   d6t13 = call_count[5][13]['active_call_count'];
    //   d6t14 = call_count[5][14]['active_call_count'];
    //   d6t15 = call_count[5][15]['active_call_count'];
    //   d6t16 = call_count[5][16]['active_call_count'];
    //   d6t17 = call_count[5][17]['active_call_count'];
    //   d6t18 = call_count[5][18]['active_call_count'];
    //   d6t19 = call_count[5][19]['active_call_count'];
    //   d6t20 = call_count[5][20]['active_call_count'];
    //   d6t21 = call_count[5][21]['active_call_count'];
    //   d6t22 = call_count[5][22]['active_call_count'];
    //   d6t23 = call_count[5][23]['active_call_count'];
    // }
    // if(call_count[6] == ''){
    //   var d7t0 = ''
    //   var d7t1 = ''
    //   var d7t2 = ''
    //   var d7t3 = ''
    //   var d7t4 = ''
    //   var d7t5 = ''
    //   var d7t6 = ''
    //   var d7t7 = ''
    //   var d7t8 = ''
    //   var d7t9 = ''
    //   var d7t10 = ''
    //   var d7t11 = ''
    //   var d7t12 = ''
    //   var d7t13 = ''
    //   var d7t14 = ''
    //   var d7t15 = ''
    //   var d7t16 = ''
    //   var d7t17 = ''
    //   var d7t18 = ''
    //   var d7t19 = ''
    //   var d7t20 = ''
    //   var d7t21 = ''
    //   var d7t22 = ''
    //   var d7t23 = ''
    // }
    // else{
    //   d7t0 = call_count[6][0]['active_call_count'];
    //   d7t1 = call_count[6][1]['active_call_count'];
    //   d7t2 = call_count[6][2]['active_call_count'];
    //   d7t3 = call_count[6][3]['active_call_count'];
    //   d7t4 = call_count[6][4]['active_call_count'];
    //   d7t5 = call_count[6][5]['active_call_count'];
    //   d7t6 = call_count[6][6]['active_call_count'];
    //   d7t7 = call_count[6][7]['active_call_count'];
    //   d7t8 = call_count[6][8]['active_call_count'];
    //   d7t9 = call_count[6][9]['active_call_count'];
    //   d7t10 = call_count[6][10]['active_call_count'];
    //   d7t11 = call_count[6][11]['active_call_count'];
    //   d7t12 = call_count[6][12]['active_call_count'];
    //   d7t13 = call_count[6][13]['active_call_count'];
    //   d7t14 = call_count[6][14]['active_call_count'];
    //   d7t15 = call_count[6][15]['active_call_count'];
    //   d7t16 = call_count[6][16]['active_call_count'];
    //   d7t17 = call_count[6][17]['active_call_count'];
    //   d7t18 = call_count[6][18]['active_call_count'];
    //   d7t19 = call_count[6][19]['active_call_count'];
    //   d7t20 = call_count[6][20]['active_call_count'];
    //   d7t21 = call_count[6][21]['active_call_count'];
    //   d7t22 = call_count[6][22]['active_call_count'];
    //   d7t23 = call_count[6][23]['active_call_count'];
    // }
    // console.log("DUMMY     ::::::",call_count[0]);
    // console.log("DDDDDAAAATTTTEEE     ::::::::",this.date_time);    
    // console.log("HELLO VALUES   :::::",this.countValues);
    this.day1 = this.from_date;
    var date2 = new Date(this.from_date);
    date2.setDate(date2.getDate() + 1);
    this.day2 = this.datePipe.transform(date2,"yyyy-MM-dd");
    var date3 = new Date(this.from_date);
    date3.setDate(date3.getDate() + 2);
    this.day3 = this.datePipe.transform(date3,"yyyy-MM-dd");
    var date4 = new Date(this.from_date);
    date4.setDate(date4.getDate() + 3);
    this.day4 = this.datePipe.transform(date4,"yyyy-MM-dd");
    var date5 = new Date(this.from_date);
    date5.setDate(date5.getDate() + 4);
    this.day5 = this.datePipe.transform(date5,"yyyy-MM-dd");
    var date6 = new Date(this.from_date);
    date6.setDate(date6.getDate() + 5);
    this.day6 = this.datePipe.transform(date6,"yyyy-MM-dd");
    var date7 = new Date(this.from_date);
    date7.setDate(date7.getDate() + 6);
    this.day7 = this.datePipe.transform(date7,"yyyy-MM-dd");
    console.log("DATES    ::::",this.day1,this.day2,this.day3,this.day4,this.day5,this.day6,this.day7);



    const root = am5.Root.new("chartdiv");

root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "none",
  wheelY: "none",
  layout: root.verticalLayout
}));


let yRenderer = am5xy.AxisRendererY.new(root, {
  visible: false,
  minGridDistance: 20,
  inversed: true
});

yRenderer.grid.template.set("visible", false);

let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  renderer: yRenderer,
  categoryField: "weekday"
}));

let xRenderer = am5xy.AxisRendererX.new(root, {
  visible: false,
  minGridDistance: 30,
  opposite:true
});

xRenderer.grid.template.set("visible", false);

let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  renderer: xRenderer,
  categoryField: "hour"
}));


// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
let series = chart.series.push(am5xy.ColumnSeries.new(root, {
  calculateAggregates: true,
  stroke: am5.color(0xffffff),
  clustered: false,
  xAxis: xAxis,
  yAxis: yAxis,
  categoryXField: "hour",
  categoryYField: "weekday",
  valueField: "value"
}));

series.columns.template.setAll({
  tooltipText: "{value}",
  strokeOpacity: 1,
  strokeWidth: 2,
  width: am5.percent(100),
  height: am5.percent(100)
});

series.columns.template.events.on("pointerover", function(event) {
  let di = event.target.dataItem;
  if (di) {
    heatLegend.showValue(di.get("value", 0));
  }
});

series.events.on("datavalidated", function() {
  heatLegend.set("startValue", series.getPrivate("valueHigh"));
  heatLegend.set("endValue", series.getPrivate("valueLow"));
});
//set up title
chart.children.unshift(am5.Label.new(root, {
  text: this.from_date + "  to  " + this.to_date,
  fontSize: 25,
  fontWeight: "300",
  textAlign: "center",
  x: am5.percent(50),
  centerX: am5.percent(50),
  paddingTop: 20,
  paddingBottom: 10
}));
// Set up heat rules
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series.set("heatRules", [{
  target: series.columns.template,
  min: am5.color(0xfffb77),
  max: am5.color(0xfe131a),
  dataField: "value",
  key: "fill"
}]);



// Add heat legend
// https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/
let heatLegend = chart.bottomAxesContainer.children.push(am5.HeatLegend.new(root, {
  orientation: "horizontal",
  endColor: am5.color(0xfffb77),
  startColor: am5.color(0xfe131a)
}));
//heat_data = hd; row number = 10; time = 12; am,pm = a,p//

// Set data
// https://www.amcharts.com/docs/v5/charts/xy-chart/#Setting_data
let data = [{
  hour: "12am",
  weekday: this.day1,
  value: Number(d1t0)
}, {
  hour: "1am",
  weekday: this.day1,
  value: Number(d1t1)
}, {
  hour: "2am",
  weekday: this.day1,
  value: Number(d1t2)
}, {
  hour: "3am",
  weekday: this.day1,
  value: Number(d1t3)
}, {
  hour: "4am",
  weekday: this.day1,
  value: Number(d1t4)
}, {
  hour: "5am",
  weekday: this.day1,
  value: Number(d1t5)
}, {
  hour: "6am",
  weekday: this.day1,
  value: Number(d1t6)
}, {
  hour: "7am",
  weekday: this.day1,
  value: Number(d1t7)
}, {
  hour: "8am",
  weekday: this.day1,
  value: Number(d1t8)
}, {
  hour: "9am",
  weekday: this.day1,
  value: Number(d1t9)
}, {
  hour: "10am",
  weekday: this.day1,
  value: Number(d1t10)
}, {
  hour: "11am",
  weekday: this.day1,
  value: Number(d1t11)
}, {
  hour: "12pm",
  weekday: this.day1,
  value: Number(d1t12)
}, {
  hour: "1pm",
  weekday: this.day1,
  value: Number(d1t13)
}, {
  hour: "2pm",
  weekday: this.day1,
  value: Number(d1t14)
}, {
  hour: "3pm",
  weekday: this.day1,
  value: Number(d1t15)
}, {
  hour: "4pm",
  weekday: this.day1,
  value: Number(d1t16)
}, {
  hour: "5pm",
  weekday: this.day1,
  value: Number(d1t17)
}, {
  hour: "6pm",
  weekday: this.day1,
  value: Number(d1t18)
}, {
  hour: "7pm",
  weekday: this.day1,
  value: Number(d1t19)
}, {
  hour: "8pm",
  weekday: this.day1,
  value: Number(d1t20)
}, {
  hour: "9pm",
  weekday: this.day1,
  value: Number(d1t21)
}, {
  hour: "10pm",
  weekday: this.day1,
  value: Number(d1t22)
}, {
  hour: "11pm",
  weekday: this.day1,
  value: Number(d1t23)
}, {
  hour: "12am",
  weekday: this.day2,
  value: Number(d2t0)
}, {
  hour: "1am",
  weekday: this.day2,
  value: Number(d2t1)
}, {
  hour: "2am",
  weekday: this.day2,
  value: Number(d2t3)
}, {
  hour: "3am",
  weekday: this.day2,
  value: Number(d2t4)
}, {
  hour: "4am",
  weekday: this.day2,
  value: Number(d2t4)
}, {
  hour: "5am",
  weekday: this.day2,
  value: Number(d2t5)
}, {
  hour: "6am",
  weekday: this.day2,
  value: Number(d2t6)
}, {
  hour: "7am",
  weekday: this.day2,
  value: Number(d2t7)
}, {
  hour: "8am",
  weekday: this.day2,
  value: Number(d2t8)
}, {
  hour: "9am",
  weekday: this.day2,
  value: Number(d2t9)
}, {
  hour: "10am",
  weekday: this.day2,
  value: Number(d2t10)
}, {
  hour: "11am",
  weekday: this.day2,
  value: Number(d2t11)
}, {
  hour: "12pm",
  weekday: this.day2,
  value: Number(d2t12)
}, {
  hour: "1pm",
  weekday: this.day2,
  value: Number(d2t13)
}, {
  hour: "2pm",
  weekday: this.day2,
  value: Number(d2t14)
}, {
  hour: "3pm",
  weekday: this.day2,
  value: Number(d2t15)
}, {
  hour: "4pm",
  weekday: this.day2,
  value: Number(d2t16)
}, {
  hour: "5pm",
  weekday: this.day2,
  value: Number(d2t17)
}, {
  hour: "6pm",
  weekday: this.day2,
  value: Number(d2t18)
}, {
  hour: "7pm",
  weekday: this.day2,
  value: Number(d2t19)
}, {
  hour: "8pm",
  weekday: this.day2,
  value: Number(d2t20)
}, {
  hour: "9pm",
  weekday: this.day2,
  value: Number(d2t21)
}, {
  hour: "10pm",
  weekday: this.day2,
  value: Number(d2t22)
}, {
  hour: "11pm",
  weekday: this.day2,
  value: Number(d2t23)
}, {
  hour: "12am",
  weekday: this.day3,
  value: Number(d3t0)
}, {
  hour: "1am",
  weekday: this.day3,
  value: Number(d3t1)
}, {
  hour: "2am",
  weekday: this.day3,
  value: Number(d3t2)
}, {
  hour: "3am",
  weekday: this.day3,
  value: Number(d3t3)
}, {
  hour: "4am",
  weekday: this.day3,
  value: Number(d3t4)
}, {
  hour: "5am",
  weekday: this.day3,
  value: Number(d3t5)
}, {
  hour: "6am",
  weekday: this.day3,
  value: Number(d3t6)
}, {
  hour: "7am",
  weekday: this.day3,
  value: Number(d3t7)
}, {
  hour: "8am",
  weekday: this.day3,
  value: Number(d3t8)
}, {
  hour: "9am",
  weekday: this.day3,
  value: Number(d3t9)
}, {
  hour: "10am",
  weekday: this.day3,
  value: Number(d3t10)
}, {
  hour: "11am",
  weekday: this.day3,
  value: Number(d3t11)
}, {
  hour: "12pm",
  weekday: this.day3,
  value: Number(d3t12)
}, {
  hour: "1pm",
  weekday: this.day3,
  value: Number(d3t13)
}, {
  hour: "2pm",
  weekday: this.day3,
  value: Number(d3t14)
}, {
  hour: "3pm",
  weekday: this.day3,
  value: Number(d3t15)
}, {
  hour: "4pm",
  weekday: this.day3,
  value: Number(d3t16)
}, {
  hour: "5pm",
  weekday: this.day3,
  value: Number(d3t17)
}, {
  hour: "6pm",
  weekday: this.day3,
  value: Number(d3t18)
}, {
  hour: "7pm",
  weekday: this.day3,
  value: Number(d3t19)
}, {
  hour: "8pm",
  weekday: this.day3,
  value: Number(d3t20)
}, {
  hour: "9pm",
  weekday: this.day3,
  value: Number(d3t21)
}, {
  hour: "10pm",
  weekday: this.day3,
  value: Number(d3t22)
}, {
  hour: "11pm",
  weekday: this.day3,
  value: Number(d3t23)
}, {
  hour: "12am",
  weekday: this.day4,
  value: Number(d4t0)
}, {
  hour: "1am",
  weekday: this.day4,
  value: Number(d4t1)
}, {
  hour: "2am",
  weekday: this.day4,
  value: Number(d4t2)
}, {
  hour: "3am",
  weekday: this.day4,
  value: Number(d4t3)
}, {
  hour: "4am",
  weekday: this.day4,
  value: Number(d4t4)
}, {
  hour: "5am",
  weekday: this.day4,
  value: Number(d4t5)
}, {
  hour: "6am",
  weekday: this.day4,
  value: Number(d4t6)
}, {
  hour: "7am",
  weekday: this.day4,
  value: Number(d4t7)
}, {
  hour: "8am",
  weekday: this.day4,
  value: Number(d4t8)
}, {
  hour: "9am",
  weekday: this.day4,
  value: Number(d4t9)
}, {
  hour: "10am",
  weekday: this.day4,
  value: Number(d4t10)
}, {
  hour: "11am",
  weekday: this.day4,
  value: Number(d4t11)
}, {
  hour: "12pm",
  weekday: this.day4,
  value: Number(d4t12)
}, {
  hour: "1pm",
  weekday: this.day4,
  value: Number(d4t13)
}, {
  hour: "2pm",
  weekday: this.day4,
  value: Number(d4t14)
}, {
  hour: "3pm",
  weekday: this.day4,
  value: Number(d4t15)
}, {
  hour: "4pm",
  weekday: this.day4,
  value: Number(d4t16)
}, {
  hour: "5pm",
  weekday: this.day4,
  value: Number(d4t17)
}, {
  hour: "6pm",
  weekday: this.day4,
  value: Number(d4t18)
}, {
  hour: "7pm",
  weekday: this.day4,
  value: Number(d4t19)
}, {
  hour: "8pm",
  weekday: this.day4,
  value: Number(d4t20)
}, {
  hour: "9pm",
  weekday: this.day4,
  value: Number(d4t21)
}, {
  hour: "10pm",
  weekday: this.day4,
  value: Number(d4t22)
}, {
  hour: "11pm",
  weekday: this.day4,
  value: Number(d4t23)
}, {
  hour: "12am",
  weekday: this.day5,
  value: Number(d5t0)
}, {
  hour: "1am",
  weekday: this.day5,
  value: Number(d5t1)
}, {
  hour: "2am",
  weekday: this.day5,
  value: Number(d5t2)
}, {
  hour: "3am",
  weekday: this.day5,
  value: Number(d5t3)
}, {
  hour: "4am",
  weekday: this.day5,
  value: Number(d5t4)
}, {
  hour: "5am",
  weekday: this.day5,
  value: Number(d5t5)
}, {
  hour: "6am",
  weekday: this.day5,
  value: Number(d5t6)
}, {
  hour: "7am",
  weekday: this.day5,
  value: Number(d5t7)
}, {
  hour: "8am",
  weekday: this.day5,
  value: Number(d5t8)
}, {
  hour: "9am",
  weekday: this.day5,
  value: Number(d5t9)
}, {
  hour: "10am",
  weekday: this.day5,
  value: Number(d5t10)
}, {
  hour: "11am",
  weekday: this.day5,
  value: Number(d5t11)
}, {
  hour: "12pm",
  weekday: this.day5,
  value: Number(d5t12)
}, {
  hour: "1pm",
  weekday: this.day5,
  value: Number(d5t13)
}, {
  hour: "2pm",
  weekday: this.day5,
  value: Number(d5t14)
}, {
  hour: "3pm",
  weekday: this.day5,
  value: Number(d5t15)
}, {
  hour: "4pm",
  weekday: this.day5,
  value: Number(d5t16)
}, {
  hour: "5pm",
  weekday: this.day5,
  value: Number(d5t17)
}, {
  hour: "6pm",
  weekday: this.day5,
  value: Number(d5t18)
}, {
  hour: "7pm",
  weekday: this.day5,
  value: Number(d5t19)
}, {
  hour: "8pm",
  weekday: this.day5,
  value: Number(d5t20)
}, {
  hour: "9pm",
  weekday: this.day5,
  value: Number(d5t21)
}, {
  hour: "10pm",
  weekday: this.day5,
  value: Number(d5t22)
}, {
  hour: "11pm",
  weekday: this.day5,
  value: Number(d5t23)
}, {
  hour: "12am",
  weekday: this.day6,
  value: Number(d6t0)
}, {
  hour: "1am",
  weekday: this.day6,
  value: Number(d6t1)
}, {
  hour: "2am",
  weekday: this.day6,
  value: Number(d6t2)
}, {
  hour: "3am",
  weekday: this.day6,
  value: Number(d6t3)
}, {
  hour: "4am",
  weekday: this.day6,
  value: Number(d6t4)
}, {
  hour: "5am",
  weekday: this.day6,
  value: Number(d6t5)
}, {
  hour: "6am",
  weekday: this.day6,
  value: Number(d6t6)
}, {
  hour: "7am",
  weekday: this.day6,
  value: Number(d6t7)
}, {
  hour: "8am",
  weekday: this.day6,
  value: Number(d6t8)
}, {
  hour: "9am",
  weekday: this.day6,
  value: Number(d6t9)
}, {
  hour: "10am",
  weekday: this.day6,
  value: Number(d6t10)
}, {
  hour: "11am",
  weekday: this.day6,
  value: Number(d6t11)
}, {
  hour: "12pm",
  weekday: this.day6,
  value: Number(d6t12)
}, {
  hour: "1pm",
  weekday: this.day6,
  value: Number(d6t13)
}, {
  hour: "2pm",
  weekday: this.day6,
  value: Number(d6t14)
}, {
  hour: "3pm",
  weekday: this.day6,
  value: Number(d6t15)
}, {
  hour: "4pm",
  weekday: this.day6,
  value: Number(d6t16)
}, {
  hour: "5pm",
  weekday: this.day6,
  value: Number(d6t17)
}, {
  hour: "6pm",
  weekday: this.day6,
  value: Number(d6t18)
}, {
  hour: "7pm",
  weekday: this.day6,
  value: Number(d6t19)
}, {
  hour: "8pm",
  weekday: this.day6,
  value: Number(d6t20)
}, {
  hour: "9pm",
  weekday: this.day6,
  value: Number(d6t21)
}, {
  hour: "10pm",
  weekday: this.day6,
  value: Number(d6t22)
}, {
  hour: "11pm",
  weekday: this.day6,
  value: Number(d6t23)
}, {
  hour: "12am",
  weekday: this.day7,
  value: Number(d7t0)
}, {
  hour: "1am",
  weekday: this.day7,
  value: Number(d7t1)
}, {
  hour: "2am",
  weekday: this.day7,
  value: Number(d7t2)
}, {
  hour: "3am",
  weekday: this.day7,
  value: Number(d7t3)
}, {
  hour: "4am",
  weekday: this.day7,
  value: Number(d7t4)
}, {
  hour: "5am",
  weekday: this.day7,
  value: Number(d7t5)
}, {
  hour: "6am",
  weekday: this.day7,
  value: Number(d7t6)
}, {
  hour: "7am",
  weekday: this.day7,
  value: Number(d7t7)
}, {
  hour: "8am",
  weekday: this.day7,
  value: Number(d7t8)
}, {
  hour: "9am",
  weekday: this.day7,
  value: Number(d7t9)
}, {
  hour: "10am",
  weekday: this.day7,
  value: Number(d7t10)
}, {
  hour: "11am",
  weekday: this.day7,
  value: Number(d7t11)
}, {
  hour: "12pm",
  weekday: this.day7,
  value: Number(d7t12)
}, {
  hour: "1pm",
  weekday: this.day7,
  value: Number(d7t13)
}, {
  hour: "2pm",
  weekday: this.day7,
  value: Number(d7t14)
}, {
  hour: "3pm",
  weekday: this.day7,
  value: Number(d7t15)
}, {
  hour: "4pm",
  weekday: this.day7,
  value: Number(d7t16)
}, {
  hour: "5pm",
  weekday: this.day7,
  value: Number(d7t17)
}, {
  hour: "6pm",
  weekday: this.day7,
  value: Number(d7t18)
}, {
  hour: "7pm",
  weekday: this.day7,
  value: Number(d7t19)
}, {
  hour: "8pm",
  weekday: this.day7,
  value: Number(d7t20)
}, {
  hour: "9pm",
  weekday: this.day7,
  value: Number(d7t21)
}, {
  hour: "10pm",
  weekday: this.day7,
  value: Number(d7t22)
}, {
  hour: "11pm",
  weekday: this.day7,
  value: Number(d7t23)
}
]

series.data.setAll(data);

yAxis.data.setAll([
  { weekday: this.day1 },
  { weekday: this.day2 },
  { weekday: this.day3 },
  { weekday: this.day4 },
  { weekday: this.day5 },
  { weekday: this.day6 },
  { weekday: this.day7 }
]);

xAxis.data.setAll([
  { hour: "12am" },
  { hour: "1am" },
  { hour: "2am" },
  { hour: "3am" },
  { hour: "4am" },
  { hour: "5am" },
  { hour: "6am" },
  { hour: "7am" },
  { hour: "8am" },
  { hour: "9am" },
  { hour: "10am" },
  { hour: "11am" },
  { hour: "12pm" },
  { hour: "1pm" },
  { hour: "2pm" },
  { hour: "3pm" },
  { hour: "4pm" },
  { hour: "5pm" },
  { hour: "6pm" },
  { hour: "7pm" },
  { hour: "8pm" },
  { hour: "9pm" },
  { hour: "10pm" },
  { hour: "11pm" }
]);

chart.appear(1000, 100);
},
(error) => {
  console.log(error);
});
}
}
