"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createTireWidth = async (tireWidthData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/tire-width/create",
      tireWidthData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create tireWidth");
  }
};

export const updateTireWidth = async (
  id: string,
  tireWidthData: any,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/tire-width/${id}`,
      tireWidthData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update tireWidth");
  }
};

export const deleteTireWidth = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/tire-width/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete tireWidth");
  }
};

export const getTireWidths = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/tire-width", { params });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
