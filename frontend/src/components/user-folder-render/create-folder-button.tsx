import { FolderPlus } from "lucide-react";
import { motion } from "framer-motion";

type CreateFolderStrings = {
  text: string;
};

interface ICreateFolderButtonProps {
  strings?: CreateFolderStrings;
  onClick?: () => void;
}

export function CreateFolderButton(props: Readonly<ICreateFolderButtonProps>) {
  const {
    strings = {
      text: "Adicionar nova pasta",
    },
    onClick,
  } = props;

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
      }}
      className="w-full flex h-12 rounded-r-3xl px-9 text-sm text-primary transition-all duration-100"
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full h-full flex items-center justify-start gap-2"
      >
        <FolderPlus className="w-5 h-5" />
        {strings.text}
      </button>
    </motion.div>
  );
}
