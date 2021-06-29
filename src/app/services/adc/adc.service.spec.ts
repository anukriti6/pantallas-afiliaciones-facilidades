import { TestBed } from '@angular/core/testing';

import { AdcService } from './adc.service';

describe('CompanyAdcService', () => {
  let service: AdcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
