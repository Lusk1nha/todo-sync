import { RoutesEnum } from "@/shared/enums/routes-enum";
import { LogoutButton } from "../buttons/logout-button";
import { ThemeButton } from "../buttons/theme-button";
import { WizardCardForm } from "../forms/utilities/wizard-card-form";
import { Separator } from "../ui/separator";
import { PageIntroduction } from "../utilities/page-introduction";
import { useNavigate } from "react-router-dom";
import { LogoMark } from "../logo-mark/logo-mark";

export function FirstWizardForm() {
  const navigate = useNavigate();

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
      <WizardCardForm
        defaultValues={null}
        onSubmit={() => navigate(RoutesEnum.HOME)}
      />

      <div className="mt-2">
        <LogoMark isPulsing />
      </div>
    </div>
  );
}
