import { FoldersService } from "@/shared/services/folders-service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { FolderCog } from "lucide-react";
import { CreateFolderForm } from "../forms/create-folder-form/create-folder-form";

interface IEditFolderSheetProps {
  folderId: string;
}

export function EditFolderSheet(props: Readonly<IEditFolderSheetProps>) {
  const { folderId } = props;
  const [open, setOpen] = useState(false);

  const { data: folder } = useQuery({
    queryKey: ["folder-edit", folderId],
    queryFn: async () => {
      const { get, getColumns } = new FoldersService();

      const folder = await get(folderId);
      const columns = await getColumns(folderId);

      folder.defineColumns(columns);

      return folder;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" type="button" variant="outline" className="gap-2">
          <FolderCog className="w-4 h-4" />
          Editar pasta
        </Button>
      </SheetTrigger>

      <SheetContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[600px] w-[600px] h-full overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>Editar pasta</SheetTitle>
          <SheetDescription>
            Edite as informações da pasta e suas colunas
          </SheetDescription>
        </SheetHeader>

        <div className="w-full h-full flex flex-col py-4">
          <CreateFolderForm
            onSubmit={(data) => console.log(data)}
            defaultValues={folder}
            strings={{
              save: "Salvar pasta",
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
