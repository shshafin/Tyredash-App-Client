import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/Users";

export const useDeleteUser = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async () => await deleteUser(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async () => await getUsers(),
  });
};

export const useCreateUser = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_USER"],
    mutationFn: async (UserData) => await createUser(UserData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateUser = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (UserData) => await updateUser(id, UserData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};
