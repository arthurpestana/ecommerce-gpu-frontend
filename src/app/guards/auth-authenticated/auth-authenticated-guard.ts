import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthQueryService } from '../../services/api/auth/auth-query/auth-query.service';

export const authAuthenticatedGuard: CanActivateFn = async () => {
  const auth = inject(AuthQueryService);
  const router = inject(Router);

  const token = auth.token();
  let user = auth.user();

  if (!token) {
    router.navigate(['/']);
    return false;
  }

  if (!user) {
    try {
      const result = await auth.authenticatedUser.refetch();
      if (result.data) {
        auth.user.set(result.data);
        user = result.data;
      }
    } catch {
      router.navigate(['/']);
      return false;
    }
  }

  if (!user) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
