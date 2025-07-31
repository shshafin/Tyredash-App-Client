"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.hook";
import loginValidationSchema from "@/src/schemas/login.schema";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const LoginPage = () => {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    userLoading(true);
    handleUserLogin(data);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push((redirect as string) || "/");
    }
  }, [isSuccess, redirect, router]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4">
        <h3 className="my-2 text-2xl font-bold">Login with TyreDash</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-full max-w-md">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="py-3">
              <FXInput
                name="email"
                label="Email"
                type="email"
                required={true}
                isClearable={true}
              />
            </div>
            <div className="py-3">
              <FXInput
                name="password"
                label="Password"
                type="password"
                required={true}
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </FXForm>

          <div className="text-center">
            Don&lsquo;t have an account?{" "}
            <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
