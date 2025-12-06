import { z } from "zod";

export const userRequestSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .max(100, "Nome pode ter no máximo 100 caracteres"),

    email: z
      .string()
      .email("E-mail inválido")
      .max(150, "O e-mail pode ter no máximo 150 caracteres"),

    phoneNumber: z
      .string()
      .transform(v => v.replace(/\D/g, ""))
      .refine(v => /^\d{10,15}$/.test(v), {
        message: "Telefone deve conter entre 10 e 15 dígitos numéricos",
      }),

    cpf: z
      .string()
      .transform(v => v.replace(/\D/g, ""))
      .refine(v => /^\d{11}$/.test(v), {
        message: "CPF deve conter exatamente 11 dígitos",
      }),
      
    password: z
      .string()
      .min(6, "A senha deve conter no mínimo 6 caracteres")
      .max(100, "A senha deve conter no máximo 100 caracteres"),
      

    role: z.enum(["ADMIN", "CUSTOMER"]),

    isActive: z.boolean(),
  })
  .strict();

export const userCreateRequestSchema = userRequestSchema;

export const userUpdateRequestSchema = userRequestSchema.partial();

export type UserCreateRequest = z.infer<typeof userCreateRequestSchema>;
export type UserUpdateRequest = z.infer<typeof userUpdateRequestSchema>;
