import { motion } from "framer-motion";
import { Folder } from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { generateFolderRedirect } from "@/shared/helpers/folders-helper";
import { cn } from "@/lib/utils";
import { FolderPageParams } from "@/shared/types";

interface IFolderSelectButtonProps {
  id: string;
  text: string;

  description: string | null | undefined;
}

export function FolderSelectButton(props: Readonly<IFolderSelectButtonProps>) {
  const { id, text, description } = props;
  const { folderId } = useParams<FolderPageParams>();

  const isActiveFolder = folderId === id;

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
        className={cn(
          "group w-full flex min-h-10 h-10 rounded-r-3xl px-9 text-muted-foreground text-sm hover:bg-primary hover:text-secondary transition-all duration-100",
          isActiveFolder && "bg-foreground text-secondary"
        )}
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
