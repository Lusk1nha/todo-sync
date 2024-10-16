import { useEffect, useState } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "../utilities/animated-counter";
import { useDelay } from "@/shared/hooks/use-delay-hook";

interface IDelayButtonProps extends ButtonProps {
  delayMs?: number;
}

export function DelayButton(props: Readonly<IDelayButtonProps>) {
  const { children, delayMs = 5000, disabled, className, ...rest } = props;

  const { isDelay, counter } = useDelay(delayMs);

  return (
    <Button
      className={cn("gap-1", className)}
      disabled={isDelay || disabled}
      {...rest}
    >
      <span className="text-xs">{isDelay ? counter : null}</span>
      {children}
    </Button>
  );
}
