import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
  clearCart,
  getAllCarts,
} from "../services/Cart";

// Query: Get cart by user ID
export const useGetCartByUserId = (userId: string | undefined): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["GET_CART", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      return await getCartByUserId(userId);
    },
    enabled: !!userId, // controls if the query should run
  });
};
// Mutation: Add item to cart
export const useAddItemToCart = ({userId, onSuccess}: any):  UseMutationResult<any, Error>=> {
  // if(!userId){
  //   toast.error("Please login first!");
  //   throw new Error("Login required");;
  // }
  return useMutation({
    mutationKey: ["ADD_ITEM_TO_CART"],
    mutationFn: async (item: any) => await addItemToCart(userId, item),
    onSuccess,
    onError: (error: any) => {
      toast.error(error.message || "Failed to add item to cart");
    },
  });
};

// Mutation: Remove item from cart
export const useRemoveItemFromCart = (
  {userId,
  onSuccess} : any
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["REMOVE_ITEM_FROM_CART"],
    mutationFn: async (item: any) => await removeItemFromCart(userId, item),
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({queryKey: ["GET_CART", userId]});
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove item from cart");
    },
  });
};

// Mutation: Update cart item
export const useUpdateCartItem = (
  {userId,
  onSuccess} : any
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_CART_ITEM"],
    mutationFn: async (item: any) => await updateCartItem(userId, item),
    onSuccess: () => {
      toast.success("Quantity updated");
      queryClient.invalidateQueries({queryKey: ["GET_CART", userId]});
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update quantity");
    },
  });
};

// Mutation: Clear cart
export const useClearCart = ({userId, onSuccess}: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CLEAR_CART"],
    mutationFn: () => clearCart(userId),
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({queryKey: ["GET_CART", userId]});
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to clear cart");
    },
  });
};

// Query: Get all carts (e.g., admin)
export const useGetAllCarts = (params: any) => {
  return useQuery({
    queryKey: ["GET_ALL_CARTS", params],
    queryFn: () => getAllCarts(params),
  });
};
