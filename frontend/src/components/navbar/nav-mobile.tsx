import { useState } from "react";
import { LogoMark } from "../logo-mark/logo-mark";
import { NavRouteLink } from "./nav-redirects";
import { NavButtons } from "./nav-buttons";
import { NavbarMenuSheet } from "../sheets/navbar-menu-sheet";

interface IMobileNavbarProps {
  routes: NavRouteLink[];
}

export function MobileNavbar(props: Readonly<IMobileNavbarProps>) {
  const { routes } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-separate border-b bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <NavbarMenuSheet
          routes={routes}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <LogoMark />
        </div>

        <div className="flex items-center gap-2">
          <NavButtons />
        </div>
      </nav>
    </div>
  );
}
