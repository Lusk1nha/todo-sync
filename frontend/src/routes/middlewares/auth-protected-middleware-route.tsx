import { useToast } from "@/components/ui/use-toast";
import { RoutesEnum } from "@/shared/enums/routes-enum";
import { getRedirectPath } from "@/shared/helpers/router-helper";

import { useIsAuthenticated } from "@/shared/hooks/use-require-auth-hook";
import { useEffect } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";

export default function AuthProtectedMiddlewareRoute() {
  const isAuthenticated = useIsAuthenticated();

  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Acesso negado",
        description: "Você precisa estar logado para acessar essa página",
        variant: "destructive",
      });

      const redirect = getRedirectPath(pathname, searchParams);
      setSearchParams(redirect);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to={RoutesEnum.LOGIN} />;
  }

  return <Outlet />;
}
