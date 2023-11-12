import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSendComponentComponent } from './bulk-send-component.component';

describe('BulkSendComponentComponent', () => {
  let component: BulkSendComponentComponent;
  let fixture: ComponentFixture<BulkSendComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkSendComponentComponent]
    });
    fixture = TestBed.createComponent(BulkSendComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
