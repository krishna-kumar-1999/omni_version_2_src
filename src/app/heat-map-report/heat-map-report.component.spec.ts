import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapReportComponent } from './heat-map-report.component';

describe('HeatMapReportComponent', () => {
  let component: HeatMapReportComponent;
  let fixture: ComponentFixture<HeatMapReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatMapReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatMapReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
