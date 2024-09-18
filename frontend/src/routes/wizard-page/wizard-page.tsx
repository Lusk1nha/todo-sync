import { LogoMark } from "@/components/logo-mark/logo-mark";

import { Separator } from "@/components/ui/separator";

import { WizardCardForm } from "./wizard-card-form";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { AuthService } from "@/shared/services/auth-service";
import { useToast } from "@/components/ui/use-toast";
import { ThemeButton } from "@/components/utilities/theme-button/theme-button";

export function WizardPage() {
  const { logout } = new AuthService();
  const { toast } = useToast();

  async function handleLogout() {
    try {
      await logout();

      toast({
        title: "Sessão encerrada",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast({
          title: "Erro ao desconectar",
          description: error?.message,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div className="container h-screen flex max-w-2xl flex-col items-center justify-center gap-4">
      <div className="absolute left-8 top-8 gap-2">
        <Button
          className="gap-2"
          size="sm"
          variant="outline"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Sair da conta
        </Button>

        <ThemeButton />
      </div>

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
        <LogoMark isPulsing />
      </div>
    </div>
  );
}
