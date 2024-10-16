import { useTheme } from "@/shared/hooks/use-theme-hook";
import { Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-secondary w-full flex items-center justify-center gap-6 px-4 py-2 rounded-md">
      <Sun
        className={cn(
          "h-5 w-5",
          theme === "light" ? "text-primary" : "text-muted-foreground"
        )}
        onClick={() => setTheme("light")}
      />

      <Switch
        checked={theme === "dark"}
        onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
      />

      <Moon
        className={cn(
          "h-5 w-5",
          theme === "dark" ? "text-primary" : "text-muted-foreground"
        )}
        onClick={() => setTheme("dark")}
      />
    </div>
  );
}
