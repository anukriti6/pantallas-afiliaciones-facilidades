import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesProviderDetailComponent } from './invoices-provider-detail.component';

describe('InvoicesProviderDetailComponent', () => {
  let component: InvoicesProviderDetailComponent;
  let fixture: ComponentFixture<InvoicesProviderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesProviderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesProviderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
