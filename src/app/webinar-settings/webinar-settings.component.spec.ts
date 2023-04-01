import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarSettingsComponent } from './webinar-settings.component';

describe('WebinarSettingsComponent', () => {
  let component: WebinarSettingsComponent;
  let fixture: ComponentFixture<WebinarSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebinarSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
