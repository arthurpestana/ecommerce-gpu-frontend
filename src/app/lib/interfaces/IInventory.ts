import { GpuResponse } from "./IGpu";

export enum TransactionTypes {
    ADD = "ADD",
    REMOVE = "REMOVE"
}

export interface InventoryTransactionResponse {
    id: string;
    gpu: GpuResponse;
    quantity: number;
    transactionDate: string;
    reason: string | null;
    transactionType: TransactionTypes;
    createdAt: string;
    updatedAt: string;
}

export interface InventoryTransactionRequest {
    gpuId: string;
    quantity: number;
    transactionType: TransactionTypes;
    reason?: string;
    transactionDate?: string;
}
