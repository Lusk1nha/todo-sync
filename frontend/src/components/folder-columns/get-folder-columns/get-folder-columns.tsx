import { useFolderColumns } from "@/shared/hooks/use-folder-columns";

import { EmptyFolderColumns } from "./empty-folder-column";

import { RenderFolderColumns } from "./render-folder-columns";

import { FolderColumnsSkeleton } from "./folder-columns-skeleton";
import { ErrorGetFolderColumns } from "./error-get-folder-columns";

interface IGetFolderColumnsProps {
  folderId: string;
}

export function GetFolderColumns(props: Readonly<IGetFolderColumnsProps>) {
  const { folderId } = props;
  const { folderColumns, isLoading, isError, error } =
    useFolderColumns(folderId);

  if (isError) {
    return <ErrorGetFolderColumns error={error} />;
  }

  if (isLoading) {
    return <FolderColumnsSkeleton name="folder-columns" total={8} />;
  }

  if (folderColumns.length === 0) {
    return <EmptyFolderColumns folderId={folderId} />;
  }

  return <RenderFolderColumns folderId={folderId} columns={folderColumns} />;
}
