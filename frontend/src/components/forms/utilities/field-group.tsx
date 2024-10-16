import { cn } from "@/lib/utils";

interface IFieldGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FieldGroup(props: Readonly<IFieldGroupProps>) {
  const { children, className } = props;

  return (
    <fieldset className={cn("flex flex-col gap-y-6", className)}>
      {children}
    </fieldset>
  );
}
