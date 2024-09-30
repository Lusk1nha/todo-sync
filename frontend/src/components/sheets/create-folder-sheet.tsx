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

interface IFolderSheetProps {}

export function CreateFolderSheet(props: Readonly<IFolderSheetProps>) {
  const {} = props;

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            className="h-8 data-[state=open]:bg-accent"
            onClick={() => setOpen(true)}
          >
            <FolderPlus className="h-4 w-4" />
          </Button>
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
          <CreateFolderForm
            onSubmit={(data) => {
              console.log(data);
              setOpen(false);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
