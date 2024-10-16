import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSortable } from "@dnd-kit/sortable";
import { FieldArrayWithId, useFormContext } from "react-hook-form";

import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";

interface ISortableFieldProps {
  id: number;
  index: number;
  field: FieldArrayWithId<
    {
      name: string;
      description: string | null;
      columns: {
        name: string;
        position: number;
        color: string;
      }[];
    },
    "columns",
    "id"
  >;

  onRemoveColumn: (index: number) => void;
}

export function SortableField(props: Readonly<ISortableFieldProps>) {
  const { id, index, field, onRemoveColumn } = props;
  const { control } = useFormContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <FormItem
      className="flex items-center space-y-0 gap-2"
      key={field.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Button variant="outline" size="sm" className="w-10 h-9">
        <GripVertical className="w-8 h-8" />
      </Button>

      <FormField
        control={control}
        name={`columns.${index}.name`}
        render={({ field }) => (
          <FormControl>
            <Input
              placeholder="Insira o nome da coluna"
              name={field.name}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </FormControl>
        )}
      />

      <FormField
        control={control}
        name={`columns.${index}.color`}
        render={({ field }) => (
          <FormControl>
            <ColorPicker
              className="w-10"
              name={field.name}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </FormControl>
        )}
      />

      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="h-9"
        onClick={() => onRemoveColumn(index)}
      >
        <X className="w-4 h-4" />
      </Button>
    </FormItem>
  );
}
