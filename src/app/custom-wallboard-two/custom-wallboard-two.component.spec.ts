import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWallboardTwoComponent } from './custom-wallboard-two.component';

describe('CustomWallboardTwoComponent', () => {
  let component: CustomWallboardTwoComponent;
  let fixture: ComponentFixture<CustomWallboardTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomWallboardTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomWallboardTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
