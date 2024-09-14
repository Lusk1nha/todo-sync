import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "../constants";

export const RegisterUserSchema = z
  .object({
    email: z
      .string({
        required_error: "E-mail é obrigatório!",
      })
      .email("E-mail inválido!"),

    password: z
      .string({
        required_error: "Senha é obrigatória!",
      })
      .min(PASSWORD_MIN_LENGTH, "Senha deve ter no mínimo 8 caracteres!")
      .regex(
        PASSWORD_REGEX,
        "Senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial!"
      ),

    confirmPassword: z.string({
      required_error: "Confirmação de senha é obrigatória!",
    }),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    {
      message: "As senhas não são iguais",
      path: ["confirmPassword"],
    }
  );

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;
