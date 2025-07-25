import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from "react-hook-form";

  interface Option {
    value: string;
    label: string;
  }

  interface Props<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    error?: FieldErrors<T>;
    disabled?: boolean;
    options: Option[];
  }

  export const SelectForm = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    error,
    disabled,
    options,
  }: Props<T>) => {
    return (
      <div className="flex flex-col">
        <Label className="font-bold text-sm mb-1" htmlFor={name as string}>{label}</Label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              value={
                field.value !== undefined && field.value !== null
                  ? String(field.value)
                  : ""
              }
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger
                id={name}
                className={`border-pink-200 focus:border-pink-400 ${
                  error && error[name] ? "border-red-500" : ""
                }`}
              >
                <SelectValue
                  placeholder={placeholder || "Selecciona una opción"}
                />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {error && error[name] && <p className="text-red-500 text-xs">{error[name]?.message as string}</p>}
      </div>
    );
  };
