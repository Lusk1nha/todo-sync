import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";

interface ITestProvidersProps {
  children: React.ReactNode;
}

export function TestProviders(props: Readonly<ITestProvidersProps>) {
  const { children } = props;
  return (
    <ThemeProvider defaultTheme="system" storageKey="todo-sync-ui-theme">
      <TooltipProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
}
