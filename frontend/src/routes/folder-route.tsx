import { GetFolderColumns } from "@/components/folder-columns/get-folder-columns";

import { Folder } from "@/shared/factories/folders-factory";

import { FolderController } from "@/components/folder-controller/folder-controller";

interface FolderRouteProps {
  folder: Folder;
}

export function FolderRoute(props: Readonly<FolderRouteProps>) {
  const { folder } = props;

  return (
    <main className="bg-secondary w-full h-full flex flex-col overflow-x-hidden">
      <FolderController folder={folder} />
      <GetFolderColumns folderId={folder.id} />
    </main>
  );
}
