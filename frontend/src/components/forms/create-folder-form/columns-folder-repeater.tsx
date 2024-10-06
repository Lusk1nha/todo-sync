import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FolderSchemaType } from "@/shared/schemas/folder-schema";
import { Columns, X } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";

interface IColumnsFolderRepeaterProps {
  control: Control<FolderSchemaType>;
  name: "columns";
}

export function ColumnsFolderRepeater(
  props: Readonly<IColumnsFolderRepeaterProps>
) {
  const { control, name } = props;

  const { fields, remove, append } = useFieldArray({
    control,
    name,
  });

  function handleAddNewColumn() {
    append({
      name: "",
      position: fields.length,
    });
  }

  function handleRemoveColumn(index: number) {
    remove(index);
  }

  return (
    <div className="flex flex-col gap-2">
      <FormLabel>Colunas</FormLabel>

      <fieldset className="flex flex-col gap-3">
        {fields.map((field, index) => {
          return (
            <FormField
              key={field.id}
              control={control}
              name={`columns.${index}.name`}
              render={({ field }) => (
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        placeholder="Insira o nome da coluna"
                        name={field.name}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    </FormControl>

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveColumn(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            />
          );
        })}
      </fieldset>

      <Button
        type="button"
        size="sm"
        className="gap-2 mt-2"
        variant="outline"
        onClick={handleAddNewColumn}
      >
        <Columns className="w-4 h-4" />
        Adicionar coluna
      </Button>
    </div>
  );
}
