import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadCreatorComponent } from './thread-creator.component';

describe('ThreadCreatorComponent', () => {
  let component: ThreadCreatorComponent;
  let fixture: ComponentFixture<ThreadCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadCreatorComponent]
    });
    fixture = TestBed.createComponent(ThreadCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
