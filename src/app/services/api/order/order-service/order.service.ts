import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

import { PaginationRequest, PaginationResponse } from '../../../../lib/interfaces/IPagination';
import { OrderRequest, OrderResponse } from '../../../../lib/interfaces/IOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/orders`;

  async findAllOrders(
    pagination: PaginationRequest
  ): Promise<PaginationResponse<OrderResponse>> {
    const params = new HttpParams()
      .set("page", pagination.page)
      .set("limit", pagination.limit);

    return firstValueFrom(
      this.http.get<PaginationResponse<OrderResponse>>(this.apiUrl, { params })
    );
  }

  async findByUser(
    userId: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<OrderResponse>> {
    const params = new HttpParams()
      .set("page", pagination.page)
      .set("limit", pagination.limit);

    return firstValueFrom(
      this.http.get<PaginationResponse<OrderResponse>>(
        `${this.apiUrl}/user/${userId}`,
        { params }
      )
    );
  }

  async findOrderById(id: string): Promise<OrderResponse> {
    return firstValueFrom(
      this.http.get<OrderResponse>(`${this.apiUrl}/${id}`)
    );
  }

  async createOrder(data: OrderRequest): Promise<OrderResponse> {
    return firstValueFrom(
      this.http.post<OrderResponse>(`${this.apiUrl}`, data)
    );
  }
}
