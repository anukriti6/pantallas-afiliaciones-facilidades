import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePaymentProviderComponent } from './invoice-payment-provider.component';

describe('InvoicePaymentProviderComponent', () => {
  let component: InvoicePaymentProviderComponent;
  let fixture: ComponentFixture<InvoicePaymentProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePaymentProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePaymentProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
