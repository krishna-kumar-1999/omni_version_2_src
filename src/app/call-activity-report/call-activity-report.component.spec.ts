import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallActivityReportComponent } from './call-activity-report.component';

describe('CallActivityReportComponent', () => {
  let component: CallActivityReportComponent;
  let fixture: ComponentFixture<CallActivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallActivityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallActivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
