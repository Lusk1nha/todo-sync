import { AnimatePresence, motion } from "framer-motion";
import { createElement } from "react";

type InstructionElement = {
  text: string;
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  className?: string;
};

interface IPageIntroductionProps {
  instructions: InstructionElement[];
}

export function PageIntroduction(props: Readonly<IPageIntroductionProps>) {
  const { instructions } = props;

  function renderInstruction(instruction: InstructionElement) {
    const { text, element, className } = instruction;
    return createElement(element, { key: text, className }, text);
  }

  return (
    <AnimatePresence>
      <motion.div animate={{ opacity: [0, 1] }} className="flex flex-col">
        {instructions.map(renderInstruction)}
      </motion.div>
    </AnimatePresence>
  );
}
