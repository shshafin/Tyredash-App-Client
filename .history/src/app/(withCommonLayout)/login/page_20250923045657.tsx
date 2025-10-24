"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { axiosInstance } from "@/src/lib/AxiosInstance";
import loginValidationSchema from "@/src/schemas/login.schema";
import setAccessToken from "@/src/server-cookie/SetAccessToken";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const { setUser, isSetUser } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  // const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  // console.log(isSuccess);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch(
        "https://api.tiresdash.com/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      await setAccessToken(result.data.accessToken, "accessToken");
      await setAccessToken(result.data.refreshToken, "refreshToken");

      if (response.ok && result.success) {
        setUser(result.data.user);
        toast.success("Login successful!");

        // redirect + reload
        // window.location.href = "/";
        router.push(redirect || "/");
      } else {
        toast.error(result.message || "Login failed!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   handleUserLogin(data);
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     router.push((redirect as string) || "/");
  //   }
  // }, [isSuccess, redirect, router]);

  return (
    <>
      {/* {isPending && <Loading />} */}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4">
        <h3 className="my-2 text-2xl font-bold">Login with TiresDash</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-full max-w-md">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}>
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

            {/* 🔹 Forgot password link */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit">
              Login
            </Button>
          </FXForm>

          <div className="text-center mt-2">
            Don&lsquo;t have an account?{" "}
            <Link
              href={"/register"}
              className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
