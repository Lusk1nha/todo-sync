import { z } from "zod";
import {
  BIRTHDAY_MAX_DATE,
  BIRTHDAY_MIN_DATE,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} from "../constants";

export const UsersSettingsSchema = z.object({
  username: z
    .string({
      required_error: "Nome de usuário é obrigatório!",
    })
    .regex(USERNAME_REGEX, {
      message: "Nome de usuário inválido! Use apenas letras, números, - e _",
    })
    .min(USERNAME_MIN_LENGTH, "Nome de usuário muito curto!")
    .max(USERNAME_MAX_LENGTH, "Nome de usuário muito longo!"),

  birthday: z
    .date({
      required_error: "Data de nascimento é obrigatória!",
    })
    .min(BIRTHDAY_MIN_DATE, "Data de nascimento inválida!")
    .max(BIRTHDAY_MAX_DATE, "Data de nascimento inválida!")
    .optional()
    .nullable(),

  profilePicture: z.string().optional().nullable(),

  termsAndConditions: z
    .boolean({
      required_error: "Você deve preencher os termos e condições!",
    })
    .refine((value) => value === true, {
      message: "Você deve aceitar os termos e condições!",
    }),
});

export type UsersSettingsSchemaType = z.infer<typeof UsersSettingsSchema>;
