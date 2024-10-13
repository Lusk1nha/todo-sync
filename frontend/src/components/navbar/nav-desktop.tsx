import { LogoMark } from "../logo-mark/logo-mark";

import { UserFolderRender } from "../user-folder-render/user-folder-render";
import { ThemeSwitch } from "../switchs/theme-switch";

import { HideAsideButton } from "../buttons/hide-aside-button";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/shared/hooks/use-sidebar-hook";
import { ShowAsideButton } from "../buttons/show-aside-button";

export function DesktopNavbar() {
  const { open } = useSidebar();

  return (
    <div>
      <aside
        className={cn(
          "h-full bg-background border-separate border-border border-r",
          open ? "hidden md:block" : "hidden"
        )}
      >
        <nav className="min-w-[300px] w-[300px] h-full flex flex-col">
          <div className="w-full h-24 flex py-6 px-9">
            <LogoMark className="text-xl md:text-2xl" />
          </div>

          <div className="flex flex-col pt-2 mb-auto">
            <UserFolderRender />
          </div>

          <div className="flex flex-col py-4 px-9 gap-2">
            <HideAsideButton />
            <ThemeSwitch />
          </div>
        </nav>
      </aside>

      {!open && (
        <div className="absolute left-0 bottom-[6%] z-50">
          <ShowAsideButton />
        </div>
      )}
    </div>
  );
}
