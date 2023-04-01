import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZohoBridgeComponent } from './zoho-bridge.component';

describe('ZohoBridgeComponent', () => {
  let component: ZohoBridgeComponent;
  let fixture: ComponentFixture<ZohoBridgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZohoBridgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZohoBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
