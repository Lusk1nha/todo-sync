import { RoutesEnum } from "@/shared/enums/routes-enum";
import { useIsAuthenticated } from "@/shared/hooks/use-require-auth-hook";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAuthRoute() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) return <Navigate to={RoutesEnum.LOGIN} />;

  return <Outlet />;
}
