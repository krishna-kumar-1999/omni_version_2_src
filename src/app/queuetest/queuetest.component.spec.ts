import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuetestComponent } from './queuetest.component';

describe('QueuetestComponent', () => {
  let component: QueuetestComponent;
  let fixture: ComponentFixture<QueuetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuetestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
