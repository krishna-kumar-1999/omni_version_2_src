import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingGroupComponent } from './billing-group.component';

describe('BillingGroupComponent', () => {
  let component: BillingGroupComponent;
  let fixture: ComponentFixture<BillingGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
