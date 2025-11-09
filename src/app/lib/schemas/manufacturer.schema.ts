import { z } from "zod";

export const manufacturerRequestSchema = z.object({
    name: z.string().min(1, "Nome do fabricante é obrigatório"),
    email: z.string().email("Email inválido"),
    cnpj: z.string()
        .refine(v => v.replace(/\D/g, '').length === 14, {
            message: "CNPJ inválido",
        })
        .transform(v => v.replace(/\D/g, "")),
    country: z.string().min(1, "País é obrigatório"),
})

export type ManufacturerRequestSchema = z.infer<typeof manufacturerRequestSchema>;