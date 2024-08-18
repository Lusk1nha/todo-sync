import {
  RegisterUserSchema,
  RegisterUserSchemaType,
} from "@/shared/schemas/register-user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { RoutesEnum } from "@/shared/enums/routes-enum";
import { FieldGroup } from "../utilities/field-group";

interface IRegisterUserFormProps {
  onSubmit: (data: RegisterUserSchemaType) => void;
}

export function RegisterUserForm(props: Readonly<IRegisterUserFormProps>) {
  const { onSubmit } = props;
  const navigate = useNavigate();

  const form = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const { control, handleSubmit, reset } = form;

  function handleNavigateLogin() {
    reset();
    navigate(RoutesEnum.LOGIN);
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

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme a Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Insira a confirmação da senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldGroup>

        <div className="flex flex-col gap-2">
          <Button type="submit">Criar nova conta</Button>
          <Button variant="outline" onClick={handleNavigateLogin}>
            Já possui conta? Clique aqui para entrar!
          </Button>
        </div>
      </form>
    </Form>
  );
}
