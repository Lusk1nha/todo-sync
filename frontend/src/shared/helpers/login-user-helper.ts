import { REGEX_EMAIL } from "../constants";
import {
  LoginUserSchema,
  LoginUserSchemaType,
} from "../schemas/login-user-schema";

export function getRequestLogin(
  data: LoginUserSchemaType
): LoginUserSchemaType {
  const { email, password } = data;

  const newEmail = email.trim();
  const newPassword = password.trim();

  return {
    email: newEmail,
    password: newPassword,
  };
}

export function validateLogin(data: LoginUserSchemaType): void {
  LoginUserSchema.parse(data);

  isValidEmail(data.email);
  isValidPassword(data.password);
}

function isValidEmail(email: string): void {
  const regex = REGEX_EMAIL;

  if (!email) {
    throw new Error("E-mail é obrigatório");
  }

  if (!regex.test(email)) {
    throw new Error("E-mail inválido");
  }
}

function isValidPassword(password: string): void {
  if (!password) {
    throw new Error("Senha é obrigatória");
  }
}
