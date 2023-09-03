import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoreplyBoxComponent } from './autoreply-box.component';

describe('AutoreplyBoxComponent', () => {
  let component: AutoreplyBoxComponent;
  let fixture: ComponentFixture<AutoreplyBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoreplyBoxComponent]
    });
    fixture = TestBed.createComponent(AutoreplyBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
