import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface IDevTextProps {
  children: string;
}

export function DevText(props: Readonly<IDevTextProps>) {
  const { children } = props;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          className="text-primary hover:underline"
          target="_blank"
          href="https://www.linkedin.com/in/olucaspedro/"
        >
          {children}
        </a>
      </TooltipTrigger>
      <TooltipContent>O pai do sistema</TooltipContent>
    </Tooltip>
  );
}
