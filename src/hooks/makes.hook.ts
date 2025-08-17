import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createMake,
  deleteMake,
  getMakes,
  updateMake,
} from "../services/Makes";

export const useCreateMake = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_MAKE"],
    mutationFn: async (makeData) => await createMake(makeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateMake = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_MAKE"],
    mutationFn: async (makeData) => await updateMake(id, makeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteMake = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_MAKE"],
    mutationFn: async () => await deleteMake(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetMakes = (params: any) => {
  return useQuery({
    queryKey: ["GET_MAKES"],
    queryFn: async () => await getMakes(params),
  });
};
