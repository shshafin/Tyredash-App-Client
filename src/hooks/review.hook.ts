import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createReview, deleteReview, getAllReviews, getProductReviews, updateReview } from "../services/Review";

export const useGetProductReview = ({id, productType}: any) => {
  return useQuery({
    queryKey: ["PRODUCT_REVIEWS"],
    queryFn: async () => await getProductReviews(id, productType),
  });
};


export const useCreateReview = ({ onSuccess }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["CREATE_REVIEW"],
    mutationFn: async (reviewData) =>
      await createReview(reviewData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateReview = ({ onSuccess}: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["UPDATE_REVIEW"],
    mutationFn: async (data) => await updateReview(data),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteReview = ({ onSuccess }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["DELETE_REVIEW"],
    mutationFn: async (id) => await deleteReview(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetAllReviews = (params: any) => {
  return useQuery({
    queryKey: ["GET_REVIEWS"],
    queryFn: async () => await getAllReviews(params),
  });
};
