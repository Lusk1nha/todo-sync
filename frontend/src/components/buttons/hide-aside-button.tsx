import { EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

import { useSidebar } from "@/shared/hooks/use-sidebar-hook";

type HideAsideButtonStrings = {
  text?: string;
  tooltip?: string;
};

interface IHideAsideButtonProps {
  strings?: HideAsideButtonStrings;
  disabled?: boolean;
}

export function HideAsideButton(props: Readonly<IHideAsideButtonProps>) {
  const { setOpen } = useSidebar();

  const {
    strings = {
      text: "Esconder painel lateral",
      tooltip: "Clique aqui para esconder painel lateral",
    },
    disabled,
  } = props;

  function handleClick() {
    setOpen(false);
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary justify-start h-9 gap-2"
          onClick={handleClick}
          disabled={disabled}
        >
          <EyeOff className="w-5 h-5" />
          {strings.text}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{strings.tooltip}</TooltipContent>
    </Tooltip>
  );
}
