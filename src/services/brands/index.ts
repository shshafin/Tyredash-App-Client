"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createBrand = async (BrandData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/brand/create", BrandData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Brand");
  }
};

export const updateBrand = async (id: string, BrandData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/brand/${id}`, BrandData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update Brand");
  }
};

export const deleteBrand = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/brand/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Brand");
  }
};

export const getBrands = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/brand", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSingleBrand = async (brandId: any) => {
  try {
    const { data } = await axiosInstance.get(`/brand${brandId}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
