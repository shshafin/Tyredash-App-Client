"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createDrivingType = async (drivingTypeData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/driving-type/create",
      drivingTypeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create driving-type");
  }
};

export const updateDrivingType = async (
  id: string,
  drivingTypeData: any,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/driving-type/${id}`,
      drivingTypeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update driving-type");
  }
};

export const deleteDrivingType = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/driving-type/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete driving-type");
  }
};

export const getDrivingTypes = async () => {
  try {
    const { data } = await axiosInstance.get("/driving-type");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
