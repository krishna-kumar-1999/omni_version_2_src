import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSettingsComponent } from './sso-settings.component';

describe('SsoSettingsComponent', () => {
  let component: SsoSettingsComponent;
  let fixture: ComponentFixture<SsoSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
