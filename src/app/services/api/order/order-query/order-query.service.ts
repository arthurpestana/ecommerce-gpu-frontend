import { Injectable, signal, inject } from '@angular/core';
import { injectQuery, injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

import { OrderService } from '../order-service/order.service';
import { OrderRequest } from '../../../../lib/interfaces/IOrder';
import { PaginationRequest } from '../../../../lib/interfaces/IPagination';
import { ToastService } from '../../../toast-service/toast-service.service';

const ITEMS_PER_PAGE = 10;

export interface OrderQueryParams {
  userId?: string;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderQueryService {
  private readonly service = inject(OrderService);
  private readonly queryClient = inject(QueryClient);
  private readonly toast = inject(ToastService);

  private params = signal<OrderQueryParams>({
    userId: undefined,
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  setParams(patch: Partial<OrderQueryParams>) {
    this.params.update((prev) => ({ ...prev, ...patch }));
  }

  get pagination(): PaginationRequest {
    const p = this.params();
    return {
      page: p.page - 1,
      limit: p.limit,
    };
  }

  listOrders = injectQuery(() => ({
    queryKey: ['orders', this.params()],
    queryFn: async () => {
      const p = this.params();
      const pag = this.pagination;

      if (p.userId) {
        return this.service.findByUser(p.userId, pag);
      }

      return this.service.findAllOrders(pag);
    },
  }));

  getOrderById(id: string) {
    return injectQuery(() => ({
      queryKey: ['order', id],
      queryFn: () => this.service.findOrderById(id),
    }));
  }

  createOrder = injectMutation(() => ({
    mutationFn: (payload: OrderRequest) => this.service.createOrder(payload),
    onSuccess: () => {
      this.toast.success("Pedido criado com sucesso!");
      this.queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: () => {
      this.toast.error("Erro ao criar pedido.");
    },
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
