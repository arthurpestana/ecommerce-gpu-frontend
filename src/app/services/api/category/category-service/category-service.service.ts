import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService {
  private readonly httpClient = inject(HttpClient)
  private readonly apiUrl = `${environment.apiUrl}/category`

  

}
