import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "./components/theme-provider/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { RoutesEnum } from "./shared/enums/routes-enum";
import AuthRoute from "./routes/auth-route";
import ForgotUserRoute from "./routes/forgot-user-route";
import LoginRoute from "./routes/login-user-route";
import RegisterUserRoute from "./routes/register-user-route";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RoutesEnum.ROOT} element={<App />}>
      <Route path={RoutesEnum.AUTH} element={<AuthRoute />}>
        <Route path={RoutesEnum.LOGIN} element={<LoginRoute />} />
        <Route path={RoutesEnum.REGISTER} element={<RegisterUserRoute />} />
        <Route
          path={RoutesEnum.FORGOT_PASSWORD}
          element={<ForgotUserRoute />}
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="todo-sync-ui-theme">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
);
