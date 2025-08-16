import { FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  type?: string;
  error?: FieldError;
};

export const FormInput = ({
  label,
  name,
  register,
  placeholder,
  type = "text",
  error,
}: FormInputProps) => (
  <div>
    <label htmlFor={label} className="block font-bold mb-1">
      {label}
    </label>
    <input
      id={label}
      type={type}
      className="border rounded-xl px-3 py-2 w-full "
      placeholder={placeholder}
      {...register(name)}
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);
