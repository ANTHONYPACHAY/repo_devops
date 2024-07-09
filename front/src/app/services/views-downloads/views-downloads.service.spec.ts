import { TestBed } from '@angular/core/testing';

import { ViewsDownloadsService } from './views-downloads.service';

describe('ViewsDownloadsService', () => {
  let service: ViewsDownloadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewsDownloadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
