import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { RoutesEnum } from "@/shared/enums/routes-enum";
import { useMediaQuery } from "@/shared/hooks/use-media-query-hook";
import { Settings } from "lucide-react";

type UserSettingsButtonStrings = {
  text: string;
};

interface IUserSettingsButtonProps {
  className?: string;
  strings?: UserSettingsButtonStrings;

  useResponsiveText?: boolean;
}

export function UserSettingsButton(props: Readonly<IUserSettingsButtonProps>) {
  const {
    className,
    strings = {
      text: "Configurar conta",
    },
    useResponsiveText = false,
  } = props;

  const isMobile = useMediaQuery("(max-width: 640px)") && useResponsiveText;

  return (
    <Link className="w-full" to={RoutesEnum.WIZARD}>
      <Button
        type="button"
        className={cn("gap-2", className)}
        size="sm"
        variant="outline"
      >
        <Settings className="w-4 h-4" />
        {!isMobile && strings.text}
      </Button>
    </Link>
  );
}
