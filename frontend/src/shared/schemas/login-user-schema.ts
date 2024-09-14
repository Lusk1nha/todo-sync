import { z } from "zod";
import { PASSWORD_MIN_LENGTH } from "../constants";

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
    .min(PASSWORD_MIN_LENGTH, "Senha deve ter no mínimo 8 caracteres!"),
});

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
