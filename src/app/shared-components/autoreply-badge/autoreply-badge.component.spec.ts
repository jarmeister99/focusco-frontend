import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoreplyBadgeComponent } from './autoreply-badge.component';

describe('AutoreplyBadgeComponent', () => {
  let component: AutoreplyBadgeComponent;
  let fixture: ComponentFixture<AutoreplyBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoreplyBadgeComponent]
    });
    fixture = TestBed.createComponent(AutoreplyBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
