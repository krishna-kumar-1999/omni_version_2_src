import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTicketsComponent } from './call-tickets.component';

describe('CallTicketsComponent', () => {
  let component: CallTicketsComponent;
  let fixture: ComponentFixture<CallTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
