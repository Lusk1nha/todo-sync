import { FolderPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { CreateFolderForm } from "../forms/create-folder-form/create-folder-form";
import { FolderSchemaType } from "@/shared/schemas/folder-schema";
import { FoldersService } from "@/shared/services/folders-service";
import { ICreateFolderRequest } from "@/shared/repositories/folders-repo";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { Folder } from "@/shared/factories/folders-factory";
import { queryClient } from "@/shared/helpers/react-query-helper";
import { FolderColumnsService } from "@/shared/services/folder-columns-service";

interface IFolderSheetProps {
  variant?: "mini" | "full";
}

export function CreateFolderSheet(props: Readonly<IFolderSheetProps>) {
  const { variant = "mini" } = props;
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: onSubmit,
    onSuccess(folder) {
      queryClient.setQueryData<Folder[]>(["folders"], (old) => {
        if (old) {
          return [...old, folder];
        }

        return [folder];
      });

      createFolderToast(folder);
    },
    onError(error) {
      toast({
        title: "Erro ao criar pasta",
        variant: "destructive",
        description: error.message
          ? error.message
          : "Ocorreu um erro ao criar a pasta",
      });
    },
    onSettled() {
      setOpen(false);
    },
  });

  function createFolderToast(folder: Folder) {
    const message = `Pasta criada com sucesso: ${folder.name}`;

    toast({
      title: "Pasta criada com sucesso",
      variant: "default",
      description: message,
    });
  }

  async function onSubmit(data: FolderSchemaType) {
    const { create } = new FoldersService();
    const { create: createColumn } = new FolderColumnsService();

    const payload = {
      name: data.name,
      description: data.description,
    } as ICreateFolderRequest;

    const folder = await create(payload);

    if (data.columns.length >= 1) {
      const columns = data.columns.map((column, index) =>
        createColumn({
          name: column.name,
          position: index,
          folder_id: folder.id,
          color: column.color,
        })
      );

      await Promise.all(columns);
    }

    return folder;
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            {variant === "mini" ? (
              <MinimalButton onClick={handleOpen} />
            ) : (
              <FullButton onClick={handleOpen} />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>Criar nova pasta</TooltipContent>
      </Tooltip>

      <SheetContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[600px] w-full h-full overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>Criar nova pasta</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para criar uma nova pasta
          </SheetDescription>
        </SheetHeader>

        <div className="w-full h-full flex flex-col py-4">
          <CreateFolderForm onSubmit={mutate} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface IFullButtonProps {
  onClick: () => void;
}

function FullButton(props: Readonly<IFullButtonProps>) {
  const { onClick } = props;

  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      className="text-primary h-8 gap-2"
      onClick={onClick}
    >
      <FolderPlus className="h-4 w-4" />
      Criar nova pasta
    </Button>
  );
}

interface IMinimalButtonProps {
  onClick: () => void;
}

function MinimalButton(props: Readonly<IMinimalButtonProps>) {
  const { onClick } = props;

  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      className="h-8 data-[state=open]:bg-accent"
      onClick={onClick}
    >
      <FolderPlus className="h-4 w-4" />
    </Button>
  );
}
