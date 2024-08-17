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
} from "../ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "@/shared/enums/routes-enum";

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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
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
              <FormLabel>Senha</FormLabel>
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

        <div className="flex flex-col gap-2">
          <Button type="submit">Entrar</Button>
          <Button variant="outline" onClick={handleNavigateRegister}>
            Registrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
