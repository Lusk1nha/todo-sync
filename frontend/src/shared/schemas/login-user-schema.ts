import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "E-mail é obrigatório!",
    })
    .email("E-mail inválido!"),

  password: z.string({
    required_error: "Senha é obrigatória!",
  }),
});

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
