import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechatComponent } from './linechat.component';

describe('LinechatComponent', () => {
  let component: LinechatComponent;
  let fixture: ComponentFixture<LinechatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
