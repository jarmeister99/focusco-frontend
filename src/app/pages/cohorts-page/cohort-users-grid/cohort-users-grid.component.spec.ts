import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortUsersGridComponent } from './cohort-users-grid.component';

describe('CohortUsersGridComponent', () => {
  let component: CohortUsersGridComponent;
  let fixture: ComponentFixture<CohortUsersGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CohortUsersGridComponent]
    });
    fixture = TestBed.createComponent(CohortUsersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
