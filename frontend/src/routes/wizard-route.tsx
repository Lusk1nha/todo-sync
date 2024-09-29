import { LogoMark } from "@/components/logo-mark/logo-mark";

import { Separator } from "@/components/ui/separator";

import { WizardCardForm } from "../components/forms/utilities/wizard-card-form";

import { ThemeButton } from "@/components/buttons/theme-button";
import { LogoutButton } from "@/components/buttons/logout-button";
import { PageIntroduction } from "@/components/utilities/page-introduction";
import { useCurrentUser } from "@/shared/hooks/use-current-user-hook";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function WizardPage() {
  const { currentUser, isFetching } = useCurrentUser();

  if (isFetching) {
    return (
      <div className="container h-screen flex max-w-2xl flex-col items-center justify-center gap-2">
        <LoadingSpinner />
        <p>Buscando informações do usuário...</p>
      </div>
    );
  }

  return (
    <div className="container h-screen flex max-w-2xl flex-col items-center justify-center gap-4">
      <div className="absolute flex items-center left-8 top-8 gap-2">
        <LogoutButton useResponsiveText />
        <ThemeButton className="w-8" size="sm" />
      </div>

      <PageIntroduction
        instructions={[
          {
            element: "h1",
            text: "Bem vindo!",
            className: "text-3xl text-center items-center",
          },
          {
            element: "h2",
            text: "Vamos configurar algumas coisas antes de começar.",
            className: "text-center text-base text-muted-foreground",
          },
          {
            element: "h2",
            text: "Essa configuração pode ser alterada a qualquer momento nas configurações do sistema.",
            className: "mt-1 text-center text-sm text-muted-foreground",
          },
        ]}
      />

      <Separator />
      <WizardCardForm defaultValues={currentUser} />

      <div className="mt-2">
        <LogoMark isPulsing />
      </div>
    </div>
  );
}
