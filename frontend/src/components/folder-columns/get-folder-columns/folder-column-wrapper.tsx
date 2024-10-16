import { FolderColumn } from "@/shared/factories/folders-columns-factory";
import { motion } from "framer-motion";
import { ColorCircle } from "./color-circle";

interface IFolderColumnWrapperProps {
  column: FolderColumn;
}

export function FolderColumnWrapper(
  props: Readonly<IFolderColumnWrapperProps>
) {
  const { column } = props;

  return (
    <motion.div
      data-guid-id={column.id}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
      }}
      className="min-w-[280px] flex flex-col gap-6"
    >
      <div className="flex items-center gap-3">
        <ColorCircle color={column.color} />

        <h2 className="text-muted-foreground text-sm font-medium uppercase tracking-[2.4px]">
          {column.name} (?)
        </h2>
      </div>
    </motion.div>
  );
}
