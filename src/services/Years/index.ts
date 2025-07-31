"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createYear = async (YearData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/years/create", YearData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Year");
  }
};

export const updateYear = async (id: string, YearData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/years/${id}`, YearData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update Year");
  }
};

export const deleteYear = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/years/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Year");
  }
};

export const getYears = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/years", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
