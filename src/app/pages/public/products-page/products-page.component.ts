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

const ITEMS_PER_PAGE = 10;

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

  get currentPage() {
    const gpuData = this.listGpus.data();
    if (!gpuData) return 1;
    return gpuData.offset;
  }

  get paginatedProducts() {
    return this.listGpus.data()?.items ?? [];
  }

  get totalItems() {
    return this.listGpus.data()?.total ?? 0;
  }

  get limit() {
    const gpuData = this.listGpus.data();
    if (!gpuData) return ITEMS_PER_PAGE;
    return gpuData.limit;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.limit);
  }

  get isLoading() {
    return this.listGpus.isLoading();
  }

  get isError() {
    return this.listGpus.isError();
  }

  async onSearchText(newSearchText: string): Promise<void> {
    this.gpuQuery.setParams({ search: newSearchText, page: 1 });
    console.log('Search text updated to:', newSearchText);
    console.log(this.paginatedProducts);
  }

  async onPageChanged(newPage: number): Promise<void> {
    this.gpuQuery.setParams({ page: newPage });
  }

}
