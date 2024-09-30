import { useMemo } from "react";
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

  const response = generateFoldersMockup(100);

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

  function handleGroupByChange(groupBy: FolderGroupBy) {
    localStorage.setItem("todo-sync:group-by", groupBy);
    setSettings({ ...settings, groupBy });
  }

  function handleSortDirectionChange(sort: FolderSortDirection) {
    localStorage.setItem("todo-sync:sort-direction", sort);
    setSettings({ ...settings, sortDirection: sort });
  }

  return (
    <section className="flex flex-col gap-3">
      <FoldersTitle
        count={folders.length}
        groupBy={groupBy}
        setGroupBy={handleGroupByChange}
        sortDirection={sortDirection}
        setSortDirection={handleSortDirectionChange}
      />

      <FolderRender
        folders={folders}
        groupBy={groupBy}
        groupFolders={foldersGroupBy}
        sortDirection={sortDirection}
      />
    </section>
  );
}
