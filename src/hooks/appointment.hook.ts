import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getSingleAppointment,
  updateAppointment,
} from "../services/Appointment";

export const useCreateAppointment = ({ onSuccess }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["CREATE_APPOINTMENT"],
    mutationFn: async (appointmentData) =>
      await createAppointment(appointmentData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateAppointment = ({ onSuccess }: any = {}) => {
  return useMutation<any, Error, { id: string; data: any }>({
    mutationKey: ["UPDATE_APPOINTMENT"],
    mutationFn: async ({ id, data }) => {
      return await updateAppointment(id, data);
    },
    onError: (error) => toast.error(error.message),
    onSuccess,
  });
};

export const useDeleteAppointment = ({ onSuccess }: any = {}) => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_APPOINTMENT"],
    mutationFn: async (id) => await deleteAppointment(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetAppointments = (params: any) => {
  return useQuery({
    queryKey: ["GET_APPOINTMENT"],
    queryFn: async () => await getAppointments(params),
  });
};

export const useGetSingleAppointment = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_APPOINTMENT", id],
    queryFn: async () => await getSingleAppointment(id),
    enabled: !!id, // Only run query when id exists
  });
};
