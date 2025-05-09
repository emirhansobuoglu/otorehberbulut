"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  placeholder: string;
  disabled?: boolean;
  type: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  value?: string;
}
const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  disabled,
  type,
  required,
  register,
  errors,
  value,
}) => {
  return (
    <input
      className={`my-3 h-12 w-full rounded-2xl bg-white p-3 text-slate-600 outline-none ${errors[id] ? "border border-red-500" : "border border-slate-300"}`}
      id={id}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      value={value}
      {...register(id, { required })}
      autoComplete="off"
    />
  );
};

export default Input;
