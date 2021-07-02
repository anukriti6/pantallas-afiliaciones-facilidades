import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypeComponent } from './search-id.component';

describe('SearchIdComponent', () => {
  let component: InvoiceTypeComponent;
  let fixture: ComponentFixture<InvoiceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
