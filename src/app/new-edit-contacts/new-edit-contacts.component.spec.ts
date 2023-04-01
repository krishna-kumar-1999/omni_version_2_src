import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditContactsComponent } from './new-edit-contacts.component';

describe('NewEditContactsComponent', () => {
  let component: NewEditContactsComponent;
  let fixture: ComponentFixture<NewEditContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
