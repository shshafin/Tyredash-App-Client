"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const getMyWishlist = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/wishlists/my-wishlist`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get wishlist items!");
  }
};

export const addItemToWishlist = async (item: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/wishlists/items`, {...item}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add item to the wishlist!");
  }
};

export const removeItemFromWishlist = async (item: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/wishlists/items/${item?.productId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove item from the wishlist!");
  }
};

export const clearWishlist = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/wishlists/clear`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to clear wishlist");
  }
};
