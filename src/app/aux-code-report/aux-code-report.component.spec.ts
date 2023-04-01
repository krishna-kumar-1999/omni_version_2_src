import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxCodeReportComponent } from './aux-code-report.component';

describe('AuxCodeReportComponent', () => {
  let component: AuxCodeReportComponent;
  let fixture: ComponentFixture<AuxCodeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxCodeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxCodeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
