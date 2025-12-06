import { UserRoles } from "../enums/UserRoles";
import { AddressResponse } from "./IAddress";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  role: UserRoles;
  isActive: boolean;
  addresses: AddressResponse[];
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

export interface UserUpdateRequest {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  password?: string;
  role: UserRoles | string;
  isActive: boolean;
}
