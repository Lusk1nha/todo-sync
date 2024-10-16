import { useCallback, useMemo } from "react";
import { FoldersTitle } from "./folders-title";
import { Folder } from "@/shared/factories/folders-factory";

import {
  getSortedFoldersByDate,
  groupFoldersByDate,
  getSortedFoldersByName,
  groupFoldersByFirstLetter,
} from "@/shared/helpers/folders-helper";

import { useAtom } from "jotai";
import { folderSettingsAtom } from "@/shared/atoms";
import { useQuery } from "@tanstack/react-query";
import { FoldersService } from "@/shared/services/folders-service";

import { ContentFolder } from "./content-folder";
import { LoadingFolder } from "./loading-folder";

export type FolderSettings = {
  groupBy: FolderGroupBy;
  sortDirection: FolderSortDirection;
};

export type FolderGroupBy = "date" | "first-letter" | "none";
export type FolderSortDirection = "asc" | "desc";

export function UserFolderRender() {
  const [settings, setSettings] = useAtom(folderSettingsAtom);
  const { groupBy, sortDirection } = settings;

  const { list } = new FoldersService();

  const {
    data: response,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,

    initialData: [],

    refetchOnWindowFocus: false,
  });

  async function getFolders(): Promise<Folder[]> {
    const folders = await list();
    return folders;
  }

  const folders: Folder[] = useMemo(() => {
    const sorted = getSortedFoldersByName(response, sortDirection);
    return sorted;
  }, [response, sortDirection]);

  const foldersGroupBy: Record<string, Folder[]> | null = useMemo(() => {
    if (groupBy === "date") {
      const sortedFolders = getSortedFoldersByDate(
        folders,
        "updated_at",
        sortDirection
      );

      return groupFoldersByDate(sortedFolders);
    }

    if (groupBy === "first-letter") {
      const sortedFolders = getSortedFoldersByName(folders, sortDirection);
      return groupFoldersByFirstLetter(sortedFolders);
    }

    return {} as Record<string, Folder[]>;
  }, [folders, sortDirection, groupBy]);

  const handleGroupByChange = useCallback(
    (groupBy: FolderGroupBy) => {
      localStorage.setItem("todo-sync:group-by", groupBy);
      setSettings({ ...settings, groupBy });
    },
    [settings, setSettings]
  );

  const handleSortDirectionChange = useCallback(
    (sort: FolderSortDirection) => {
      localStorage.setItem("todo-sync:sort-direction", sort);
      setSettings({ ...settings, sortDirection: sort });
    },
    [settings, setSettings]
  );

  return (
    <section className="flex flex-col gap-3">
      <FoldersTitle
        count={folders.length}
        onRefresh={refetch}
        setGroupBy={handleGroupByChange}
        setSortDirection={handleSortDirectionChange}
      />

      {isFetching ? (
        <LoadingFolder />
      ) : (
        <ContentFolder folders={folders} groupFolders={foldersGroupBy} />
      )}
    </section>
  );
}
