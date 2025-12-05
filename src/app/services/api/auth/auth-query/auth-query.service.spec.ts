import { TestBed } from '@angular/core/testing';

import { AuthQueryService } from './auth-query.service';

describe('AuthQueryService', () => {
  let service: AuthQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
