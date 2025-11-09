import { Component, EventEmitter, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { TableComponent, TableColumn } from '../../../../components/table/table.component';
import { GpuQueryService } from '../../../../services/api/gpu/gpu-query/gpu-query.service';
import { GpuResponse } from '../../../../lib/interfaces/IGpu';
import { SearchFilterComponent } from '../../../../components/search-filter/search-filter.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { ToggleInputComponent } from '../../../../components/inputs/toggle-input/toggle-input.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { PageRangeComponent } from '../../../../components/page-range/page-range.component';

@Component({
  selector: 'app-gpu-table',
  standalone: true,
  imports: [TableComponent, SearchFilterComponent, ButtonComponent, ToggleInputComponent, ContainerDivComponent, PageRangeComponent],
  templateUrl: './gpu-table.component.html',
})
export class GpuTableComponent {
  private readonly gpuQuery = inject(GpuQueryService);

  @Output() edit = new EventEmitter<GpuResponse>();
  @Output() delete = new EventEmitter<GpuResponse>();

  @ViewChild('toggleTemplate', { static: true }) toggleTemplate!: TemplateRef<any>;

  listGpus = this.gpuQuery.getListGpus;

  columnsTable: TableColumn<GpuResponse>[] = [];

  ngOnInit() {
    this.columnsTable = [
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

  onSearch(value: string) {
    this.gpuQuery.setParams({ search: value, page: 1 });
  }

  async onPageChange(newPage: number): Promise<void> {
    this.gpuQuery.setParams({ page: newPage });
  }

  get dataGpus() {
    return this.listGpus.data()?.items ?? [];
  }

  get isLoading() {
    return this.listGpus.isLoading();
  }

  get isError() {
    return this.listGpus.isError();
  }

  get totalItems() {
    return this.listGpus.data()?.total ?? 0;
  }

  get limit() {
    const data = this.listGpus.data();
    if (!data) return 10;
    return data.limit;
  }

  get currentPage() {
    const data = this.listGpus.data();
    if (!data) return 1;
    console.log(data, "dataGPU");
    return data.page;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.limit);
  }
}