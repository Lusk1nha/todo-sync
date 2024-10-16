import { FieldErrors, FieldValues, Message } from "react-hook-form";

type ErrorList = {
  key: string;
  message?: Message;
};

export function getErrorsAsList<T extends FieldValues>(errors: FieldErrors<T>) {
  const array = Object.entries(errors);

  const errorList: ErrorList[] = array.map(([key, error]) => {
    return {
      key,
      message: error?.message?.toString() ?? "Error not found",
    };
  });

  return errorList;
}
