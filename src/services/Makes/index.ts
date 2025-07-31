"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createMake = async (makeData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/makes/create", makeData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create make");
  }
};

export const updateMake = async (id: string, makeData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/makes/${id}`, makeData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update make");
  }
};

export const deleteMake = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/makes/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete make");
  }
};

export const getMakes = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/makes", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
