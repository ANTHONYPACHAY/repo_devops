import { TestBed } from '@angular/core/testing';

import { ScriptTypeService } from './script-type.service';

describe('ScriptTypeService', () => {
  let service: ScriptTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
