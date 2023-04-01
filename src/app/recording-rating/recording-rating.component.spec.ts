import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingRatingComponent } from './recording-rating.component';

describe('RecordingRatingComponent', () => {
  let component: RecordingRatingComponent;
  let fixture: ComponentFixture<RecordingRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
