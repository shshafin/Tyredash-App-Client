import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { cancelOrder, createOrder, getAllOrders, getSingleOrder, updateOrderStatus } from "../services/Order";


// Query: Get single product by ID
export const useGetSingleOrder = (productId: string | undefined): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["GET_SINGLE_ORDER", productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");
      return await getSingleOrder(productId);
    },
    enabled: !!productId, // controls if the query should run
  });
};
// Mutation: create order
export const useCreateOrder = ({onSuccess}: any):  UseMutationResult<any, Error>=> {
  return useMutation({
    mutationKey: ["CREATE_ORDER"],
    mutationFn: async (order: any) => await createOrder(order),
    onSuccess,
    onError: (error: any) => {
      toast.error(error.message || "Failed to create order!");
    },
  });
};

// Mutation: UPDATE ORDER STATUS
export const useUpdateOrderStatus = (
  {onSuccess} : any
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_ORDER_STATUS"],
    mutationFn: async (item: any) => await updateOrderStatus(item),
    onSuccess: () => {
      toast.success("Order updated successfully");
      queryClient.invalidateQueries({queryKey: ["GET_ORDERS"]});
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update order");
    },
  });
};

// Mutation: CANCEL ORDER
export const useCancelOrder = (
  {id,
  onSuccess} : any
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CANCEL_ORDER"],
    mutationFn: async (item: any) => await cancelOrder(id, item),
    onSuccess: () => {
      toast.success("Order canceled successfully");
      queryClient.invalidateQueries({queryKey: ["GET_ORDERS", id]});
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to cancel order");
    },
  });
};

// Query: Get all orders (e.g., admin)
export const useGetAllOrders = (params: any) => {
  return useQuery({
    queryKey: ["GET_ORDERS", params],
    queryFn: async () => await getAllOrders(params),
  });
};
