import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSelectedPaneComponent } from './thread-selected-pane.component';

describe('ThreadSelectedPaneComponent', () => {
  let component: ThreadSelectedPaneComponent;
  let fixture: ComponentFixture<ThreadSelectedPaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadSelectedPaneComponent]
    });
    fixture = TestBed.createComponent(ThreadSelectedPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
