import { RegisterUserForm } from "@/components/forms/register-user-form/register-user-form";

import { RegisterUserSchemaType } from "@/shared/schemas/register-user-schema";

import { AuthService } from "@/shared/services/auth-service";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import {
  getRequestSignUp,
  validateSignUp,
} from "@/shared/helpers/register-user-helper";

import { ErrorFormReturn } from "@/components/forms/utilities/error-form-return";
import { LoadingFormReturn } from "@/components/forms/utilities/loading-form-return";
import { AuthCard } from "./auth-route/auth-card";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "@/shared/enums/routes-enum";

export default function RegisterUserRoute() {
  const { signup } = new AuthService();
  const { toast } = useToast();

  const navigate = useNavigate();

  const { mutate, reset, isPending, isError, error } = useMutation({
    mutationFn: handleRegister,
    onSuccess() {
      toast({
        title: "Usuário criado",
        description: "Bem vindo ao sistema",
        variant: "default",
      });

      navigate(RoutesEnum.LOGIN);
    },
    onError: (error) => {
      toast({
        title: "Erro ao se cadastrar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  async function handleRegister(data: RegisterUserSchemaType): Promise<void> {
    validateSignUp(data);

    const user = getRequestSignUp(data);
    await signup(user);
  }

  if (isError && error) {
    return (
      <AuthCard>
        <ErrorFormReturn
          error={error}
          onReturn={reset}
          strings={{
            errorTitle: "Erro ao se cadastrar no sistema",
            returnButton: "Tentar novamente",
          }}
        />
      </AuthCard>
    );
  }

  if (isPending) {
    return (
      <AuthCard>
        <LoadingFormReturn label="Criando usuário" />
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Cadastrar no Sistema">
      <RegisterUserForm onSubmit={mutate} />
    </AuthCard>
  );
}
