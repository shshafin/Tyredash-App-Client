"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createTyreSize = async (tyreSizeData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/tiresizes/create",
      tyreSizeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create tyre-size");
  }
};

export const updateTyreSize = async (
  id: string,
  tyreSizeData: any,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/tiresizes/${id}`,
      tyreSizeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update tyre-size");
  }
};

export const deleteTyreSize = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/tiresizes/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete tyre-size");
  }
};

export const getTyreSizes = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/tiresizes", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getFilteredTyreSizes = async (
  yearId: string,
  makeId: string,
  modelId: string,
  trimId: string,
) => {
  if (!yearId || !makeId || !modelId || !trimId) return {}; // early return if params are missing

  try {
    const res = await axiosInstance.get(
      `/tiresizes?year=${yearId}&make=${makeId}&model=${modelId}&trim=${trimId}`,
    );
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.message || "Something went wrong while fetching tire sizes.",
    );
  }
};
