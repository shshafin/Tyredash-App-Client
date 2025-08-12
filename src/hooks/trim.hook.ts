import {
  createTrim,
  deleteTrim,
  getTrims,
  updateTrim,
} from "@/src/services/Trims";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTrim = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_TRIM"],
    mutationFn: async (trimData) => await createTrim(trimData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateTrim = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_TRIM"],
    mutationFn: async (trimData) => await updateTrim(id, trimData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteTrim = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_TRIM"],
    mutationFn: async () => await deleteTrim(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetTrims = (params: any) => {
  return useQuery({
    queryKey: ["GET_TRIMS"],
    queryFn: async () => await getTrims(params),
    suspense: true,
  });
};
