import { UserMenu } from "@/components/menus/user-menu";
import { GetFolderColumns } from "@/components/folder-columns/get-folder-columns";

import { Folder } from "@/shared/factories/folders-factory";
import { FolderMenu } from "@/components/menus/folder-menu";

interface FolderRouteProps {
  folder: Folder;
}

export function FolderRoute(props: Readonly<FolderRouteProps>) {
  const { folder } = props;

  return (
    <main className="bg-secondary w-full h-full flex flex-col overflow-x-hidden">
      <div className="bg-background h-24 border-separate border-border border-b flex items-center justify-between px-6">
        <div>
          <h4 className="text-foreground text-xl">{folder.name}</h4>
        </div>

        <div className="flex items-center gap-2">
          <FolderMenu folder={folder} />
          <UserMenu />
        </div>
      </div>

      <GetFolderColumns folderId={folder.id} />
    </main>
  );
}
