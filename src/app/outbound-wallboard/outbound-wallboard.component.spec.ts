import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundWallboardComponent } from './outbound-wallboard.component';

describe('OutboundWallboardComponent', () => {
  let component: OutboundWallboardComponent;
  let fixture: ComponentFixture<OutboundWallboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundWallboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboundWallboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
