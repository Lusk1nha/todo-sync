import {
  FolderColumnSchema,
  FolderColumnSchemaType,
} from "@/shared/schemas/folder-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FieldGroup } from "./utilities/field-group";
import { Button } from "../ui/button";
import { Columns, Palette, X } from "lucide-react";
import { ColorPicker } from "../ui/color-picker";
import { generateRandomHexColor } from "@/shared/helpers/colors-helper";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { ColorButton } from "../buttons/color-button";

interface ICreateFolderColumnFormProps {
  onSubmit: (data: FolderColumnSchemaType) => void;
  onDismiss?: () => void;
}

export function CreateFolderColumnForm(
  props: Readonly<ICreateFolderColumnFormProps>
) {
  const { onSubmit, onDismiss } = props;

  const form = useForm<FolderColumnSchemaType>({
    resolver: zodResolver(FolderColumnSchema),
    defaultValues: {
      name: "",
      position: null,
      color: generateRandomHexColor(),
    },
  });

  const {
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
      >
        <FieldGroup className="gap-y-4">
          <FormItem>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <>
                  <FormLabel required>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o nome da coluna"
                      name={field.name}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormDescription>
                    O nome da coluna é o texto que será exibido no cabeçalho da
                    coluna.
                  </FormDescription>
                  <FormMessage />
                </>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <>
                  <div className="flex items-center justify-between gap-1 mb-4">
                    <FormLabel required>Cor</FormLabel>
                    <ColorButton color={field.value} />
                  </div>

                  <div className="flex items-center gap-2">
                    <FormControl>
                      <ColorPicker
                        className="w-full"
                        name={field.name}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    </FormControl>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          onClick={() =>
                            field.onChange(generateRandomHexColor())
                          }
                          className="h-9"
                        >
                          <Palette className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Gerar cor aleatória</TooltipContent>
                    </Tooltip>
                  </div>
                  <FormDescription>
                    A cor da coluna é utilizada para identificar visualmente a
                    coluna.
                  </FormDescription>

                  <FormMessage />
                </>
              )}
            />
          </FormItem>
        </FieldGroup>

        <div className="w-full flex items-center justify-between gap-2">
          <Button
            variant="secondary"
            type="button"
            size="sm"
            onClick={onDismiss}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </Button>

          <Button
            variant="default"
            size="sm"
            type="submit"
            className="gap-2"
            disabled={!isValid || isSubmitting}
          >
            <Columns className="w-4 h-4" />
            Salvar coluna
          </Button>
        </div>
      </form>
    </Form>
  );
}
