import { motion } from "framer-motion";
import { Folder } from "lucide-react";

interface IFolderSelectButtonProps {
  text: string;
}

export function FolderSelectButton(props: Readonly<IFolderSelectButtonProps>) {
  const { text } = props;

  return (
    <motion.li
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
      }}
      className="group w-full flex h-12 rounded-r-3xl px-9 text-muted-foreground text-sm hover:bg-primary hover:text-white transition-all duration-100"
    >
      <button className="w-full h-full flex items-center justify-start gap-2">
        <Folder className="w-5 h-5" />
        {text}
      </button>
    </motion.li>
  );
}
