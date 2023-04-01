import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerRestartComponent } from './ser-restart.component';

describe('SerRestartComponent', () => {
  let component: SerRestartComponent;
  let fixture: ComponentFixture<SerRestartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerRestartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerRestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
