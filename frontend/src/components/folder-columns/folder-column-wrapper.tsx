import { FolderColumn } from "@/shared/factories/folders-columns-factory";
import { motion } from "framer-motion";

interface IFolderColumnWrapperProps {
  column: FolderColumn;
  color?: string | null;
}

export function FolderColumnWrapper(
  props: Readonly<IFolderColumnWrapperProps>
) {
  const { column, color = "#f97316" } = props;

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
      className="min-w-[240px] flex flex-col gap-6"
    >
      <div className="flex items-center gap-3">
        <div
          className={"bg-primary w-4 h-4 rounded-full"}
          style={{
            backgroundColor: color ?? "#f97316",
          }}
        />
        <h2 className="text-muted-foreground text-sm font-medium uppercase tracking-[2.4px]">
          {column.name} (?)
        </h2>
      </div>
    </motion.div>
  );
}
