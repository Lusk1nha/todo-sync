import { GripVertical } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { SortableItemContext } from "./sortable-item";

interface IDragHandleProps {
  className?: string;
}

export function DragHandle(props: Readonly<IDragHandleProps>) {
  const { className } = props;
  const { attributes, listeners, ref, isDragging } =
    useContext(SortableItemContext);

  return (
    <Button
      variant="outline"
      size="sm"
      type="button"
      className={cn(
        "w-10 h-9 cursor-grab",
        isDragging && "cursor-grabbing",
        className
      )}
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <GripVertical className="w-8 h-8" />
    </Button>
  );
}
