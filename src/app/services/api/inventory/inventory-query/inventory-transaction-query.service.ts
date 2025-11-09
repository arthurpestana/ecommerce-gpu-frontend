import { Injectable, inject, signal } from "@angular/core";
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from "@tanstack/angular-query-experimental";
import { InventoryTransactionService } from "../inventory-service/inventory-transaction.service";
import {
  InventoryTransactionRequest,
} from "../../../../lib/interfaces/IInventory";
import { ToastService } from "../../../toast-service/toast-service.service";


const ITEMS_PER_PAGE = 10;

type InventoryQueryParams = {
  gpuId?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  limit: number;
};

@Injectable({
  providedIn: "root",
})
export class InventoryTransactionQueryService {
  private readonly service = inject(InventoryTransactionService);
  private readonly queryClient = inject(QueryClient);
  private readonly toast = inject(ToastService);

  private params = signal<InventoryQueryParams>({
    gpuId: undefined,
    type: undefined,
    startDate: undefined,
    endDate: undefined,
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  setParams(patch: Partial<InventoryQueryParams>) {
    this.params.update((prev) => ({ ...prev, ...patch }));
  }

  get pagination() {
    const p = this.params();
    return {
      offset: (p.page - 1) * p.limit,
      limit: p.limit,
    };
  }

  getListTransactions = injectQuery(() => ({
    queryKey: ["inventory-transactions", this.params()],
    queryFn: async () => {
      const p = this.params();
      const pag = this.pagination;

      if (p.gpuId) return this.service.findByGpu(p.gpuId, pag);
      if (p.type) return this.service.findByType(p.type, pag);
      if (p.startDate || p.endDate)
        return this.service.findByDateRange(
          p.startDate ?? "",
          p.endDate ?? "",
          pag
        );

      return this.service.findAll(pag);
    },
  }));

  getTransactionById(id: string) {
    return injectQuery(() => ({
      queryKey: ["inventory-transaction", id],
      queryFn: () => this.service.findById(id),
    }));
  }

  createTransaction = injectMutation(() => ({
    mutationFn: (payload: InventoryTransactionRequest) =>
      this.service.create(payload),

    onSuccess: () => {
      this.toast.success("Transação registrada com sucesso!");
      this.queryClient.invalidateQueries({
        queryKey: ["inventory-transactions", "gpus", "gpu"],
      });
    },

    onError: (err) => {
      console.error(err);
      this.toast.error("Erro ao registrar transação.");
    },
  }));

  deleteTransaction = injectMutation(() => ({
    mutationFn: (id: string) => this.service.delete(id),

    onSuccess: () => {
      this.toast.success("Transação removida!");
      this.queryClient.invalidateQueries({
        queryKey: ["inventory-transactions", "gpus", "gpu"],
      });
    },

    onError: (err) => {
      console.error(err);
      this.toast.error("Erro ao excluir transação.");
    },
  }));
}
