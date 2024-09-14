import { ThemeButton } from "@/components/utilities/theme-button/theme-button";
import { Outlet } from "react-router-dom";

export default function AuthRoute() {
  return (
    <div id="authentication-page" className="w-full h-full flex flex-col p-6">
      <div className="px-6">
        <ThemeButton />
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
