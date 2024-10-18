import { motion } from "framer-motion";
import { faker } from "@faker-js/faker";
import { generateNumberBetween } from "@/shared/helpers/mockup-helper";

export function TaskWrapper() {
  const name = faker.lorem.lines(generateNumberBetween(1, 5));

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
      className="group bg-popover w-full hover:bg-background transition-colors rounded-md shadow-md overflow-hidden border border-border hover:border-primary z-10"
    >
      <button
        type="button"
        className="w-full py-[23px] px-4 flex flex-col cursor-pointer gap-2"
      >
        <p className="text-secondary-foreground font-bold text-[15px] text-start break-words overflow-hidden whitespace-normal group-hover:text-primary transition-colors">
          {name}
        </p>

        <p className="text-muted-foreground font-semibold text-xs text-start">
          0 of 3 substasks
        </p>
      </button>
    </motion.li>
  );
}
