import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTicketReportComponent } from './email-ticket-report.component';

describe('EmailTicketReportComponent', () => {
  let component: EmailTicketReportComponent;
  let fixture: ComponentFixture<EmailTicketReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTicketReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTicketReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
