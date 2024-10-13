import { useFolderColumns } from "@/shared/hooks/use-folder-columns";

import { EmptyFolderColumns } from "./empty-folder-column";

import { RenderFolderColumns } from "./render-folder-columns";

interface IGetFolderColumnsProps {
  folderId: string;
}

export function GetFolderColumns(props: Readonly<IGetFolderColumnsProps>) {
  const { folderId } = props;
  const { folderColumns, isLoading } = useFolderColumns(folderId);

  if (folderColumns.length === 0 && !isLoading) {
    return <EmptyFolderColumns folderId={folderId} />;
  }

  return <RenderFolderColumns folderId={folderId} columns={folderColumns} />;
}
