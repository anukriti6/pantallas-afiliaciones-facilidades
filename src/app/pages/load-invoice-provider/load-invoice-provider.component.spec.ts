import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadInvoiceProviderComponent } from './load-invoice-provider.component';

describe('LoadInvoiceProviderComponent', () => {
  let component: LoadInvoiceProviderComponent;
  let fixture: ComponentFixture<LoadInvoiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadInvoiceProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadInvoiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
