import { TestBed } from '@angular/core/testing';

import { AddressQueryService } from './address-query.service';

describe('AddressQueryService', () => {
  let service: AddressQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
