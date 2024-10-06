import { Columns } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { CreateFolderColumnForm } from "../forms/create-folder-column";
import { FolderColumnSchemaType } from "@/shared/schemas/folder-schema";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { FolderColumnsService } from "@/shared/services/folder-columns-service";
import { FoldersService } from "@/shared/services/folders-service";
import { ICreateFolderColumnRequest } from "@/shared/repositories/folder-columns-repo";

type CreateFolderColumnDialogStrings = {
  title: string;
  trigger: string;
  createColumn: string;
};

interface ICreateFolderColumnDialogProps {
  folderId: string;
  strings?: CreateFolderColumnDialogStrings;
}

export function CreateFolderColumnDialog(
  props: Readonly<ICreateFolderColumnDialogProps>
) {
  const {
    folderId,
    strings = {
      title: "Criar nova coluna",
      trigger: "Criar nova coluna",
      createColumn: "Criar nova coluna",
    },
  } = props;

  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: handleCreateColumn,
    onSuccess(column) {
      const message = `Coluna criada com sucesso: ${column.name}`;

      toast({
        title: "Coluna criada com sucesso",
        variant: "default",
        description: message,
      });
    },
    onError(error) {
      toast({
        title: "Erro ao criar coluna",
        variant: "destructive",
        description: error.message
          ? error.message
          : "Ocorreu um erro ao criar a coluna",
      });
    },
    onSettled() {
      onDismiss();
    },
  });

  async function handleCreateColumn(data: FolderColumnSchemaType) {
    const { create } = new FolderColumnsService();
    const { columns } = new FoldersService();

    const folderColumns = await columns(folderId);

    const payload: ICreateFolderColumnRequest = {
      folder_id: folderId,
      name: data.name,
      position: folderColumns.length + 1,
    };

    const column = await create(payload);

    return column;
  }

  function onDismiss() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" type="button" className="gap-2">
          <Columns className="w-4 h-4" />
          {strings.trigger}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>{strings.title}</DialogTitle>

        <CreateFolderColumnForm onSubmit={mutate} onDismiss={onDismiss} />
      </DialogContent>
    </Dialog>
  );
}
