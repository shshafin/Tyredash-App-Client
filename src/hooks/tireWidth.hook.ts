import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createTireWidth,
  deleteTireWidth,
  getTireWidths,
  updateTireWidth,
} from "../services/TireWidth";

export const useCreateTireWidth = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_TIRE_WIDTH"],
    mutationFn: async (tireWidthData) =>
      await createTireWidth(tireWidthData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateTireWidth = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_TIRE_WIDTH"],
    mutationFn: async (tireWidthData) =>
      await updateTireWidth(id, tireWidthData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteTireWidth = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_TIRE_WIDTH"],
    mutationFn: async () => await deleteTireWidth(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetTireWidths = (params: any) => {
  return useQuery({
    queryKey: ["GET_TIRE_WIDTH"],
    queryFn: async () => await getTireWidths(params),
  });
};
