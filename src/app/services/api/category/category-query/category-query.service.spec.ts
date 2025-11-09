import { TestBed } from '@angular/core/testing';

import { CategoryQueryService } from './category-query.service';

describe('CategoryQueryService', () => {
  let service: CategoryQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
