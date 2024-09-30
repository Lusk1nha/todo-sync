import { CreateFolderSheet } from "../sheets/create-folder-sheet";

import { FolderGroupMenu } from "./folder-group-menu";
import { FolderGroupBy, FolderSortDirection } from "./user-folder-render";

type FoldersTitleStrings = {
  text?: string;
};

interface IFoldersTitleProps {
  strings?: FoldersTitleStrings;
  count: number;

  groupBy: FolderGroupBy;
  setGroupBy: (sort: FolderGroupBy) => void;

  sortDirection: FolderSortDirection;
  setSortDirection: (direction: FolderSortDirection) => void;
}

export function FoldersTitle(props: Readonly<IFoldersTitleProps>) {
  const {
    strings = {
      text: "Pastas",
    },
    count,
    groupBy,
    setGroupBy,
    sortDirection,
    setSortDirection,
  } = props;

  return (
    <div className="flex items-center justify-between pr-4">
      <h2 className="text-xs tracking-widest text-muted-foreground uppercase px-9">
        {strings.text} ({count})
      </h2>

      <div className="flex gap-2">
        <CreateFolderSheet />

        <FolderGroupMenu
          className="h-8"
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </div>
    </div>
  );
}
