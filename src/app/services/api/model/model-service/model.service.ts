import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { PaginationRequest, PaginationResponse } from '../../../../lib/interfaces/IPagination';
import { ModelRequest, ModelResponse } from '../../../../lib/interfaces/IModel';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/model`;

  async findAllModels(
    pagination: PaginationRequest
  ): Promise<PaginationResponse<ModelResponse>> {
    const params = new HttpParams()
      .set('page', pagination.page)
      .set('limit', pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<ModelResponse>>(this.apiUrl, { params })
    );
  }

  async findByName(
    name: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<ModelResponse>> {
    const params = new HttpParams()
      .set('page', pagination.page)
      .set('limit', pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<ModelResponse>>(
        `${this.apiUrl}/name/${name}`,
        { params }
      )
    );
  }

  async findByManufacturer(
    manufacturerId: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<ModelResponse>> {
    const params = new HttpParams()
      .set('page', pagination.page)
      .set('limit', pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<ModelResponse>>(
        `${this.apiUrl}/manufacturer/${manufacturerId}`,
        { params }
      )
    );
  }

  async findById(id: string): Promise<ModelResponse> {
    return firstValueFrom(
      this.httpClient.get<ModelResponse>(`${this.apiUrl}/${id}`)
    );
  }

  async createModel(payload: ModelRequest): Promise<ModelResponse> {
    return firstValueFrom(
      this.httpClient.post<ModelResponse>(this.apiUrl, payload)
    );
  }

  async updateModel(id: string, payload: ModelRequest): Promise<ModelResponse> {
    return firstValueFrom(
      this.httpClient.put<ModelResponse>(`${this.apiUrl}/${id}`, payload)
    );
  }

  async deleteModel(id: string): Promise<number> {
    return firstValueFrom(
      this.httpClient.delete<number>(`${this.apiUrl}/${id}`)
    );
  }
}
