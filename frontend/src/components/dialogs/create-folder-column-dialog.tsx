import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { CreateFolderColumnForm } from "../forms/create-folder-column";
import { FolderColumnSchemaType } from "@/shared/schemas/folder-schema";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { FolderColumnsService } from "@/shared/services/folder-columns-service";
import { FoldersService } from "@/shared/services/folders-service";
import { ICreateFolderColumnRequest } from "@/shared/repositories/folder-columns-repo";
import { AddNewFolderColumn } from "../folder-columns/add-new-folder-column";

type CreateFolderColumnDialogVariant = "default" | "full";

type CreateFolderColumnDialogStrings = {
  title: string;
  trigger: string;
  createColumn: string;
};

interface ICreateFolderColumnDialogProps {
  variant?: CreateFolderColumnDialogVariant;
  className?: string;
  folderId: string;
  strings?: CreateFolderColumnDialogStrings;
}

export function CreateFolderColumnDialog(
  props: Readonly<ICreateFolderColumnDialogProps>
) {
  const {
    variant = "default",
    className,
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
    const latestPosition = folderColumns.reduce((acc, column) => {
      return column.position > acc ? column.position : acc;
    }, 0);

    const payload: ICreateFolderColumnRequest = {
      folder_id: folderId,
      name: data.name,
      position: latestPosition + 1,
      color: data.color,
    };

    const column = await create(payload);

    return column;
  }

  function onOpen() {
    setOpen(true);
  }

  function onDismiss() {
    setOpen(false);
  }

  function handleVariant(variant: CreateFolderColumnDialogVariant) {
    switch (variant) {
      case "default":
        return (
          <Button
            variant="default"
            type="button"
            className="gap-2"
            onClick={onOpen}
          >
            <Plus className="w-5 h-5" />
            {strings.trigger}
          </Button>
        );
      case "full":
        return <AddNewFolderColumn className={className} onClick={onOpen} />;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {handleVariant(variant)}

      <DialogContent>
        <DialogTitle>{strings.title}</DialogTitle>
        <CreateFolderColumnForm onSubmit={mutate} onDismiss={onDismiss} />
      </DialogContent>
    </Dialog>
  );
}
