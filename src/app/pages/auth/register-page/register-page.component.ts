import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthQueryService } from '../../../services/api/auth/auth-query/auth-query.service';
import { ToastService } from '../../../services/toast-service/toast-service.service';

import { ContainerDivComponent } from '../../../components/container-div/container-div.component';
import { InputTextComponent } from '../../../components/inputs/input-text/input-text.component';
import { InputPasswordComponent } from '../../../components/inputs/input-password/input-password.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { LucideIconComponent } from '../../../components/lucide-icon/lucide-icon.component';

import { RegisterRequest } from '../../../lib/interfaces/IAuth';
import { registerRequestSchema } from '../../../lib/schemas/auth.schema';
import { InputMaskComponent } from '../../../components/inputs/input-mask/input-mask.component';

@Component({
    selector: 'app-register-page',
    standalone: true,
    imports: [
        CommonModule,
        ContainerDivComponent,
        InputTextComponent,
        InputPasswordComponent,
        ButtonComponent,
        LucideIconComponent,
        InputMaskComponent
    ],
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

    private readonly authQuery = inject(AuthQueryService);
    private readonly toast = inject(ToastService);
    private readonly router = inject(Router);

    form: RegisterRequest = {
        name: '',
        email: '',
        phoneNumber: '',
        cpf: '',
        password: ''
    };

    loading = signal(false);

    submit() {
        const parsed = registerRequestSchema.safeParse(this.form);

        if (!parsed.success) {
            Object.values(parsed.error.flatten().fieldErrors)
                .forEach(errs => errs?.forEach(msg => this.toast.error(msg)));
            return;
        }

        this.loading.set(true);

        this.authQuery.register.mutate(parsed.data, {
            onSuccess: (auth) => {
                const role = auth.user.role;

                if (role === 'ADMIN') this.router.navigate(['/admin']);
                else this.router.navigate(['/']);
            },
            onSettled: () => this.loading.set(false),
        });
    }

    goToLogin() {
        this.router.navigate(['/auth/login']);
    }

    goToHome() {
        this.router.navigate(['/']);
    }
}
