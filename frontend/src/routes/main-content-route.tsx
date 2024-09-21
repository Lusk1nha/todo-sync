import { Navbar } from "@/components/navbar/navbar";
import { Outlet } from "react-router-dom";

export function MainContentRoute() {
  return (
    <div className="w-full h-full">
      <header>
        <Navbar />
      </header>

      <main className="w-full h-full container">
        <Outlet />
      </main>
    </div>
  );
}
