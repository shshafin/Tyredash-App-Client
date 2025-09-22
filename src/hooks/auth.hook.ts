import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  changePassword,
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../services/AuthService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

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
    onSuccess: () => {
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

export const useForgotPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FORGOT_PASSWORD"],
    mutationFn: async (userData) => await forgotPassword(userData),
    onSuccess: (data) => {
      toast.success(data?.message || "Password reset link sent to your email!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to send password reset link!");
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, { newPassword: string; token: string }>({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async ({ newPassword, token }) =>
      await resetPassword(newPassword, token),
    onSuccess: (data) => {
      toast.success(data?.message || "Password has been reset successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to reset password!");
    },
  });
};
