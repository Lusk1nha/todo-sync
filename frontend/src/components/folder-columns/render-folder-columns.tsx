import { FolderColumn } from "@/shared/factories/folders-columns-factory";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { FolderColumnWrapper } from "./folder-column-wrapper";

interface IRenderFolderColumnsProps {
  columns: FolderColumn[];
}

export function RenderFolderColumns(
  props: Readonly<IRenderFolderColumnsProps>
) {
  const { columns } = props;

  return (
    <ScrollArea className="h-full whitespace-nowrap rounded-md mb-1">
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
        </motion.div>
      </AnimatePresence>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
