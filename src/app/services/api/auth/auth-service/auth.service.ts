import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../../../environments/environment";

import { LoginRequest, AuthResponse, RegisterRequest } from "../../../../lib/interfaces/IAuth";
import { UserResponse } from "../../../../lib/interfaces/IUser";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  async login(data: LoginRequest): Promise<AuthResponse> {
    return firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/login`, data)
    );
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/register`, data)
    );
  }

  async me(): Promise<UserResponse> {
    return firstValueFrom(
      this.http.get<UserResponse>(`${this.apiUrl}/me`)
    );
  }
}
