import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoSettingsCloneComponent } from './sso-settings-clone.component';

describe('SsoSettingsCloneComponent', () => {
  let component: SsoSettingsCloneComponent;
  let fixture: ComponentFixture<SsoSettingsCloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoSettingsCloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoSettingsCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
