import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

import { PaginationRequest, PaginationResponse } from '../../../../lib/interfaces/IPagination';
import { UserRequest, UserResponse } from '../../../../lib/interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/user`;

  async findAllUsers(pagination: PaginationRequest): Promise<PaginationResponse<UserResponse>> {
    const params = new HttpParams()
      .set('page', pagination.page)
      .set('limit', pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<UserResponse>>(this.apiUrl, { params })
    );
  }

  async findUserByName(
    name: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<UserResponse>> {
    const params = new HttpParams()
      .set('page', pagination.page)
      .set('limit', pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<UserResponse>>(
        `${this.apiUrl}/name/${name}`,
        { params }
      )
    );
  }

  async findUserByEmail(email: string): Promise<UserResponse> {
    return firstValueFrom(
      this.httpClient.get<UserResponse>(`${this.apiUrl}/email/${email}`)
    );
  }

  async findUserById(id: string): Promise<UserResponse> {
    return firstValueFrom(
      this.httpClient.get<UserResponse>(`${this.apiUrl}/${id}`)
    );
  }

  async createUser(data: UserRequest): Promise<UserResponse> {
    return firstValueFrom(
      this.httpClient.post<UserResponse>(`${this.apiUrl}`, data)
    );
  }

  async updateUser(id: string, data: Partial<UserRequest>): Promise<UserResponse> {
    return firstValueFrom(
      this.httpClient.put<UserResponse>(`${this.apiUrl}/${id}`, data)
    );
  }

  async updateUserStatus(id: string, isActive: boolean): Promise<UserResponse> {
    return firstValueFrom(
      this.httpClient.patch<UserResponse>(`${this.apiUrl}/${id}/status`, { isActive })
    );
  }

  async deleteUser(id: string): Promise<void> {
    return firstValueFrom(
      this.httpClient.delete<void>(`${this.apiUrl}/${id}`)
    );
  }
}
