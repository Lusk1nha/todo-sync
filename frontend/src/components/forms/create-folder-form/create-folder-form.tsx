import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FieldGroup } from "../utilities/field-group";
import { Input } from "@/components/ui/input";
import { FolderSchema, FolderSchemaType } from "@/shared/schemas/folder-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { ColumnsFolderRepeater } from "./columns-folder-repeater";

interface ICreateFolderFormProps {
  onSubmit: (data: FolderSchemaType) => void;
}

export function CreateFolderForm(props: Readonly<ICreateFolderFormProps>) {
  const { onSubmit } = props;

  const form = useForm<FolderSchemaType>({
    resolver: zodResolver(FolderSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      columns: [
        {
          name: "Todo",
          position: 0,
        },
        {
          name: "Doing",
          position: 1,
        },
        {
          name: "Done",
          position: 2,
        },
      ],
      color: "#f97316",
    },
  });

  const { control, handleSubmit, formState } = form;
  const { isValid, isSubmitting } = formState;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o nome da pasta"
                    name={field.name}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                  />
                </FormControl>

                <FormDescription>
                  O nome da pasta é utilizado para identificar a pasta
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Insira a descrição da pasta"
                    name={field.name}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    rows={4}
                  />
                </FormControl>

                <FormDescription>
                  A descrição é utilizada para descrever o conteúdo da pasta
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <ColumnsFolderRepeater control={control} name="columns" />
        </FieldGroup>

        <Button
          type="submit"
          className="w-full mt-6"
          disabled={!isValid || isSubmitting}
        >
          Criar pasta
        </Button>
      </form>
    </Form>
  );
}
