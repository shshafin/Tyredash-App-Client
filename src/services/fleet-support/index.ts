"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const getAllSupportRequests = async () => {
  try {
    const { data } = await axiosInstance.get("/fleet-appointments", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching support requests");
  }
};

export const assignFleetRef = async (formdata: any, id: string) => {
  try {
    const { data } = await axiosInstance.post(`/fleet-appointments/fleet-ref/${id}`, formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error assigning fleet reference");
  }
};
