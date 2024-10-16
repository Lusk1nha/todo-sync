import { useCurrentUser } from "@/shared/hooks/use-current-user-hook";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { WizardForms } from "@/components/wizard-forms/wizard-forms";

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

  return <WizardForms currentUser={currentUser} />;
}
