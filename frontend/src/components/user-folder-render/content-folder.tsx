import { Folder } from "@/shared/factories/folders-factory";
import { EmptyFolder } from "./empty-folder";
import { FolderRender } from "./folder-render";

interface IContentFolderProps {
  folders: Folder[];
  groupFolders: Record<string, Folder[]>;
}

export function ContentFolder(props: Readonly<IContentFolderProps>) {
  const { folders, groupFolders } = props;

  if (folders.length === 0) {
    return <EmptyFolder />;
  }

  return <FolderRender folders={folders} groupFolders={groupFolders} />;
}
