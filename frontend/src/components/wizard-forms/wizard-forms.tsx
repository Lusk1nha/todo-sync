import { UserProfile } from "@/shared/factories/user-profile-factory";
import { FirstWizardForm } from "./first-wizard-form";
import { EditWizardForms } from "./edit-wizard-form";

interface IWizardFormsProps {
  currentUser: UserProfile | null | undefined;
}

export function WizardForms(props: Readonly<IWizardFormsProps>) {
  const { currentUser } = props;

  if (!currentUser) {
    return <FirstWizardForm />;
  }

  return <EditWizardForms currentUser={currentUser} />;
}
