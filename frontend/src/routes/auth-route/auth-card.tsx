import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/logo-mark/logo-mark";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DevText } from "@/components/utilities/dev-text/dev-text";

interface IAuthCardProps {
  title?: string;
  children: React.ReactNode;
}

export function AuthCard(props: Readonly<IAuthCardProps>) {
  const { title, children } = props;

  return (
    <AnimatePresence>
      <motion.div
        id="auth-card"
        className="max-w-[460px] w-full flex flex-col items-center justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <LogoMark isPulsing />

        <Card className="w-full">
          <CardHeader>{title && <CardTitle>{title}</CardTitle>}</CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter className="flex items-center justify-center text-center">
            <div className="text-xs font-medium">
              Developed by <DevText>Lucas Pedro</DevText>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
