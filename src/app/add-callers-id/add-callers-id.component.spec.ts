import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCallersIdComponent } from './add-callers-id.component';

describe('AddCallersIdComponent', () => {
  let component: AddCallersIdComponent;
  let fixture: ComponentFixture<AddCallersIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCallersIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCallersIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
