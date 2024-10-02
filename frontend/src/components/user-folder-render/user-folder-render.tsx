import { Suspense, useCallback, useMemo } from "react";
import { FoldersTitle } from "./folders-title";
import { Folder } from "@/shared/factories/folders-factory";
import { generateFoldersMockup } from "@/shared/mocks/folders-mockup";
import { FolderRender } from "./folder-render";

import {
  getSortedFoldersByDate,
  groupFoldersByDate,
  getSortedFoldersByName,
  groupFoldersByFirstLetter,
} from "@/shared/helpers/folders-helper";

import { useAtom } from "jotai";
import { folderSettingsAtom } from "@/shared/atoms";

export type FolderSettings = {
  groupBy: FolderGroupBy;
  sortDirection: FolderSortDirection;
};

export type FolderGroupBy = "date" | "first-letter" | "none";
export type FolderSortDirection = "asc" | "desc";

export function UserFolderRender() {
  const [settings, setSettings] = useAtom(folderSettingsAtom);
  const { groupBy, sortDirection } = settings;

  const response = generateFoldersMockup(0);

  const folders: Folder[] = useMemo(() => {
    const sorted = getSortedFoldersByName(response, sortDirection);
    return sorted;
  }, [sortDirection]);

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
  }, [folders, groupBy]);

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
        setGroupBy={handleGroupByChange}
        setSortDirection={handleSortDirectionChange}
      />

      {folders.length === 0 ? (
        <EmptyFolder />
      ) : (
        <Suspense>
          <FolderRender folders={folders} groupFolders={foldersGroupBy} />
        </Suspense>
      )}
    </section>
  );
}

function EmptyFolder() {
  return (
    <div className="flex items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Nenhuma pasta foi encontrada.
      </p>
    </div>
  );
}
