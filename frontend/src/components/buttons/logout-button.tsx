import { AuthService } from "@/shared/services/auth-service";
import { useToast } from "../ui/use-toast";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/shared/hooks/use-media-query-hook";

type LogoutButtonStrings = {
  text: string;

  session?: {
    title: string;
    description: string;
  };

  error?: {
    title: string;
    description: string;
  };
};

interface ILogoutButtonProps {
  onClick?: () => void;
  className?: string;
  strings?: LogoutButtonStrings;
}

export function LogoutButton(props: Readonly<ILogoutButtonProps>) {
  const {
    onClick,
    className,
    strings = {
      text: "Sair da conta",

      session: {
        title: "Sessão encerrada",
        description: "Você foi desconectado",
      },

      error: {
        title: "Erro ao desconectar",
        description: "Ocorreu um erro ao desconectar",
      },
    },
  } = props;

  const { logout } = new AuthService();
  const { toast } = useToast();
  const isMobile = useMediaQuery("(min-width: 640px)");

  async function handleLogout() {
    try {
      if (onClick) {
        onClick();
      }

      await logout();

      toast({
        title: strings.session?.title,
        description: strings?.session?.description,
      });
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast({
          title: strings.error?.title,
          description: strings.error?.description,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Button
      className={cn("gap-2", className)}
      size="sm"
      variant="outline"
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4" />
      {isMobile && strings.text}
    </Button>
  );
}
