import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFilterComponent } from '../../../components/search-filter/search-filter.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { GpuCardComponent } from '../../../components/gpu-card/gpu-card.component';
import { GpuService } from '../../../services/api/gpu-service/gpu.service';
import { GpuResponse } from '../../../lib/interfaces/IGpu';
import { PaginationRequest } from '../../../lib/interfaces/IPagination';

const ITEMS_PER_PAGE = 10;

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchFilterComponent,
    PaginationComponent,
    GpuCardComponent,
  ],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  private readonly gpuService = inject(GpuService);

  searchText = '';
  currentPage = 1;

  filteredProducts: GpuResponse[] = [];
  paginatedProducts: GpuResponse[] = [];
  totalPages = 1;
  totalItems = 0;
  loading = true;

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }

  async onSearchText(newSearchText: string): Promise<void> {
    this.searchText = newSearchText;
    this.currentPage = 1;
    await this.loadProducts();
  }

  async onPageChanged(newPage: number): Promise<void> {
    this.currentPage = newPage;
    await this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    try {
      this.loading = true;

      const pagination: PaginationRequest = {
        offset: (this.currentPage - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      };

      let response;
      if (this.searchText.trim() !== '') {
        response = await this.gpuService.filterGpus({
          name: this.searchText.trim(),
          offset: pagination.offset,
          limit: pagination.limit,
        });
      } else {
        response = await this.gpuService.findAllGpus(pagination);
      }

      this.filteredProducts = response.items
      this.totalItems = response.total ?? this.filteredProducts.length;
      this.totalPages = Math.ceil(this.totalItems / ITEMS_PER_PAGE);
      this.paginatedProducts = this.filteredProducts;
    } catch (error) {
      console.error('Erro ao carregar GPUs:', error);
    } finally {
      this.loading = false;
    }
  }

  getProductsRangeStart(): number {
    return (this.currentPage - 1) * ITEMS_PER_PAGE + 1;
  }

  getProductsRangeEnd(): number {
    return Math.min(this.currentPage * ITEMS_PER_PAGE, this.totalItems);
  }
}
