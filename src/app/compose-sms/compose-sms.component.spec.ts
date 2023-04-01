import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeSmsComponent } from './compose-sms.component';

describe('ComposeSmsComponent', () => {
  let component: ComposeSmsComponent;
  let fixture: ComponentFixture<ComposeSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
