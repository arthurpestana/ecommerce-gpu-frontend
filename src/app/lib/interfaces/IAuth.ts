import { UserResponse } from "./IUser";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}
