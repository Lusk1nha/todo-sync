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
import { Columns, X } from "lucide-react";

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
    },
  });

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
      >
        <FieldGroup className="gap-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
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
              </FormItem>
            )}
          />
        </FieldGroup>

        <div className="w-full flex items-center justify-end gap-2">
          <Button
            variant="outline"
            type="button"
            size="sm"
            onClick={onDismiss}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </Button>

          <Button variant="default" size="sm" type="submit" className="gap-2">
            <Columns className="w-4 h-4" />
            Salvar coluna
          </Button>
        </div>
      </form>
    </Form>
  );
}
