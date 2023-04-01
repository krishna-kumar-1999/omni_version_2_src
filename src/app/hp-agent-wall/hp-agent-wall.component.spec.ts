import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HpAgentWallComponent } from './hp-agent-wall.component';

describe('HpAgentWallComponent', () => {
  let component: HpAgentWallComponent;
  let fixture: ComponentFixture<HpAgentWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HpAgentWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HpAgentWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
