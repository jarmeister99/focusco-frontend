import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSelectorEntryComponent } from './thread-selector-entry.component';

describe('ThreadSelectorEntryComponent', () => {
  let component: ThreadSelectorEntryComponent;
  let fixture: ComponentFixture<ThreadSelectorEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadSelectorEntryComponent]
    });
    fixture = TestBed.createComponent(ThreadSelectorEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
