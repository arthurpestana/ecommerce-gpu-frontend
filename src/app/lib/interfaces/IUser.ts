import { UserRoles } from "../enums/UserRoles";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  role: UserRoles;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRequest {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  password: string;
  role: UserRoles | string;
  isActive: boolean;
}
