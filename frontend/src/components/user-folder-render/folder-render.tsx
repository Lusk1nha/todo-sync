import { Folder } from "@/shared/factories/folders-factory";

import { FolderLinearRender } from "./folder-linear-render";
import { GroupFolderRender } from "./group-folder-render";
import { folderSettingsAtom } from "@/shared/atoms";
import { useAtom } from "jotai";

interface IFolderRenderProps {
  folders: Folder[];
  groupFolders: Record<string, Folder[]>;
}

export function FolderRender(props: Readonly<IFolderRenderProps>) {
  const { folders, groupFolders } = props;
  const [settings] = useAtom(folderSettingsAtom);

  const { groupBy } = settings;

  if (groupBy === "none") {
    return <FolderLinearRender folders={folders} />;
  }

  return <GroupFolderRender hash={groupFolders} />;
}
