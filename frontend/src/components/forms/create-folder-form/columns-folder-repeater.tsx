import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateRandomHexColor } from "@/shared/helpers/colors-helper";
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
          <fieldset className="flex flex-col gap-3">
            {fields.map((field, index) => {
              return (
                <FormItem
                  className="flex items-center space-y-0 gap-2"
                  key={field.id}
                >
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
                    onClick={() => handleRemoveColumn(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </FormItem>
              );
            })}
          </fieldset>
        )}
      </div>

      <Button
        type="button"
        size="sm"
        className="gap-2 mt-2"
        variant="outline"
        disabled={fields.length >= 3}
        onClick={handleAddNewColumn}
      >
        <Columns className="w-4 h-4" />
        Adicionar coluna
      </Button>
    </div>
  );
}
