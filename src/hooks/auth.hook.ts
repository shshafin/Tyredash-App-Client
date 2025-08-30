import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  changePassword,
  loginUser,
  registerUser,
} from "../services/AuthService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import Cookies from "js-cookie";

// ! Register User Hook
export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["REGISTER_USER"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("Registration Successful!");
    },
    onError: (error) => {
      toast.error(error?.message || "Registration Failed!");
    },
  });
};

// ! Login User Hook
export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["LOGIN_USER"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: async (data) => {
      // Save tokens after login using js-cookie
      // Cookies.set("accessToken", data.accessToken, {
      //   secure: true,
      //   sameSite: "strict",
      // });
      // Cookies.set("refreshToken", data.refreshToken, {
      //   secure: true,
      //   sameSite: "strict",
      // });
      toast.success("Login Successful!");
    },
    onError: (error) => {
      toast.error(error?.message || "Login Failed!");
    },
  });
};

export const useChangePassword = ({
  onSuccess,
}: any): UseMutationResult<any, Error> => {
  return useMutation({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (data: any) => await changePassword(data),
    onSuccess,
    onError: (error: any) => {
      toast.error(error.message || "Failed to change password!");
    },
  });
};
