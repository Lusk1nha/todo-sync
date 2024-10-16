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

import { UserProfile } from "@/shared/factories/user-profile-factory";
import {
  getRequestUserSettings,
  validateUserSettings,
} from "@/shared/helpers/user-settings-helper";
import { UsersSettingsSchemaType } from "@/shared/schemas/users-settings-schema";
import { UsersProfilesService } from "@/shared/services/users-profiles-service";
import { useMutation } from "@tanstack/react-query";

interface IWizardCardFormProps {
  defaultValues?: UserProfile | null;

  onSubmit?: (data: UsersSettingsSchemaType) => void;
}

export function WizardCardForm(props: Readonly<IWizardCardFormProps>) {
  const { defaultValues, onSubmit } = props;

  const { create, update } = new UsersProfilesService();
  const { toast } = useToast();

  const { mutate, reset, isPending, isError, error } = useMutation({
    mutationFn: handleSave,
    onSuccess: (data) => {
      toast({
        title: "Configurações salvas",
        description: "As configurações foram salvas com sucesso",
        variant: "default",
      });

      if (onSubmit) onSubmit(data);
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar configurações",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  async function handleSave(
    data: UsersSettingsSchemaType
  ): Promise<UsersSettingsSchemaType> {
    validateUserSettings(data);

    const settings = getRequestUserSettings(data);

    if (!defaultValues) {
      await create(settings);
    } else {
      await update(settings);
    }

    return data;
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
        <UsersSettingsForm onSubmit={mutate} defaultValues={defaultValues} />
      </CardContent>
    </Card>
  );
}
