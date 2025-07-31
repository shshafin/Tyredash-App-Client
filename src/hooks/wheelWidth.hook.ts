import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createWheelWidth,
  deleteWheelWidth,
  getWheelWidths,
  updateWheelWidth,
} from "../services/WheelWidth";

export const useCreateWheelWidth = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_WHEEL_WIDTH"],
    mutationFn: async (wheelWidthData) =>
      await createWheelWidth(wheelWidthData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateWheelWidth = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_WHEEL_WIDTH"],
    mutationFn: async (wheelWidthData) =>
      await updateWheelWidth(id, wheelWidthData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteWheelWidth = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_WHEEL_WIDTH"],
    mutationFn: async () => await deleteWheelWidth(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetWheelWidths = (params: any) => {
  return useQuery({
    queryKey: ["GET_WHEEL_WIDTH"],
    queryFn: async () => await getWheelWidths(params),
  });
};
