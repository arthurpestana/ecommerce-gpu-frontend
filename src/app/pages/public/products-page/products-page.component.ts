import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFilterComponent } from '../../../components/search-filter/search-filter.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { GpuService } from '../../../services/api/gpu/gpu-service/gpu.service';
import { GpuResponse } from '../../../lib/interfaces/IGpu';
import { PaginationRequest } from '../../../lib/interfaces/IPagination';
import { GpuQueryService } from '../../../services/api/gpu/gpu-query/gpu-query.service';
import { PageRangeComponent } from '../../../components/page-range/page-range.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, SearchFilterComponent, PaginationComponent, ProductCardComponent, PageRangeComponent],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  private readonly gpuQuery = inject(GpuQueryService);

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
    return (data.page ?? 0) + 1;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.limit);
  }

  onSearch(value: string) {
    this.gpuQuery.setParams({ search: value, page: 1 });
  }

  async onPageChange(newPage: number): Promise<void> {
    this.gpuQuery.setParams({ page: newPage });
  }
}
