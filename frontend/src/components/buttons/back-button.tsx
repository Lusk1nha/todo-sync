import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "@/shared/hooks/use-media-query-hook";
import { cn } from "@/lib/utils";

type BackButtonStrings = {
  text: string;
  ariaText: string;
};

interface IBackButtonProps {
  className?: string;
  strings?: BackButtonStrings;

  useResponsiveText?: boolean;
  onClick?: () => void;

  goBackToNumber?: number;
}

export function BackButton(props: Readonly<IBackButtonProps>) {
  const {
    className,
    strings = {
      text: "Voltar",
      ariaText: "Voltar para a página anterior",
    },
    useResponsiveText = false,
    onClick,
    goBackToNumber = -1,
  } = props;

  const isMobile = useMediaQuery("(max-width: 640px)") && useResponsiveText;
  const navigate = useNavigate();

  function handleGoBack() {
    if (onClick) {
      onClick();
    }

    return navigate(goBackToNumber);
  }

  return (
    <Button
      className={cn("gap-2", className)}
      size="sm"
      variant="outline"
      onClick={handleGoBack}
      aria-label={strings.ariaText}
    >
      <ArrowLeft className="w-4 h-4" />
      {!isMobile && strings.text}
    </Button>
  );
}
