import { getErrorsAsList } from "@/shared/helpers/form-helper";
import { motion, AnimatePresence } from "framer-motion";
import { FieldErrors, FieldValues } from "react-hook-form";

interface IRenderErrorListProps<T extends FieldValues> {
  errors: FieldErrors<T>;
}

export function RenderErrorList<T extends FieldValues>(
  props: Readonly<IRenderErrorListProps<T>>
) {
  const { errors } = props;

  const errorList = getErrorsAsList(errors);

  if (errorList.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col gap-2 mt-2 py-2"
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
      >
        <h5 className="text-base font-medium text-destructive">Erros</h5>

        <ul className="text-sm text-destructive flex flex-col gap-2">
          {errorList.map((error) => (
            <motion.li
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                },
              }}
              key={error.key}
            >
              {error.message}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}
