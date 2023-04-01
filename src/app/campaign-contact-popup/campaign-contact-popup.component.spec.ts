import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignContactPopupComponent } from './campaign-contact-popup.component';

describe('CampaignContactPopupComponent', () => {
  let component: CampaignContactPopupComponent;
  let fixture: ComponentFixture<CampaignContactPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignContactPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignContactPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
