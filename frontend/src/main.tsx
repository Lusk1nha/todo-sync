import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import AuthRoute from "./routes/auth-route";
import LoginRoute from "./routes/login-user-route";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import { RoutesEnum } from "./shared/enums/routes-enum";
import RegisterUserRoute from "./routes/register-user-route";
import { TooltipProvider } from "./components/ui/tooltip";
import ForgotUserRoute from "./routes/forgot-user-route";

const router = createBrowserRouter([
  {
    path: RoutesEnum.HOME,
    element: <Root />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "home",
        element: <div>Home</div>,
      },
    ],
  },
  {
    path: RoutesEnum.AUTH,
    element: <AuthRoute />,
    children: [
      {
        path: RoutesEnum.LOGIN,
        element: <LoginRoute />,
      },
      {
        path: RoutesEnum.REGISTER,
        element: <RegisterUserRoute />,
      },
      {
        path: RoutesEnum.FORGOT_PASSWORD,
        element: <ForgotUserRoute />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="todo-sync-ui-theme">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
);
