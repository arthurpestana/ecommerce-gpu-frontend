import { Injectable, signal, inject } from '@angular/core';
import { injectQuery, injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

import { AddressService } from '../address-service/address.service';
import { AddressRequest } from '../../../../lib/interfaces/IAddress';
import { ToastService } from '../../../toast-service/toast-service.service';
import { PaginationRequest } from '../../../../lib/interfaces/IPagination';

const ITEMS_PER_PAGE = 10;

export type AddressQueryParams = {
  searchCity: string;
  userId?: string;
  page: number;
  limit: number;
};

@Injectable({
  providedIn: 'root',
})
export class AddressQueryService {
  private readonly service = inject(AddressService);
  private readonly queryClient = inject(QueryClient);
  private readonly toast = inject(ToastService);

  private params = signal<AddressQueryParams>({
    searchCity: '',
    userId: undefined,
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  setParams(patch: Partial<AddressQueryParams>) {
    this.params.update((prev) => ({ ...prev, ...patch }));
  }

  get pagination(): PaginationRequest {
    const p = this.params();
    return {
      page: p.page - 1,
      limit: p.limit,
    };
  }

  listAddresses = injectQuery(() => ({
    queryKey: ['addresses', this.params()],
    queryFn: async () => {
      const p = this.params();
      const pag = this.pagination;

      if (p.searchCity.trim()) {
        return this.service.findAddressByCity(p.searchCity, pag);
      }

      if (p.userId) {
        return this.service.findAddressByUser(p.userId, pag);
      }

      return this.service.findAllAddresses(pag);
    },
  }));

  getAddressById(id: string) {
    return injectQuery(() => ({
      queryKey: ['address', id],
      queryFn: () => this.service.findAddressById(id),
    }));
  }

  createAddress = injectMutation(() => ({
    mutationFn: (payload: AddressRequest) => this.service.createAddress(payload),
    onSuccess: () => {
      this.toast.success("Endereço criado com sucesso!");
      this.queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: () => this.toast.error("Erro ao criar endereço."),
  }));

  updateAddress = injectMutation(() => ({
    mutationFn: (payload: { id: string; data: Partial<AddressRequest> }) =>
      this.service.updateAddress(payload.id, payload.data),
    onSuccess: () => {
      this.toast.success("Endereço atualizado com sucesso!");
      this.queryClient.invalidateQueries({ queryKey: ['addresses'] });
      this.queryClient.invalidateQueries({ queryKey: ['address'] });
    },
    onError: () => this.toast.error("Erro ao atualizar endereço."),
  }));

  deleteAddress = injectMutation(() => ({
    mutationFn: (id: string) => this.service.deleteAddress(id),
    onSuccess: () => {
      this.toast.success("Endereço removido!");
      this.queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: () => this.toast.error("Erro ao remover endereço."),
  }));

  getRangeStart() {
    const p = this.params();
    return (p.page - 1) * p.limit + 1;
  }

  getRangeEnd(totalItems: number) {
    const p = this.params();
    return Math.min(p.page * p.limit, totalItems);
  }
}
