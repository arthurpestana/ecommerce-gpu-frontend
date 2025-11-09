import { z } from "zod";

export const technologyRequestSchema = z.object({
  name: z.string().min(1, "Nome da tecnologia é obrigatório"),
  description: z.string().optional(),
});

export type TechnologyRequestSchema = z.infer<typeof technologyRequestSchema>;