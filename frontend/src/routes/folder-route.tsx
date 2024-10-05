import { FolderColumnRender } from "@/components/folder-column-render";
import { UserMenu } from "@/components/menus/user-menu";
import { Folder } from "@/shared/factories/folders-factory";
import { useFolderColumns } from "@/shared/hooks/use-folder-columns";

interface FolderRouteProps {
  folder: Folder;
}

export function FolderRoute(props: Readonly<FolderRouteProps>) {
  const { folder } = props;

  const { folderColumns } = useFolderColumns(folder.id);

  return (
    <div className="flex flex-col">
      <div className="w-full bg-background h-24 border-separate border-border border-b flex items-center justify-between px-6">
        <div>
          <h4 className="text-foreground text-2xl">{folder.name}</h4>
        </div>
        <UserMenu />
      </div>

      <div className="flex p-6 gap-6">
        {folderColumns.map((column) => (
          <FolderColumnRender
            key={column.id}
            column={column}
            color={folder.color}
          />
        ))}
      </div>
    </div>
  );
}
