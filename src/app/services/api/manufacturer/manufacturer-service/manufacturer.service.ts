import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

import { PaginationRequest, PaginationResponse } from '../../../../lib/interfaces/IPagination';
import { ManufacturerRequest, ManufacturerResponse } from '../../../../lib/interfaces/IManufacturer';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/manufacturer`;

  async findAllManufacturers(
    pagination: PaginationRequest
  ): Promise<PaginationResponse<ManufacturerResponse>> {
    const params = new HttpParams()
      .set('offset', pagination.offset)
      .set('limit', pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<ManufacturerResponse>>(this.apiUrl, { params })
    );
  }

  async findByName(
    name: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<ManufacturerResponse>> {
    const params = new HttpParams()
      .set('offset', pagination.offset)
      .set('limit', pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<ManufacturerResponse>>(
        `${this.apiUrl}/name/${name}`,
        { params }
      )
    );
  }

  async findById(id: string): Promise<ManufacturerResponse> {
    return firstValueFrom(
      this.httpClient.get<ManufacturerResponse>(`${this.apiUrl}/${id}`)
    );
  }

  async createManufacturer(payload: ManufacturerRequest): Promise<ManufacturerResponse> {
    return firstValueFrom(
      this.httpClient.post<ManufacturerResponse>(this.apiUrl, payload)
    );
  }

  async updateManufacturer(
    id: string,
    payload: ManufacturerRequest
  ): Promise<ManufacturerResponse> {
    return firstValueFrom(
      this.httpClient.put<ManufacturerResponse>(`${this.apiUrl}/${id}`, payload)
    );
  }

  async deleteManufacturer(id: string): Promise<number> {
    return firstValueFrom(
      this.httpClient.delete<number>(`${this.apiUrl}/${id}`)
    );
  }
}
