import { Component, computed, inject, Injectable, signal } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { GpuService } from '../gpu-service/gpu.service';
import { GpuRequest } from '../../../../lib/interfaces/IGpu';
import { ToastService } from '../../../toast-service/toast-service.service';

const ITEMS_PER_PAGE = 10;

type GpuQueryParams = {
    search: string;
    modelId?: string;
    manufacturerId?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
    page: number;
    limit: number;
};

@Injectable({
    providedIn: 'root',
})
export class GpuQueryService {
    private readonly gpuService = inject(GpuService);
    private readonly queryClient = inject(QueryClient);
    private readonly toastService = inject(ToastService);

    private params = signal<GpuQueryParams>({
        search: '',
        modelId: undefined as string | undefined,
        manufacturerId: undefined as string | undefined,
        categoryId: undefined as string | undefined,
        minPrice: undefined as number | undefined,
        maxPrice: undefined as number | undefined,
        isActive: undefined as boolean | undefined,
        page: 1,
        limit: ITEMS_PER_PAGE,
    });

    setParams(patch: Partial<GpuQueryParams>) {
        this.params.update((prev) => ({ ...prev, ...patch }));
    }

    get pagination() {
        const p = this.params();
        return {
            page: p.page - 1,
            limit: p.limit,
        };
    }

    getListGpus = injectQuery(() => ({
        queryKey: ['gpus', this.params(), this.pagination],

        queryFn: async () => {
            const paramsQuery = this.params();
            const pag = this.pagination;

            console.log('Fetching GPUs with params:', paramsQuery, 'and pagination:', pag);

            return this.gpuService.findFilteredGpus({
                name: paramsQuery.search,
                modelId: paramsQuery.modelId,
                manufacturerId: paramsQuery.manufacturerId,
                categoryId: paramsQuery.categoryId,
                minPrice: paramsQuery.minPrice,
                maxPrice: paramsQuery.maxPrice,
                isActive: paramsQuery.isActive,
                page: pag.page,
                limit: pag.limit,
            });
        },
    }));


    getGpuById(id: string) {
        return injectQuery(() => ({
            queryKey: ['gpu', id],
            queryFn: () => this.gpuService.findGpuById(id),
        }));
    }

    createGpu = injectMutation(() => ({
        mutationFn: (payload: { data: GpuRequest; images?: File[] }) =>
            this.gpuService.createGpu(payload),
        onSuccess: () => {
            this.toastService.success("GPU criada com sucesso!");
            this.queryClient.invalidateQueries({ queryKey: ['gpus'] });
        },

        onError: (error) => {
            console.error(error);
            this.toastService.error("Erro ao criar GPU.");
        },
    }));

    updateGpu = injectMutation(() => ({
        mutationFn: (payload: { id: string; data: Partial<GpuRequest>; images?: File[] }) =>
            this.gpuService.updateGpu(payload.id, payload),
        onSuccess: () => {
            this.toastService.success("GPU atualizada com sucesso!");
            this.queryClient.invalidateQueries({ queryKey: ['gpus'] });
            this.queryClient.invalidateQueries({ queryKey: ['gpu'] });
        },

        onError: (error) => {
            console.error(error);
            this.toastService.error("Erro ao atualizar GPU.");
        },
    }));

    updateGpuStatus = injectMutation(() => ({
        mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
            this.gpuService.updateGpuStatus(id, isActive),
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['gpus'] });
            this.queryClient.invalidateQueries({ queryKey: ['gpu'] });
        },

        onError: (error) => {
            console.error(error);
            this.toastService.error("Erro ao atualizar status.");
        },
    }));

    deleteImagesFromGpu = injectMutation(() => ({
        mutationFn: (payload: { gpuId: string; imageIds: string[] }) =>
            this.gpuService.deleteImagesFromGpu(payload.gpuId, payload.imageIds),
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['gpu'] });
        },

        onError: (error) => {
            console.error(error);
            this.toastService.error("Erro ao remover imagens.");
        },
    }));

    deleteGpu = injectMutation(() => ({
        mutationFn: (id: string) => this.gpuService.deleteGpu(id),
        onSuccess: () => {
            this.toastService.success("GPU removida com sucesso!");
            this.queryClient.invalidateQueries({ queryKey: ['gpus'] });
        },

        onError: (error) => {
            console.error(error);
            this.toastService.error("Erro ao remover GPU.");
        },

    }));

    getProductsRangeStart() {
        const params = this.params();
        return (params.page - 1) * params.limit + 1;
    }

    getProductsRangeEnd(totalItems: number) {
        const params = this.params();
        return Math.min(params.page * params.limit, totalItems);
    }
}
