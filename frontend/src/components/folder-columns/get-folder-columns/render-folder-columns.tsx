import { FolderColumn } from "@/shared/factories/folders-columns-factory";

import { motion, AnimatePresence } from "framer-motion";
import { FolderColumnWrapper } from "./folder-column-wrapper";

import { CreateFolderColumnDialog } from "../../dialogs/create-folder-column-dialog";

interface IRenderFolderColumnsProps {
  folderId: string;
  columns: FolderColumn[];
}

export function RenderFolderColumns(
  props: Readonly<IRenderFolderColumnsProps>
) {
  const { folderId, columns } = props;

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
        className="w-full h-full flex gap-6 p-6"
      >
        {columns.map((column) => (
          <FolderColumnWrapper key={column.id} column={column} />
        ))}

        <CreateFolderColumnDialog folderId={folderId} variant="full" />
      </motion.div>
    </AnimatePresence>
  );
}
