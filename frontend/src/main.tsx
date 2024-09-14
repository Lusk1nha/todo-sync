import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "./components/theme-provider/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import App from "./app";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { RoutesEnum } from "./shared/enums/routes-enum";

import AuthRoute from "./routes/auth-route/auth-route";
import ForgotUserRoute from "./routes/forgot-user-route";
import LoginRoute from "./routes/login-user-route";
import RegisterUserRoute from "./routes/register-user-route";
import ProtectedAuthRoute from "./routes/protected-auth";
import HomeRoute from "./routes/home-route";
import { queryClient } from "./shared/helpers/react-query-helper";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { LoggedRoute } from "./routes/logged-route";
import { WizardPage } from "./routes/wizard-page/wizard-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RoutesEnum.ROOT} element={<App />}>
      <Route path={RoutesEnum.ROOT} element={<ProtectedAuthRoute />}>
        <Route path={RoutesEnum.WIZARD} element={<WizardPage />} />
        <Route path={RoutesEnum.ROOT} element={<LoggedRoute />}>
          <Route path={RoutesEnum.HOME} element={<HomeRoute />} />
        </Route>
      </Route>

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="todo-sync-ui-theme">
        <TooltipProvider>
          <RouterProvider router={router} />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
