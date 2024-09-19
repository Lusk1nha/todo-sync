import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export const useIsAuthenticated = () => {
  const [cookies] = useCookies(["user"]);
  const { toast } = useToast();

  useEffect(() => {
    if (!cookies.user) {
      toast({
        title: "Acesso negado",
        description: "Você precisa estar logado para acessar essa página",
        variant: "destructive",
      });
    }
  }, []);

  if (cookies.user) {
    return true;
  }

  return false;
};
