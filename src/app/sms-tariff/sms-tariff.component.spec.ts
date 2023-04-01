import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTariffComponent } from './sms-tariff.component';

describe('SmsTariffComponent', () => {
  let component: SmsTariffComponent;
  let fixture: ComponentFixture<SmsTariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsTariffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
