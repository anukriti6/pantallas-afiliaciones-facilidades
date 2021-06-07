import { TestBed } from '@angular/core/testing';

import { EasinessService } from './easiness.service';

describe('EasinessService', () => {
  let service: EasinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EasinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
