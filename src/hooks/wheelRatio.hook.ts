import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createWheelRatio,
  deleteWheelRatio,
  getWheelRatios,
  updateWheelRatio,
} from "../services/WheelRatio";

export const useCreateWheelRatio = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_WHEEL_RATIO"],
    mutationFn: async (wheelRatioData) =>
      await createWheelRatio(wheelRatioData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateWheelRatio = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_WHEEL_RATIO"],
    mutationFn: async (wheelRatioData) =>
      await updateWheelRatio(id, wheelRatioData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteWheelRatio = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_WHEEL_RATIO"],
    mutationFn: async () => await deleteWheelRatio(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetWheelRatios = (params: any) => {
  return useQuery({
    queryKey: ["GET_WHEEL_RATIO"],
    queryFn: async () => await getWheelRatios(params),
  });
};
