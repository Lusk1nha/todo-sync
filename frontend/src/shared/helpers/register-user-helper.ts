import { PASSWORD_MIN_LENGTH, REGEX_EMAIL } from "../constants";
import { ISignUpRequest } from "../repositories/auth-repo";
import {
  RegisterUserSchema,
  RegisterUserSchemaType,
} from "../schemas/register-user-schema";

export function getRequestSignUp(data: RegisterUserSchemaType): ISignUpRequest {
  const { email, password } = data;

  const newEmail = email.trim();
  const newPassword = password.trim();

  return {
    email: newEmail,
    password: newPassword,
  };
}

export function validateSignUp(data: RegisterUserSchemaType): void {
  RegisterUserSchema.parse(data);

  isValidEmail(data.email);
  isValidPassword(data.password);
  isValidConfirmPassword(data.password, data.confirmPassword);
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

  if (password.length < PASSWORD_MIN_LENGTH) {
    throw new Error("Senha deve ter no mínimo 6 caracteres");
  }
}

function isValidConfirmPassword(
  password: string,
  confirmPassword: string
): void {
  if (!confirmPassword) {
    throw new Error("Confirmação de senha é obrigatória");
  }

  if (password !== confirmPassword) {
    throw new Error("Senhas não conferem");
  }
}
