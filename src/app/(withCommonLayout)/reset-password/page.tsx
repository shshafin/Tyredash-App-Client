"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useResetPassword } from "@/src/hooks/auth.hook";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ResetPasswordPage = () => {
  const {
    mutate: handleResetPassword,
    isSuccess,
    isPending,
  } = useResetPassword();

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!token) {
      return; // no token in URL
    }
    handleResetPassword({
      newPassword: data.newPassword,
      token,
    });
  };

  // redirect after success
  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess, router]);

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 h-[calc(100vh-100px)]">
      <h3 className="my-2 text-2xl font-bold">Reset Password</h3>
      <p className="mb-4">Enter your new password below</p>
      <div className="w-full max-w-md">
        <FXForm onSubmit={onSubmit}>
          <div className="py-2">
            <FXInput
              name="newPassword"
              label="New Password"
              type="password"
              required
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
            isDisabled={isPending}>
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </FXForm>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
