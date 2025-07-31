"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createTire = async (TireData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/tire/create", TireData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Tire");
  }
};

export const importCSVTires = async (TireData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/tire/import-csv", TireData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to import csv Tire");
  }
};

export const updateTire = async (id: string, TireData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/tire/${id}`, TireData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update Tire");
  }
};

export const deleteTire = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/tire/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Tire");
  }
};

export const getTires = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/tire", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSingleTire = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/tire/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Tire");
  }
};
