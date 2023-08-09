import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSelectorComponent } from './thread-selector.component';

describe('ThreadSelectorComponent', () => {
  let component: ThreadSelectorComponent;
  let fixture: ComponentFixture<ThreadSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadSelectorComponent]
    });
    fixture = TestBed.createComponent(ThreadSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
