import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoutesEnum } from "@/shared/enums/routes-enum";
import {
  ForgotUserSchema,
  ForgotUserSchemaType,
} from "@/shared/schemas/forgot-user-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FieldGroup } from "../utilities/field-group";

interface IForgotUserFormProps {
  onSubmit: (data: ForgotUserSchemaType) => void;
}

export function ForgotUserForm(props: Readonly<IForgotUserFormProps>) {
  const { onSubmit } = props;

  const navigate = useNavigate();

  const form = useForm<ForgotUserSchemaType>({
    resolver: zodResolver(ForgotUserSchema),
  });

  const { control, handleSubmit, reset } = form;

  function handleNavigateLogin() {
    reset();
    navigate(RoutesEnum.LOGIN);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FieldGroup>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o e-mail da conta"
                    name={field.name}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    autoComplete="email"
                  />
                </FormControl>
                <FormDescription>
                  Insira o e-mail cadastrado para receber o link de reset de
                  senha.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldGroup>

        <div className="flex flex-col gap-2">
          <Button type="submit">Enviar link de login</Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleNavigateLogin}
            className="whitespace-normal h-fit"
          >
            Já possui conta? Clique aqui para entrar!
          </Button>
        </div>
      </form>
    </Form>
  );
}
