import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createWheelWidthType,
  deleteWheelWidthType,
  getWheelWidthTypes,
  updateWheelWidthType,
} from "../services/WheelWidthType";

export const useCreateWheelWidthType = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_WHEEL_WIDTH_TYPES"],
    mutationFn: async (wheelWidthTypeData) =>
      await createWheelWidthType(wheelWidthTypeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateWheelWidthType = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_WHEEL_WIDTH_TYPES"],
    mutationFn: async (wheelWidthTypeData) =>
      await updateWheelWidthType(id, wheelWidthTypeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteWheelWidthType = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_WHEEL_WIDTH_TYPES"],
    mutationFn: async () => await deleteWheelWidthType(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetWheelWidthTypes = (params: any) => {
  return useQuery({
    queryKey: ["GET_WHEEL_WIDTH_TYPES"],
    queryFn: async () => await getWheelWidthTypes(params),
  });
};
