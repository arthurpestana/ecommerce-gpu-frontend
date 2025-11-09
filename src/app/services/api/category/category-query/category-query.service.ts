import { Injectable, inject, signal } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { CategoryService } from '../category-service/category-service.service';
import { ToastService } from '../../../toast-service/toast-service.service';
import { CategoryRequest } from '../../../../lib/interfaces/ICategory';

const ITEMS_PER_PAGE = 10;

type CategoryQueryParams = {
  search: string;
  page: number;
  limit: number;
};

@Injectable({
  providedIn: 'root',
})
export class CategoryQueryService {
  private readonly categoryService = inject(CategoryService);
  private readonly queryClient = inject(QueryClient);
  private readonly toastService = inject(ToastService);

  private params = signal<CategoryQueryParams>({
    search: '',
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  setParams(patch: Partial<CategoryQueryParams>) {
    this.params.update(prev => ({ ...prev, ...patch }));
  }

  get pagination() {
    const p = this.params();
    return {
      offset: (p.page - 1) * p.limit,
      limit: p.limit,
    };
  }

  getListCategories = injectQuery(() => ({
    queryKey: ['categories', this.params()],
    queryFn: async () => {
      const p = this.params();
      const pag = this.pagination;

      if (p.search) {
        return this.categoryService.findByName(p.search, pag);
      }

      return this.categoryService.findAllCategories(pag);
    },
  }));

  getCategoryById(id: string) {
    return injectQuery(() => ({
      queryKey: ['category', id],
      queryFn: () => this.categoryService.findById(id),
    }));
  }

  createCategory = injectMutation(() => ({
    mutationFn: (payload: CategoryRequest) =>
      this.categoryService.createCategory(payload),

    onSuccess: () => {
      this.toastService.success('Categoria criada com sucesso!');
      this.queryClient.invalidateQueries({ queryKey: ['categories'] });
    },

    onError: (err) => {
      console.error(err);
      this.toastService.error('Erro ao criar categoria.');
    },
  }));

  updateCategory = injectMutation(() => ({
    mutationFn: (payload: { id: string; data: CategoryRequest }) =>
      this.categoryService.updateCategory(payload.id, payload.data),

    onSuccess: () => {
      this.toastService.success('Categoria atualizada com sucesso!');
      this.queryClient.invalidateQueries({ queryKey: ['categories'] });
      this.queryClient.invalidateQueries({ queryKey: ['category'] });
    },

    onError: (err) => {
      console.error(err);
      this.toastService.error('Erro ao atualizar categoria.');
    },
  }));

  deleteCategory = injectMutation(() => ({
    mutationFn: (id: string) => this.categoryService.deleteCategory(id),

    onSuccess: () => {
      this.toastService.success('Categoria removida com sucesso!');
      this.queryClient.invalidateQueries({ queryKey: ['categories'] });
    },

    onError: (err) => {
      console.error(err);
      this.toastService.error('Erro ao remover categoria.');
    },
  }));
}
