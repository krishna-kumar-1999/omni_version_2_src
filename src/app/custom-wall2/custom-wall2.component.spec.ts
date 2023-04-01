import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWall2Component } from './custom-wall2.component';

describe('CustomWall2Component', () => {
  let component: CustomWall2Component;
  let fixture: ComponentFixture<CustomWall2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomWall2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomWall2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
