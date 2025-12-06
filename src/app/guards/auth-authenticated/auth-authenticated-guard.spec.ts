import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authAuthenticatedGuard } from './auth-authenticated-guard';

describe('authAuthenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authAuthenticatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
