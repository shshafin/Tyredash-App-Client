"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const getCartByUserId = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/cart/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get cart items!");
  }
};

export const addItemToCart = async (id: string, item: any): Promise<any> => {
    console.log({id, item});
  try {
    const { data } = await axiosInstance.post(`/cart/${id}/items`, {...item}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add item to the cart!");
  }
};

export const removeItemFromCart = async (userId: string, item: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/cart/${userId}/items/${item?.productId}`, {productType: item?.productType}, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove item from the cart!");
  }
};

export const updateCartItem = async (userId: string, item: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/cart/${userId}/items/${item?.productId}`, {productType: item?.productType, quantity: item?.quantity}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update item quantity");
  }
};

export const clearCart = async (userId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/cart/${userId}/clear`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to clear cart");
  }
};

export const getAllCarts = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/cart", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
