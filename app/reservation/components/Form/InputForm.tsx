import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormValues } from "@/schema/reservationSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldErrors;
  placeholder?: string
}

export const InputForm = ({ name, control, label, type, error, placeholder }: Props) => {
  return (
    <div className="flex flex-col">
      <Label className="font-bold" htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            {...field}
            className={`${
              error ? "border border-red-500" : ""
            }  border-pink-200 focus:border-pink-400`}
          />
        )}
      />
      {error && error[name] && <p className="text-red-500 text-xs">{error[name]?.message as string}</p>}

    </div>
  );
};

