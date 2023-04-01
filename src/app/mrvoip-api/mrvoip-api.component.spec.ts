import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrvoipApiComponent } from './mrvoip-api.component';

describe('MrvoipApiComponent', () => {
  let component: MrvoipApiComponent;
  let fixture: ComponentFixture<MrvoipApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrvoipApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrvoipApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
