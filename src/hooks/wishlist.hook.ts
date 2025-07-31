import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { addItemToWishlist, clearWishlist, getMyWishlist, removeItemFromWishlist } from "../services/Wishlist";

// Query: Get wishlist by user ID
export const useGetMyWishlist = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["GET_WISHLIST"],
    queryFn: async () => {
      return await getMyWishlist();
    },
  });
};
// Mutation: Add item to wishlist
export const useAddItemToWishlist = ({onSuccess}: any):  UseMutationResult<any, Error>=> {

  return useMutation({
    mutationKey: ["ADD_ITEM_TO_WISHLIST"],
    mutationFn: async (item: any) => await addItemToWishlist(item),
    onSuccess,
    onError: (error: any) => {
      toast.error(error.message || "Failed to add item to wishlist");
    },
  });
};

// Mutation: Remove item from wishlist
export const useRemoveItemFromWishlist = (
  {onSuccess} : any
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["REMOVE_ITEM_FROM_WISHLIST"],
    mutationFn: async (item: any) => await removeItemFromWishlist(item),
    onSuccess: () => {
      toast.success("Item removed from wishlist");
      queryClient.invalidateQueries({queryKey: ["GET_WISHLIST"]});
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove item from wishlist");
    },
  });
};

// Mutation: Clear wishlist
export const useClearWishlist = ({onSuccess}: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CLEAR_WISHLIST"],
    mutationFn: () => clearWishlist(),
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({queryKey: ["GET_WISHLIST"]});
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to clear wishlist");
    },
  });
};

