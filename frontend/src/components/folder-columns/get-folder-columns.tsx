import { useFolderColumns } from "@/shared/hooks/use-folder-columns";

import { EmptyFolderColumns } from "./empty-folder-column";

import { RenderFolderColumns } from "./render-folder-columns";

interface IGetFolderColumnsProps {
  folderId: string;
}

export function GetFolderColumns(props: Readonly<IGetFolderColumnsProps>) {
  const { folderId } = props;
  const { folderColumns } = useFolderColumns(folderId);

  if (folderColumns.length === 0) {
    return <EmptyFolderColumns folderId={folderId} />;
  }

  return <RenderFolderColumns columns={folderColumns} />;
}
