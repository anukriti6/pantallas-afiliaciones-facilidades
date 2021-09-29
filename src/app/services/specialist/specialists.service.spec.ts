import { TestBed } from '@angular/core/testing';

import { SpecialistsService } from './invoices.service';

describe('InvoicesService', () => {
  let service: SpecialistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
