import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createFleetNews, deleteFleetNews, updateFleetNews } from "../services/News";

export const useCreateFleetNews = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_FLEET_NEWS"],
    mutationFn: async (newsData) => await createFleetNews(newsData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateFleetNews = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_FLEET_NEWS"],
    mutationFn: async (newsData) => await updateFleetNews(newsData, id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteFleetNews = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_FLEET_NEWS"],
    mutationFn: async () => await deleteFleetNews(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};
