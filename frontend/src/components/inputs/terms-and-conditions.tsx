import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TermsAndConditionsStrings {
  acceptTerms?: string;
  termsAndConditions?: string;
}

interface ITermsAndConditionsFieldProps {
  name: string;

  onChange: (checked: boolean) => void;
  value?: boolean;
  onBlur?: () => void;
  disabled?: boolean;

  strings?: TermsAndConditionsStrings;
}

export function TermsAndConditionsField(
  props: Readonly<ITermsAndConditionsFieldProps>
) {
  const {
    name,
    onChange,
    value,
    onBlur,
    disabled,
    strings = {
      acceptTerms: "Aceitar termos e condições",
      termsAndConditions: "Você concorda com os termos e condições do serviço?",
    },
  } = props;

  const [checked, setChecked] = useState(value ?? false);

  function handleCheck(checked: boolean): void {
    setChecked(checked);
    onChange(checked);
  }

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 0.15 }}
        className="items-top flex space-x-2"
      >
        <Checkbox
          className="hover:bg-accent"
          name={name}
          checked={checked}
          onCheckedChange={handleCheck}
          onBlur={onBlur}
          disabled={disabled}
        />

        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {strings.acceptTerms}
          </label>

          <p className="text-xs text-muted-foreground">
            {strings.termsAndConditions}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
