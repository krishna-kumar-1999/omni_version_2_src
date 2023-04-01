import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CxAgentListComponent } from './cx-agent-list.component';

describe('CxAgentListComponent', () => {
  let component: CxAgentListComponent;
  let fixture: ComponentFixture<CxAgentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CxAgentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CxAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
