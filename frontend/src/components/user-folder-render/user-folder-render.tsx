import { AnimatePresence, motion } from "framer-motion";
import { FolderSelectButton } from "./folder-select-button";
import { CreateFolderButton } from "./create-folder-button";
import { FolderSheet } from "../sheets/folder-sheet";
import { useState } from "react";

export function UserFolderRender() {
  const [open, setOpen] = useState(false);

  const sets = [
    "Inbox",
    "Today",
    "Next 7 Days",
    "Projects",
    "Tags",
    "Filters",
    "Archive",
    "Trash",
  ];

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs tracking-widest text-muted-foreground uppercase px-9">
        Pastas (8)
      </h2>

      <AnimatePresence>
        <motion.ul
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
          className="flex flex-col pr-6"
        >
          {sets.map((set) => (
            <FolderSelectButton key={set} text={set} />
          ))}

          <CreateFolderButton onClick={() => setOpen((prev) => !prev)} />
        </motion.ul>
      </AnimatePresence>

      <FolderSheet open={open} setOpen={setOpen} />
    </section>
  );
}
