import { z } from "zod";
import { technologyRequestSchema } from "./technology.schema";

export const gpuRequestSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),

  price: z.number().min(0.01, "Preço deve ser maior que 0"),
  isActive: z.boolean(),

  availableQuantity: z.number().min(0, "Quantidade deve ser >= 0"),
  memory: z.number().min(1, "Memória deve ser >= 1"),

  architecture: z.string().min(1, "Arquitetura é obrigatória"),
  energyConsumption: z.number().min(1, "Consumo deve ser >= 1"),

  modelId: z.string().uuid("Modelo inválido"),

  technologies: z.array(technologyRequestSchema).optional(),
  categoryIds: z.array(z.string().uuid("Categoria inválida")).optional(),
}).strict();

export const gpuCreateRequestSchema = gpuRequestSchema;

export const gpuUpdateRequestSchema = gpuRequestSchema.partial();

export type gpuCreateRequestSchema = z.infer<typeof gpuCreateRequestSchema>;
export type gpuUpdateRequestSchema = z.infer<typeof gpuUpdateRequestSchema>;