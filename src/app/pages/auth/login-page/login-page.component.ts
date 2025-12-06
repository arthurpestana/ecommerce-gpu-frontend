import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthQueryService } from '../../../services/api/auth/auth-query/auth-query.service';
import { ToastService } from '../../../services/toast-service/toast-service.service';

import { ContainerDivComponent } from '../../../components/container-div/container-div.component';
import { InputTextComponent } from '../../../components/inputs/input-text/input-text.component';
import { ButtonComponent } from '../../../components/button/button.component';

import { LoginRequest } from '../../../lib/interfaces/IAuth';
import { loginRequestSchema } from '../../../lib/schemas/auth.schema';
import { LucideIconComponent } from '../../../components/lucide-icon/lucide-icon.component';
import { InputPasswordComponent } from '../../../components/inputs/input-password/input-password.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ContainerDivComponent,
    InputTextComponent,
    ButtonComponent,
    InputPasswordComponent,
    LucideIconComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private readonly authQuery = inject(AuthQueryService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  form: LoginRequest = {
    email: '',
    password: ''
  };

  loading = signal(false);

  submit() {
    const parsed = loginRequestSchema.safeParse(this.form);

    if (!parsed.success) {
      Object.values(parsed.error.flatten().fieldErrors)
        .forEach(errs => errs?.forEach(msg => this.toast.error(msg)));
      return;
    }

    this.loading.set(true);

    this.authQuery.login.mutate(parsed.data, {
      onSuccess: (auth) => {
        const role = auth.user.role;

        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      onSettled: () => this.loading.set(false),
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
