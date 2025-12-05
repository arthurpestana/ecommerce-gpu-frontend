import { TestBed } from '@angular/core/testing';

import { OrderQueryService } from './order-query.service';

describe('OrderQueryService', () => {
  let service: OrderQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
