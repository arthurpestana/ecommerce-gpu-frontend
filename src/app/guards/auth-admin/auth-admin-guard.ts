import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthQueryService } from '../../services/api/auth/auth-query/auth-query.service';

export const authAdminGuard: CanActivateFn = async () => {
    const auth = inject(AuthQueryService);
    const router = inject(Router);

    const token = auth.token();
    let user = auth.user();

    console.log('[Guard] Token:', token);
    console.log('[Guard] User before fetch:', user);

    if (!token) {
        router.navigate(['/auth/login']);
        return false;
    }

    if (!user) {
        try {
            const result = await auth.authenticatedUser.refetch();

            console.log('[Guard] Refetch result:', result.data);

            if (result.data) {
                auth.user.set(result.data);
                user = result.data;
            }
        } catch (e) {
            console.error('[Guard] Erro ao fazer refetch:', e);
            router.navigate(['/auth/login']);
            return false;
        }
    }

    console.log('[Guard] User after fetch:', user);

    if (!user) {
        router.navigate(['/auth/login']);
        return false;
    }

    if (user.role !== 'ADMIN') {
        router.navigate(['/']);
        return false;
    }

    return true;
};
