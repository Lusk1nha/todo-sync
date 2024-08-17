import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import AuthRoute from "./routes/auth-route";
import LoginRoute from "./routes/login-user-route";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import { RoutesEnum } from "./shared/enums/routes-enum";

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
        element: <div>Register</div>,
      },
      {
        path: RoutesEnum.FORGOT_PASSWORD,
        element: <div>Forgot Password</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="todo-sync-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
