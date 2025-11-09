import { Component, Input, Output, EventEmitter, inject, computed } from '@angular/core';
import { ModelRequest, ModelResponse } from '../../../../lib/interfaces/IModel';
import { modelRequestSchema } from '../../../../lib/schemas/model.schema';
import { ToastService } from '../../../../services/toast-service/toast-service.service';

import { FormDialogComponent } from '../../../../components/dialogs/form-dialog/form-dialog.component';
import { InputTextComponent } from '../../../../components/inputs/input-text/input-text.component';
import { InputNumberComponent } from '../../../../components/inputs/input-number/input-number.component';
import { SelectInputComponent, SelectOption } from '../../../../components/inputs/select-input/select-input.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { ManufacturerQueryService } from '../../../../services/api/manufacturer/manufacturer-query/manufacturer-query.service';

@Component({
  selector: 'app-model-form',
  standalone: true,
  imports: [
    FormDialogComponent,
    ContainerDivComponent,
    InputTextComponent,
    InputNumberComponent,
    SelectInputComponent
  ],
  templateUrl: './model-form.component.html',
})
export class ModelFormComponent {
  private readonly manufacturerQuery = inject(ManufacturerQueryService);
  private readonly toast = inject(ToastService);

  @Input() open = false;
  @Input() model: ModelResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<ModelRequest>();

  form: ModelRequest = {
    name: '',
    releaseYear: new Date().getFullYear(),
    manufacturerId: ''
  };

  manufacturersOptions = computed<SelectOption[]>(() => {
    const data = this.manufacturerQuery.getListManufacturers.data();
    if (!data) return [];

    return data.items.map(m => ({
      value: m.id,
      label: m.name
    }));
  });

  ngOnChanges() {
    if (this.model) {
      this.form = {
        name: this.model.name,
        releaseYear: this.model.releaseYear,
        manufacturerId: this.model.manufacturer.id
      };
    } else {
      this.form = {
        name: '',
        releaseYear: new Date().getFullYear(),
        manufacturerId: ''
      };
    }
  }

  submit() {
    const validation = modelRequestSchema.safeParse(this.form);

    if (!validation.success) {
      Object.values(validation.error.flatten().fieldErrors)
        .forEach(list => list?.forEach(msg => this.toast.error(msg)));
      return;
    }

    this.submitForm.emit(validation.data);
  }
}
