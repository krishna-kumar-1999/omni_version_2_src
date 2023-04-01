import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSettingCloneComponent } from './agent-setting-clone.component';

describe('AgentSettingCloneComponent', () => {
  let component: AgentSettingCloneComponent;
  let fixture: ComponentFixture<AgentSettingCloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentSettingCloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSettingCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
