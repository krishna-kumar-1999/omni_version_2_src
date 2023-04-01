import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTariffsReportComponent } from './call-tariffs-report.component';

describe('CallTariffsReportComponent', () => {
  let component: CallTariffsReportComponent;
  let fixture: ComponentFixture<CallTariffsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallTariffsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallTariffsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
