import { useQuery } from "@tanstack/react-query";
import { FolderColumn } from "../factories/folders-columns-factory";
import { FoldersService } from "../services/folders-service";

interface UseFolderColumns {
  folderColumns: FolderColumn[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useFolderColumns(folderId: string): UseFolderColumns {
  const { getColumns } = new FoldersService();

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["folderColumns", folderId],
    queryFn: async () => {
      const columns = getColumns(folderId);
      return columns;
    },
    initialData: [] as FolderColumn[],
    refetchOnWindowFocus: false,
  });

  return {
    folderColumns: data,
    isLoading: isLoading || isFetching,
    isError,
    error,
  };
}
