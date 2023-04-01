import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsGroupsComponent } from './sms-groups.component';

describe('SmsGroupsComponent', () => {
  let component: SmsGroupsComponent;
  let fixture: ComponentFixture<SmsGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
