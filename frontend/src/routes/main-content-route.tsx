import { Navbar } from "@/components/navbar/navbar";
import { RoutesEnum } from "@/shared/enums/routes-enum";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function MainContentRoute() {
  const { pathname } = useLocation();

  if (pathname === RoutesEnum.ROOT) {
    return <Navigate to={RoutesEnum.HOME} />;
  }

  return (
    <div className="w-full h-full flex flex-col sm:flex-row">
      <header>
        <Navbar />
      </header>

      <main className="bg-secondary w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
