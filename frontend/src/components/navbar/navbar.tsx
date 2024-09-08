import { RoutesEnum } from "@/shared/enums/routes-enum";
import { DesktopNavbar } from "./nav-desktop";
import { MobileNavbar } from "./nav-mobile";
import { NavRouteLink } from "./nav-redirects";

export function Navbar() {
  const routes = [
    { label: "Home", href: RoutesEnum.HOME },
    { label: "About", href: "/about" },
  ] as NavRouteLink[];

  return (
    <>
      <DesktopNavbar routes={routes} />
      <MobileNavbar routes={routes} />
    </>
  );
}
