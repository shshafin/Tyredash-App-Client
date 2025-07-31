"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createWheelRatio = async (wheelRatioData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/wheel-ratio/create",
      wheelRatioData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create wheelRatio");
  }
};

export const updateWheelRatio = async (
  id: string,
  wheelRatioData: any,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/wheel-ratio/${id}`,
      wheelRatioData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update wheelRatio");
  }
};

export const deleteWheelRatio = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/wheel-ratio/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete wheelRatio");
  }
};

export const getWheelRatios = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/wheel-ratio", { params });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
