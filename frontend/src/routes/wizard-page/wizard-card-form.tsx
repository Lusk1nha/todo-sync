import { UsersSettingsForm } from "@/components/forms/user-settings-form/user-settings-form";
import { ErrorFormReturn } from "@/components/forms/utilities/error-form-return";
import { LoadingFormReturn } from "@/components/forms/utilities/loading-form-return";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  getRequestUserSettings,
  validateUserSettings,
} from "@/shared/helpers/user-settings-helper";
import { UsersSettingsSchemaType } from "@/shared/schemas/users-settings-schema";
import { UsersService } from "@/shared/services/users-service";
import { useMutation } from "@tanstack/react-query";

export function WizardCardForm() {
  const { update } = new UsersService();
  const { toast } = useToast();

  const { mutate, reset, isPending, isError, error } = useMutation({
    mutationFn: handleSave,
    onSuccess: () => {
      toast({
        title: "Configurações salvas",
        description: "As configurações foram salvas com sucesso",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar configurações",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  async function handleSave(data: UsersSettingsSchemaType): Promise<void> {
    validateUserSettings(data);

    const settings = getRequestUserSettings(data);
    await update(settings);
  }

  if (isError && error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Configuração inicial</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorFormReturn onReturn={reset} error={error} />
        </CardContent>
      </Card>
    );
  }

  if (isPending) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Configuração inicial</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingFormReturn label="Salvando configurações" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configuração inicial</CardTitle>
        <CardDescription>
          Vamos configurar algumas coisas antes de começar.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <UsersSettingsForm onSubmit={mutate} />
      </CardContent>
    </Card>
  );
}
