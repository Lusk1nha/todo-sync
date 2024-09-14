import { cn } from "@/lib/utils";

import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "../ui/button";

export type NavRouteLink = {
  label: string;
  href: string;
};

interface INavRedirectsProps {
  routes: NavRouteLink[];
  onClick?: () => void;
}

export function NavRedirects(props: Readonly<INavRedirectsProps>) {
  const { routes, onClick } = props;

  return (
    <>
      {routes.map((route) => (
        <Redirect key={route.href} onClick={onClick} {...route} />
      ))}
    </>
  );
}

interface RedirectProps extends NavRouteLink {
  onClick?: () => void;
}

function Redirect(props: Readonly<RedirectProps>) {
  const { label, href, onClick } = props;

  const pathname = useLocation().pathname;
  const isActive = pathname === href;

  return (
    <div className="relative flex items-center">
      <Link
        to={href}
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "w-full justify-start text-base text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={onClick}
      >
        {label}
      </Link>

      {isActive && (
        <div className="absolute -bottom-[23px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-primary md:block " />
      )}
    </div>
  );
}
