import { PaymentMethod } from "../enums/PaymentMethod";
import { PaymentStatus } from "../enums/PaymentStatus";

export interface PaymentResponse {
    id: string;
    gatewayPaymentId: string;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    amount: number;
}