import { UserResponse } from "./IUser";

export interface AddressResponse {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  user: UserResponse;
}

export interface AddressRequest {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  userId: string;
}
