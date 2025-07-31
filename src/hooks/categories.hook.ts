import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/Categories";
import { toast } from "sonner";

export const useCreateCategory = ({ onSuccess = () => {} }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (categoryData) => await createCategory(categoryData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateCategory = ({ onSuccess = () => {}, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_CATEGORY"],
    mutationFn: async (categoryData) => await updateCategory(id, categoryData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteCategory = ({ onSuccess = () => {}, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: async () => await deleteCategory(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetCategories = (params: any) => {
  return useQuery({
    queryKey: ["GET_CATEGORIES"],
    queryFn: async () => await getCategories(params),
  });
};
