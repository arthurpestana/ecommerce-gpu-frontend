import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GpuRequest, GpuResponse } from '../../../../lib/interfaces/IGpu';
import { PaginationRequest, PaginationResponse } from '../../../../lib/interfaces/IPagination';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GpuService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/gpu`;

  async findAllGpus(paginationParams: PaginationRequest): Promise<PaginationResponse<GpuResponse>> {
    const params = new HttpParams()
      .set('page', paginationParams.page)
      .set('limit', paginationParams.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<GpuResponse>>(`${this.apiUrl}`, { params })
    );
  }

  async filterGpus(filters: {
    name?: string;
    modelId?: number;
    manufacturerId?: number;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }): Promise<PaginationResponse<GpuResponse>> {
    let params = new HttpParams();
    if (filters.name) params = params.set('name', filters.name);
    if (filters.modelId) params = params.set('modelId', filters.modelId);
    if (filters.manufacturerId) params = params.set('manufacturerId', filters.manufacturerId);
    if (filters.minPrice) params = params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params = params.set('maxPrice', filters.maxPrice);
    if (filters.isActive !== undefined) params = params.set('isActive', filters.isActive);
    if (filters.page !== undefined) params = params.set('page', filters.page);
    if (filters.limit !== undefined) params = params.set('limit', filters.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<GpuResponse>>(`${this.apiUrl}/filter`, { params })
    );
  }

  async findByModel(
    modelId: string,
    paginationParams: PaginationRequest
  ): Promise<PaginationResponse<GpuResponse>> {
    const params = new HttpParams()
      .set('page', paginationParams.page)
      .set('limit', paginationParams.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<GpuResponse>>(`${this.apiUrl}/model/${modelId}`, {
        params,
      })
    );
  }

  async findByManufacturer(
    manufacturerId: string,
    paginationParams: PaginationRequest
  ): Promise<PaginationResponse<GpuResponse>> {
    const params = new HttpParams()
      .set('page', paginationParams.page)
      .set('limit', paginationParams.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<GpuResponse>>(
        `${this.apiUrl}/manufacturer/${manufacturerId}`,
        { params }
      )
    );
  }

  async findByPriceRange(
    min?: number,
    max?: number,
    paginationParams?: PaginationRequest
  ): Promise<PaginationResponse<GpuResponse>> {
    let params = new HttpParams();
    if (min !== undefined) params = params.set('min', min);
    if (max !== undefined) params = params.set('max', max);
    if (paginationParams) {
      params = params.set('page', paginationParams.page).set('limit', paginationParams.limit);
    }

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<GpuResponse>>(`${this.apiUrl}/price-range`, { params })
    );
  }

  async findByTechnology(
    tech: string,
    paginationParams: PaginationRequest
  ): Promise<PaginationResponse<GpuResponse>> {
    const params = new HttpParams()
      .set('page', paginationParams.page)
      .set('limit', paginationParams.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<GpuResponse>>(`${this.apiUrl}/technology/${tech}`, {
        params,
      })
    );
  }

  async findByCategory(
    category: string,
    paginationParams: PaginationRequest
  ): Promise<PaginationResponse<GpuResponse>> {
    const params = new HttpParams()
      .set('page', paginationParams.page)
      .set('limit', paginationParams.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<GpuResponse>>(`${this.apiUrl}/category/${category}`, {
        params,
      })
    );
  }

  async findGpuById(id: string): Promise<GpuResponse> {
    return firstValueFrom(this.httpClient.get<GpuResponse>(`${this.apiUrl}/${id}`));
  }

  async createGpu(payload: { data: GpuRequest; images?: File[] }): Promise<GpuResponse> {
    const form = new FormData();
    form.append("data", new Blob([JSON.stringify(payload.data)], { type: "application/json" }));

    if (payload.images?.length) {
      payload.images.forEach(img => form.append("images", img));
    }

    return firstValueFrom(
      this.httpClient.post<GpuResponse>(`${this.apiUrl}`, form)
    );
  }


  async updateGpu(
    id: string,
    payload: { data: Partial<GpuRequest>; images?: File[] }
  ): Promise<GpuResponse> {
    const form = new FormData();
    form.append("data", new Blob([JSON.stringify(payload.data)], { type: "application/json" }));

    if (payload.images?.length) {
      payload.images.forEach(img => form.append("images", img));
    }

    return firstValueFrom(
      this.httpClient.put<GpuResponse>(`${this.apiUrl}/${id}`, form)
    );
  }

  async deleteImagesFromGpu(gpuId: string, imageIds: string[]): Promise<void> {
    const body = { imageIds };

    return firstValueFrom(
      this.httpClient.delete<void>(`${this.apiUrl}/${gpuId}/images`, { body })
    );
  }

  async updateGpuStatus(id: string, isActive: boolean): Promise<GpuResponse> {
    return firstValueFrom(
      this.httpClient.patch<GpuResponse>(`${this.apiUrl}/${id}/status`, { isActive })
    );
  }

  async deleteGpu(id: string): Promise<number> {
    return firstValueFrom(this.httpClient.delete<number>(`${this.apiUrl}/${id}`));
  }
}
