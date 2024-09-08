import { NavRedirects, NavRouteLink } from "./nav-redirects";
import { LogoMark } from "../logo-mark/logo-mark";
import { NavButtons } from "./nav-buttons";

interface IDesktopNavbarProps {
  routes: NavRouteLink[];
}

export function DesktopNavbar(props: Readonly<IDesktopNavbarProps>) {
  const { routes } = props;

  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <LogoMark className="text-xl md:text-2xl" />
          <NavRedirects routes={routes} />
        </div>

        <NavButtons />
      </nav>
    </div>
  );
}
