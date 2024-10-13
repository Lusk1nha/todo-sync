import { ThemeButton } from "@/components/buttons/theme-button";
import { useIsAuthenticated } from "@/shared/hooks/use-require-auth-hook";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div id="authentication-page" className="w-full h-screen flex flex-1 flex-col p-6">
      <div className="px-6">
        <ThemeButton />
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
