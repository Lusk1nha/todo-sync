import { folderSettingsAtom } from "@/shared/atoms";
import { CreateFolderSheet } from "../sheets/create-folder-sheet";
import { AnimatedCounter } from "../utilities/animated-counter";

import { FolderGroupMenu } from "./folder-group-menu";
import { FolderGroupBy, FolderSortDirection } from "./user-folder-render";
import { useAtom } from "jotai";

type FoldersTitleStrings = {
  text?: string;
};

interface IFoldersTitleProps {
  strings?: FoldersTitleStrings;
  count: number;

  setGroupBy: (sort: FolderGroupBy) => void;

  setSortDirection: (direction: FolderSortDirection) => void;
}

export function FoldersTitle(props: Readonly<IFoldersTitleProps>) {
  const {
    strings = {
      text: "Pastas",
    },
    count,
    setGroupBy,
    setSortDirection,
  } = props;

  const [settings] = useAtom(folderSettingsAtom);
  const { groupBy, sortDirection } = settings;

  return (
    <div className="flex items-center justify-between pr-4">
      <h2 className="text-xs tracking-widest text-muted-foreground uppercase px-9">
        {strings.text} (<AnimatedCounter from={0} to={count} />)
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
