import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPaymentProviderComponent } from './credit-payment-provider.component';

describe('CreditPaymentProviderComponent', () => {
  let component: CreditPaymentProviderComponent;
  let fixture: ComponentFixture<CreditPaymentProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditPaymentProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditPaymentProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
