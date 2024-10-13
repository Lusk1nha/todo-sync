import { UserMenu } from "@/components/menus/user-menu";
import { GetFolderColumns } from "@/components/folder-columns/get-folder-columns";

import { Folder } from "@/shared/factories/folders-factory";

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
        <UserMenu />
      </div>

      <GetFolderColumns folderId={folder.id} />
    </main>
  );
}
