import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CxWebclientComponent } from './cx-webclient.component';

describe('CxWebclientComponent', () => {
  let component: CxWebclientComponent;
  let fixture: ComponentFixture<CxWebclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CxWebclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CxWebclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
