import { TestBed } from '@angular/core/testing';

import { ManufacturerQueryService } from './manufacturer-query.service';

describe('ManufacturerQueryService', () => {
  let service: ManufacturerQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManufacturerQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
