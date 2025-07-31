import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createTireRatio,
  deleteTireRatio,
  getTireRatios,
  updateTireRatio,
} from "../services/TireRatio";

export const useCreateTireRatio = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_TIRE_RATIO"],
    mutationFn: async (tireRatioData) =>
      await createTireRatio(tireRatioData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateTireRatio = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_TIRE_RATIO"],
    mutationFn: async (tireRatioData) =>
      await updateTireRatio(id, tireRatioData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteTireRatio = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_TIRE_RATIO"],
    mutationFn: async () => await deleteTireRatio(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetTireRatios = (params: any) => {
  return useQuery({
    queryKey: ["GET_TIRE_RATIO"],
    queryFn: async () => await getTireRatios(params),
  });
};
