import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOutboundFaxComponent } from './new-outbound-fax.component';

describe('NewOutboundFaxComponent', () => {
  let component: NewOutboundFaxComponent;
  let fixture: ComponentFixture<NewOutboundFaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOutboundFaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOutboundFaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
