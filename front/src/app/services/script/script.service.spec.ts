import { TestBed } from '@angular/core/testing';

import { ScriptService } from './script.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ScriptService', () => {
  let service: ScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ScriptService]
    });
    service = TestBed.inject(ScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
