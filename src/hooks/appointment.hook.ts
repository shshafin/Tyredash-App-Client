import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
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

export const useUpdateAppointment = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_APPOINTMENT"],
    mutationFn: async (appointmentData) =>
      await updateAppointment(id, appointmentData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useDeleteAppointment = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_APPOINTMENT"],
    mutationFn: async () => await deleteAppointment(id),
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
