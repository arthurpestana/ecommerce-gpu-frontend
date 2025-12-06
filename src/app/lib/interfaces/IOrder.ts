import { GpuResponse } from "./IGpu";
import { AddressResponse } from "./IAddress";
import { UserResponse } from "./IUser";
import { PaymentResponse } from "./IPayment";
import { PaymentMethod } from "../enums/PaymentMethod";
import { OrderStatus } from "../enums/OrderStatus";

export interface OrderItemRequest {
    gpuId: string;
    quantity: number;
}

export interface OrderItemResponse {
    id: string;
    quantity: number;
    price: number;
    gpu: GpuResponse;
    createdAt?: string;
    updatedAt?: string;
}

export interface OrderRequest {
    userId: string;
    addressId: string;
    items: OrderItemRequest[];
    paymentMethod: PaymentMethod;
}

export interface OrderResponse {
    id: string;
    orderDate: string;
    totalAmount: number;
    orderStatus: OrderStatus;
    items: OrderItemResponse[];
    payment: PaymentResponse | null;
    user: UserResponse;
    address: AddressResponse;
    checkoutUrl: string | null;
    createdAt?: string;
    updatedAt?: string;
}
