import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="w-full h-full flex">
      <header>
        <aside className="bg-red-500 w-20 h-full px-4 py-2 text-center">
          teste
        </aside>
      </header>

      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
