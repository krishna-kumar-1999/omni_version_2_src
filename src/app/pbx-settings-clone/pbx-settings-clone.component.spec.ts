import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbxSettingsCloneComponent } from './pbx-settings-clone.component';

describe('PbxSettingsCloneComponent', () => {
  let component: PbxSettingsCloneComponent;
  let fixture: ComponentFixture<PbxSettingsCloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbxSettingsCloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbxSettingsCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
