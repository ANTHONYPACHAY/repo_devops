import { TestBed } from '@angular/core/testing';

import { OperativeSystemService } from './operative-system.service';

describe('OperativeSystemService', () => {
  let service: OperativeSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperativeSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
