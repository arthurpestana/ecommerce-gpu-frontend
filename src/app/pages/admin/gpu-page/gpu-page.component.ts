import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn, TableComponent } from '../../../components/table/table.component';
import { GpuRequest, GpuResponse } from '../../../lib/interfaces/IGpu';
import { ButtonComponent } from '../../../components/button/button.component';
import { SearchFilterComponent } from '../../../components/search-filter/search-filter.component';
import { DialogComponent } from '../../../components/dialogs/dialog/dialog.component';
import { InputTextComponent } from '../../../components/inputs/input-text/input-text.component';
import { FormDialogComponent } from '../../../components/dialogs/form-dialog/form-dialog.component';
import { AlertDialogComponent } from '../../../components/dialogs/alert-dialog/alert-dialog.component';
import { InputNumberComponent } from '../../../components/inputs/input-number/input-number.component';
import { ContainerDivComponent } from '../../../components/container-div/container-div.component';
import { TextAreaComponent } from '../../../components/textarea/textarea.component';
import { SelectInputComponent } from '../../../components/inputs/select-input/select-input.component';
import { GpuQueryService } from '../../../services/api/gpu/gpu-query/gpu-query.service';
import { SelectInputMultiComponent } from '../../../components/inputs/select-input-multi/select-input-multi.component';
import { ToggleInputComponent } from '../../../components/inputs/toggle-input/toggle-input.component';
import { FileInputComponent } from '../../../components/inputs/file-input/file-input.component';
import { TagInputComponent } from '../../../components/inputs/tag-input/tag-input.component';
import { FileDownloadService } from '../../../services/file-download/file-download.service';
import { ToastService } from '../../../services/toast-service/toast-service.service';
import { FileItemComponent } from '../../../components/file-item/file-item.component';
import { ImageResponse } from '../../../lib/interfaces/IImage';

@Component({
  selector: 'app-gpu-page',
  imports: [
    TableComponent,
    ButtonComponent,
    SearchFilterComponent,
    InputTextComponent,
    FormDialogComponent,
    AlertDialogComponent,
    ContainerDivComponent,
    InputNumberComponent,
    TextAreaComponent,
    SelectInputComponent,
    SelectInputMultiComponent,
    ToggleInputComponent,
    FileInputComponent,
    TagInputComponent,
    FileItemComponent
  ],
  templateUrl: './gpu-page.component.html',
  styleUrl: './gpu-page.component.css',
})
export class GpuPageComponent {
  private readonly gpuQuery = inject(GpuQueryService);
  private readonly toastService = inject(ToastService);
  @ViewChild('toggleTemplate', { static: true }) toggleTemplate!: TemplateRef<any>;
  @ViewChild(FileInputComponent) fileInput!: FileInputComponent;

  columnsTable: TableColumn<GpuResponse>[] = [];

