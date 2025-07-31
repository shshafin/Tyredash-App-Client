"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createTrim = async (trimData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/trims/create", trimData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create trim");
  }
};

export const updateTrim = async (id: string, trimData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/trims/${id}`, trimData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update trim");
  }
};

export const deleteTrim = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/trims/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete trim");
  }
};

export const getTrims = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/trims", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
