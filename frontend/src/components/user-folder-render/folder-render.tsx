import { Folder } from "@/shared/factories/folders-factory";
import { FolderGroupBy, FolderSortDirection } from "./user-folder-render";
import { FolderLinearRender } from "./folder-linear-render";
import { GroupFolderRender } from "./group-folder-render";

interface IFolderRenderProps {
  groupBy: FolderGroupBy;
  folders: Folder[];
  groupFolders: Record<string, Folder[]>;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  sortDirection: FolderSortDirection;
}

export function FolderRender(props: Readonly<IFolderRenderProps>) {
  const { groupBy, folders, groupFolders } = props;

  if (groupBy === "none") {
    return <FolderLinearRender folders={folders} />;
  }

  return <GroupFolderRender hashFolders={groupFolders} />;
}
