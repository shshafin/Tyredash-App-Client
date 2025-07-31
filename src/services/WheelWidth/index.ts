"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createWheelWidth = async (wheelWidthData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/wheel-width/create",
      wheelWidthData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create wheelWidth");
  }
};

export const updateWheelWidth = async (
  id: string,
  wheelWidthData: any,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/wheel-width/${id}`,
      wheelWidthData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update wheelWidth");
  }
};

export const deleteWheelWidth = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/wheel-width/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete wheelWidth");
  }
};

export const getWheelWidths = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/wheel-width", { params });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
