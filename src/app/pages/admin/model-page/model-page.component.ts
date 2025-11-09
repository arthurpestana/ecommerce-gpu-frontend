import { Component, inject } from '@angular/core';
import { ModelRequest, ModelResponse } from '../../../lib/interfaces/IModel';
import { ButtonComponent } from '../../../components/button/button.component';
import { AlertDialogComponent } from '../../../components/dialogs/alert-dialog/alert-dialog.component';
import { ModelQueryService } from '../../../services/api/model/model-query/model-query.service';
import { ToastService } from '../../../services/toast-service/toast-service.service';
import { modelRequestSchema } from '../../../lib/schemas/model.schema';
import { ModelFormComponent } from './model-form/model-form.component';
import { ModelTableComponent } from './model-table/model-table.component';

@Component({
  selector: 'app-model-page',
  standalone: true,
  imports: [
    ButtonComponent,
    AlertDialogComponent,
    ModelFormComponent,
    ModelTableComponent
  ],
  templateUrl: './model-page.component.html',
  styleUrl: './model-page.component.css',
})
export class ModelPageComponent {
  private readonly modelQuery = inject(ModelQueryService);
  private readonly toast = inject(ToastService);

  createOrEditDialogOpen = false;
  deleteDialogOpen = false;

  selectedModel: ModelResponse | null = null;

  onCreate() {
    this.selectedModel = null;
    this.createOrEditDialogOpen = true;
  }

  onEdit(model: ModelResponse) {
    this.selectedModel = model;
    this.createOrEditDialogOpen = true;
  }

  onDelete(model: ModelResponse) {
    this.selectedModel = model;
    this.deleteDialogOpen = true;
  }

  confirmDelete() {
    if (!this.selectedModel) return;

    this.modelQuery.deleteModel.mutate(this.selectedModel.id, {
      onSuccess: () => {
        this.deleteDialogOpen = false;
      },
      onError: () => {
        this.toast.error("Erro ao excluir modelo.");
      }
    });
  }

  handleSubmit(payload: ModelRequest) {

    if (this.selectedModel) {
      this.modelQuery.updateModel.mutate(
        { id: this.selectedModel.id, data: payload },
        { onSuccess: () => (this.createOrEditDialogOpen = false) }
      );
      return;
    }

    this.modelQuery.createModel.mutate(
      payload,
      { onSuccess: () => (this.createOrEditDialogOpen = false) }
    );
  }
}
