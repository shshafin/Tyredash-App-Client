"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createWheelWidthType = async (wheelWidthTypeData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/wheel-width-type/create",
      wheelWidthTypeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create wheelWidth-type");
  }
};

export const updateWheelWidthType = async (
  id: string,
  wheelWidthTypeData: any,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/wheel-width-type/${id}`,
      wheelWidthTypeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update wheelWidth-type");
  }
};

export const deleteWheelWidthType = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/wheel-width-type/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete wheelWidth-type");
  }
};

export const getWheelWidthTypes = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/wheel-width-type", { params });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
