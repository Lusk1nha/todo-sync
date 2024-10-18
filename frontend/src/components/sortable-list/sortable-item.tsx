import { createContext, CSSProperties, ReactNode, useMemo } from "react";

import { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface ISortableItemProps {
  id: UniqueIdentifier;
  children: ReactNode;
  className?: string;
}

interface SortableContext {
  isDragging: boolean;
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

export const SortableItemContext = createContext<SortableContext>({
  isDragging: false,
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function SortableItem(props: Readonly<ISortableItemProps>) {
  const { id, children, className } = props;

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
      isDragging,
    }),
    [attributes, listeners, setActivatorNodeRef, isDragging]
  );

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li className={cn("w-full flex", className)} ref={setNodeRef} style={style}>
        {children}
      </li>
    </SortableItemContext.Provider>
  );
}
