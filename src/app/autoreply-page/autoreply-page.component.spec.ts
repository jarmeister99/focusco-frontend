import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoreplyPageComponent } from './autoreply-page.component';

describe('AutoreplyPageComponent', () => {
  let component: AutoreplyPageComponent;
  let fixture: ComponentFixture<AutoreplyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoreplyPageComponent]
    });
    fixture = TestBed.createComponent(AutoreplyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
