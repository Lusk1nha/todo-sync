import { cn } from "@/lib/utils";
import { ListTodo } from "lucide-react";

interface ILogoMarkProps {
  className?: string;
}

export function LogoMark(props: Readonly<ILogoMarkProps>) {
  const { className } = props;

  return (
    <div
      className={cn(
        "text-primary flex items-center gap-2 text-2xl md:text-3xl",
        className
      )}
    >
      <ListTodo className="w-8 h-8" />
      <h1 className="font-bold">
        <span>Todo</span> Sync
      </h1>
    </div>
  );
}

export function LogoMarkMobile(props: Readonly<ILogoMarkProps>) {
  const { className } = props;

  return (
    <div
      className={cn(
        "text-primary flex items-center gap-2 text-xl md:text-2xl",
        className
      )}
    >
      <h1 className="font-bold">
        <span>Todo</span> Sync
      </h1>
    </div>
  );
}
