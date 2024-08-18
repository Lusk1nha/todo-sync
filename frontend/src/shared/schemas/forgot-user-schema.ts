import { z } from "zod";

export const ForgotUserSchema = z.object({
  email: z
    .string({
      required_error: "E-mail é obrigatório!",
    })
    .email("E-mail inválido!"),
});

export type ForgotUserSchemaType = z.infer<typeof ForgotUserSchema>;