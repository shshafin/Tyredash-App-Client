"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createWheelDiameter = async (wheelDiameterData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/wheel-diameter/create",
      wheelDiameterData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create wheelDiameter");
  }
};

export const updateWheelDiameter = async (
  id: string,
  wheelDiameterData: any,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/wheel-diameter/${id}`,
      wheelDiameterData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update wheelDiameter");
  }
};

export const deleteWheelDiameter = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/wheel-diameter/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete wheelDiameter");
  }
};

export const getWheelDiameters = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/wheel-diameter", { params });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
