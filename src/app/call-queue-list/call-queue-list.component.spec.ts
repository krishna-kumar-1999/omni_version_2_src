import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallQueueListComponent } from './call-queue-list.component';

describe('CallQueueListComponent', () => {
  let component: CallQueueListComponent;
  let fixture: ComponentFixture<CallQueueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallQueueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallQueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
