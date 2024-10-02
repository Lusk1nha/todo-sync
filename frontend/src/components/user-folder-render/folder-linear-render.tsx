import { AnimatePresence, motion } from "framer-motion";
import { FolderSelectButton } from "./folder-select-button";
import { Folder } from "@/shared/factories/folders-factory";

interface IFolderLinearRenderProps {
  folders: Folder[];
}

export function FolderLinearRender(props: Readonly<IFolderLinearRenderProps>) {
  const { folders } = props;

  return (
    <AnimatePresence>
      <motion.div
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
        <motion.ul className="flex flex-col pr-6 overflow-y-auto mr-6">
          {folders.map((set) => (
            <FolderSelectButton
              key={set.id}
              id={set.id}
              text={set.name}
              description={set.description}
            />
          ))}
        </motion.ul>
      </motion.div>
    </AnimatePresence>
  );
}
