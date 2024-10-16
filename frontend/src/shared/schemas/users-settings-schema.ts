import { z } from "zod";
import {
  BIRTHDAY_MAX_DATE,
  BIRTHDAY_MIN_DATE,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
} from "../constants";
import { FileSchemaValidation } from "../helpers/files-helper";

export const UsersSettingsSchema = z.object({
  username: z
    .string({
      required_error: "Nome de usuário é obrigatório!",
    })
    .regex(USERNAME_REGEX, {
      message:
        "Nome de usuário inválido! Use apenas letras, números, espaços, - ou _",
    })
    .min(
      USERNAME_MIN_LENGTH,
      `Nome de usuário muito curto, mínimo de ${USERNAME_MIN_LENGTH} caracteres!`
    )
    .max(
      USERNAME_MAX_LENGTH,
      `Nome de usuário muito longo, máximo de ${USERNAME_MAX_LENGTH} caracteres!`
    ),

  birthday: z
    .date({
      required_error: "Data de nascimento é obrigatória!",
    })
    .min(BIRTHDAY_MIN_DATE, "Data de nascimento inválida!")
    .max(BIRTHDAY_MAX_DATE, "Data de nascimento inválida!")
    .optional()
    .nullable(),

  profilePicture: FileSchemaValidation.nullable(),

  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: "Para continuar, você deve aceitar os termos e condições!",
  }),
});

export type UsersSettingsSchemaType = z.infer<typeof UsersSettingsSchema>;
