import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualInvoiceProviderComponent } from './individual-invoice-provider.component';

describe('IndividualInvoiceProviderComponent', () => {
  let component: IndividualInvoiceProviderComponent;
  let fixture: ComponentFixture<IndividualInvoiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualInvoiceProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualInvoiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
