import { Folder } from "@/shared/factories/folders-factory";
import { FolderSelectButton } from "./folder-select-button";
import { AnimatePresence, motion } from "framer-motion";

interface IGroupFolderRenderProps {
  hash: Record<string, Folder[]>;
}

export function GroupFolderRender(props: Readonly<IGroupFolderRenderProps>) {
  const { hash } = props;

  const groups = Object.entries(hash);

  return (
    <AnimatePresence>
      <motion.div
        className="max-h-[500px] flex flex-col gap-4 pr-6 overflow-y-auto mr-6"
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
        {groups.map(([name, folders]) => (
          <RenderGroup key={name} name={name} folders={folders} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

interface IRenderGroupProps {
  name: string;
  folders: Folder[];
}

function RenderGroup(props: Readonly<IRenderGroupProps>) {
  const { name, folders } = props;

  return (
    <div key={name} className="flex flex-col gap-2">
      <motion.h3
        title={name}
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
          },
        }}
        className="text-primary text-sm font-semibold tracking-widest uppercase px-9"
      >
        {name}
      </motion.h3>

      <ul className="flex flex-col">
        {folders.map((folder) => (
          <FolderSelectButton
            key={folder.id}
            id={folder.id}
            text={folder.name}
            description={folder?.description}
          />
        ))}
      </ul>
    </div>
  );
}
