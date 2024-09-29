import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { LogoMark } from "../logo-mark/logo-mark";
import { NavRedirects, NavRouteLink } from "../navbar/nav-redirects";

interface IMobileNavbarProps {
  routes: NavRouteLink[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function NavbarMenuSheet(props: Readonly<IMobileNavbarProps>) {
  const { routes, isOpen, setIsOpen } = props;

  function onRedirectClick() {
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" type="button">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <LogoMark className="text-xl md:text-2xl" />
        <div className="flex flex-col gap-1 pt-4">
          <NavRedirects routes={routes} onClick={onRedirectClick} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
