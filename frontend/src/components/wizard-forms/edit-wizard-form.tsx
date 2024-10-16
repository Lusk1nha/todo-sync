import { Separator } from "@radix-ui/react-dropdown-menu";
import { BackButton } from "../buttons/back-button";
import { ThemeButton } from "../buttons/theme-button";
import { PageIntroduction } from "../utilities/page-introduction";
import { WizardCardForm } from "../forms/utilities/wizard-card-form";
import { LogoMark } from "../logo-mark/logo-mark";
import { UserProfile } from "@/shared/factories/user-profile-factory";

interface IEditWizardFormsProps {
  currentUser: UserProfile | null | undefined;
}

export function EditWizardForms(props: Readonly<IEditWizardFormsProps>) {
  const { currentUser } = props;

  return (
    <div className="container h-screen flex max-w-2xl flex-col items-center justify-center gap-4">
      <div className="absolute flex items-center left-8 top-8 gap-2">
        <BackButton useResponsiveText />
        <ThemeButton className="w-8" size="sm" />
      </div>

      <PageIntroduction
        instructions={[
          {
            element: "h1",
            text: "Editar perfil",
            className: "text-2xl text-center items-center",
          },
          {
            element: "h2",
            text: "Altere as informações do seu perfil.",
            className: "text-center text-base text-muted-foreground",
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
