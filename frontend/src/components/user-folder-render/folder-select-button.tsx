import { motion } from "framer-motion";
import { Folder } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
      className="group w-full flex min-h-10 h-10 rounded-r-3xl px-9 text-muted-foreground text-sm hover:bg-primary hover:text-white transition-all duration-100"
    >
      <Tooltip disableHoverableContent>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent sideOffset={50} side="right">
          {text}
        </TooltipContent>
      </Tooltip>
    </motion.li>
  );
}
