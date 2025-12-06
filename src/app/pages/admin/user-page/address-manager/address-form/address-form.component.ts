import { Component, Input, Output, EventEmitter, inject, signal, OnChanges } from '@angular/core';
import { FormDialogComponent } from '../../../../../components/dialogs/form-dialog/form-dialog.component';
import { ContainerDivComponent } from '../../../../../components/container-div/container-div.component';
import { InputTextComponent } from '../../../../../components/inputs/input-text/input-text.component';
import { InputMaskComponent } from '../../../../../components/inputs/input-mask/input-mask.component';
import { ButtonComponent } from '../../../../../components/button/button.component';
import { ToastService } from '../../../../../services/toast-service/toast-service.service';
import { AddressQueryService } from '../../../../../services/api/address/address-query/address-query.service';
import { AddressRequest, AddressResponse } from '../../../../../lib/interfaces/IAddress';
import { addressRequestSchema } from '../../../../../lib/schemas/address.schema';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    FormDialogComponent,
    ContainerDivComponent,
    InputTextComponent,
    InputMaskComponent,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent implements OnChanges {

  private readonly toast = inject(ToastService);
  private readonly addressQuery = inject(AddressQueryService);

  @Input() open = false;
  @Input() userId: string | null = null;
  @Input() address: AddressResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  form: AddressRequest = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Brasil',
    userId: ''
  };

  ngOnChanges() {
    if (this.address) {
      this.form = {
        street: this.address.street,
        city: this.address.city,
        state: this.address.state,
        zipCode: this.address.zipCode,
        country: this.address.country,
        userId: this.address.userId
      };
    } else if (this.userId) {
      this.form.userId = this.userId!;
    }
  }

  submit() {
    const parsed = addressRequestSchema.safeParse(this.form);

    if (!parsed.success) {
      Object.values(parsed.error.flatten().fieldErrors)
        .forEach(errs => errs?.forEach(msg => this.toast.error(msg)));
      return;
    }

    if (this.address?.id) {
      this.addressQuery.updateAddress.mutate(
        { id: this.address.id, data: parsed.data },
        { onSuccess: () => this.saved.emit() }
      );
    } else {
      this.addressQuery.createAddress.mutate(
        parsed.data,
        { onSuccess: () => this.saved.emit() }
      );
    }
  }
}
