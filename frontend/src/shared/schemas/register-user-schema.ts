import { z } from "zod";

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
      .min(8, "Senha deve ter no mínimo 8 caracteres!")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial!"
      ),
    confirmPassword: z
      .string({
        required_error: "Confirmação de senha é obrigatória!",
      })
      .min(8),
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
