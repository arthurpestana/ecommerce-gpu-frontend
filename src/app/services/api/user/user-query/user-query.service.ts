import { Injectable, signal, inject } from '@angular/core';
import { injectQuery, injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

import { PaginationRequest } from '../../../../lib/interfaces/IPagination';
import { UserService } from '../user-service/user.service';
import { UserRequest } from '../../../../lib/interfaces/IUser';
import { ToastService } from '../../../toast-service/toast-service.service';

const ITEMS_PER_PAGE = 10;

export type UserQueryParams = {
  search: string;
  page: number;
  limit: number;
};

@Injectable({
  providedIn: 'root',
})
export class UserQueryService {
  private readonly userService = inject(UserService);
  private readonly queryClient = inject(QueryClient);
  private readonly toastService = inject(ToastService);

  private params = signal<UserQueryParams>({
    search: '',
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  setParams(patch: Partial<UserQueryParams>) {
    this.params.update((prev) => ({ ...prev, ...patch }));
  }

  get pagination(): PaginationRequest {
    const p = this.params();
    return {
      page: p.page - 1,
      limit: p.limit,
    };
  }

  listUsers = injectQuery(() => ({
    queryKey: ['users', this.params()],

    queryFn: async () => {
      const params = this.params();
      const pagination = this.pagination;

      if (params.search.trim()) {
        return this.userService.findUserByName(params.search, pagination);
      }

      return this.userService.findAllUsers(pagination);
    },
  }));

  getUserById(id: string) {
    return injectQuery(() => ({
      queryKey: ['user', id],
      queryFn: () => this.userService.findUserById(id),
    }));
  }

  createUser = injectMutation(() => ({
    mutationFn: (payload: UserRequest) => this.userService.createUser(payload),
    onSuccess: () => {
      this.toastService.success("Usuário criado com sucesso!");
      this.queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => this.toastService.error("Erro ao criar usuário."),
  }));

  updateUser = injectMutation(() => ({
    mutationFn: (payload: { id: string; data: Partial<UserRequest> }) =>
      this.userService.updateUser(payload.id, payload.data),
    onSuccess: () => {
      this.toastService.success("Usuário atualizado com sucesso!");
      this.queryClient.invalidateQueries({ queryKey: ['users'] });
      this.queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => this.toastService.error("Erro ao atualizar usuário."),
  }));

  updateUserStatus = injectMutation(() => ({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      this.userService.updateUserStatus(id, isActive),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['users'] });
      this.queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => this.toastService.error("Erro ao atualizar status."),
  }));

  deleteUser = injectMutation(() => ({
    mutationFn: (id: string) => this.userService.deleteUser(id),
    onSuccess: () => {
      this.toastService.success("Usuário removido!");
      this.queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => this.toastService.error("Erro ao remover usuário."),
  }));

  getUsersRangeStart() {
    const params = this.params();
    return (params.page - 1) * params.limit + 1;
  }

  getUsersRangeEnd(totalItems: number) {
    const params = this.params();
    return Math.min(params.page * params.limit, totalItems);
  }
}
