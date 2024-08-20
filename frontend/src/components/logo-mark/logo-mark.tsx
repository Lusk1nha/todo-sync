import { ListTodo } from "lucide-react";

export function LogoMark() {
  return (
    <div className="text-primary flex items-center gap-2">
      <ListTodo className="w-8 h-8" />
      <h1 className="text-2xl md:text-3xl font-bold">
        <span>Todo</span> Sync
      </h1>
    </div>
  );
}
