import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { LogoMark } from "../logo-mark/logo-mark";
import { NavRedirects, NavRouteLink } from "./nav-redirects";
import { NavButtons } from "./nav-buttons";

interface IMobileNavbarProps {
  routes: NavRouteLink[];
}

export function MobileNavbar(props: Readonly<IMobileNavbarProps>) {
  const { routes } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-separate border-b bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button type="button">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <LogoMark className="text-xl md:text-2xl" isPulsing />
            <div className="flex flex-col gap-1 pt-4">
              <NavRedirects routes={routes} onClick={() => setIsOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

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
