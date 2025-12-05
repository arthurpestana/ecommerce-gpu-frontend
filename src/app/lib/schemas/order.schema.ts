import { z } from "zod";

export const orderItemRequestSchema = z.object({
  gpuId: z.string().min(1, "O ID da GPU é obrigatório"),
  quantity: z.number().min(1, "Quantidade mínima é 1"),
});

export const orderRequestSchema = z
  .object({
    addressId: z.string().min(1, "O endereço é obrigatório"),
    items: z
      .array(orderItemRequestSchema)
      .min(1, "O pedido deve conter ao menos um item"),
    paymentMethod: z.enum(["CREDIT_CARD", "DEBIT_CARD", "PIX", "BOLETO"], {
      required_error: "O método de pagamento é obrigatório",
    }),
  })
  .strict();

export type OrderCreateRequest = z.infer<typeof orderRequestSchema>;
export type OrderItemRequest = z.infer<typeof orderItemRequestSchema>;