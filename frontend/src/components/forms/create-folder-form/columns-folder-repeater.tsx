import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { generateRandomHexColor } from "@/shared/helpers/colors-helper";
import { FolderSchemaType } from "@/shared/schemas/folder-schema";
import { Columns } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";

import { SortableList } from "@/components/sortable-list/sortable-list";
import { SortableItem } from "@/components/sortable-list/sortable-item";

import { DragHandle } from "@/components/sortable-list/drag-handle";
import { FolderColumnFieldset } from "./folder-column-fieldset";

interface IColumnsFolderRepeaterProps {
  control: Control<FolderSchemaType>;
  name: "columns";
}

export function ColumnsFolderRepeater(
  props: Readonly<IColumnsFolderRepeaterProps>
) {
  const { control, name } = props;

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

  return (
    <div className="flex flex-col gap-2">
      <FormLabel>Colunas</FormLabel>

      <div className="mt-2">
        {fields.length === 0 ? (
          <p className="text-xs text-center text-primary font-medium">
            Adicione colunas para organizar suas tarefas
          </p>
        ) : (
          <SortableList
            items={fields}
            renderItem={(item, index) => (
              <SortableItem
                className="w-full flex items-center space-y-0 gap-2"
                id={item.id}
              >
                <DragHandle />

                <FolderColumnFieldset
                  field={item}
                  index={index}
                  onRemoveColumn={handleRemoveColumn}
                />
              </SortableItem>
            )}
            onChange={(active, over) => {
              move(active, over);
            }}
          />
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
