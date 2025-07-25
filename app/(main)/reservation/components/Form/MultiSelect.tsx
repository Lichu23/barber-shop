"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ServiceOption } from "@/constants/services";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface Option extends ServiceOption {}

interface Props<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>;
  label: string;
  placeholder?: string;
  error?: FieldErrors<T>;
  disabled?: boolean;
  options: Option[];
}

export const MultiSelectForm = <T extends FieldValues> ({
  name,
  control,
  label,
  placeholder,
  error,
  disabled,
  options,
}: Props<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <Label className="font-bold mb-1" htmlFor={name as string}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between border-pink-200 focus:border-pink-400",
                  error && error[name] ? "border-red-500" : ""
                )}
                disabled={disabled}
              >
                {field.value && field.value.length > 0
                  ? `${field.value.length} servicio${field.value.length > 1 ? "s" : ""} seleccionado${field.value.length > 1 ? "s" : ""}`
                  : placeholder || "Selecciona uno o más servicios"}{" "}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Buscar servicio..." />
                <CommandEmpty>No hay resultados.</CommandEmpty>
                <CommandGroup className="h-[245px] overflow-y-scroll">
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        const selected: string[] = Array.isArray(field.value)
                          ? field.value
                          : field.value
                            ? [field.value]
                            : [];
                        if (selected.includes(option.value)) {
                          field.onChange(
                            selected.filter((v: string) => v !== option.value)
                          );
                        } else {
                          field.onChange([...selected, option.value]);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value && field.value.includes(option.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                       <span>{option.label} - {option.price}€</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {error && error[name] && (
        <p className="text-red-500 text-xs">{error[name]?.message as string}</p>
      )}
    </div>
  );
};
