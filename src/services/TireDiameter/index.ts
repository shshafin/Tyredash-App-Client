"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createTireDiameter = async (tireDiameterData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/tire-diameter/create",
      tireDiameterData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create tireDiameter");
  }
};

export const updateTireDiameter = async (
  id: string,
  tireDiameterData: any,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/tire-diameter/${id}`,
      tireDiameterData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update tireDiameter");
  }
};

export const deleteTireDiameter = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/tire-diameter/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete tireDiameter");
  }
};

export const getTireDiameters = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/tire-diameter", { params });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
