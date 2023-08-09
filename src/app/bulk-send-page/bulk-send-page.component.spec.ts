import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSendPageComponent } from './bulk-send-page.component';

describe('BulkSendPageComponent', () => {
  let component: BulkSendPageComponent;
  let fixture: ComponentFixture<BulkSendPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkSendPageComponent]
    });
    fixture = TestBed.createComponent(BulkSendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
