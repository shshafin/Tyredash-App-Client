"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

// Create fleet appointment
export const createFleetAppointment = async (appointmentData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/fleet-appointments/create", appointmentData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create fleet appointment");
  }
};

// Get all fleet appointments
export const getAllFleetAppointments = async (params?: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.get("/fleet-appointments", { params });

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch fleet appointments");
  }
};

// Get single fleet appointment by ID
export const getSingleFleetAppointment = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/fleet-appointments/${id}`);

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch fleet appointment");
  }
};

// Update fleet appointment
export const updateFleetAppointment = async (id: string, appointmentData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/fleet-appointments/${id}`, appointmentData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update fleet appointment");
  }
};

// Update fleet reference
export const updateFleetRef = async (id: string, fleetRefData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/fleet-appointments/${id}/fleet-ref`, fleetRefData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update fleet reference");
  }
};

// Delete fleet appointment
export const deleteFleetAppointment = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/fleet-appointments/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete fleet appointment");
  }
};

// Get appointments by vehicle ID
export const getAppointmentsByVehicle = async (vehicleId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/fleet-appointments/vehicle/${vehicleId}`);

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch appointments for vehicle");
  }
};

// Update appointment status
export const updateAppointmentStatus = async (id: string, statusData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/fleet-appointments/${id}/status`, statusData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update appointment status");
  }
};

// Get upcoming appointments
export const getUpcomingAppointments = async (params?: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.get("/fleet-appointments/upcoming/appointments", { params });

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to fetch upcoming appointments");
  }
};
