"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const getProductReviews = async (id: string, productType: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/reviews/product/${id}/${productType}`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get product reviews!");
  }
};

export const createReview = async (reviewData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/reviews`, {...reviewData}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create review!");
  }
};

export const deleteReview = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/reviews/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete review!");
  }
};

export const updateReview = async (dataN: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/reviews/${dataN.id}/`, {...dataN.data}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update review");
  }
};

export const getAllReviews = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/reviews", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
