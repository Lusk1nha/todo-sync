import { LogoMark } from "@/components/logo-mark/logo-mark";

import { Separator } from "@/components/ui/separator";

import { WizardCardForm } from "./wizard-card-form";

export function WizardPage() {
  return (
    <div className="container h-screen flex max-w-2xl flex-col items-center justify-center gap-4">
      <div>
        <h1 className="text-3xl text-center items-center justify-center flex flex-wrap">
          <span className="flex-wrap">Bem vindo!</span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Vamos configurar algumas coisas antes de começar.
        </h2>
        <h2 className="mt-2 text-center text-sm text-muted-foreground">
          Essa configuração pode ser alterada a qualquer momento nas
          configurações do sistema.
        </h2>
      </div>

      <Separator />

      <WizardCardForm />

      <div className="mt-8">
        <LogoMark />
      </div>
    </div>
  );
}
