import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictiveActivityComponent } from './predictive-activity.component';

describe('PredictiveActivityComponent', () => {
  let component: PredictiveActivityComponent;
  let fixture: ComponentFixture<PredictiveActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictiveActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictiveActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
