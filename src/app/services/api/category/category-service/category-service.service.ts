import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PaginationRequest, PaginationResponse } from '../../../../lib/interfaces/IPagination';
import { CategoryRequest, CategoryResponse } from '../../../../lib/interfaces/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/category`;

  async findAllCategories(
    pagination: PaginationRequest
  ): Promise<PaginationResponse<CategoryResponse>> {
    const params = new HttpParams()
      .set('page', pagination.page)
      .set('limit', pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<CategoryResponse>>(this.apiUrl, { params })
    );
  }

  async findByName(
    name: string,
    pagination: PaginationRequest
  ): Promise<PaginationResponse<CategoryResponse>> {
    const params = new HttpParams()
      .set('page', pagination.page)
      .set('limit', pagination.limit);

    return firstValueFrom(
      this.httpClient.get<PaginationResponse<CategoryResponse>>(
        `${this.apiUrl}/name/${name}`,
        { params }
      )
    );
  }

  async findById(id: string): Promise<CategoryResponse> {
    return firstValueFrom(
      this.httpClient.get<CategoryResponse>(`${this.apiUrl}/${id}`)
    );
  }

  async createCategory(payload: CategoryRequest): Promise<CategoryResponse> {
    return firstValueFrom(
      this.httpClient.post<CategoryResponse>(this.apiUrl, payload)
    );
  }

  async updateCategory(
    id: string,
    payload: CategoryRequest
  ): Promise<CategoryResponse> {
    return firstValueFrom(
      this.httpClient.put<CategoryResponse>(`${this.apiUrl}/${id}`, payload)
    );
  }

  async deleteCategory(id: string): Promise<number> {
    return firstValueFrom(
      this.httpClient.delete<number>(`${this.apiUrl}/${id}`)
    );
  }
}
