import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Folder } from "@/shared/factories/folders-factory";
import { Separator } from "../ui/separator";
import { EditFolderSheet } from "../sheets/edit-folder-sheet";
import { DeleteFolderDialog } from "../dialogs/delete-folder-dialog";

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

      <PopoverContent align="end" className="w-40 flex flex-col gap-2">
        <div>
          <h2 className="text-sm font-medium">Pasta</h2>
          <p className="text-xs text-primary">Gerencie a pasta</p>
        </div>

        <Separator />

        <EditFolderSheet folderId={folder.id} />
        <DeleteFolderDialog folderId={folder.id} />
      </PopoverContent>
    </Popover>
  );
}
