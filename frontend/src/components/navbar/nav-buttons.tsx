import { ThemeButton } from "../buttons/theme-button";
import { UserMenu } from "../user-menu";

export function NavButtons() {
  return (
    <div className="flex items-center gap-2">
      <ThemeButton className="w-8 md:w-10 h-8 md:h-10" />
      <UserMenu />
    </div>
  );
}
