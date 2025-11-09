import { Component, EventEmitter, Output, inject } from '@angular/core';
import { TableComponent, TableColumn } from '../../../../components/table/table.component';
import { ManufacturerQueryService } from '../../../../services/api/manufacturer/manufacturer-query/manufacturer-query.service';
import { ManufacturerResponse } from '../../../../lib/interfaces/IManufacturer';
import { SearchFilterComponent } from '../../../../components/search-filter/search-filter.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { PageRangeComponent } from '../../../../components/page-range/page-range.component';
import { CnpjMaskPipe } from '../../../../lib/utils/cnpj-mask/cnpj-mask-pipe';

@Component({
  selector: 'app-manufacturer-table',
  standalone: true,
  imports: [
    TableComponent,
    SearchFilterComponent,
    ButtonComponent,
    ContainerDivComponent,
    PageRangeComponent,
  ],
  templateUrl: './manufacturer-table.component.html',
})
export class ManufacturerTableComponent {
  private readonly manufacturerQuery = inject(ManufacturerQueryService);

  @Output() edit = new EventEmitter<ManufacturerResponse>();
  @Output() delete = new EventEmitter<ManufacturerResponse>();

  listManufacturers = this.manufacturerQuery.getListManufacturers;

  columnsTable: TableColumn<ManufacturerResponse>[] = [];

  ngOnInit() {
    this.columnsTable = [
      { key: 'name', label: 'Nome', width: '200px' },
      { key: 'email', label: 'Email', width: '220px' },
      { key: 'cnpj', label: 'CNPJ', width: '180px', formatter: (row, value) => {
        const pipe = new CnpjMaskPipe();
        return pipe.transform(value);
      } },
      { key: 'country', label: 'País', width: '160px' },
    ];
  }

  onSearch(value: string) {
    this.manufacturerQuery.setParams({ search: value, page: 1 });
  }

  onPageChange(page: number) {
    this.manufacturerQuery.setParams({ page });
  }

  get data() {
    return this.listManufacturers.data()?.items ?? [];
  }

  get totalItems() {
    return this.listManufacturers.data()?.total ?? 0;
  }

  get limit() {
    return this.listManufacturers.data()?.limit ?? 10;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.limit);
  }

  get currentPage() {
    const data = this.listManufacturers.data();
    if (!data) return 1;
    return data.page;
  }
}
