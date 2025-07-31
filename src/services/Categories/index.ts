"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createCategory = async (categoryData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/categories/create",
      categoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create category");
  }
};

export const updateCategory = async (
  id: string,
  categoryData: any,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/categories/${id}`,
      categoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update category");
  }
};

export const deleteCategory = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/categories/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete category");
  }
};

export const getCategories = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/categories", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
