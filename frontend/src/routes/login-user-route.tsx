import { LoginUserForm } from "@/components/forms/login-user-form/login-user-form";
import { ErrorFormReturn } from "@/components/forms/utilities/error-form-return";
import { LoadingFormReturn } from "@/components/forms/utilities/loading-form-return";

import { useToast } from "@/components/ui/use-toast";
import {
  getRequestLogin,
  validateLogin,
} from "@/shared/helpers/login-user-helper";
import { LoginUserSchemaType } from "@/shared/schemas/login-user-schema";
import { AuthService } from "@/shared/services/auth-service";
import { useMutation } from "@tanstack/react-query";
import { AuthCard } from "./auth-route/auth-card";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "@/shared/enums/routes-enum";

export default function LoginRoute() {
  const { login } = new AuthService();
  const { toast } = useToast();

  const navigate = useNavigate();

  const { mutate, reset, isPending, isError, error } = useMutation({
    mutationFn: handleLogin,
    onSuccess() {
      toast({
        title: "Entrou no sistema",
        description: "Bem vindo de volta",
        variant: "default",
      });

      navigate(RoutesEnum.HOME);
    },
    onError: (error) => {
      toast({
        title: "Erro ao entrar no sistema",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  async function handleLogin(data: LoginUserSchemaType): Promise<void> {
    validateLogin(data);

    const user = getRequestLogin(data);
    await login(user);
  }

  if (isError && error) {
    return (
      <AuthCard title="Erro ao entrar no sistema">
        <ErrorFormReturn error={error} onReturn={reset} />
      </AuthCard>
    );
  }

  if (isPending) {
    return (
      <AuthCard>
        <LoadingFormReturn label="Entrando no sistema" />
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Entrar no Sistema">
      <LoginUserForm onSubmit={mutate} />
    </AuthCard>
  );
}