  ngOnInit() {
    this.columnsTable = [
      { key: 'id', label: 'ID', width: '100px' },
      { key: 'name', label: 'Nome', width: '200px' },
      {
        key: 'categories',
        label: 'Categorias',
        width: '250px',
        formatter: (row, value) => value[0]?.name,
      },
      {
        key: 'price',
        label: 'Preço',
        align: 'center',
        formatter: (row, value) =>
          `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      },
      { key: 'availableQuantity', label: 'Estoque', align: 'center' },
      {
        key: 'isActive',
        label: 'Status',
        align: 'center',
        template: this.toggleTemplate,
      },
      {
        key: 'memory',
        label: 'Memória RAM',
        width: '200px',
        formatter: (row, value) => `${value} GB`,
      },
    ];
  }

  deleteDialogOpen = false;
  createOrEditDialogOpen = false;

  selectedGpu: GpuResponse | null = null;

  modelOptions = [
    { value: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", label: 'GeForce RTX 4090' },
    { value: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", label: 'Radeon RX 7900 XTX' },
    { value: "cccccccc-cccc-cccc-cccc-cccccccccccc", label: 'Arc A770' },
  ];

  listaCategorias = [
    { value: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', label: 'High-End' },
    { value: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', label: 'Mid-Range' },
    { value: 'cccccccc-cccc-cccc-cccc-cccccccccccc', label: 'Entry-Level' },
  ];

  existingImages: ImageResponse[] = [];
  imagesToDelete: string[] = [];
  uploadImages: File[] = [];
  technologyTags: string[] = [];

  form: GpuRequest = {
    name: '',
    description: '',
    price: 0,
    isActive: true,
    availableQuantity: 0,
    memory: 0,
    architecture: '',
    energyConsumption: 0,
    modelId: '',
    technologies: [],
    categoryIds: [],
  };

  get categoryIds() {
    return this.form.categoryIds ?? [];
  }

  set categoryIds(value: string[]) {
    this.form.categoryIds = value;
  }

  listGpus = this.gpuQuery.getListGpus;

  get dataGpus() {
    return this.listGpus.data()?.items ?? [];
  }

  get isLoading() {
    return this.listGpus.isLoading();
  }

  get isError() {
    return this.listGpus.isError();
  }

  async onSearchText(newSearchText: string): Promise<void> {
    this.gpuQuery.setParams({ search: newSearchText, page: 1 });
  }

  async onPageChanged(newPage: number): Promise<void> {
    this.gpuQuery.setParams({ page: newPage });
  }

  openCreateOrEditDialog(gpu: GpuResponse | null) {
    this.uploadImages = [];
    this.imagesToDelete = [];
    this.existingImages = [];
    this.technologyTags = [];
    queueMicrotask(() => {
      this.fileInput?.reset();
    });

    if (gpu) {
      this.selectedGpu = gpu;

      this.form = {
        name: gpu.name,
        description: gpu.description,
        price: gpu.price,
        isActive: gpu.isActive,
        availableQuantity: gpu.availableQuantity,
        memory: gpu.memory,
        architecture: gpu.architecture,
        energyConsumption: gpu.energyConsumption,
        modelId: String(gpu.model.id),
        technologies: gpu.technologies?.map(t => ({ name: t.name, description: '' })) ?? [],
        categoryIds: gpu.categories?.map((c) => String(c.id)) ?? [],
      };

      this.existingImages = [...gpu.images];
      this.imagesToDelete = [];
      this.uploadImages = [];
      this.technologyTags = gpu.technologies.map(t => t.name);

    } else {
      this.form = {
        name: '',
        description: '',
        price: 0,
        isActive: true,
        availableQuantity: 0,
        memory: 0,
        architecture: '',
        energyConsumption: 0,
        modelId: '',
        technologies: [],
        categoryIds: [],
      };

      this.existingImages = [];
      this.imagesToDelete = [];
      this.uploadImages = [];
      this.technologyTags = [];
    }

    this.createOrEditDialogOpen = true;
  }

  openDeleteDialog(gpu: GpuResponse) {
    this.selectedGpu = gpu;
    this.deleteDialogOpen = true;
  }

  onConfirmDelete() {
    console.log('Deleting GPU:', this.selectedGpu);
    if (!this.selectedGpu) return;

    this.gpuQuery.deleteGpu.mutate(this.selectedGpu.id, {
      onSuccess: () => {
        this.deleteDialogOpen = false;
      },
    });
  }

  onToggleStatus(row: GpuResponse, newValue: boolean) {
    this.gpuQuery.updateGpuStatus.mutate(
      {
        id: row.id,
        isActive: newValue,
      },
      {
        onSuccess: () => {
          console.log('Status atualizado.');
        },
      }
    );
  }

  onRemoveExistingImage(img: ImageResponse) {
    this.imagesToDelete.push(img.id);
    this.existingImages = this.existingImages.filter((image) => image.id !== img.id);
  }

  async onSubmitForm() {
    const payloadData: GpuRequest = {
      ...this.form,
      technologies: this.technologyTags.map((tag) => ({
        name: tag,
        description: '',
      })),
    };

    if (this.selectedGpu && this.imagesToDelete.length > 0) {
      this.gpuQuery.deleteImagesFromGpu.mutate({
        gpuId: this.selectedGpu.id,
        imageIds: this.imagesToDelete,
      });
    }

    if (this.selectedGpu) {
      this.gpuQuery.updateGpu.mutate(
        {
          id: this.selectedGpu.id,
          data: payloadData,
          images: this.uploadImages,
        },
        {
          onSuccess: () => {
            this.createOrEditDialogOpen = false;
          },
        }
      );
    } else {
      this.gpuQuery.createGpu.mutate(
        {
          data: payloadData,
          images: this.uploadImages,
        },
        {
          onSuccess: () => {
            this.createOrEditDialogOpen = false;
          },
        }
      );
    }
  }
}
