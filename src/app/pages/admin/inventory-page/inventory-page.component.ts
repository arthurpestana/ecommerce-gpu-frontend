import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { AlertDialogComponent } from '../../../components/dialogs/alert-dialog/alert-dialog.component';
import { ToastService } from '../../../services/toast-service/toast-service.service';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';
import { InventoryTransactionQueryService } from '../../../services/api/inventory/inventory-query/inventory-transaction-query.service';
import { InventoryTransactionRequest } from '../../../lib/interfaces/IInventory';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [
    ButtonComponent,
    InventoryFormComponent,
    InventoryTableComponent,
  ],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.css'
})
export class InventoryPageComponent {
  private readonly inventoryQuery = inject(InventoryTransactionQueryService);
  private readonly toast = inject(ToastService);

  createDialogOpen = false;

  openCreate() {
    this.createDialogOpen = true;
  }

  handleSubmit(payload: InventoryTransactionRequest) {

    this.inventoryQuery.createTransaction.mutate(payload, {
      onSuccess: () => {
        this.createDialogOpen = false;
      },
    });
  }
}
