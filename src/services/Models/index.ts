"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createModel = async (modelData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/models/create", modelData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create model");
  }
};

export const updateModel = async (id: string, modelData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/models/${id}`, modelData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update model");
  }
};

export const deleteModel = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/models/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete model");
  }
};

export const getModels = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/models", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
