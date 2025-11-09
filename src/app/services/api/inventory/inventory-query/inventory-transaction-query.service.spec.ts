import { TestBed } from '@angular/core/testing';

import { InventoryTransactionQueryService } from './inventory-transaction-query.service';

describe('InventoryTransactionQueryService', () => {
  let service: InventoryTransactionQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryTransactionQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
