"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

// Get discounted tires by Brand
export const getDiscountedTiresByBrand = async (brandId: string) => {
  try {
    const { data } = await axiosInstance.get(`/deals/discounted-tires/${brandId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch discounted tires.");
  }
};

// Get discounted wheels by Brand
export const getDiscountedWheelsByBrand = async (brandId: string) => {
  try {
    const { data } = await axiosInstance.get(`/deals/discounted-wheels/${brandId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch discounted wheels.");
  }
};

// Get discounted products by Brand
export const getDiscountedProductsByBrand = async (brandId: string) => {
  try {
    const { data } = await axiosInstance.get(`/deals/discounted-products/${brandId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch discounted products.");
  }
};

// Apply deal to a tire
export const applyDealToTire = async (tireId: string, dealData: any) => {
  try {
    const { data } = await axiosInstance.post(`/deals/apply-deal-to-tire/${tireId}`, dealData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to apply deal to tire.");
  }
};

// Apply deal to a wheel
export const applyDealToWheel = async (wheelId: string, dealData: any) => {
  try {
    const { data } = await axiosInstance.post(`/deals/apply-deal-to-wheel/${wheelId}`, dealData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to apply deal to wheel.");
  }
};

// Apply deal to a product
export const applyDealToProduct = async (productId: string, dealData: any) => {
  try {
    const { data } = await axiosInstance.post(`/deals/apply-deal-to-product/${productId}`, dealData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to apply deal to product.");
  }
};

// Create a new deal
export const createDeal = async (dealData: any) => {
  try {
    const { data } = await axiosInstance.post("/deals/create", dealData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create deal.");
  }
};

// Get all deals
export const getAllDeals = async () => {
  try {
    const { data } = await axiosInstance.get(`/deals`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch deals.");
  }
};

// get all deals
export const getSingleDeal = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/deals/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch single deal.");
  }
};

// Update a deal
export const updateDeal = async (id: string, dealData: any) => {
  try {
    const { data } = await axiosInstance.patch(`/deals/${id}`, dealData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update deal.");
  }
};

// Delete a deal
export const deleteDeal = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/deals/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete deal.");
  }
};
