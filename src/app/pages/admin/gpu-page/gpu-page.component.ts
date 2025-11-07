import { Component, inject } from '@angular/core';
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
  ],
  templateUrl: './gpu-page.component.html',
  styleUrl: './gpu-page.component.css',
})
export class GpuPageComponent {
  private readonly gpuQuery = inject(GpuQueryService);

  createDialogOpen = false;
  editDialogOpen = false;
  deleteDialogOpen = false;
  createOrEditDialogOpen = false;

  selectedGpu: GpuResponse | null = null;

  modelOptions = [
    { value: 1, label: 'RTX 3060' },
    { value: 2, label: 'RTX 3070' },
    { value: 3, label: 'RX 6600 XT' },
  ];

  listaCategorias = [
    { value: '1', label: 'Gaming' },
    { value: '2', label: 'Workstation' },
    { value: '3', label: 'Budget' },
    { value: '4', label: 'High-End' },
  ];

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
    images: [],
    technologies: [],
    categoryIds: [],
  };

  get categoryIds() {
    return this.form.categoryIds ?? [];
  }

  set categoryIds(value: string[]) {
    this.form.categoryIds = value;
  }

  columnsTable: TableColumn<GpuResponse>[] = [
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
      formatter: (row, value) => (value ? 'Ativo' : 'Inativo'),
    },
    {
      key: 'memory',
      label: 'Memória RAM',
      width: '200px',
      formatter: (row, value) => `${value} GB`,
    },
  ];

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
    this.selectedGpu = gpu;

    if (gpu) {
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
        images: gpu.images ?? [],
        technologies: gpu.technologies ?? [],
        categoryIds: gpu.categories?.map((c) => String(c.id)) ?? [],
      };
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
        images: [],
        technologies: [],
        categoryIds: [],
      };
    }

    this.createOrEditDialogOpen = true;
  }

  openDeleteDialog(gpu: GpuResponse) {
    this.selectedGpu = gpu;
    this.deleteDialogOpen = true;
  }

  onConfirmDelete() {
    if (!this.selectedGpu) return;

    this.gpuQuery.deleteGpu.mutate(this.selectedGpu.id, {
      onSuccess: () => {
        this.deleteDialogOpen = false;
      },
    });
  }

  onSubmitForm() {
    console.log('Submitting form:', this.form);
    if (this.selectedGpu) {
      this.gpuQuery.updateGpu.mutate(
        { id: this.selectedGpu.id, data: this.form },
        {
          onSuccess: () => {
            this.createOrEditDialogOpen = false;
          },
        }
      );
    } else {
      this.gpuQuery.createGpu.mutate(this.form, {
        onSuccess: () => {
          this.createOrEditDialogOpen = false;
        },
      });
    }
  }
}
