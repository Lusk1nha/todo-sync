import {
  UsersSettingsSchema,
  UsersSettingsSchemaType,
} from "@/shared/schemas/users-settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { FieldGroup } from "../utilities/field-group";
import { Input } from "../../ui/input";
import { DatePicker } from "../../inputs/date-picker";
import { Button } from "@/components/ui/button";
import { TermsAndConditionsField } from "@/components/inputs/terms-and-conditions";

import { UploadAvatar } from "@/components/inputs/upload-avatar/upload-avatar";
import { BIRTHDAY_MAX_DATE, BIRTHDAY_MIN_DATE } from "@/shared/constants";
import { UserProfile } from "@/shared/factories/user-profile-factory";
import { Link } from "react-router-dom";
import { RoutesEnum } from "@/shared/enums/routes-enum";
import { Home } from "lucide-react";

interface IUsersSettingsFormProps {
  onSubmit: (data: UsersSettingsSchemaType) => void;
  defaultValues?: UserProfile | null;
}

export function UsersSettingsForm(props: Readonly<IUsersSettingsFormProps>) {
  const { onSubmit, defaultValues } = props;

  const form = useForm<UsersSettingsSchemaType>({
    resolver: zodResolver(UsersSettingsSchema),
    mode: "onChange",
    defaultValues: getDefaultUserSettings(defaultValues),
  });

  function getDefaultUserSettings(
    user?: UserProfile | null
  ): UsersSettingsSchemaType {
    return {
      username: user?.username ?? "",
      birthday: user?.birthday ?? null,
      profilePicture: null,
      termsAndConditions: false,
    };
  }

  const { control, handleSubmit, formState } = form;

  const { isSubmitting, isValid } = formState;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FieldGroup>
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel required>Nome de usuário</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o nome de usuário"
                    name={field.name}
                    value={field?.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de nascimento</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    placeholder="Seleciona a data de nascimento"
                    min={BIRTHDAY_MIN_DATE}
                    max={BIRTHDAY_MAX_DATE}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="profilePicture"
            render={({
              field: { name, onBlur, value, onChange, disabled },
              fieldState: { invalid },
            }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Imagem de perfil</FormLabel>
                <FormControl>
                  <UploadAvatar
                    name={name}
                    onChange={onChange}
                    value={value as any}
                    onBlur={onBlur}
                    dragAndDropStrings={{
                      dragAndDrop: "Arraste e solte ou clique para procurar",
                      dragAndDropDescription:
                        "A imagem deve ter pelo menos 40x40px e menor que 5MB",
                      acceptDescription: "Apenas imagens PNG e JPEG",
                    }}
                    error={invalid}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Termos e condições</FormLabel>
                <FormControl>
                  <TermsAndConditionsField
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldGroup>

        <div className="flex justify-between items-center gap-4">
          {defaultValues && (
            <Link to={RoutesEnum.HOME}>
              <Button className="gap-2" variant="link" type="button">
                <Home className="w-4 h-4" />
                Voltar
              </Button>
            </Link>
          )}

          <Button type="submit" disabled={isSubmitting || !isValid}>
            {defaultValues
              ? "Atualizar configurações"
              : "Estou pronto para começar!"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
