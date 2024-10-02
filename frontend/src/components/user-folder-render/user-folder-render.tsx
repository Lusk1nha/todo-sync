import { useCallback, useMemo } from "react";
import { FoldersTitle } from "./folders-title";
import { Folder } from "@/shared/factories/folders-factory";

import { FolderRender } from "./folder-render";

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
import { LoadingSpinner } from "../ui/loading-spinner";

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

interface IFolderRenderProps {
  folders: Folder[];
  groupFolders: Record<string, Folder[]>;
}

function ContentFolder(props: Readonly<IFolderRenderProps>) {
  const { folders, groupFolders } = props;

  if (folders.length === 0) {
    return <EmptyFolder />;
  }

  return <FolderRender folders={folders} groupFolders={groupFolders} />;
}

function LoadingFolder() {
  return (
    <div className="flex items-center justify-center mt-4">
      <LoadingSpinner className="w-10 h-10" />
    </div>
  );
}

function EmptyFolder() {
  return (
    <div className="flex items-center justify-center mt-4">
      <p className="text-sm text-muted-foreground">
        Nenhuma pasta foi encontrada.
      </p>
    </div>
  );
}
