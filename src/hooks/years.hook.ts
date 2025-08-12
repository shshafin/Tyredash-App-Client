import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createYear,
  deleteYear,
  getYears,
  updateYear,
} from "../services/Years";

export const useCreateYear = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_YEAR"],
    mutationFn: async (yearData) => await createYear(yearData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateYear = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_YEAR"],
    mutationFn: async (yearData) => await updateYear(id, yearData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteYear = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_YEAR"],
    mutationFn: async () => await deleteYear(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetYears = (params: any) => {
  return useQuery({
    queryKey: ["GET_YEARS"],
    queryFn: async () => await getYears(params),
    suspense: true,
  });
};
