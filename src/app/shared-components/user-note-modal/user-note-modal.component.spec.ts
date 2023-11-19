import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNoteModalComponent } from './user-note-modal.component';

describe('UserNoteModalComponent', () => {
  let component: UserNoteModalComponent;
  let fixture: ComponentFixture<UserNoteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserNoteModalComponent]
    });
    fixture = TestBed.createComponent(UserNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
