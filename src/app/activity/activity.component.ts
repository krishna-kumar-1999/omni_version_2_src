import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  contact_id;
  addnotes: FormGroup;
  oldNotes;
  uadmin_id;
  users;
  departments;
  note_id;
  editNotesList;
  uniqueID;
  auxcode_Category;
  editPopup;
  admin_id;
  auxcodes;
  category_name;

  wrap_up_category;
  wrap_up_codes;
  opportunity_ids;
  text_notes;
  editnoteId;

  ActivityrecordNotFound = false;
  constructor(private serverService: ServerService, private router:Router,private route: ActivatedRoute) { 
    this.contact_id = this.route.snapshot.queryParamMap.get('contact_id');
    this.uniqueID = this.route.snapshot.queryParamMap.get('uniqueID');
  }

  ngOnInit() {
    this.uadmin_id = localStorage.getItem('userId');
    this.admin_id = localStorage.getItem('admin_id');
  this.getNotes();
  this.addnotes= new FormGroup({
    'modified_by' :new FormControl(null)
  });
  this.getDepartments();
  this.getAuxCatogory();
  }
  getNotes(){
    let conct_req:any = new Object();
    let api_req:any = new Object();
    conct_req.user_id=localStorage.getItem('userId');
    conct_req.action="get_contact_notes";
    conct_req.unique_id=this.uniqueID;
    api_req.operation="contact";
    api_req.moduleType="contact";
    api_req.api_type="web";
    api_req.access_token=localStorage.getItem('access_token');
    api_req.element_data = conct_req;
  
      this.serverService.sendServer(api_req).subscribe((response:any) => {

        if(response.result.status==true){
          this.oldNotes=response.result.data;
          this.editNotesList = response.result.data;
          this.ActivityrecordNotFound = this.oldNotes.length == 0 ? true : false;
          // alert(this.ActivityrecordNotFound);
        }
    }, 
    (error)=>{
        console.log(error);
    });
  }

bcktoContc(contact_id){
      console.log(contact_id);
      let conct_req:any = new Object();
      let api_req:any = new Object();
      conct_req.user_id=localStorage.getItem('userId');
      conct_req.action="get_contact_by_id";
      conct_req.contact_id=contact_id;
      api_req.operation="contact";
      api_req.moduleType="contact";
      api_req.api_type="web";
      api_req.access_token=localStorage.getItem('access_token');
      api_req.element_data = conct_req;
      this.serverService.sendServer(api_req).subscribe((response:any) => {
        if(response.result.status==true){
          var decodedString = btoa(response.result.data[0].phone );
          var cont_id = btoa(this.uniqueID );
          // var decodedString = btoa(contact_id);
          this.router.navigate(['/edit-contacts-dup'], { queryParams: { phone:  decodedString,cont_id:cont_id} });
        }
      }, 
      (error)=>{
          console.log(error);
      });
}



genTicket(note_id){ 
  this.note_id = note_id; 
    $('#assign_ticket').modal('show');
}


getDepartments(){
  let access_token: any=localStorage.getItem('access_token');

  let api_req:any = '{"operation":"ticket", "moduleType":"ticket", "api_type": "web", "access_token":"'+access_token+'", "element_data":{"action":"get_dept_settings","user_id":"'+this.uadmin_id+'"}}';

  this.serverService.sendServer(api_req).subscribe((response:any) => {
    if(response.result.status==true){
      this.departments = response.result.data;
    } else {
    }
  }, 
  (error)=>{
      console.log(error);
  });
}

