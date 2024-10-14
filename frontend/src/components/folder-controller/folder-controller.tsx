import { Folder } from "@/shared/factories/folders-factory";
import { FolderMenu } from "../menus/folder-menu";
import { UserMenu } from "../menus/user-menu";
import { useSidebar } from "@/shared/hooks/use-sidebar-hook";
import { LogoMark } from "../logo-mark/logo-mark";
import { Separator } from "../ui/separator";

interface IFolderControllerProps {
  folder: Folder;
}

export function FolderController(props: Readonly<IFolderControllerProps>) {
  const { folder } = props;

  const { open } = useSidebar();

  return (
    <div className="bg-background min-h-24 border-separate border-border border-b flex items-center justify-between pr-6">
      <div className="h-full flex items-center overflow-auto">
        {!open && (
          <div className="min-w-[300px] h-full flex items-center justify-between pl-6 gap-8">
            <div className="flex items-center">
              <LogoMark className="text-2xl" />
            </div>

            <Separator orientation="vertical" />
          </div>
        )}

        <h4 className="text-foreground text-lg whitespace-nowrap overflow-hidden text-ellipsis pl-6">
          {folder.name}
        </h4>
      </div>

      <div className="flex items-center gap-2">
        <FolderMenu folder={folder} />
        <UserMenu />
      </div>
    </div>
  );
}
