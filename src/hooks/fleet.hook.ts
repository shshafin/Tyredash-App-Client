import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteFleetUser,
  getFleetUsers,
  getSingleFleetUsers,
  updateFleetUser,
} from "../services/Fleet";

export const useDeleteFleetUser = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_FLEET_USER"],
    mutationFn: async () => await deleteFleetUser(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetFleetUsers = () => {
  return useQuery({
    queryKey: ["GET_FLEET_USERS"],
    queryFn: async () => await getFleetUsers(),
  });
};

export const useGetFleetUser = ({ id }: any) => {
  return useQuery({
    queryKey: ["GET_FLEET_USER"],
    queryFn: async () => await getSingleFleetUsers(id),
  });
};

export const useUpdateFleetUser = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_FLEET_USER"],
    mutationFn: async (UserData) => await updateFleetUser(id, UserData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};
