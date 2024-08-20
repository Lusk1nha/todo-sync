import { AuthCard } from "@/components/auth-card/auth-card";
import { LoginUserForm } from "@/components/forms/login-user-form/login-user-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { DevText } from "@/components/utilities/dev-text/dev-text";
import {
  LoginUserSchema,
  LoginUserSchemaType,
} from "@/shared/schemas/login-user-schema";
import { UsersService } from "@/shared/services/users-service";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";

export default function LoginRoute() {
  const { loginUser } = new UsersService();
  const { mutate, error, reset, isPending, isError } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      console.error(error);
    },
  });

  async function handleLogin(data: LoginUserSchemaType) {
    LoginUserSchema.parse(data);
    mutate(data);
  }

  if (isError) {
    return (
      <AuthCard>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Erro ao entrar no sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="w-full h-56 flex flex-col items-center justify-center gap-2">
                <AlertCircle className="text-destructive w-16 h-16" />
                <div className="flex flex-col gap-1 text-center">
                  <p className="text-sm font-medium">
                    Ocorreu um erro inesperado ao tentar entrar no sistema
                  </p>
                </div>
              </div>

              <Button type="button" onClick={reset}>
                Voltar para tela de login
              </Button>
            </div>
          </CardContent>
        </Card>
      </AuthCard>
    );
  }

  if (isPending) {
    return (
      <AuthCard>
        <Card className="w-full">
          <CardContent>
            <div className="w-full h-56 flex flex-col items-center justify-center gap-2">
              <LoadingSpinner />
              <p>
                <span className="font-medium">Entrando no sistema</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Entrar no sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginUserForm onSubmit={handleLogin} />
        </CardContent>
        <CardFooter className="flex items-center justify-center text-center">
          <p className="text-xs font-medium">
            Developed by <DevText>Lucas Pedro</DevText>
          </p>
        </CardFooter>
      </Card>
    </AuthCard>
  );
}
