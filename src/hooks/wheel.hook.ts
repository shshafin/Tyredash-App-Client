import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createWheel,
  deleteWheel,
  getSingleWheel,
  getWheels,
  importCSVWheels,
  updateWheel,
} from "../services/wheels";

export const useCreateWheel = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_WHEEL"],
    mutationFn: async (WheelData) => await createWheel(WheelData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useImportCSVWheels = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["IMPORT_CSV_WHEELS"],
    mutationFn: async (wheelData) => await importCSVWheels(wheelData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateWheel = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_WHEEL"],
    mutationFn: async (WheelData) => await updateWheel(id, WheelData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteWheel = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_WHEEL"],
    mutationFn: async () => await deleteWheel(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetWheels = (params: any) => {
  return useQuery({
    queryKey: ["GET_WHEELS", params],
    queryFn: async () => await getWheels(params),
  });
};
export const useGetSingleWheel = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_WHEEL", id],
    queryFn: () => getSingleWheel(id),
    enabled: !!id, // Only run query when id exists
  });
};
