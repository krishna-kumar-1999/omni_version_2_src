import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySummaryReportComponent } from './survey-summary-report.component';

describe('SurveySummaryReportComponent', () => {
  let component: SurveySummaryReportComponent;
  let fixture: ComponentFixture<SurveySummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
