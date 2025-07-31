"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createVehicleType = async (vehicleTypeData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/vehicle-type/create",
      vehicleTypeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create vehicle-type");
  }
};

export const updateVehicleType = async (
  id: string,
  vehicleTypeData: any,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/vehicle-type/${id}`,
      vehicleTypeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update vehicle-type");
  }
};

export const deleteVehicleType = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/vehicle-type/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete vehicle-type");
  }
};

export const getVehicleTypes = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/vehicle-type", { params });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
