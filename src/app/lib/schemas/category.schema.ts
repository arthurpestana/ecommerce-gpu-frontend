import { z } from "zod";

export const categoryRequestSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").max(255),
  description: z.string().min(1, "A descrição é obrigatória").max(500),
}).strict();

export type CategoryRequestSchema = z.infer<typeof categoryRequestSchema>;