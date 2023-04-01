import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Customwallboard11Component } from './customwallboard11.component';

describe('Customwallboard11Component', () => {
  let component: Customwallboard11Component;
  let fixture: ComponentFixture<Customwallboard11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Customwallboard11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Customwallboard11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
