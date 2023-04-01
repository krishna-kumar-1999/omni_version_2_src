import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTicketingComponent } from './sms-ticketing.component';

describe('SmsTicketingComponent', () => {
  let component: SmsTicketingComponent;
  let fixture: ComponentFixture<SmsTicketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsTicketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTicketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
