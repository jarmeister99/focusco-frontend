import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectUsersComponent } from './multiselect-users.component';

describe('MultiselectUsersComponent', () => {
  let component: MultiselectUsersComponent;
  let fixture: ComponentFixture<MultiselectUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectUsersComponent]
    });
    fixture = TestBed.createComponent(MultiselectUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
