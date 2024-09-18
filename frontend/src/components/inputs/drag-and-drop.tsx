import { ImageUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type DragAndDropStrings = {
  dragAndDrop?: string;
  dragAndDropDescription?: string;
};

interface IDragAndDropProps {
  icon?: React.ReactNode;

  strings?: DragAndDropStrings;
}

export function DragAndDrop(props: Readonly<IDragAndDropProps>) {
  const {
    icon,
    strings = {
      dragAndDrop: "Drag and drop or click to browse",
      dragAndDropDescription:
        "Image must be at least 40x40px and smaller than 5MB",
    },
  } = props;

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 0.15 }}
        whileHover={{
          borderColor: "hsl(var(--primary))",
          background: "hsl(var(--accent))",
        }}
        className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center select-none"
      >
        <div className="flex items-center justify-center rounded-lg">
          {icon ?? <ImageUp className="w-8 h-8" />}
        </div>

        <span className="text-sm font-medium text-muted-foreground">
          {strings.dragAndDrop}
        </span>

        <span className="text-xs text-muted-foreground">
          {strings.dragAndDropDescription}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
