import { Component, EventEmitter, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { TableComponent, TableColumn } from '../../../../components/table/table.component';
import { ModelQueryService } from '../../../../services/api/model/model-query/model-query.service';
import { ModelResponse } from '../../../../lib/interfaces/IModel';
import { SearchFilterComponent } from '../../../../components/search-filter/search-filter.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { PageRangeComponent } from '../../../../components/page-range/page-range.component';


@Component({
  selector: 'app-model-table',
  standalone: true,
  imports: [
    TableComponent,
    SearchFilterComponent,
    ButtonComponent,
    ContainerDivComponent,
    PageRangeComponent
  ],
  templateUrl: './model-table.component.html',
})
export class ModelTableComponent {
  private readonly modelQuery = inject(ModelQueryService);

  @Output() edit = new EventEmitter<ModelResponse>();
  @Output() delete = new EventEmitter<ModelResponse>();

  listModels = this.modelQuery.getListModels;

  columnsTable: TableColumn<ModelResponse>[] = [];

  ngOnInit() {
    this.columnsTable = [
      { key: 'name', label: 'Nome', width: '200px' },
      { key: 'releaseYear', label: 'Ano', width: '120px', align: 'center' },
      { 
        key: 'manufacturer',
        label: 'Fabricante',
        width: '200px',
        formatter: (_, value) => value.name
      }
    ];
  }

  onSearch(text: string) {
    this.modelQuery.setParams({ search: text, page: 1 });
  }

  onPageChange(page: number) {
    this.modelQuery.setParams({ page });
  }

  get data() {
    return this.listModels.data()?.items ?? [];
  }

  get totalItems() {
    return this.listModels.data()?.total ?? 0;
  }

  get limit() {
    return this.listModels.data()?.limit ?? 10;
  }

  get currentPage() {
    const m = this.listModels.data();
    if (!m) return 1;
    return m.offset / m.limit + 1;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.limit);
  }
}
