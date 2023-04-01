import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniContactsComponent } from './omni-contacts.component';

describe('OmniContactsComponent', () => {
  let component: OmniContactsComponent;
  let fixture: ComponentFixture<OmniContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmniContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
