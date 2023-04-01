import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTariffComponent } from './call-tariff.component';

describe('CallTariffComponent', () => {
  let component: CallTariffComponent;
  let fixture: ComponentFixture<CallTariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallTariffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
