import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EllipsisVertical, FolderCog, FolderX } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Folder } from "@/shared/factories/folders-factory";
import { Separator } from "../ui/separator";

interface IFolderMenuProps {
  folder: Folder;
}

export function FolderMenu(props: Readonly<IFolderMenuProps>) {
  const { folder } = props;

  console.log(folder);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="w-12"
        >
          <EllipsisVertical className="text-primary" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-40 flex flex-col gap-2">
        <div>
          <h2 className="text-sm font-medium">Pasta</h2>
          <p className="text-xs text-primary">Gerencie a pasta</p>
        </div>

        <Separator />

        <Button size="sm" type="button" variant="outline" className="gap-2">
          <FolderCog className="w-4 h-4" />
          Editar pasta
        </Button>

        <Button size="sm" type="button" variant="outline" className="gap-2">
          <FolderX className="w-4 h-4" />
          Excluir pasta
        </Button>
      </PopoverContent>
    </Popover>
  );
}
