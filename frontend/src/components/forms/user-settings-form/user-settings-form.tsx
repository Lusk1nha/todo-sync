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

import { DragAndDrop } from "@/components/inputs/drag-and-drop";

interface IUsersSettingsFormProps {
  onSubmit: (data: UsersSettingsSchemaType) => void;
}

export function UsersSettingsForm(props: Readonly<IUsersSettingsFormProps>) {
  const { onSubmit } = props;

  const form = useForm<UsersSettingsSchemaType>({
    resolver: zodResolver(UsersSettingsSchema),
    defaultValues: {
      username: "",
      birthday: null,
      profilePicture: null,
      termsAndConditions: false,
    },
  });

  const { control, handleSubmit, formState } = form;

  const { isSubmitting, isValid, errors } = formState;

  console.log({ isValid, errors });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FieldGroup>
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Nome de usuário</FormLabel>
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
                    min={new Date(1900, 0, 1)}
                    max={new Date()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="profilePicture"
            render={() => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Imagem de perfil</FormLabel>
                <FormControl>
                  <DragAndDrop
                    strings={{
                      dragAndDrop: "Arraste e solte ou clique para procurar",
                      dragAndDropDescription:
                        "A imagem deve ter pelo menos 40x40px e menor que 5MB",
                    }}
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

        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          Estou pronto para começar!
        </Button>
      </form>
    </Form>
  );
}
