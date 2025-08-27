"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createContact = async (ContactData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/contacts/create", ContactData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Contact");
  }
};

export const updateContact = async (
  id: string,
  ContactData: any
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/contacts/${id}`, ContactData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update Contact");
  }
};

export const deleteContact = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/contacts/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Contact");
  }
};

export const getContacts = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/contacts", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSingleContact = async (ContactId: any) => {
  try {
    const { data } = await axiosInstance.get(`/contacts/${ContactId}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
