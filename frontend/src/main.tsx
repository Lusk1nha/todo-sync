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

import AuthRoute from "./routes/auth/auth-route";
import ForgotUserRoute from "./routes/auth/forgot-user-route";
import LoginRoute from "./routes/auth/login-user-route";
import RegisterUserRoute from "./routes/auth/register-user-route";

import HomeRoute from "./routes/home-route";
import ProtectedAuthRoute from "./routes/middlewares/auth-protected-middleware-route";
import UserProfileMiddlewareRoute from "./routes/middlewares/user-profile-middleware-route";
import { queryClient } from "./shared/helpers/react-query-helper";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";

import { WizardPage } from "./routes/wizard-route";
import { MainContentRoute } from "./routes/main-content-route";
import { NotFoundRoute } from "./routes/not-found-route";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={RoutesEnum.ROOT}
      element={<App />}
      errorElement={<NotFoundRoute />}
    >
      <Route path={RoutesEnum.ROOT} element={<ProtectedAuthRoute />}>
        <Route path={RoutesEnum.ROOT} element={<UserProfileMiddlewareRoute />}>
          <Route path={RoutesEnum.ROOT} element={<MainContentRoute />}>
            <Route path={RoutesEnum.HOME} element={<HomeRoute />} />
          </Route>
        </Route>

        <Route path={RoutesEnum.WIZARD} element={<WizardPage />} />
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
