"use server";
import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createFleetNews = async (newsData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/fleet-news/create", newsData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating fleet news:", error);
    throw new Error("Failed to create fleet news");
  }
};

export const getAllFleetNews = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get("/fleet-news", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching all fleet news:", error);
    throw new Error("Failed to fetch all fleet news");
  }
};

export const getFleetNewsById = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/fleet-news/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching fleet news by ID:", error);
    throw new Error("Failed to fetch fleet news by ID");
  }
};

export const updateFleetNews = async (newsData: any, id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/fleet-news/${id}`, newsData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Error updating fleet news:", error);
    throw new Error("Failed to update fleet news");
  }
};

export const deleteFleetNews = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/fleet-news/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Error deleting fleet news:", error);
    throw new Error("Failed to delete fleet news");
  }
};
