import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createContact,
  deleteContact,
  getContacts,
  getSingleContact,
  updateContact,
} from "../services/Contact";

export const useCreateContact = ({ onSuccess }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["CREATE_CONTACT"],
    mutationFn: async (ContactData) => await createContact(ContactData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateContact = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_CONTACT"],
    mutationFn: async (ContactData) => await updateContact(id, ContactData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};
export const useGetSingleContact = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_CONTACT", id],
    queryFn: async () => await getSingleContact(id),
    enabled: !!id, // Only run query when id exists
  });
};

export const useDeleteContact = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_CONTACT"],
    mutationFn: async () => await deleteContact(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetContacts = (params: any) => {
  return useQuery({
    queryKey: ["GET_CONTACTS"],
    queryFn: async () => await getContacts(params),
  });
};
