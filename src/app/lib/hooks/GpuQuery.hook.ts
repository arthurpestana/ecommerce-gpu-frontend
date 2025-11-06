import { Component, computed, inject, Injectable, signal } from '@angular/core';
import { GpuService } from '../../services/api/gpu-service/gpu.service';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { PaginationRequest } from '../interfaces/IPagination';

const ITEMS_PER_PAGE = 10;

type GpuQueryParams = {
  search: string;
  modelId?: number;
  manufacturerId?: number;
  category?: string;
  technology?: string;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  limit: number;
};

@Injectable({
  providedIn: 'root',
})
export class GpuQuery {
  private readonly gpuService = inject(GpuService);
  private readonly queryClient = inject(QueryClient);

  private params = signal<GpuQueryParams>({
    search: '',
    modelId: undefined as number | undefined,
    manufacturerId: undefined as number | undefined,
    category: undefined as string | undefined,
    technology: undefined as string | undefined,
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  setParams(patch: Partial<GpuQueryParams>) {
    this.params.update((prev) => ({ ...prev, ...patch }));
  }

  get pagination() {
    return {
      offset: (this.params().page - 1) * this.params().limit,
      limit: this.params().limit,
    };
  }

  getListGpus = injectQuery(() => ({
    queryKey: ['gpus', this.params()],

    queryFn: async () => {
      const paramsQuery = this.params();
      const pag = this.pagination;

      if (paramsQuery.search) {
        return this.gpuService.filterGpus({
          name: paramsQuery.search,
          offset: pag.offset,
          limit: pag.limit,
        });
      }

      if (paramsQuery.modelId) {
        return this.gpuService.findByModel(paramsQuery.modelId, pag);
      }

      if (paramsQuery.manufacturerId) {
        return this.gpuService.findByManufacturer(paramsQuery.manufacturerId, pag);
      }

      if (paramsQuery.category) {
        return this.gpuService.findByCategory(paramsQuery.category, pag);
      }

      if (paramsQuery.technology) {
        return this.gpuService.findByTechnology(paramsQuery.technology, pag);
      }

      if (paramsQuery.minPrice !== undefined || paramsQuery.maxPrice !== undefined) {
        return this.gpuService.findByPriceRange(paramsQuery.minPrice, paramsQuery.maxPrice, pag);
      }

      return this.gpuService.findAllGpus(pag);
    },
  }));

  getGpuById(id: number) {
    return injectQuery(() => ({
      queryKey: ['gpu', id],
      queryFn: () => this.gpuService.findGpuById(id),
    }));
  }

  createGpu = injectMutation(() => ({
    mutationFn: (data: any) => this.gpuService.createGpu(data),
    onSuccess: () => this.queryClient.invalidateQueries({ queryKey: ['gpus'] }),
  }));

  updateGpu = injectMutation(() => ({
    mutationFn: ({ id, data }: any) => this.gpuService.updateGpu(id, data),
    onSuccess: () => this.queryClient.invalidateQueries({ queryKey: ['gpus'] }),
  }));

  deleteGpu = injectMutation(() => ({
    mutationFn: (id: number) => this.gpuService.deleteGpu(id),
    onSuccess: () => this.queryClient.invalidateQueries({ queryKey: ['gpus'] }),
  }));
}