getDeptUsers(){
  let access_token: any=localStorage.getItem('access_token');
  let department_id: any= $('#departments').val();
  let api_req:any = '{"operation":"ticket", "moduleType":"ticket", "api_type":"web", "access_token":"'+access_token+'", "element_data":{"action":"get_agents_by_department","dept_id":"'+department_id+'","admin_id":"'+this.uadmin_id+'"}}';
  this.serverService.sendServer(api_req).subscribe((response: any) => {
    if (response.result.status == true) {
          this.users = response.result.data;
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


assignTicket(note_id){  

  let assigned_department_id: any= $('#departments').val();
  let res_departments: any= $('#res_departments').val();
  let activity: any= $('#activity').val();
 
if(assigned_department_id == '0'){
  iziToast.warning({
    message: "Please select department",
    position: 'topRight'
});
return false;
}
if(res_departments == '0'){
  iziToast.warning({
    message: "Please select responsible department",
    position: 'topRight'
});
return false;
}
if(activity == '0'){
  iziToast.warning({
    message: "Please select activity",
    position: 'topRight'
});
return false;
}


    let access_token: any=localStorage.getItem('access_token');
    let api_req:any = '{"operation":"ticket", "moduleType":"ticket", "api_type":"web", "access_token":"'+access_token+'", "element_data":{"action":"generate_ticket","user_id":"'+this.uadmin_id+'","department_id":"'+assigned_department_id+'","activity":"'+activity+'","res_departments":"'+res_departments+'","note_id":"'+note_id+'"}}';
        this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.result.status == 1) {
                iziToast.success({
                    message: "Ticket Generated Successfully",
                    position: 'topRight'
                });
                $('#assign_ticket').modal('hide');
                this.getNotes();
            } else {
            
                iziToast.warning({
                    message: "Ticket Not Generated. Please try again",
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

editActivity(callid){  
  console.log(callid);

  this.editPopup = this.editNotesList.filter(word =>
    // console.log(word)
     word.callid == callid
    );
  // console.log(this.editNotesList)
  console.log(this.editPopup)
  this.editnoteId = callid;
  this.wrap_up_category = this.editPopup[0].cat_id;
  console.log(this.wrap_up_category)
  this.wrap_up_codes = this.editPopup[0].auxcode_name;
  this.opportunity_ids = this.editPopup[0].opportunity_id;
  this.text_notes = this.editPopup[0].call_note;
  this.getAuxCode();
  $('#edit_activity').modal('show');

}


getAuxCatogory() {

  if (this.auxcode_Category != null)
    return false;

  let access_token: any = localStorage.getItem('access_token');
  let admin_id: any = localStorage.getItem('admin_id');
  let api_req: any = '{"operation":"getAuxcode", "moduleType":"contact", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"get_aux_code_category","admin_id":"' + admin_id + '","user_id":"' + this.uadmin_id + '"}}';

  this.serverService.sendServer(api_req).subscribe((response: any) => {
    if (response.result.status == true) {
      this.auxcode_Category = response.result.data;
    } else {
    }
  },
    (error) => {
      console.log(error);
    });
}



getAuxCode() {
  // if(this.auxcodes!=null)
  //  return false;
  // let cat_id = $('#dup_auxcodes_pop_dup').val();
  let cat_id = this.wrap_up_category;
  this.getCatname(cat_id);
  let access_token: any = localStorage.getItem('access_token');

  let api_req: any = '{"operation":"getAuxcode", "moduleType":"contact", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"getuax_by_cat","cat_id":"' + cat_id + '","admin_id":"' + this.admin_id + '"}}';

  this.serverService.sendServer(api_req).subscribe((response: any) => {
    if (response.result.status == true) {
      this.auxcodes = response.result.data;
    } else {
    }
  },
    (error) => {
      console.log(error);
    });
}


getCatname(id) {
  let access_token: any = localStorage.getItem('access_token');
  let api_req: any = '{"operation":"getAuxcode_data", "moduleType": "contact", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"edit_aux_code_category","cat_id":"' + id + '","admin_id":"' + this.admin_id + '"}}';

  this.serverService.sendServer(api_req).subscribe((response: any) => {
    if (response.result.status == true) {
      var agent_data = response.result.data;
      this.category_name = agent_data.category_name;

    } else {
      iziToast.warning({
        message: "Wrap Up codes not retrive. Please try again",
        position: 'topRight'
      });

    }
  },
    (error) => {
      console.log(error);
    });
}


updatedNotes(){

// $data = array("aux_code"=>$aux_code,"opportunity_id"=>$opportunity_id,"cat_id"=>$cat_id,"call_note"=>$call_note,"note_id"=>$note_id);
    
// let access_token: any = localStorage.getItem('access_token');
let notes = this.text_notes.toString().replaceAll(/"|'/g, '');

let api_req: any = new Object;
let conct_req: any = new Object();

api_req.operation = "contact";
api_req.moduleType = "contact";
api_req.api_type = "web";
api_req.access_token = localStorage.getItem('access_token');

conct_req.aux_code = this.wrap_up_codes;
conct_req.opportunity_id = this.opportunity_ids;
conct_req.cat_id = this.wrap_up_category;
conct_req.call_note = notes;
conct_req.note_id = this.editnoteId;
conct_req.admin_id = this.admin_id;
conct_req.user_id = this.uadmin_id;
api_req.element_data = conct_req;

// api_req.element_data.admin_id = this.admin_id;
api_req.element_data.action = "update_notes";



// let api_req: any = '{"operation":"contact", "moduleType": "contact", "api_type": "web", "access_token":"' + access_token + '", "element_data":{"action":"update_notes","aux_code":"' + this.wrap_up_codes + '","opportunity_id":"' + this.opportunity_ids + '","cat_id":"'+this.wrap_up_category+'","call_note":"'+notes+'","note_id":"'+this.editnoteId+'"}}';

this.serverService.sendServer(api_req).subscribe((response: any) => {

  if(response.result.data == 1){
    this.getNotes();
    iziToast.success({
      message: "Notes update Successfully",
      position: 'topRight'
  });
    $('#edit_activity').modal('hide');
  }

},
(error) => {
  console.log(error);
});

}



}
