import { useQuery } from "@tanstack/react-query";
import { FolderColumn } from "../factories/folders-columns-factory";
import { FoldersService } from "../services/folders-service";

interface UseFolderColumns {
  folderColumns: FolderColumn[];
  isLoading: boolean;
  isError: boolean;
}

export function useFolderColumns(folderId: string): UseFolderColumns {
  const { columns } = new FoldersService();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["folderColumns", folderId],
    queryFn: async () => {
      const response = columns(folderId);
      return response;
    },
    initialData: [] as FolderColumn[],
    refetchOnWindowFocus: false,
  });

  return {
    folderColumns: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}
