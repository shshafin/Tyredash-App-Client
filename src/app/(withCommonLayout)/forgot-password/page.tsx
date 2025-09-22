"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useForgotPassword } from "@/src/hooks/auth.hook";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

const ForgotPassword = () => {
  const { mutate: handleForgotPassword, isPending } = useForgotPassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleForgotPassword(data); // directly pass data
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 h-[calc(100vh-100px)]">
      <h3 className="my-2 text-2xl font-bold">Forgot Password</h3>
      <p className="mb-4">Enter your email to receive a reset link</p>
      <div className="w-full max-w-3xl">
        <FXForm onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="py-2">
              <FXInput
                name="email"
                label="Email"
                type="email"
                required
              />
            </div>
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
            isDisabled={isPending}>
            {isPending ? "Sending..." : "Submit"}
          </Button>
        </FXForm>
      </div>
    </div>
  );
};

export default ForgotPassword;
