"use client";

import { IInput } from "@/src/types";
import { Input } from "@heroui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}

export default function FXInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  isClearable = true,
  defaultValue = "",
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Get the error message (handle nested errors like body.password if needed)
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      <Input
        {...register(name)}
        variant={variant}
        size={size}
        required={required}
        type={type}
        label={label}
        isClearable={isClearable}
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
      />
    </div>
  );
}
