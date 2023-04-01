import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallQueueManagementComponent } from './call-queue-management.component';

describe('CallQueueManagementComponent', () => {
  let component: CallQueueManagementComponent;
  let fixture: ComponentFixture<CallQueueManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallQueueManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallQueueManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
