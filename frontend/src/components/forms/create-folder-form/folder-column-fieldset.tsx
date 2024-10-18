import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FieldArrayWithId, useFormContext } from "react-hook-form";

import { X } from "lucide-react";
import { FolderSchemaType } from "@/shared/schemas/folder-schema";

interface IFolderColumnFieldsetProps {
  index: number;
  field: FieldArrayWithId<FolderSchemaType, "columns", "id">;
  onRemoveColumn: (index: number) => void;
}

export function FolderColumnFieldset(
  props: Readonly<IFolderColumnFieldsetProps>
) {
  const { index, onRemoveColumn } = props;
  const { control, formState } = useFormContext();
  const { errors } = formState;

  const isError = (errors?.columns as Record<string, any>)?.[index];

  return (
    <>
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
              className={isError ? "border-destructive" : ""}
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
    </>
  );
}
