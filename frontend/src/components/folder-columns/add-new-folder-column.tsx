import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface IAddNewFolderColumnProps {
  className?: string;
  onClick?: () => void;
}

export function AddNewFolderColumn(props: Readonly<IAddNewFolderColumnProps>) {
  const { className, onClick } = props;

  return (
    <motion.button
      type="button"
      className={cn(
        "bg-gradient-to-tl from-gradient-left to-gradient-right w-[280px] flex items-center justify-center gap-1 text-secondary font-bold text-lg p-4 rounded-md",
        className
      )}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      <Plus className="w-6 h-6" /> Nova Coluna
    </motion.button>
  );
}
