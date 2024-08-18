import { Outlet } from "react-router-dom";
import { useRequireAuth } from "./shared/hooks/use-require-auth-hook";

export default function App() {
  useRequireAuth();

  return <Outlet />;
}
