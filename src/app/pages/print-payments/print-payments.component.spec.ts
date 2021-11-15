import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPaymentslComponent } from './invoices-provider-detail.component';

describe('InvoicesProviderDetailComponent', () => {
  let component: PrintPaymentslComponent;
  let fixture: ComponentFixture<PrintPaymentslComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPaymentslComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPaymentslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
