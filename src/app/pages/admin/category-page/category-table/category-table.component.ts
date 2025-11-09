import { Component, inject, Output, EventEmitter } from '@angular/core';

import { CategoryResponse } from '../../../../lib/interfaces/ICategory';

import { SearchFilterComponent } from '../../../../components/search-filter/search-filter.component';
import { TableComponent, TableColumn } from '../../../../components/table/table.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { PageRangeComponent } from '../../../../components/page-range/page-range.component';
import { CategoryQueryService } from '../../../../services/api/category/category-query/category-query.service';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [
    SearchFilterComponent,
    TableComponent,
    ButtonComponent,
    ContainerDivComponent,
    PageRangeComponent
  ],
  templateUrl: './category-table.component.html',
})
export class CategoryTableComponent {
  private readonly categoryQuery = inject(CategoryQueryService);

  @Output() edit = new EventEmitter<CategoryResponse>();
  @Output() delete = new EventEmitter<CategoryResponse>();

  listCategories = this.categoryQuery.getListCategories;

  columnsTable: TableColumn<CategoryResponse>[] = [
    { key: 'name', label: 'Nome', width: '200px' },
    { key: 'description', label: 'Descrição' }
  ];

  onSearch(text: string) {
    this.categoryQuery.setParams({ search: text, page: 1 });
  }

  onPageChange(page: number) {
    this.categoryQuery.setParams({ page });
  }

  get items() {
    return this.listCategories.data()?.items ?? [];
  }

  get totalItems() {
    return this.listCategories.data()?.total ?? 0;
  }

  get limit() {
    return this.listCategories.data()?.limit ?? 10;
  }

  get currentPage() {
    const data = this.listCategories.data();
    if (!data) return 1;
    console.log(data, "data123");
    return (data.page ?? 0) + 1;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.limit);
  }
}
