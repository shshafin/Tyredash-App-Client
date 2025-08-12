"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createTireRatio = async (tireRatioData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/tire-ratio/create", tireRatioData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create tireRatio");
  }
};

export const updateTireRatio = async (id: string, tireRatioData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/tire-ratio/${id}`, tireRatioData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update tireRatio");
  }
};

export const deleteTireRatio = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/tire-ratio/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete tireRatio");
  }
};

export const getTireRatios = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/tire-ratio", { params });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
