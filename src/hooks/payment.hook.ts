import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPayment, getSinglePayment, verifyPaypalPayment, verifyStripePayment } from "../services/Payment";

// Mutation: create payment
export const useCreatePayment = ({onSuccess, onError}: any):  UseMutationResult<any, Error>=> {
  return useMutation({
    mutationKey: ["CREATE_PAYMENT"],
    mutationFn: async (payment: any) => await createPayment(payment),
    onSuccess,
    onError: onError ? onError: (error: any) => {
      toast.error(error.message || "Failed to create payment!");
    },
  });
};

export const useGetSinglePayment = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_PAYMENT", id],
    queryFn: async () => await getSinglePayment(id),
    enabled: !!id, // Only run query when id exists
  });
};

export const useVerifyStripePayment = ({onSuccess, onError}: any):  UseMutationResult<any, Error>=> {
  return useMutation({
    mutationKey: ["VERIFY_STRIPE_PAYMENT"],
    mutationFn: async (payment: any) => await verifyStripePayment(payment),
    onSuccess,
    onError: onError ? onError : (error: any) => {
      toast.error(error.message || "Failed to verify stripe payment!");
    },
  });
};

export const useVerifyPaypalPayment = ({onSuccess}: any):  UseMutationResult<any, Error>=> {
  return useMutation({
    mutationKey: ["VERIFY_PAYPAL_PAYMENT"],
    mutationFn: async (payment: any) => await verifyPaypalPayment(payment),
    onSuccess,
    onError: (error: any) => {
      toast.error(error.message || "Failed to verify paypal payment!");
    },
  });
};
