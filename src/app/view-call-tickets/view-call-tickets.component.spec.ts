import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCallTicketsComponent } from './view-call-tickets.component';

describe('ViewCallTicketsComponent', () => {
  let component: ViewCallTicketsComponent;
  let fixture: ComponentFixture<ViewCallTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCallTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCallTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
