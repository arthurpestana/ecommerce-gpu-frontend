import { Component, inject } from '@angular/core';
import { GpuRequest, GpuResponse } from '../../../lib/interfaces/IGpu';
import { ButtonComponent } from '../../../components/button/button.component';
import { AlertDialogComponent } from '../../../components/dialogs/alert-dialog/alert-dialog.component';
import { GpuQueryService } from '../../../services/api/gpu/gpu-query/gpu-query.service';
import { ToastService } from '../../../services/toast-service/toast-service.service';
import { gpuRequestSchema } from '../../../lib/schemas/gpu.schema';
import { GpuFormComponent } from './gpu-form/gpu-form.component';
import { GpuTableComponent } from './gpu-table/gpu-table.component';

@Component({
  selector: 'app-gpu-page',
  imports: [
    ButtonComponent,
    AlertDialogComponent,
    GpuFormComponent,
    GpuTableComponent
  ],
  templateUrl: './gpu-page.component.html',
  styleUrl: './gpu-page.component.css',
})
export class GpuPageComponent {
  private readonly gpuQuery = inject(GpuQueryService);
  private readonly toast = inject(ToastService);

  createOrEditDialogOpen = false;
  deleteDialogOpen = false;

  selectedGpu: GpuResponse | null = null;

  onCreate() {
    this.selectedGpu = null;
    this.createOrEditDialogOpen = true;
  }

  onEdit(gpu: GpuResponse) {
    this.selectedGpu = gpu;
    this.createOrEditDialogOpen = true;
  }

  onDelete(gpu: GpuResponse) {
    this.selectedGpu = gpu;
    this.deleteDialogOpen = true;
  }

  confirmDelete() {
    if (!this.selectedGpu) return;

    this.gpuQuery.deleteGpu.mutate(this.selectedGpu.id, {
      onSuccess: () => {
        this.deleteDialogOpen = false;
      },
      onError: (err) => {
        console.error(err);
        this.toast.error("Erro ao excluir GPU");
      }
    });
  }

  handleSubmit(event: {
    payload: GpuRequest;
    images: File[];
    deleteImages: string[];
  }) {
    const validation = gpuRequestSchema.safeParse(event.payload);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;

      Object.values(errors).forEach(errList => {
        if (errList) {
          errList.forEach(msg => this.toast.error(msg));
        }
      });

      console.error("ZOD Validation errors:", errors);
      return;
    }

    const validData = validation.data;

    if (this.selectedGpu && event.deleteImages.length > 0) {
      this.gpuQuery.deleteImagesFromGpu.mutate({
        gpuId: this.selectedGpu.id,
        imageIds: event.deleteImages,
      });
    }

    if (this.selectedGpu) {
      this.gpuQuery.updateGpu.mutate(
        { id: this.selectedGpu.id, data: validData, images: event.images },
        {
          onSuccess: () => {
            this.createOrEditDialogOpen = false;
          }
        }
      );
      return;
    }

    this.gpuQuery.createGpu.mutate(
      { data: validData, images: event.images },
      {
        onSuccess: () => {
          this.createOrEditDialogOpen = false;
        }
      }
    );
  }
}
