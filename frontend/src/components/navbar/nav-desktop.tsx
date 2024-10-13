import { LogoMark } from "../logo-mark/logo-mark";

import { UserFolderRender } from "../user-folder-render/user-folder-render";
import { ThemeSwitch } from "../switchs/theme-switch";

export function DesktopNavbar() {
  return (
    <aside className="hidden h-full bg-background border-separate border-border border-r md:block">
      <nav className="min-w-[350px] w-[350px] h-full flex flex-col">
        <div className="w-full h-24 flex py-6 px-9">
          <LogoMark className="text-xl md:text-2xl" />
        </div>

        <div className="flex flex-col pt-2 mb-auto">
          <UserFolderRender />
        </div>

        <div className="py-4 px-9">
          <ThemeSwitch />
        </div>
      </nav>
    </aside>
  );
}
