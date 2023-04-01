import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWallboard12Component } from './custom-wallboard12.component';

describe('CustomWallboard12Component', () => {
  let component: CustomWallboard12Component;
  let fixture: ComponentFixture<CustomWallboard12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomWallboard12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomWallboard12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
