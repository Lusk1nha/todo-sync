import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/shared/hooks/use-theme-hook";
import { motion } from "framer-motion";

interface IThemeButtonProps {
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
  className?: string;
}

export function ThemeButton(props: Readonly<IThemeButtonProps>) {
  const { size = "icon", className } = props;

  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size} className={className}>
          <motion.div
            className="flex items-center justify-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] flex transition-all dark:hidden" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] hidden transition-all dark:flex" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
