import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBiComponent } from './power-bi.component';

describe('PowerBiComponent', () => {
  let component: PowerBiComponent;
  let fixture: ComponentFixture<PowerBiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerBiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
