import { Component, EventEmitter, Input, Output, computed, inject } from '@angular/core';
import { ToastService } from '../../../../services/toast-service/toast-service.service';

import { FormDialogComponent } from '../../../../components/dialogs/form-dialog/form-dialog.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { InputNumberComponent } from '../../../../components/inputs/input-number/input-number.component';
import { InputTextComponent } from '../../../../components/inputs/input-text/input-text.component';
import { SelectInputComponent, SelectOption } from '../../../../components/inputs/select-input/select-input.component';

import { GpuQueryService } from '../../../../services/api/gpu/gpu-query/gpu-query.service';
import { InventoryTransactionRequest } from '../../../../lib/interfaces/IInventory';
import { TransactionTypes } from '../../../../lib/enums/TransactionTypes';
import { inventoryTransactionRequestSchema } from '../../../../lib/schemas/inventoryTransaction.schema';
import { TextAreaComponent } from '../../../../components/textarea/textarea.component';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [
    FormDialogComponent,
    ContainerDivComponent,
    InputNumberComponent,
    SelectInputComponent,
    TextAreaComponent
  ],
  templateUrl: './inventory-form.component.html'
})
export class InventoryFormComponent {
  private readonly toast = inject(ToastService);
  private readonly gpuQuery = inject(GpuQueryService);

  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<InventoryTransactionRequest>();

  form: InventoryTransactionRequest = {
    gpuId: '',
    quantity: 1,
    transactionType: TransactionTypes.ADD,
    reason: '',
  };

  transactionTypeOptions: SelectOption[] = [
    { value: TransactionTypes.ADD, label: 'Entrada' },
    { value: TransactionTypes.REMOVE, label: 'Saída' },
  ];

  gpuOptions = computed<SelectOption[]>(() => {
    const data = this.gpuQuery.getListGpus.data();
    if (!data) return [];

    return data.items.map(m => ({
      value: m.id,
      label: m.name
    }));
  });

  submit() {
    const parsed = inventoryTransactionRequestSchema.safeParse(this.form);

    if (!parsed.success) {
      Object.values(parsed.error.flatten().fieldErrors)
        .forEach(err => err?.forEach(msg => this.toast.error(msg)));
      return;
    }

    this.submitForm.emit(parsed.data);
  }
}
