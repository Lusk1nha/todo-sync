import { motion } from "framer-motion";
import { Folder } from "lucide-react";

import { Link } from "react-router-dom";
import { generateFolderRedirect } from "@/shared/helpers/folders-helper";

interface IFolderSelectButtonProps {
  id: string;
  text: string;

  description: string | null | undefined;
}

export function FolderSelectButton(props: Readonly<IFolderSelectButtonProps>) {
  const { id, text, description } = props;

  return (
    <Link to={generateFolderRedirect(id)}>
      <motion.li
        data-guid-id={id}
        data-description={description}
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
          },
        }}
        className="group w-full flex min-h-10 h-10 rounded-r-3xl px-9 text-muted-foreground text-sm hover:bg-primary hover:text-white transition-all duration-100"
      >
        <button
          type="button"
          className="w-full h-full flex items-center justify-start gap-2"
        >
          <div className="w-5 h-5">
            <Folder className="w-5 h-5" />
          </div>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            {text}
          </div>
        </button>
      </motion.li>
    </Link>
  );
}
