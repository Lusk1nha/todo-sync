import { ReactNode, useState, Fragment, useMemo } from "react";

import {
  Active,
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableOverlay } from "./sortable-overlay";
import { cn } from "@/lib/utils";

interface BaseItem {
  id: UniqueIdentifier;
}

interface ISortableListProps<T extends BaseItem> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  onChange(active: number, over: number): void;
  className?: string;
}

export function SortableList<T extends BaseItem>(
  props: Readonly<ISortableListProps<T>>
) {
  const { items, renderItem, onChange, className } = props;

  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  function handlePositionChange(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over?.id) {
      const activeIndex = active.data.current?.sortable?.index;
      const overIndex = over.data.current?.sortable?.index;

      if (activeIndex !== undefined && overIndex !== undefined) {
        onChange(activeIndex, overIndex);
        setActive(null);
      }
    }
  }

  function handlePositionCancel() {
    setActive(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handlePositionChange}
      onDragCancel={handlePositionCancel}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className={cn("w-full flex flex-col gap-2", className)}>
          {items.map((item, index) => (
            <Fragment key={item.id}>{renderItem(item, index)}</Fragment>
          ))}
        </ul>
      </SortableContext>

      <SortableOverlay>
        {activeItem ? renderItem(activeItem, 0) : null}
      </SortableOverlay>
    </DndContext>
  );
}
