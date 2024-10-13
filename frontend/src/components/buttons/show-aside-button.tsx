import { useSidebar } from "@/shared/hooks/use-sidebar-hook";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ShowAsideButton() {
  const { setOpen } = useSidebar();

  function handleClick() {
    setOpen(true);
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="rounded-tl-none rounded-bl-none h-9"
          onClick={handleClick}
        >
          <Eye className="w-5 h-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Clique aqui para mostrar barra lateral</TooltipContent>
    </Tooltip>
  );
}
