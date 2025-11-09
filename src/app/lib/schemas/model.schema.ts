import { z } from "zod";

export const modelRequestSchema = z.object({
    name: z.string().min(1, "Nome do modelo é obrigatório"),
    manufacturerId: z.string().uuid("Fabricante inválido"),
    releaseYear: z.number().min(1900, "Ano de lançamento inválido").max(new Date().getFullYear(), "Ano de lançamento inválido"),
})