import { z } from "zod";

export const loginRequestSchema = z
  .object({
    email: z
      .string()
      .email("E-mail inválido")
      .min(1, "E-mail é obrigatório")
      .max(150),
    password: z
      .string()
      .min(6, "A senha deve conter no mínimo 6 caracteres")
      .max(100),
  })
  .strict();

export const registerRequestSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório").max(100),
    email: z.string().email().max(150),
    phoneNumber: z
      .string()
      .regex(/^\d{10,15}$/, "Telefone deve conter entre 10 e 15 dígitos numéricos"),
    cpf: z
      .string()
      .regex(/^\d{11}$/, "CPF deve conter exatamente 11 dígitos"),
    password: z.string().min(6).max(100),
  })
  .strict();

export type LoginSchema = z.infer<typeof loginRequestSchema>;
export type RegisterSchema = z.infer<typeof registerRequestSchema>;
