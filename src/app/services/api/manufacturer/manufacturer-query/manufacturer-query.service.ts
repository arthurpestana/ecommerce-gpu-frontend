import { Injectable, inject, signal } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { ToastService } from '../../../toast-service/toast-service.service';

import { ManufacturerRequest } from '../../../../lib/interfaces/IManufacturer';
import { ManufacturerService } from '../manufacturer-service/manufacturer.service';

const ITEMS_PER_PAGE = 10;

type ManufacturerQueryParams = {
  search: string;
  page: number;
  limit: number;
};

@Injectable({
  providedIn: 'root',
})
export class ManufacturerQueryService {
  private readonly manufacturerService = inject(ManufacturerService);
  private readonly queryClient = inject(QueryClient);
  private readonly toastService = inject(ToastService);

  private params = signal<ManufacturerQueryParams>({
    search: '',
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  setParams(patch: Partial<ManufacturerQueryParams>) {
    this.params.update(prev => ({ ...prev, ...patch }));
  }

  get pagination() {
    const p = this.params();
    return {
      page: p.page - 1,
      limit: p.limit,
    };
  }

  getListManufacturers = injectQuery(() => ({
    queryKey: ['manufacturers', this.params()],
    queryFn: async () => {
      const p = this.params();
      const pag = this.pagination;

      if (p.search) {
        return this.manufacturerService.findByName(p.search, pag);
      }

      return this.manufacturerService.findAllManufacturers(pag);
    },
  }));

  getManufacturerById(id: string) {
    return injectQuery(() => ({
      queryKey: ['manufacturer', id],
      queryFn: () => this.manufacturerService.findById(id),
    }));
  }

  createManufacturer = injectMutation(() => ({
    mutationFn: (payload: ManufacturerRequest) =>
      this.manufacturerService.createManufacturer(payload),

    onSuccess: () => {
      this.toastService.success('Fabricante criado com sucesso!');
      this.queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
    },

    onError: (err) => {
      console.error(err);
      this.toastService.error('Erro ao criar fabricante.');
    },
  }));

  updateManufacturer = injectMutation(() => ({
    mutationFn: (payload: { id: string; data: ManufacturerRequest }) =>
      this.manufacturerService.updateManufacturer(payload.id, payload.data),

    onSuccess: () => {
      this.toastService.success('Fabricante atualizado com sucesso!');
      this.queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
      this.queryClient.invalidateQueries({ queryKey: ['manufacturer'] });
    },

    onError: (err) => {
      console.error(err);
      this.toastService.error('Erro ao atualizar fabricante.');
    },
  }));

  deleteManufacturer = injectMutation(() => ({
    mutationFn: (id: string) => this.manufacturerService.deleteManufacturer(id),

    onSuccess: () => {
      this.toastService.success('Fabricante removido com sucesso!');
      this.queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
    },

    onError: (err) => {
      console.error(err);
      this.toastService.error('Erro ao remover fabricante.');
    },
  }));
}
