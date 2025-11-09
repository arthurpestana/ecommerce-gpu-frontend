import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../../../environments/environment";


import {
  PaginationRequest,
  PaginationResponse,
} from "../../../../lib/interfaces/IPagination";
import { InventoryTransactionResponse, InventoryTransactionRequest } from "../../../../lib/interfaces/IInventory";

@Injectable({
  providedIn: "root",
})
export class InventoryTransactionService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/inventory`;

  async findAll(
    pagination: PaginationRequest
  ): Promise<PaginationResponse<InventoryTransactionResponse>> {
    const params = new HttpParams()
      .set("page", pagination.page)
      .set("limit", pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<InventoryTransactionResponse>>(
        this.apiUrl,
        { params }
      )
    );
  }

  async findByGpu(
    gpuId: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<InventoryTransactionResponse>> {
    const params = new HttpParams()
      .set("page", pagination.page)
      .set("limit", pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<InventoryTransactionResponse>>(
        `${this.apiUrl}/gpu/${gpuId}`,
        { params }
      )
    );
  }

  async findByType(
    type: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<InventoryTransactionResponse>> {
    const params = new HttpParams()
      .set("page", pagination.page)
      .set("limit", pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<InventoryTransactionResponse>>(
        `${this.apiUrl}/type/${type}`,
        { params }
      )
    );
  }

  async findByDateRange(
    start: string,
    end: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<InventoryTransactionResponse>> {
    let params = new HttpParams()
      .set("page", pagination.page)
      .set("limit", pagination.limit)
      .set("start", start)
      .set("end", end);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<InventoryTransactionResponse>>(
        `${this.apiUrl}/date-range`,
        { params }
      )
    );
  }

  async findById(id: string): Promise<InventoryTransactionResponse> {
    return firstValueFrom(
      this.httpClient.get<InventoryTransactionResponse>(`${this.apiUrl}/${id}`)
    );
  }

  async create(
    payload: InventoryTransactionRequest
  ): Promise<InventoryTransactionResponse> {
    return firstValueFrom(
      this.httpClient.post<InventoryTransactionResponse>(this.apiUrl, payload)
    );
  }

  async delete(id: string): Promise<number> {
    return firstValueFrom(
      this.httpClient.delete<number>(`${this.apiUrl}/${id}`)
    );
  }
}
