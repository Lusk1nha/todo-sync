import {
  UsersSettingsSchema,
  UsersSettingsSchemaType,
} from "../schemas/users-settings-schema";

import {
  USERNAME_REGEX,
  BIRTHDAY_MAX_DATE,
  BIRTHDAY_MIN_DATE,
} from "../constants";
import { IUpdateSettings } from "../repositories/users-profiles-repo";

export function getRequestUserSettings(
  data: UsersSettingsSchemaType
): IUpdateSettings {
  const { username, birthday } = data;

  const newUsername = username.trim();
  const newBirthday = birthday.toISOString();

  return {
    username: newUsername,
    date_of_birth: newBirthday,

    profile_picture_url: undefined,
  };
}

export function validateUserSettings(data: UsersSettingsSchemaType) {
  UsersSettingsSchema.parse(data);

  validateUsername(data.username);
  validateBirthday(data.birthday);
  validateTermsAndConditions(data.termsAndConditions);
}

function validateUsername(username: string): void {
  if (!username) {
    throw new Error("Nome de usuário é obrigatório");
  }

  if (!USERNAME_REGEX.test(username)) {
    throw new Error("Nome de usuário inválido");
  }
}

function validateBirthday(birthday: Date): void {
  if (!birthday) {
    throw new Error("Data de nascimento é obrigatória");
  }

  if (birthday < BIRTHDAY_MIN_DATE) {
    throw new Error("Data de nascimento inválida");
  }

  if (birthday > BIRTHDAY_MAX_DATE) {
    throw new Error("Data de nascimento inválida");
  }
}

function validateTermsAndConditions(termsAndConditions: boolean): void {
  if (!termsAndConditions) {
    throw new Error("Termos e condições são obrigatórios");
  }
}
