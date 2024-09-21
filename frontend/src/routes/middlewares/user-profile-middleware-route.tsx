import { RoutesEnum } from "@/shared/enums/routes-enum";
import { useCurrentUser } from "@/shared/hooks/use-current-user-hook";
import { Navigate, Outlet } from "react-router-dom";

export function UserProfileMiddlewareRoute() {
  const { currentUser } = useCurrentUser();

  if (!currentUser) {
    return <Navigate to={RoutesEnum.WIZARD} />;
  }

  return <Outlet />;
}
