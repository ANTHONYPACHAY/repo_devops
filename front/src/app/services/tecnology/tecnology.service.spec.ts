import { TestBed } from '@angular/core/testing';

import { TecnologyService } from './tecnology.service';

describe('TecnologyService', () => {
  let service: TecnologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
