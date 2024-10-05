import { useQuery } from "@tanstack/react-query";
import { Folder } from "../factories/folders-factory";
import { FoldersService } from "../services/folders-service";

type UseFolderResponse = {
  folder: Folder | undefined | null;
  isLoading: boolean;
  isError?: boolean;
};

export function useFolder(folderId?: string): UseFolderResponse {
  const { get } = new FoldersService();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: async () => {
      if (!folderId) {
        return null;
      }

      const response = get(folderId);
      return response;
    },
    enabled: !!folderId,
    refetchOnWindowFocus: false,
  });

  return {
    folder: data,
    isLoading: isLoading || isFetching,
    isError,
  };
}
