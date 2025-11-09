import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ManufacturerRequest, ManufacturerResponse } from '../../../../lib/interfaces/IManufacturer';
import { manufacturerRequestSchema } from '../../../../lib/schemas/manufacturer.schema';
import { ToastService } from '../../../../services/toast-service/toast-service.service';

import { FormDialogComponent } from '../../../../components/dialogs/form-dialog/form-dialog.component';
import { InputTextComponent } from '../../../../components/inputs/input-text/input-text.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { InputMaskComponent } from '../../../../components/inputs/input-mask/input-mask.component';

@Component({
  selector: 'app-manufacturer-form',
  standalone: true,
  imports: [
    FormDialogComponent,
    ContainerDivComponent,
    InputTextComponent,
    InputMaskComponent
  ],
  templateUrl: './manufacturer-form.component.html',
})
export class ManufacturerFormComponent {
  private readonly toast = inject(ToastService);

  @Input() open = false;
  @Input() manufacturer: ManufacturerResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<ManufacturerRequest>();

  form: ManufacturerRequest = {
    name: '',
    email: '',
    cnpj: '',
    country: '',
  };

  ngOnChanges() {
    if (this.manufacturer) {
      this.form = {
        name: this.manufacturer.name,
        email: this.manufacturer.email,
        cnpj: this.manufacturer.cnpj,
        country: this.manufacturer.country,
      };
    } else {
      this.form = {
        name: '',
        email: '',
        cnpj: '',
        country: '',
      };
    }
  }

  submit() {
    const parsed = manufacturerRequestSchema.safeParse(this.form);

    if (!parsed.success) {
      Object.values(parsed.error.flatten().fieldErrors)
        .forEach(errs => errs?.forEach(msg => this.toast.error(msg)));
      return;
    }

    this.submitForm.emit(parsed.data);
  }
}
