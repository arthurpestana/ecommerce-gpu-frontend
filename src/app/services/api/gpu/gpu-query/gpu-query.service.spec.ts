import { TestBed } from '@angular/core/testing';

import { GpuQueryService } from './gpu-query.service';

describe('GpuQueryService', () => {
  let service: GpuQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpuQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
