import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCsvUploadComponent } from './sms-csv-upload.component';

describe('SmsCsvUploadComponent', () => {
  let component: SmsCsvUploadComponent;
  let fixture: ComponentFixture<SmsCsvUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsCsvUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsCsvUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
