import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createFleetAppointment,
  getAllFleetAppointments,
  getSingleFleetAppointment,
  updateFleetAppointment,
  updateFleetRef,
  deleteFleetAppointment,
  getAppointmentsByVehicle,
  updateAppointmentStatus,
  getUpcomingAppointments,
} from "../services/fleet-Appointment";

// Query: Get all fleet appointments
export const useGetAllFleetAppointments = (params?: any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["GET_ALL_FLEET_APPOINTMENTS", params],
    queryFn: async () => await getAllFleetAppointments(params),
  });
};

// Query: Get single fleet appointment by ID
export const useGetSingleFleetAppointment = (id: string | undefined): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["GET_SINGLE_FLEET_APPOINTMENT", id],
    queryFn: async () => {
      if (!id) throw new Error("Appointment ID is required");
      return await getSingleFleetAppointment(id);
    },
    enabled: !!id,
  });
};

// Query: Get appointments by vehicle ID
export const useGetAppointmentsByVehicle = (vehicleId: string | undefined): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["GET_APPOINTMENTS_BY_VEHICLE", vehicleId],
    queryFn: async () => {
      if (!vehicleId) throw new Error("Vehicle ID is required");
      return await getAppointmentsByVehicle(vehicleId);
    },
    enabled: !!vehicleId,
  });
};

// Query: Get upcoming appointments
export const useGetUpcomingAppointments = (params?: any): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ["GET_UPCOMING_FLEET_APPOINTMENTS", params],
    queryFn: async () => await getUpcomingAppointments(params),
  });
};

// Mutation: Create fleet appointment
export const useCreateFleetAppointment = ({ onSuccess }: any): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_FLEET_APPOINTMENT"],
    mutationFn: async (appointmentData: any) => await createFleetAppointment(appointmentData),
    onSuccess: (data) => {
      toast.success("Fleet appointment created successfully!");
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_FLEET_APPOINTMENTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_UPCOMING_FLEET_APPOINTMENTS"] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create fleet appointment");
    },
  });
};

// Mutation: Update fleet appointment
export const useUpdateFleetAppointment = ({ onSuccess, id }: any): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_FLEET_APPOINTMENT", id],
    mutationFn: async (appointmentData: any) => await updateFleetAppointment(id, appointmentData),
    onSuccess: (data) => {
      toast.success("Fleet appointment updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_FLEET_APPOINTMENTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_SINGLE_FLEET_APPOINTMENT", id] });
      queryClient.invalidateQueries({ queryKey: ["GET_UPCOMING_FLEET_APPOINTMENTS"] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update fleet appointment");
    },
  });
};

// Mutation: Update fleet reference
export const useUpdateFleetRef = ({ onSuccess, id }: any): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_FLEET_REF", id],
    mutationFn: async (fleetRefData: any) => await updateFleetRef(id, fleetRefData),
    onSuccess: (data) => {
      toast.success("Fleet reference updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_FLEET_APPOINTMENTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_SINGLE_FLEET_APPOINTMENT", id] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update fleet reference");
    },
  });
};

// Mutation: Update appointment status
export const useUpdateAppointmentStatus = ({ onSuccess, id }: any): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_APPOINTMENT_STATUS", id],
    mutationFn: async (statusData: any) => await updateAppointmentStatus(id, statusData),
    onSuccess: (data) => {
      toast.success("Appointment status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_FLEET_APPOINTMENTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_SINGLE_FLEET_APPOINTMENT", id] });
      queryClient.invalidateQueries({ queryKey: ["GET_UPCOMING_FLEET_APPOINTMENTS"] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update appointment status");
    },
  });
};

// Mutation: Delete fleet appointment
export const useDeleteFleetAppointment = ({ onSuccess, id }: any): UseMutationResult<any, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE_FLEET_APPOINTMENT", id],
    mutationFn: async () => await deleteFleetAppointment(id),
    onSuccess: (data) => {
      toast.success("Fleet appointment deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_FLEET_APPOINTMENTS"] });
      queryClient.invalidateQueries({ queryKey: ["GET_UPCOMING_FLEET_APPOINTMENTS"] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete fleet appointment");
    },
  });
};
