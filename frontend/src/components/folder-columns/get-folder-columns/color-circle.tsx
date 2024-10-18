import { ColorToast } from "@/components/toasts";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface IColorCircleProps {
  color: string;
}

export function ColorCircle(props: Readonly<IColorCircleProps>) {
  const { color } = props;

  const { toast } = useToast();

  function onCopyColor() {
    toast({
      title: "Cor copiada",
      variant: "default",
      description: <ColorToast color={color} />,
      duration: 2000,
    });

    navigator.clipboard.writeText(color);
  }

  return (
    <AnimatePresence>
      <motion.div
        className={
          "bg-primary w-4 h-4 rounded-full flex items-center justify-center cursor-pointer hover:border hover:border-primary transition-colors"
        }
        style={{
          backgroundColor: color,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button type="button" className="w-full h-full" onClick={onCopyColor} />
      </motion.div>
    </AnimatePresence>
  );
}
