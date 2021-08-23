import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSearchInvoicesComponent } from './delete-search-invoices.component';

describe('DeleteSearchInvoicesComponent', () => {
  let component: DeleteSearchInvoicesComponent;
  let fixture: ComponentFixture<DeleteSearchInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSearchInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSearchInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
