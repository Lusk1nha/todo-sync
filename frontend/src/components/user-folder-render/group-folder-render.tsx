import { Folder } from "@/shared/factories/folders-factory";
import { FolderSelectButton } from "./folder-select-button";
import { AnimatePresence, motion } from "framer-motion";

interface IGroupFolderRenderProps {
  hashFolders: Record<string, Folder[]>;
}

export function GroupFolderRender(props: Readonly<IGroupFolderRenderProps>) {
  const { hashFolders } = props;

  const groups = Object.entries(hashFolders);

  function handleRenderGroup(name: string, folders: Folder[]) {
    return (
      <div key={name} className="flex flex-col gap-2">
        <h3 className="text-primary text-sm font-semibold tracking-widest uppercase px-9">
          {name}
        </h3>

        <ul className="flex flex-col gap-2">
          {folders.map((folder) => (
            <FolderSelectButton key={folder.id} text={folder.name} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col gap-4 pr-6 overflow-y-auto mr-6"
        variants={{
          visible: {
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.05,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {groups.map(([name, folders]) => handleRenderGroup(name, folders))}
      </motion.div>
    </AnimatePresence>
  );
}
