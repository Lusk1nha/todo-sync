import {
  LoginUserSchema,
  LoginUserSchemaType,
} from "@/shared/schemas/login-user-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "@/shared/enums/routes-enum";
import { FieldGroup } from "../utilities/field-group";

interface ILoginUserFormProps {
  onSubmit: (data: LoginUserSchemaType) => void;
}

export function LoginUserForm(props: Readonly<ILoginUserFormProps>) {
  const { onSubmit } = props;

  const navigate = useNavigate();

  const form = useForm<LoginUserSchemaType>({
    resolver: zodResolver(LoginUserSchema),
  });

  const { control, reset, handleSubmit } = form;

  function handleNavigateRegister() {
    reset();
    navigate(RoutesEnum.REGISTER);
  }

  function handleNavigateForgotPassword() {
    reset();
    navigate(RoutesEnum.FORGOT_PASSWORD);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
        <FieldGroup>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Insira o e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-wrap justify-between gap-2">
                  <FormLabel>Senha</FormLabel>
                  <button
                    className="text-xs underline font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    onClick={handleNavigateForgotPassword}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Insira a senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldGroup>

        <div className="flex flex-col gap-2">
          <Button id="login-button" type="submit">
            Entrar
          </Button>
          <Button variant="outline" onClick={handleNavigateRegister}>
            Criar nova conta
          </Button>
        </div>
      </form>
    </Form>
  );
}
