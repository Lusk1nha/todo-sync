import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ListTodo } from "lucide-react";

interface ILogoMarkProps {
  className?: string;
  isPulsing?: boolean;
}

export function LogoMark(props: Readonly<ILogoMarkProps>) {
  const { className, isPulsing = false } = props;

  if (isPulsing) {
    return (
      <motion.div
        className={cn(
          "text-primary flex items-center gap-2 text-2xl lg:text-3xl",
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        animate={{ opacity: [0, 1] }}
      >
        <ListTodo className="w-6 h-6 md:w-8 md:h-8" />
        <h1 className="font-bold">
          <span>Todo</span> Sync
        </h1>
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "text-primary flex items-center gap-2 text-2xl lg:text-3xl",
        className
      )}
    >
      <ListTodo className="w-6 h-6 md:w-8 md:h-8" />
      <h1 className="font-bold">
        <span>Todo</span> Sync
      </h1>
    </div>
  );
}
