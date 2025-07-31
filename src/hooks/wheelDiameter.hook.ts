import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createWheelDiameter,
  deleteWheelDiameter,
  getWheelDiameters,
  updateWheelDiameter,
} from "../services/WheelDiameter";

export const useCreateWheelDiameter = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_WHEEL_DIAMETER"],
    mutationFn: async (wheelDiameterData) =>
      await createWheelDiameter(wheelDiameterData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateWheelDiameter = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_WHEEL_DIAMETER"],
    mutationFn: async (wheelDiameterData) =>
      await updateWheelDiameter(id, wheelDiameterData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteWheelDiameter = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_WHEEL_DIAMETER"],
    mutationFn: async () => await deleteWheelDiameter(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetWheelDiameters = (params: any) => {
  return useQuery({
    queryKey: ["GET_WHEEL_DIAMETER"],
    queryFn: async () => await getWheelDiameters(params),
  });
};
