"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const deleteFleetUser = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/fleet-users/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete fleet user");
  }
};

export const updateFleetUser = async (
  id: string,
  userData: any
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/fleet-users/${id}`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update fleet user");
  }
};

export const getFleetUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/fleet-users");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSingleFleetUsers = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/fleet-users/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
