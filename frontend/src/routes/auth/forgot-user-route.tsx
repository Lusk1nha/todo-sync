import { ForgotUserForm } from "@/components/forms/forgot-user-form/forgot-user-form";
import { ErrorFormReturn } from "@/components/forms/utilities/error-form-return";
import { LoadingFormReturn } from "@/components/forms/utilities/loading-form-return";
import { useToast } from "@/components/ui/use-toast";
import { validateForgotUser } from "@/shared/helpers/forgot-user-helper";

import { ForgotUserSchemaType } from "@/shared/schemas/forgot-user-schema";
import { AuthService } from "@/shared/services/auth-service";
import { useMutation } from "@tanstack/react-query";
import { AuthCard } from "../../components/auth-card";

export default function ForgotUserRoute() {
  const { forgot } = new AuthService();
  const { toast } = useToast();

  const { mutate, reset, isPending, isError, error } = useMutation({
    mutationFn: handleForgotPassword,
    onError: (error) => {
      toast({
        title: "Erro ao resetar senha",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Senha resetada",
        description: "Um email foi enviado para você com as instruções",
        variant: "default",
      });
    },
    retry: 2,
  });

  async function handleForgotPassword(
    data: ForgotUserSchemaType
  ): Promise<void> {
    validateForgotUser(data);

    const email = data.email;
    await forgot(email);
  }

  if (isError && error) {
    return (
      <AuthCard title="Erro ao resetar senha">
        <ErrorFormReturn error={error} onReturn={reset} />
      </AuthCard>
    );
  }

  if (isPending) {
    return (
      <AuthCard>
        <LoadingFormReturn label="Resetando senha" />
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Resetar senha da conta">
      <ForgotUserForm onSubmit={mutate} />
    </AuthCard>
  );
}
