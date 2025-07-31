import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createTireDiameter,
  deleteTireDiameter,
  getTireDiameters,
  updateTireDiameter,
} from "../services/TireDiameter";

export const useCreateTireDiameter = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_TIRE_DIAMETER"],
    mutationFn: async (tireDiameterData) =>
      await createTireDiameter(tireDiameterData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateTireDiameter = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_TIRE_DIAMETER"],
    mutationFn: async (tireDiameterData) =>
      await updateTireDiameter(id, tireDiameterData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteTireDiameter = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_TIRE_DIAMETER"],
    mutationFn: async () => await deleteTireDiameter(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetTireDiameters = (params: any) => {
  return useQuery({
    queryKey: ["GET_TIRE_DIAMETER"],
    queryFn: async () => await getTireDiameters(params),
  });
};
