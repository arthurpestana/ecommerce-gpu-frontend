import { Component, EventEmitter, Input, Output, inject, computed } from '@angular/core';
import { ToastService } from '../../../../services/toast-service/toast-service.service';

import { FormDialogComponent } from '../../../../components/dialogs/form-dialog/form-dialog.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { InputTextComponent } from '../../../../components/inputs/input-text/input-text.component';
import { InputMaskComponent } from '../../../../components/inputs/input-mask/input-mask.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { SelectInputComponent, SelectOption } from '../../../../components/inputs/select-input/select-input.component';

import { UserRequest, UserResponse } from '../../../../lib/interfaces/IUser';
import { AddressRequest } from '../../../../lib/interfaces/IAddress';
import { UserRoles } from '../../../../lib/enums/UserRoles';

import { userRequestSchema } from '../../../../lib/schemas/user.schema';
import { addressRequestSchema } from '../../../../lib/schemas/address.schema';
import { InputPasswordComponent } from '../../../../components/inputs/input-password/input-password.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FormDialogComponent,
    ContainerDivComponent,
    InputTextComponent,
    InputMaskComponent,
    InputPasswordComponent,
    SelectInputComponent
  ],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  private readonly toast = inject(ToastService);

  @Input() open = false;
  @Input() user: UserResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();

  form: UserRequest = {
    name: '',
    email: '',
    phoneNumber: '',
    cpf: '',
    password: '',
    role: UserRoles.CUSTOMER,
    isActive: true,
  };

  userRolesOptions: SelectOption[] = [
    { value: UserRoles.CUSTOMER, label: 'Cliente' },
    { value: UserRoles.ADMIN, label: 'Administrador' },
  ];

  ngOnChanges() {
    if (this.user) {
      this.form = {
        name: this.user.name,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        cpf: this.user.cpf,
        password: '',
        role: this.user.role,
        isActive: this.user.isActive,
      };
    }
  }

  submit() {
    const parsedUser = userRequestSchema.safeParse(this.form);

    console.log(parsedUser);

    if (!parsedUser.success) {
      Object.values(parsedUser.error.flatten().fieldErrors)
        .forEach(errs => errs?.forEach(msg => this.toast.error(msg)));
      return;
    }

    this.submitForm.emit({
      id: this.user?.id,
      data: parsedUser.data,
    });
  }
}
