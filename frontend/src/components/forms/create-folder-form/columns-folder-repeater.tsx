import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { generateRandomHexColor } from "@/shared/helpers/colors-helper";
import { FolderSchemaType } from "@/shared/schemas/folder-schema";
import { Columns } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableField } from "./sortable-folder-field";

interface IColumnsFolderRepeaterProps {
  control: Control<FolderSchemaType>;
  name: "columns";
}

export function ColumnsFolderRepeater(
  props: Readonly<IColumnsFolderRepeaterProps>
) {
  const { control, name } = props;

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  const { fields, move, remove, append } = useFieldArray({
    control,
    name,
  });

  function handleAddNewColumn() {
    const randomColor = generateRandomHexColor();

    append({
      name: "",
      position: fields.length,
      color: randomColor,
    });
  }

  function handleRemoveColumn(index: number) {
    remove(index);
  }

  function handlePositionChange(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over?.id) {
      const activeIndex = active.data.current?.sortable?.index;
      const overIndex = over.data.current?.sortable?.index;

      if (activeIndex !== undefined && overIndex !== undefined) {
        move(activeIndex, overIndex);
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <FormLabel>Colunas</FormLabel>

      <div className="mt-2">
        {fields.length === 0 ? (
          <p className="text-xs text-center text-primary font-medium">
            Adicione colunas para organizar suas tarefas
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handlePositionChange}
          >
            <SortableContext
              items={fields.map((field) => field.position)}
              strategy={verticalListSortingStrategy}
            >
              <fieldset className="flex flex-col gap-2">
                {fields.map((field, index) => {
                  return (
                    <SortableField
                      id={field.position}
                      key={field.id}
                      index={index}
                      field={field}
                      onRemoveColumn={handleRemoveColumn}
                    />
                  );
                })}
              </fieldset>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <Button
        type="button"
        size="sm"
        className="gap-2 mt-2"
        variant="outline"
        disabled={fields.length >= 20}
        onClick={handleAddNewColumn}
      >
        <Columns className="w-4 h-4" />
        Adicionar coluna
      </Button>
    </div>
  );
}
