import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProviderInvoicesComponent } from './search-provider-invoices.component';

describe('SearchProviderInvoicesComponent', () => {
  let component: SearchProviderInvoicesComponent;
  let fixture: ComponentFixture<SearchProviderInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProviderInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProviderInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
