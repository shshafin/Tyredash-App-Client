import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createVehicleType,
  deleteVehicleType,
  getVehicleTypes,
  updateVehicleType,
} from "../services/VehicleType";

export const useCreateVehicleType = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_VEHICLE_TYPES"],
    mutationFn: async (vehicleTypeData) =>
      await createVehicleType(vehicleTypeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateVehicleType = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_VEHICLE_TYPES"],
    mutationFn: async (vehicleTypeData) =>
      await updateVehicleType(id, vehicleTypeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteVehicleType = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_VEHICLE_TYPES"],
    mutationFn: async () => await deleteVehicleType(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetVehicleTypes = (params: any) => {
  return useQuery({
    queryKey: ["GET_VEHICLE_TYPES"],
    queryFn: async () => await getVehicleTypes(params),
  });
};
