import { Navbar } from "@/components/navbar/navbar";
import { RoutesEnum } from "@/shared/enums/routes-enum";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function LoggedRoute() {
  const pathname = useLocation().pathname;
  const isRoot = pathname === RoutesEnum.ROOT;

  if (isRoot) return <Navigate to={RoutesEnum.HOME} replace />;

  return (
    <div className="w-full h-full">
      <header>
        <Navbar />
      </header>

      <main className="w-full h-full container">
        <Outlet />
      </main>
    </div>
  );
}
