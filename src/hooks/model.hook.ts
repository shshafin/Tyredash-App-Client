import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createModel,
  deleteModel,
  getModels,
  updateModel,
} from "../services/Models";

export const useCreateModel = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_MODEL"],
    mutationFn: async (modelData) => await createModel(modelData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateModel = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_MODEL"],
    mutationFn: async (modelData) => await updateModel(id, modelData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteModel = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_MODEL"],
    mutationFn: async () => await deleteModel(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetModels = (params: any) => {
  return useQuery({
    queryKey: ["GET_MODELS"],
    queryFn: async () => await getModels(params),
  });
};
