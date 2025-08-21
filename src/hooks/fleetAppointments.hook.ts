import { getSingleFleetAppointment } from "./../services/fleet-Appointment/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createFleetAppointment,
  getAllFleetAppointments,
  updateFleetAppointment,
  updateFleetRef,
  deleteFleetAppointment,
  getAppointmentsByVehicle,
  updateAppointmentStatus,
  getUpcomingAppointments,
} from "../services/fleet-Appointment";

export const useGetAllFleetAppointments = (params?: any) => {
  return useQuery({
    queryKey: ["GET_ALL_FLEET_APPOINTMENTS", params],
    queryFn: async () => await getAllFleetAppointments(params),
  });
};

export const useGetUpcomingAppointments = (params?: any) => {
  return useQuery({
    queryKey: ["GET_UPCOMING_FLEET_APPOINTMENTS", params],
    queryFn: async () => await getUpcomingAppointments(params),
  });
};

export const useGetAppointmentsByVehicle = (vehicleId: string) => {
  return useQuery({
    queryKey: ["GET_APPOINTMENTS_BY_VEHICLE", vehicleId],
    queryFn: async () => await getAppointmentsByVehicle(vehicleId),
    enabled: !!vehicleId,
  });
};

export const useCreateFleetAppointment = ({ onSuccess }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["CREATE_FLEET_APPOINTMENT"],
    mutationFn: async (appointmentData) => await createFleetAppointment(appointmentData),
    onError: (error) => {
      toast.error(error.message || "Failed to create fleet appointment");
    },
    onSuccess: (data) => {
      toast.success("Fleet appointment created successfully!");
      if (onSuccess) onSuccess(data);
    },
  });
};

export const useUpdateFleetAppointment = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["UPDATE_FLEET_APPOINTMENT"],
    mutationFn: async (appointmentData) => await updateFleetAppointment(id, appointmentData),
    onError: (error) => {
      toast.error(error.message || "Failed to update fleet appointment");
    },
    onSuccess: (data) => {
      toast.success("Fleet appointment updated successfully!");
      if (onSuccess) onSuccess(data);
    },
  });
};

export const useUpdateFleetRef = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, any>({
    mutationKey: ["UPDATE_FLEET_REF"],
    mutationFn: async (fleetRefData) => await updateFleetRef(id, fleetRefData),
    onError: (error) => {
      toast.error(error.message || "Failed to update fleet reference");
    },
    onSuccess: (data) => {
      toast.success("Fleet reference updated successfully!");
      if (onSuccess) onSuccess(data);
    },
  });
};

export const useUpdateAppointmentStatus = ({ onSuccess }: any) => {
  return useMutation<any, Error, { id: string; status: string }>({
    mutationKey: ["UPDATE_APPOINTMENT_STATUS"],
    mutationFn: async ({ id, status }) => await updateAppointmentStatus(id, { status }),
    onError: (error) => {
      toast.error(error.message || "Failed to update appointment status");
    },
    onSuccess: (data) => {
      toast.success("Appointment status updated successfully!");
      if (onSuccess) onSuccess(data);
    },
  });
};

export const useDeleteFleetAppointment = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, void>({
    mutationKey: ["DELETE_FLEET_APPOINTMENT"],
    mutationFn: async () => await deleteFleetAppointment(id),
    onError: (error) => {
      toast.error(error.message || "Failed to delete fleet appointment");
    },
    onSuccess: (data) => {
      toast.success("Fleet appointment deleted successfully!");
      if (onSuccess) onSuccess(data);
    },
  });
};

export const useGetSingleFleetAppointment = (id: string) => {
  return useMutation<any, Error, void>({
    mutationKey: ["GET_SINGLE_FLEET_APPOINTMENT", id],
    mutationFn: async () => await getSingleFleetAppointment(id),
    onError: (error) => {
      toast.error(error.message || "Failed to fetch fleet appointment");
    },
  });
};
