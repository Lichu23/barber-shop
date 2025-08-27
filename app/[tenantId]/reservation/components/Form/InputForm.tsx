import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldErrors<T>;
  placeholder?: string;
  disabled: boolean;
}

export const InputForm = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  error,
  placeholder,
  disabled,
}: Props<T>) => {
  return (
    <div className="flex flex-col">
      <Label className="font-bold mb-1" htmlFor={name as string}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            disabled={disabled}
            id={name}
            type={type}
            placeholder={placeholder}
            {...field}
            className={`${
              error ? "border border-red-500" : ""
            }  border-primary/20 focus:border-primary/90`}
          />
        )}
      />
      {error && error[name] && (
        <p className="text-red-500 text-xs">{error[name]?.message as string}</p>
      )}
    </div>
  );
};
