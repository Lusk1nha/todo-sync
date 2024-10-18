import { motion } from "framer-motion";

import {
  generateArray,
  generateNumberBetween,
} from "@/shared/helpers/mockup-helper";
import { TaskWrapper } from "./task-wrapper";

export function TaskRender() {
  return (
    <div className="h-full">
      <motion.ul
        variants={{
          visible: {
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.05,
            },
          },
        }}
        className="h-full flex flex-col gap-y-5"
      >
        {generateArray(generateNumberBetween(0, 10)).map((_, index) => (
          <TaskWrapper key={`teste` + index} />
        ))}
      </motion.ul>
    </div>
  );
}
