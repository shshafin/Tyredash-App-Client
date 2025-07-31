"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const deleteUser = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/users/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete User");
  }
};

export const createUser = async (userData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/users/create", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (id: string, userData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/users/${id}`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update trim");
  }
};

export const getUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
