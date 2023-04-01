import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var iziToast: any;


@Component({
  selector: 'app-new-edit-contacts',
  templateUrl: './new-edit-contacts.component.html',
  styleUrls: ['./new-edit-contacts.component.css']
})
export class NewEditContactsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  toggleClass() {
    // this.getAuxCode();

    $('.settingSidebar').toggleClass('showSettingPanel');
  }

}
