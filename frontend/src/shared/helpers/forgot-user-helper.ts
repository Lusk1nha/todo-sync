import { REGEX_EMAIL } from "../constants";
import {
  ForgotUserSchema,
  ForgotUserSchemaType,
} from "../schemas/forgot-user-schema";

export function validateForgotUser(data: ForgotUserSchemaType): void {
  ForgotUserSchema.parse(data);

  validateEmail(data.email);
}

function validateEmail(email: string): void {
  const emailRegex = REGEX_EMAIL;

  if (!emailRegex.test(email)) {
    throw new Error("Email inválido");
  }
}
