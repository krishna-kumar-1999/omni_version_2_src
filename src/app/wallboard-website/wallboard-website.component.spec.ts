import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallboardWebsiteComponent } from './wallboard-website.component';

describe('WallboardWebsiteComponent', () => {
  let component: WallboardWebsiteComponent;
  let fixture: ComponentFixture<WallboardWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallboardWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallboardWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
