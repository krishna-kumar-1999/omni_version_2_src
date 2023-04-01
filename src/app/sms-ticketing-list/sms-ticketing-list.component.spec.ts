import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTicketingListComponent } from './sms-ticketing-list.component';

describe('SmsTicketingListComponent', () => {
  let component: SmsTicketingListComponent;
  let fixture: ComponentFixture<SmsTicketingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsTicketingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTicketingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
