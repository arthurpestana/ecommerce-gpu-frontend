import { Component, inject } from '@angular/core';
import { ManufacturerRequest, ManufacturerResponse } from '../../../lib/interfaces/IManufacturer';
import { ButtonComponent } from '../../../components/button/button.component';
import { AlertDialogComponent } from '../../../components/dialogs/alert-dialog/alert-dialog.component';
import { ManufacturerQueryService } from '../../../services/api/manufacturer/manufacturer-query/manufacturer-query.service';
import { ToastService } from '../../../services/toast-service/toast-service.service';
import { manufacturerRequestSchema } from '../../../lib/schemas/manufacturer.schema';
import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';
import { ManufacturerTableComponent } from './manufacturer-table/manufacturer-table.component';

@Component({
  selector: 'app-manufacturer-page',
  standalone: true,
  imports: [
    ButtonComponent,
    AlertDialogComponent,
    ManufacturerFormComponent,
    ManufacturerTableComponent
  ],
  templateUrl: './manufacturer-page.component.html',
  styleUrl: './manufacturer-page.component.css',
})
export class ManufacturerPageComponent {
  private readonly manufacturerQuery = inject(ManufacturerQueryService);
  private readonly toast = inject(ToastService);

  createOrEditDialogOpen = false;
  deleteDialogOpen = false;

  selectedManufacturer: ManufacturerResponse | null = null;

  onCreate() {
    this.selectedManufacturer = null;
    this.createOrEditDialogOpen = true;
  }

  onEdit(manufacturer: ManufacturerResponse) {
    this.selectedManufacturer = manufacturer;
    this.createOrEditDialogOpen = true;
  }

  onDelete(manufacturer: ManufacturerResponse) {
    this.selectedManufacturer = manufacturer;
    this.deleteDialogOpen = true;
  }

  confirmDelete() {
    if (!this.selectedManufacturer) return;

    this.manufacturerQuery.deleteManufacturer.mutate(this.selectedManufacturer.id, {
      onSuccess: () => {
        this.deleteDialogOpen = false;
      },
      onError: () => {
        this.toast.error("Erro ao excluir fabricante.");
      }
    });
  }

  handleSubmit(payload: ManufacturerRequest) {
    if (this.selectedManufacturer) {
      this.manufacturerQuery.updateManufacturer.mutate(
        { id: this.selectedManufacturer.id, data: payload },
        { onSuccess: () => this.createOrEditDialogOpen = false }
      );
      return;
    }

    this.manufacturerQuery.createManufacturer.mutate(
      payload,
      { onSuccess: () => this.createOrEditDialogOpen = false }
    );
  }
}
