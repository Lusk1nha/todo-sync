import { FolderPlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { CreateFolderForm } from "../forms/create-folder-form/create-folder-form";
import { FolderSchemaType } from "@/shared/schemas/folder-schema";
import { FoldersService } from "@/shared/services/folders-service";
import { ICreateFolderRequest } from "@/shared/repositories/folders-repo";
import { useMutation } from "@tanstack/react-query";

interface IFolderSheetProps {
  variant?: "mini" | "full";
}

export function CreateFolderSheet(props: Readonly<IFolderSheetProps>) {
  const { variant = "mini" } = props;
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      setOpen(false);
    },
  });

  async function onSubmit(data: FolderSchemaType) {
    const { create } = new FoldersService();

    const payload = {
      name: data.name,
      description: data.description,
      color: data.color,
    } as ICreateFolderRequest;

    await create(payload);
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
        className="w-[400px] sm:w-[540px]"
      >
        <SheetHeader>
          <SheetTitle>Criar nova pasta</SheetTitle>
          <SheetDescription>
            Crie uma nova pasta para organizar suas tarefas
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-full mt-8">
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
      className="text-primary h-8 data-[state=open]:bg-accent"
      onClick={onClick}
    >
      <FolderPlus className="h-4 w-4" />
    </Button>
  );
}
