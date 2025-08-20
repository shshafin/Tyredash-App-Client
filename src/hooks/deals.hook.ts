import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  applyDealToTire,
  applyDealToWheel,
  applyDealToProduct,
  createDeal,
  getDiscountedTiresByBrand,
  getDiscountedWheelsByBrand,
  getDiscountedProductsByBrand,
  getAllDeals,
  getSingleDeal,
  updateDeal,
  deleteDeal,
} from "@/src/services/Deals";

// Get discounted Tires by Brand
export const useGetDiscountedTiresByBrand = (brandId: string) => {
  return useQuery({
    queryKey: ["GET_DISCOUNTED_TIRES_BY_BRAND", brandId],
    queryFn: async () => await getDiscountedTiresByBrand(brandId),
  });
};

// Get discounted Wheels by Brand
export const useGetDiscountedWheelsByBrand = (brandId: string) => {
  return useQuery({
    queryKey: ["GET_DISCOUNTED_WHEELS_BY_BRAND", brandId],
    queryFn: async () => await getDiscountedWheelsByBrand(brandId),
  });
};

// Get discounted Products by Brand
export const useGetDiscountedProductsByBrand = (brandId: string) => {
  return useQuery({
    queryKey: ["GET_DISCOUNTED_PRODUCTS_BY_BRAND", brandId],
    queryFn: async () => await getDiscountedProductsByBrand(brandId),
  });
};

// Apply deal to a Tire
export const useApplyDealToTire = ({ onSuccess, tireId }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["APPLY_DEAL_TO_TIRE"],
    mutationFn: async (dealData) => await applyDealToTire(tireId, dealData),
    onError: (error) => toast.error(error?.message),
    onSuccess,
  });
};

// Apply deal to a Wheel
export const useApplyDealToWheel = ({ onSuccess, wheelId }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["APPLY_DEAL_TO_WHEEL"],
    mutationFn: async (dealData) => await applyDealToWheel(wheelId, dealData),
    onError: (error) => toast.error(error?.message),
    onSuccess,
  });
};

// Apply deal to a Product
export const useApplyDealToProduct = ({ onSuccess, productId }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["APPLY_DEAL_TO_PRODUCT"],
    mutationFn: async (dealData) => await applyDealToProduct(productId, dealData),
    onError: (error) => toast.error(error?.message),
    onSuccess,
  });
};

// Create a new deal
export const useCreateDeal = ({ onSuccess }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["CREATE_DEAL"],
    mutationFn: async (dealData) => await createDeal(dealData),
    onError: (error) => toast.error(error?.message),
    onSuccess,
  });
};

// Get discounted Products by Brand
export const useGetAllDeals = () => {
  return useQuery({
    queryKey: ["GET_ALL_DEALS"],
    queryFn: async () => await getAllDeals(),
  });
};

// Get discounted Tires by Brand
export const useGetSingleDeal = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_DEAL", id],
    queryFn: async () => await getSingleDeal(id),
  });
};

// Update a deal
export const useUpdateDeal = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["UPDATE_DEAL"],
    mutationFn: async (dealData) => await updateDeal(id, dealData),
    onError: (error) => toast.error(error?.message),
    onSuccess,
  });
};

// Delete a deal
export const useDeleteDeal = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["DELETE_DEAL"],
    mutationFn: async () => await deleteDeal(id),
    onError: (error) => toast.error(error?.message),
    onSuccess,
  });
};
