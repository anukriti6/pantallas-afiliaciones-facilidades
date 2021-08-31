import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSearchInvoicesComponent } from './payment-search-invoices.component';

describe('PaymentSearchInvoicesComponent', () => {
  let component: PaymentSearchInvoicesComponent;
  let fixture: ComponentFixture<PaymentSearchInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSearchInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSearchInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
