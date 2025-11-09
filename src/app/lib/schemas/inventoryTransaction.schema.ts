import { z } from "zod";
import { TransactionTypes } from "../interfaces/IInventory";

export const transactionTypesEnum = [
    TransactionTypes.ADD,
    TransactionTypes.REMOVE,
] as const;

export const inventoryTransactionRequestSchema = z.object({
    gpuId: z.string().uuid("ID da GPU inválido"),
    quantity: z.number().min(1, "Quantidade deve ser maior que zero"),
    transactionType: z.enum(transactionTypesEnum, {
        errorMap: () => ({ message: "Tipo de transação inválido" }),
    }),
    reason: z.string().max(255, "O motivo pode ter no máximo 255 caracteres").optional(),
    transactionDate: z.string().datetime().optional(),
});

export type InventoryTransactionRequestDTO = z.infer<
    typeof inventoryTransactionRequestSchema
>;
