import { RoutesEnum } from "@/shared/enums/routes-enum";
import { DesktopNavbar } from "./nav-desktop";
import { MobileNavbar } from "./nav-mobile";
import { NavRouteLink } from "./nav-redirects";

export function Navbar() {
  const routes = [
    { label: "Inicial", href: RoutesEnum.HOME },
  ] as NavRouteLink[];

  return (
    <>
      <DesktopNavbar />
      <MobileNavbar routes={routes} />
    </>
  );
}
