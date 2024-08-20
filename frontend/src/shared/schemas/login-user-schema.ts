import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "E-mail é obrigatório!",
    })
    .email("E-mail inválido!"),
  password: z
    .string({
      required_error: "Senha é obrigatória!",
    })
    .min(8, "Senha deve ter no mínimo 8 caracteres!"),
});

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
