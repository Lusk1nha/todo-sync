"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IDatePickerProps {
  value: Date | undefined;

  onChange: (date: Date | undefined) => void;
  onBlur?: () => void;
  placeholder?: string;

  min?: Date;
  max?: Date;

  disabled?: boolean;
}

export function DatePicker(props: Readonly<IDatePickerProps>) {
  const {
    value,
    onChange,
    onBlur,
    placeholder = "Selecione uma data",
    min,
    max,
    disabled,
  } = props;

  const [date, setDate] = React.useState<Date | undefined>(value);

  function handleSelect(date: Date | undefined): void {
    if (disabled) return;

    setDate(date);
    onChange(date);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "pl-3 text-left font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            !date && "text-muted-foreground"
          )}
          onBlur={onBlur}
          disabled={disabled}
        >
          {date ? (
            format(date, "PPP", { locale: ptBR })
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
          locale={ptBR}
          fromDate={min}
          toDate={max}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
