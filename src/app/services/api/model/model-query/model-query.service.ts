import { Injectable, inject, signal } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { ToastService } from '../../../toast-service/toast-service.service';

import { ModelRequest } from '../../../../lib/interfaces/IModel';
import { ModelService } from '../model-service/model.service';

const ITEMS_PER_PAGE = 10;

type ModelQueryParams = {
  search: string;
  manufacturerId?: string;
  page: number;
  limit: number;
};

@Injectable({
  providedIn: 'root',
})
export class ModelQueryService {
  private readonly modelService = inject(ModelService);
  private readonly queryClient = inject(QueryClient);
  private readonly toastService = inject(ToastService);

  private params = signal<ModelQueryParams>({
    search: '',
    manufacturerId: undefined,
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  setParams(patch: Partial<ModelQueryParams>) {
    this.params.update(prev => ({ ...prev, ...patch }));
  }

  get pagination() {
    const p = this.params();
    return {
      offset: (p.page - 1),
      limit: p.limit,
    };
  }

  getListModels = injectQuery(() => ({
    queryKey: ['models', this.params()],
    queryFn: async () => {
      const p = this.params();
      const pag = this.pagination;

      if (p.search) {
        return this.modelService.findByName(p.search, pag);
      }

      if (p.manufacturerId) {
        return this.modelService.findByManufacturer(p.manufacturerId, pag);
      }

      return this.modelService.findAllModels(pag);
    },
  }));

  getModelById(id: string) {
    return injectQuery(() => ({
      queryKey: ['model', id],
      queryFn: () => this.modelService.findById(id),
    }));
  }


  createModel = injectMutation(() => ({
    mutationFn: (payload: ModelRequest) =>
      this.modelService.createModel(payload),

    onSuccess: () => {
      this.toastService.success('Modelo criado com sucesso!');
      this.queryClient.invalidateQueries({ queryKey: ['models'] });
    },

    onError: (err) => {
      console.error(err);
      this.toastService.error('Erro ao criar modelo.');
    },
  }));

  updateModel = injectMutation(() => ({
    mutationFn: (payload: { id: string; data: ModelRequest }) =>
      this.modelService.updateModel(payload.id, payload.data),

    onSuccess: () => {
      this.toastService.success('Modelo atualizado com sucesso!');
      this.queryClient.invalidateQueries({ queryKey: ['models'] });
      this.queryClient.invalidateQueries({ queryKey: ['model'] });
    },

    onError: (err) => {
      console.error(err);
      this.toastService.error('Erro ao atualizar modelo.');
    },
  }));

  deleteModel = injectMutation(() => ({
    mutationFn: (id: string) =>
      this.modelService.deleteModel(id),

    onSuccess: () => {
      this.toastService.success('Modelo removido com sucesso!');
      this.queryClient.invalidateQueries({ queryKey: ['models'] });
    },

    onError: (err) => {
      console.error(err);
      this.toastService.error('Erro ao remover modelo.');
    },
  }));
}
