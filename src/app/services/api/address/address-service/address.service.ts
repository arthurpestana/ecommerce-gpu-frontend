import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

import { PaginationRequest, PaginationResponse } from '../../../../lib/interfaces/IPagination';
import { AddressRequest, AddressResponse } from '../../../../lib/interfaces/IAddress';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/address`;

  async findAllAddresses(
    pagination: PaginationRequest
  ): Promise<PaginationResponse<AddressResponse>> {
    const params = new HttpParams()
      .set("page", pagination.page)
      .set("limit", pagination.limit);

    return firstValueFrom(
      this.http.get<PaginationResponse<AddressResponse>>(this.apiUrl, { params })
    );
  }

  async findAddressByCity(
    city: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<AddressResponse>> {
    const params = new HttpParams()
      .set("page", pagination.page)
      .set("limit", pagination.limit);

    return firstValueFrom(
      this.http.get<PaginationResponse<AddressResponse>>(
        `${this.apiUrl}/city/${city}`,
        { params }
      )
    );
  }

  async findAddressByUser(
    userId: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<AddressResponse>> {
    const params = new HttpParams()
      .set("page", pagination.page)
      .set("limit", pagination.limit);

    return firstValueFrom(
      this.http.get<PaginationResponse<AddressResponse>>(
        `${this.apiUrl}/user/${userId}`,
        { params }
      )
    );
  }

  async findAddressById(id: string): Promise<AddressResponse> {
    return firstValueFrom(this.http.get<AddressResponse>(`${this.apiUrl}/${id}`));
  }

  async createAddress(data: AddressRequest): Promise<AddressResponse> {
    return firstValueFrom(
      this.http.post<AddressResponse>(this.apiUrl, data)
    );
  }

  async updateAddress(id: string, data: Partial<AddressRequest>): Promise<AddressResponse> {
    return firstValueFrom(
      this.http.put<AddressResponse>(`${this.apiUrl}/${id}`, data)
    );
  }

  async deleteAddress(id: string): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${id}`)
    );
  }
}
