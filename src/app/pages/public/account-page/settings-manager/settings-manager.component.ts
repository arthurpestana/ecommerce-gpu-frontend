import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastService } from '../../../../services/toast-service/toast-service.service';
import { AuthQueryService } from '../../../../services/api/auth/auth-query/auth-query.service';
import { UserQueryService } from '../../../../services/api/user/user-query/user-query.service';

import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { InputTextComponent } from '../../../../components/inputs/input-text/input-text.component';
import { InputMaskComponent } from '../../../../components/inputs/input-mask/input-mask.component';
import { InputPasswordComponent } from '../../../../components/inputs/input-password/input-password.component';
import { ButtonComponent } from '../../../../components/button/button.component';

import { UserRequest } from '../../../../lib/interfaces/IUser';
import { userRequestSchema } from '../../../../lib/schemas/user.schema';
import { CpfMaskPipe } from '../../../../lib/utils/cpf-mask/cpf-mask-pipe';
import { PhoneNumberMaskPipe } from '../../../../lib/utils/phone-mask/phone-number-mask-pipe';

@Component({
    selector: 'app-settings-manager',
    standalone: true,
    imports: [
        CommonModule,
        ContainerDivComponent,
        InputTextComponent,
        InputMaskComponent,
        InputPasswordComponent,
        ButtonComponent
    ],
    templateUrl: './settings-manager.component.html',
    styleUrls: ['./settings-manager.component.css']
})
export class SettingsManagerComponent {

    private readonly auth = inject(AuthQueryService);
    private readonly userQuery = inject(UserQueryService);
    private readonly toast = inject(ToastService);

    user = this.auth.user();

    form: UserRequest = {
        name: '',
        email: '',
        phoneNumber: '',
        cpf: '',
        password: '',
        role: this.user?.role ?? 'CUSTOMER',
        isActive: true
    };

    ngOnInit() {
        if (this.user) {
            this.form = {
                name: this.user.name,
                email: this.user.email,
                phoneNumber: new PhoneNumberMaskPipe().transform(this.user.phoneNumber),
                cpf: new CpfMaskPipe().transform(this.user.cpf),
                password: '',
                role: this.user.role,
                isActive: this.user.isActive,
            };
        }
    }

    submit() {
        const parsed = userRequestSchema.safeParse(this.form);

        if (!parsed.success) {
            Object.values(parsed.error.flatten().fieldErrors)
                .forEach(errs => errs?.forEach(msg => this.toast.error(msg)));
            return;
        }

        if (!this.user) return;

        const payload = { ...parsed.data };

        if (!payload.password || payload.password.trim() === '') {
            delete (payload as any).password;
        }

        this.userQuery.updateUser.mutate({
            id: this.user.id,
            data: payload
        });
    }

}
