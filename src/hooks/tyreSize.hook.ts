import {
  createTyreSize,
  deleteTyreSize,
  getFilteredTyreSizes,
  getTyreSizes,
  updateTyreSize,
} from "@/src/services/TyreSize";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTyreSize = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_TYRE_SIZE"],
    mutationFn: async (tyreSizeData) => await createTyreSize(tyreSizeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateTyreSize = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_TYRE_SIZE"],
    mutationFn: async (tyreSizeData) => await updateTyreSize(id, tyreSizeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteTyreSize = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_TYRE_SIZE"],
    mutationFn: async () => await deleteTyreSize(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetTyreSizes = (params: any) => {
  return useQuery({
    queryKey: ["GET_TYRE_SIZES"],
    queryFn: async () => await getTyreSizes(params),
  });
};

export const useGetFilteredTyreSizes = (
  yearId: string,
  makeId: string,
  modelId: string,
  trimId: string,
) => {
  return useQuery({
    queryKey: ["GET_FILTERED_TYRE_SIZES", yearId, makeId, modelId, trimId],
    queryFn: async () =>
      await getFilteredTyreSizes(yearId, makeId, modelId, trimId),
    enabled: !!yearId && !!makeId && !!modelId && !!trimId, // Only fetch when all IDs exist
  });
};
