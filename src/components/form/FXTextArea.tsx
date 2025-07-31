"use client";

import { IInput } from "@/src/types";
import { Input, Textarea } from "@heroui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {
  type?: string;
}

export default function FXTextArea({
  name,
  label,
  variant = "bordered",
  defaultValue = "",
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={6}
      variant={variant}
      defaultValue={defaultValue}
    />
  );
}
