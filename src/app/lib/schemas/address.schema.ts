import { z } from "zod";

export const addressRequestSchema = z
  .object({
    street: z
      .string()
      .min(1, "Rua é obrigatória")
      .max(150, "Rua pode ter no máximo 150 caracteres"),

    city: z
      .string()
      .min(1, "Cidade é obrigatória")
      .max(100, "Cidade pode ter no máximo 100 caracteres"),

    state: z
      .string()
      .min(1, "Estado é obrigatório")
      .max(100, "Estado pode ter no máximo 100 caracteres"),

    zipCode: z
      .string()
      .regex(/^\d{5}-?\d{3}$/, "CEP deve ter o formato 99999-999"),

    country: z
      .string()
      .min(1, "País é obrigatório")
      .max(100, "País pode ter no máximo 100 caracteres"),

    userId: z
      .string()
      .min(1, "ID do usuário é obrigatório"),
  })
  .strict();

export const addressCreateRequestSchema = addressRequestSchema;
export const addressUpdateRequestSchema = addressRequestSchema.partial();

export type AddressCreateRequest = z.infer<typeof addressCreateRequestSchema>;
export type AddressUpdateRequest = z.infer<typeof addressUpdateRequestSchema>;
