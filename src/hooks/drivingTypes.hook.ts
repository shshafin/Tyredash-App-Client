import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createDrivingType,
  deleteDrivingType,
  getDrivingTypes,
  updateDrivingType,
} from "../services/DrivingTypes";

export const useCreateDrivingType = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_DRIVING_TYPES"],
    mutationFn: async (drivingTypeData) =>
      await createDrivingType(drivingTypeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateDrivingType = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_DRIVING_TYPES"],
    mutationFn: async (drivingTypeData) =>
      await updateDrivingType(id, drivingTypeData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteDrivingType = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_DRIVING_TYPES"],
    mutationFn: async () => await deleteDrivingType(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetDrivingTypes = () => {
  return useQuery({
    queryKey: ["GET_DRIVING_TYPES"],
    queryFn: async () => await getDrivingTypes(),
    suspense: true,
  });
};
