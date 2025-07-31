"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createWheel = async (WheelData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/wheel/create", WheelData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Wheel");
  }
};

export const importCSVWheels = async (wheelData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/wheel/import-csv", wheelData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to import csv wheels");
  }
};

export const updateWheel = async (id: string, WheelData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/wheel/${id}`, WheelData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update Wheel");
  }
};

export const deleteWheel = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/wheel/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Wheel");
  }
};

export const getWheels = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/wheel", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSingleWheel = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/wheel/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Wheel");
  }
};
