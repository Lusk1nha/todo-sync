import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EllipsisVertical, FolderCog, FolderX } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Folder } from "@/shared/factories/folders-factory";

interface IFolderMenuProps {
  folder: Folder;
}

export function FolderMenu(props: Readonly<IFolderMenuProps>) {
  const { folder } = props;

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

      <PopoverContent className="w-40 flex flex-col gap-1">
        <Button size="sm" type="button" variant="outline" className="gap-1">
          <FolderCog className="w-4 h-4" />
          Editar pasta
        </Button>

        <Button size="sm" type="button" variant="outline" className="gap-1">
          <FolderX className="w-4 h-4" />
          Excluir pasta
        </Button>
      </PopoverContent>
    </Popover>
  );
}
