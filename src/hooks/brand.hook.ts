import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../services/brands";

export const useCreateBrand = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_BRAND"],
    mutationFn: async (BrandData) => await createBrand(BrandData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateBrand = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_BRAND"],
    mutationFn: async (BrandData) => await updateBrand(id, BrandData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteBrand = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_BRAND"],
    mutationFn: async () => await deleteBrand(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetBrands = (params: any) => {
  return useQuery({
    queryKey: ["GET_BRANDS"],
    queryFn: async () => await getBrands(params),
  });
};
