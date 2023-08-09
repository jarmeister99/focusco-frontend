import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiContactSelectorComponent } from './multi-contact-selector.component';

describe('MultiContactSelectorComponent', () => {
  let component: MultiContactSelectorComponent;
  let fixture: ComponentFixture<MultiContactSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiContactSelectorComponent]
    });
    fixture = TestBed.createComponent(MultiContactSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
